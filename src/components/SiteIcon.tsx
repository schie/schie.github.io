type SiteIconProps = {
  href: string;
  label?: string;
  className?: string;
};

const getDomain = (href: string) => {
  try {
    return new URL(href).hostname;
  } catch {
    return "";
  }
};

function useIconClassName(href: string, label?: string) {
  const normalizedLabel = label?.toLowerCase() ?? "";
  let iconClassName = "fa-solid fa-link";
  if (normalizedLabel.includes("ios") || normalizedLabel.includes("apple")) {
    iconClassName = "fa-brands fa-app-store";
  } else if (normalizedLabel.includes("android")) {
    iconClassName = "fa-brands fa-google-play";
  } else if (normalizedLabel.includes("github")) {
    iconClassName = "fa-brands fa-github";
  } else if (normalizedLabel.includes("npm")) {
    iconClassName = "fa-brands fa-npm";
  } else if (normalizedLabel.includes("docs")) {
    iconClassName = "fa-solid fa-book";
  } else if (normalizedLabel.includes("site")) {
    iconClassName = "fa-solid fa-globe";
  }

  const domain = getDomain(href);
  if (domain.includes("github.com")) {
    iconClassName = "fa-brands fa-github";
  } else if (domain.includes("npmjs.com")) {
    iconClassName = "fa-brands fa-npm";
  } else if (domain.includes("apps.apple.com")) {
    iconClassName = "fa-brands fa-apple";
  } else if (domain.includes("play.google.com")) {
    iconClassName = "fa-brands fa-google-play";
  } else if (domain.endsWith("github.io")) {
    iconClassName = "fa-solid fa-book";
  } else if (domain.endsWith("schie.io")) {
    iconClassName = "fa-solid fa-globe";
  }

  return `${iconClassName} text-lg`;
}

export function SiteIcon({
  href,
  label,
  className = "leading-none",
}: SiteIconProps) {
  const domain = getDomain(href);
  if (!domain) return null;
  const iconClassName = useIconClassName(href, label);
  return (
    <i className={`${iconClassName} ${className}`} aria-hidden="true" />
  );
}
