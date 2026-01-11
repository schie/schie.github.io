import { useEffect, useState } from "react";
import { OpenSourceCard } from "./OpenSourceCard";

type NpmStats = {
  version: string;
  publishedAt: string;
  weeklyDownloads: number;
  monthlyDownloads: number;
};

const npmStatsCache = new Map<string, Promise<NpmStats | null>>();

async function fetchNpmStats(packageName: string): Promise<NpmStats | null> {
  const encoded = encodeURIComponent(packageName);
  try {
    const [registryResponse, weeklyResponse, monthlyResponse] =
      await Promise.all([
        fetch(`https://registry.npmjs.org/${encoded}`),
        fetch(`https://api.npmjs.org/downloads/point/last-week/${encoded}`),
        fetch(`https://api.npmjs.org/downloads/point/last-month/${encoded}`),
      ]);

    if (!registryResponse.ok) {
      return null;
    }

    const registryData = await registryResponse.json();
    const latestVersion = registryData?.["dist-tags"]?.latest;
    const publishedAtRaw = latestVersion
      ? registryData?.time?.[latestVersion]
      : registryData?.time?.modified;
    const publishedAt = publishedAtRaw
      ? new Date(publishedAtRaw).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "Unknown";

    const weeklyData = weeklyResponse.ok
      ? await weeklyResponse.json()
      : { downloads: 0 };
    const monthlyData = monthlyResponse.ok
      ? await monthlyResponse.json()
      : { downloads: 0 };

    if (!latestVersion) {
      return null;
    }

    return {
      version: latestVersion,
      publishedAt,
      weeklyDownloads: weeklyData?.downloads ?? 0,
      monthlyDownloads: monthlyData?.downloads ?? 0,
    };
  } catch (error) {
    return null;
  }
}

function getNpmStats(packageName: string) {
  const cached = npmStatsCache.get(packageName);
  if (cached) {
    return cached;
  }

  const promise = fetchNpmStats(packageName);
  npmStatsCache.set(packageName, promise);
  return promise;
}

type NpmPackageCardProps = {
  name: string;
  description: string;
  href: string;
  npmPackage: string;
  imageSrc?: string;
  imageAlt?: string;
  primaryLabel?: string;
  links?: { label: string; href: string }[];
  tags?: string[];
};

export function NpmPackageCard({
  name,
  description,
  href,
  npmPackage,
  imageSrc,
  imageAlt,
  primaryLabel,
  links,
  tags,
}: NpmPackageCardProps) {
  const [npmStats, setNpmStats] = useState<NpmStats | null>(null);

  useEffect(() => {
    let isMounted = true;

    getNpmStats(npmPackage).then((stats) => {
      if (isMounted) {
        setNpmStats(stats);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [npmPackage]);

  const numberFormatter = new Intl.NumberFormat(undefined, {
    notation: "compact",
  });

  const descriptionMeta = npmStats ? (
    <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-base-content/60">
      <span>v{npmStats.version}</span>
      <span>{npmStats.publishedAt}</span>
      <span>{numberFormatter.format(npmStats.monthlyDownloads)}/month</span>
    </div>
  ) : null;

  return (
    <OpenSourceCard
      name={name}
      description={description}
      href={href}
      imageSrc={imageSrc}
      imageAlt={imageAlt}
      primaryLabel={primaryLabel}
      links={links}
      tags={tags}
      descriptionMeta={descriptionMeta}
    />
  );
}
