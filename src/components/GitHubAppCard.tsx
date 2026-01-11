import { useEffect, useState } from "react";
import { OpenSourceCard } from "./OpenSourceCard";

type GitHubStats = {
  version: string;
  publishedAt: string;
};

const githubStatsCache = new Map<string, Promise<GitHubStats | null>>();

async function fetchGitHubStats(repo: string): Promise<GitHubStats | null> {
  try {
    const tagsResponse = await fetch(
      `https://api.github.com/repos/${repo}/tags?per_page=1`
    );
    if (!tagsResponse.ok) {
      return null;
    }

    const tags = await tagsResponse.json();
    const latestTag = Array.isArray(tags) ? tags[0] : null;
    if (!latestTag?.name) {
      return null;
    }

    const commitUrl = latestTag?.commit?.url;
    let publishedAt = "Unknown";
    if (commitUrl) {
      const commitResponse = await fetch(commitUrl);
      if (commitResponse.ok) {
        const commitData = await commitResponse.json();
        const commitDate =
          commitData?.commit?.committer?.date ??
          commitData?.commit?.author?.date;
        if (commitDate) {
          publishedAt = new Date(commitDate).toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
          });
        }
      }
    }

    return {
      version: latestTag.name,
      publishedAt,
    };
  } catch (error) {
    return null;
  }
}

function getGitHubStats(repo: string) {
  const cached = githubStatsCache.get(repo);
  if (cached) {
    return cached;
  }

  const promise = fetchGitHubStats(repo);
  githubStatsCache.set(repo, promise);
  return promise;
}

type GitHubAppCardProps = {
  name: string;
  description: string;
  href: string;
  githubRepo: string;
  imageSrc?: string;
  imageAlt?: string;
  primaryLabel?: string;
  links?: { label: string; href: string }[];
  tags?: string[];
};

export function GitHubAppCard({
  name,
  description,
  href,
  githubRepo,
  imageSrc,
  imageAlt,
  primaryLabel,
  links,
  tags,
}: GitHubAppCardProps) {
  const [githubStats, setGitHubStats] = useState<GitHubStats | null>(null);

  useEffect(() => {
    let isMounted = true;

    getGitHubStats(githubRepo).then((stats) => {
      if (isMounted) {
        setGitHubStats(stats);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [githubRepo]);

  const descriptionMeta = githubStats ? (
    <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-base-content/60">
      <span>{githubStats.version}</span>
      <span>{githubStats.publishedAt}</span>
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
