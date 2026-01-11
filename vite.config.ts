import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";

const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1];
const basePath = process.env.VITE_BASE_PATH ?? (repositoryName ? `/${repositoryName}/` : "/");

// https://vite.dev/config/
export default defineConfig({
  base: basePath,
  plugins: [tailwindcss(), react()],
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
  },
});
