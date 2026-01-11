import { useCallback, useEffect, useRef } from 'react';
import { CELL_SIZE, type Bounds, type LiveCell, type WorkerMessage, type WorkerResponse } from '../lifeTypes';
import { useLifeBoardControls } from '../contexts/LifeBoardContext';

const SPEED_MS = 60;
const SEED_DENSITY = 0.7;
const VERTEX_SRC = `
  attribute vec2 a_position;
  uniform vec2 u_translate;
  uniform float u_scale;
  uniform vec2 u_canvasSize;
  uniform float u_cellSize;
  uniform float u_padding;
  void main() {
    float wx = a_position.x * u_cellSize;
    float wy = a_position.y * u_cellSize;
    float sx = (wx * u_scale + u_translate.x) / u_canvasSize.x * 2.0 - 1.0;
    float sy = (wy * u_scale + u_translate.y) / u_canvasSize.y * 2.0 - 1.0;
    gl_Position = vec4(sx, -sy, 0.0, 1.0);
    gl_PointSize = (u_cellSize - u_padding) * u_scale;
  }
`;
const FRAG_SRC = `
  precision mediump float;
  uniform float u_corner;
  void main() {
    vec2 q = abs(gl_PointCoord - 0.5) - vec2(0.5 - u_corner);
    float dist = length(max(q, 0.0));
    if (dist > u_corner) {
      discard;
    }
    gl_FragColor = vec4(0.133, 0.827, 0.933, 1.0);
  }
`;

type Transform = { x: number; y: number; k: number };

export function LifeBackground() {
  const { running, randomizeToken } = useLifeBoardControls();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const renderRef = useRef<((cells: LiveCell[]) => void) | null>(null);
  const workerRef = useRef<Worker | null>(null);
  const timerRef = useRef<number | null>(null);
  const cellsRef = useRef<LiveCell[]>([]);
  const boundsRef = useRef<Bounds | undefined>(undefined);
  const transformRef = useRef<Transform>({ x: 0, y: 0, k: 1 });

  const sendToWorker = useCallback((message: WorkerMessage) => {
    workerRef.current?.postMessage(message);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const gl = canvas.getContext('webgl');
    if (!gl) return undefined;

    const compile = (type: number, src: string) => {
      const shader = gl.createShader(type)!;
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      return shader;
    };

    const program = gl.createProgram()!;
    gl.attachShader(program, compile(gl.VERTEX_SHADER, VERTEX_SRC));
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAG_SRC));
    gl.linkProgram(program);
    gl.useProgram(program);

    const positionLoc = gl.getAttribLocation(program, 'a_position');
    const translateLoc = gl.getUniformLocation(program, 'u_translate');
    const scaleLoc = gl.getUniformLocation(program, 'u_scale');
    const canvasSizeLoc = gl.getUniformLocation(program, 'u_canvasSize');
    const cellSizeLoc = gl.getUniformLocation(program, 'u_cellSize');
    const paddingLoc = gl.getUniformLocation(program, 'u_padding');
    const cornerLoc = gl.getUniformLocation(program, 'u_corner');

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    const draw = (cells: LiveCell[]) => {
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      if (cells.length === 0) return;
      const data = new Float32Array(cells.length * 2);
      for (let i = 0; i < cells.length; i += 1) {
        data[i * 2] = cells[i].x;
        data[i * 2 + 1] = cells[i].y;
      }
      gl.bufferData(gl.ARRAY_BUFFER, data, gl.DYNAMIC_DRAW);
      gl.uniform2f(translateLoc, transformRef.current.x, transformRef.current.y);
      gl.uniform1f(scaleLoc, transformRef.current.k);
      gl.uniform2f(canvasSizeLoc, canvas.width, canvas.height);
      gl.uniform1f(cellSizeLoc, CELL_SIZE);
      gl.uniform1f(paddingLoc, 1.0);
      gl.uniform1f(cornerLoc, 0.18);
      gl.drawArrays(gl.POINTS, 0, cells.length);
    };

    renderRef.current = draw;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);

      const cols = Math.ceil(canvas.width / CELL_SIZE);
      const rows = Math.ceil(canvas.height / CELL_SIZE);
      boundsRef.current = {
        minCol: -Math.ceil(cols / 2),
        maxCol: Math.ceil(cols / 2),
        minRow: -Math.ceil(rows / 2),
        maxRow: Math.ceil(rows / 2),
      };
      transformRef.current = { x: canvas.width / 2, y: canvas.height / 2, k: 1 };
      draw(cellsRef.current);
    };

    resize();
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  useEffect(() => {
    const worker = new Worker(new URL('../lifeWorker.ts', import.meta.url), { type: 'module' });
    workerRef.current = worker;

    const handleMessage = (event: MessageEvent<WorkerResponse>) => {
      const { cells } = event.data;
      cellsRef.current = cells;
      renderRef.current?.(cells);
    };

    worker.addEventListener('message', handleMessage);
    worker.postMessage({ type: 'init', payload: { density: SEED_DENSITY, bounds: boundsRef.current } });

    return () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
      }
      worker.removeEventListener('message', handleMessage);
      worker.terminate();
    };
  }, []);

  useEffect(() => {
    if (!running || !workerRef.current) return undefined;
    const id = window.setInterval(() => {
      sendToWorker({ type: 'step' });
    }, SPEED_MS);
    timerRef.current = id;
    return () => window.clearInterval(id);
  }, [running, sendToWorker]);

  useEffect(() => {
    if (!workerRef.current || randomizeToken === 0) return;
    sendToWorker({ type: 'randomize', payload: { density: SEED_DENSITY, bounds: boundsRef.current } });
  }, [randomizeToken, sendToWorker]);

  return (
    <div className="absolute inset-0">
      <canvas ref={canvasRef} className="h-full w-full pointer-events-none" />
    </div>
  );
}
