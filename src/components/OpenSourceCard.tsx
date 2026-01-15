import { SiteIcon } from "./SiteIcon";

import type { ReactNode } from "react";

type OpenSourceCardProps = {
  name: string;
  description: string;
  href: string;
  imageSrc?: string;
  imageAlt?: string;
  primaryLabel?: string;
  links?: { label: string; href: string }[];
  tags?: string[];
  descriptionMeta?: ReactNode;
};

export function OpenSourceCard({
  name,
  description,
  href,
  imageSrc,
  imageAlt,
  primaryLabel = "GitHub",
  links = [],
  tags = [],
  descriptionMeta,
}: OpenSourceCardProps) {
  return (
    <article className="card h-full border border-base-300/60 bg-base-100/80 shadow-lg backdrop-blur rounded-2xl">
      <div className="card-body gap-4">
        {imageSrc ? (
          <div className="overflow-hidden rounded-xl border border-base-200/70">
            <img
              src={imageSrc}
              alt={imageAlt || name}
              className="h-40 w-full object-cover"
              loading="lazy"
            />
          </div>
        ) : null}
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">{name}</h3>
          <p className="text-sm text-base-content/70">{description}</p>
          {descriptionMeta}
        </div>
        {tags.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span key={tag} className="badge badge-outline">
                {tag}
              </span>
            ))}
          </div>
        ) : null}
        <div className="card-actions mt-auto flex-wrap">
          <a
            className="btn btn-sm btn-primary gap-2 rounded-xl"
            href={href}
            target="_blank"
            rel="noreferrer"
          >
            <SiteIcon href={href} label={primaryLabel} />
            {primaryLabel}
          </a>
          {links.map((link) => (
            <a
              key={`${link.label}-${link.href}`}
              className="btn btn-sm btn-outline btn-primary gap-2 rounded-xl"
              href={link.href}
              target="_blank"
              rel="noreferrer"
            >
              <SiteIcon href={link.href} label={link.label} />
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}
