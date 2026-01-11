type FaviconIconProps = {
  href: string;
  className?: string;
  size?: number;
};

const getDomain = (href: string) => {
  try {
    return new URL(href).hostname;
  } catch {
    return '';
  }
};

export function FaviconIcon({ href, className = 'h-4 w-4', size = 32 }: FaviconIconProps) {
  const domain = getDomain(href);
  if (!domain) return null;
  return (
    <img
      src={`https://www.google.com/s2/favicons?domain=${domain}&sz=${size}`}
      alt=""
      className={className}
      loading="lazy"
    />
  );
}
