import { OpenSourceCard } from "./OpenSourceCard";
import {
  currentlyReading,
  recentlyFinished,
  type FinishedHardcoverBook,
  type HardcoverBook,
} from "../data/hardcoverBooks";

const HARDCOVER_PROFILE = "https://hardcover.app/@schie";

function bookHref(slug: string) {
  return `https://hardcover.app/books/${slug}`;
}

function ratingTags(rating?: number) {
  return typeof rating === "number" ? [`★ ${rating.toFixed(1)}`] : [];
}

function BookGrid({
  books,
  primaryLabel,
}: {
  books: (HardcoverBook | FinishedHardcoverBook)[];
  primaryLabel: string;
}) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {books.map((book) => (
        <OpenSourceCard
          key={book.slug}
          name={book.title}
          description={book.author}
          href={bookHref(book.slug)}
          imageSrc={book.imageUrl}
          imageAlt={book.title}
          primaryLabel={primaryLabel}
          tags={ratingTags(book.rating)}
        />
      ))}
    </div>
  );
}

export function BooksSection() {
  if (currentlyReading.length === 0 && recentlyFinished.length === 0) {
    return null;
  }

  return (
    <div className="space-y-8">
      {currentlyReading.length > 0 ? (
        <div className="space-y-4">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="text-lg font-semibold" id="currently-reading">
              <a
                className="underline decoration-transparent underline-offset-4 transition hover:decoration-current"
                href="#currently-reading"
              >
                Currently Reading
              </a>
            </h3>
            <a
              className="text-xs uppercase tracking-wide text-base-content/50 underline decoration-transparent underline-offset-4 transition hover:decoration-current"
              href={HARDCOVER_PROFILE}
              target="_blank"
              rel="noreferrer"
            >
              Hardcover
            </a>
          </div>
          <BookGrid books={currentlyReading} primaryLabel="Hardcover" />
        </div>
      ) : null}
      {recentlyFinished.length > 0 ? (
        <div className="space-y-4">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="text-lg font-semibold" id="recently-finished">
              <a
                className="underline decoration-transparent underline-offset-4 transition hover:decoration-current"
                href="#recently-finished"
              >
                Recently Finished
              </a>
            </h3>
          </div>
          <BookGrid books={recentlyFinished} primaryLabel="Hardcover" />
        </div>
      ) : null}
    </div>
  );
}
