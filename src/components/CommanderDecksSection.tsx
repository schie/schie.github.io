import { OpenSourceCard } from "./OpenSourceCard";

const commanderDecks: {
  name: string;
  description: string;
  href: string;
  imageSrc?: string;
  imageAlt?: string;
  tags?: string[];
  colors?: { label: string; iconClassName: string; colorVar: string }[];
}[] = [
  {
    name: "Everything, Everywhere, All My Creatures",
    description:
      "Omo flips the tribal switch for the whole board, turning every creature into every creature type while the land engine goes wild and the table gets buried in value.",
    href: "https://moxfield.com/decks/MsS8TKS740m_5BsTy9ZiXw",
    imageSrc: "https://assets.moxfield.net/cards/card-jq3vg-art_crop.webp",
    imageAlt: "Omo, Queen of Vesuva",
    tags: ["Tribal", "Landfall", "Value"],
    colors: [
      {
        label: "Blue",
        iconClassName: "fa-solid fa-droplet",
        colorVar: "--mana-blue",
      },
      {
        label: "Green",
        iconClassName: "fa-solid fa-tree",
        colorVar: "--mana-green",
      },
    ],
  },
  {
    name: "Extinction Event",
    description:
      "Pure dino stampede: Gishath flips colossal reptiles for free, the herd snowballs fast, and the table gets flattened under prehistoric hoofbeats.",
    href: "https://moxfield.com/decks/UZijnDsBtkaFwADckZ_ZPQ",
    imageSrc: "https://assets.moxfield.net/cards/card-g31av-art_crop.webp",
    imageAlt: "Gishath, Sun's Avatar",
    tags: ["Dinosaurs", "Stompy", "Ramp"],
    colors: [
      {
        label: "Red",
        iconClassName: "fa-solid fa-fire",
        colorVar: "--mana-red",
      },
      {
        label: "White",
        iconClassName: "fa-solid fa-sun",
        colorVar: "--mana-white",
      },
      {
        label: "Green",
        iconClassName: "fa-solid fa-tree",
        colorVar: "--mana-green",
      },
    ],
  },
  {
    name: "Stay in the House, Coral!",
    description:
      "Scarab God conducts a dimir zombie jam session, recurring a shambling choir while draining tables dry with aristocrats, altars, and a splash of mill menace.",
    href: "https://moxfield.com/decks/9GqIXuP9MU225taRstIO-A",
    imageSrc: "https://assets.moxfield.net/cards/card-N9nrl-art_crop.webp",
    imageAlt: "The Scarab God",
    tags: ["Zombies", "Aristocrats", "Reanimator"],
    colors: [
      {
        label: "Blue",
        iconClassName: "fa-solid fa-droplet",
        colorVar: "--mana-blue",
      },
      {
        label: "Black",
        iconClassName: "fa-solid fa-skull",
        colorVar: "--mana-black",
      },
    ],
  },
];

export function CommanderDecksSection() {
  return (
    <div className="space-y-4">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-lg font-semibold" id="commander-decks">
          <a
            className="underline decoration-transparent underline-offset-4 transition hover:decoration-current"
            href="#commander-decks"
          >
            Commander Decks
          </a>
        </h3>
        <span className="text-xs uppercase tracking-wide text-base-content/50">
          Magic: The Gathering
        </span>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {commanderDecks.map((deck) => (
          <OpenSourceCard
            key={deck.name}
            name={deck.name}
            description={deck.description}
            href={deck.href}
            imageSrc={deck.imageSrc}
            imageAlt={deck.imageAlt}
            primaryLabel="Decklist"
            tags={deck.tags}
            descriptionMeta={
              deck.colors && deck.colors.length > 0 ? (
                <div className="flex items-center gap-2 text-xs text-base-content/60">
                  <span className="sr-only">
                    Colors: {deck.colors.map((color) => color.label).join(", ")}
                  </span>
                  {deck.colors.map((color) => (
                    <i
                      key={`${deck.name}-${color.label}`}
                      className={color.iconClassName}
                      style={{ color: `var(${color.colorVar})` }}
                      aria-hidden="true"
                    />
                  ))}
                </div>
              ) : null
            }
          />
        ))}
      </div>
    </div>
  );
}
