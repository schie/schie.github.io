import { LifeBackground } from "./components/LifeBackground";
import { LifeBoardControls } from "./components/LifeBoardControls";
import { GitHubAppCard } from "./components/GitHubAppCard";
import { NpmPackageCard } from "./components/NpmPackageCard";
import { OpenSourceCard } from "./components/OpenSourceCard";
import { ProfileCard } from "./components/ProfileCard";
import { SectionHeader } from "./components/SectionHeader";
import { LifeBoardProvider } from "./contexts/LifeBoardContext";
import { useTheme } from "./hooks/useTheme";

const APP_VERSION = __APP_VERSION__ || "dev";
const LAST_UPDATED_RAW = __LAST_UPDATED__ || "";
const LAST_UPDATED = LAST_UPDATED_RAW
  ? new Date(LAST_UPDATED_RAW).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  : "dev";

function App() {
  useTheme();
  const commanderDecks: {
    name: string;
    description: string;
    href: string;
    imageSrc?: string;
    imageAlt?: string;
    tags?: string[];
  }[] = [
    {
      name: "Everything, Everywhere, All My Creatures",
      description:
        "Omo flips the tribal switch for the whole board, turning every creature into every creature type while the land engine goes wild and the table gets buried in value.",
      href: "https://moxfield.com/decks/MsS8TKS740m_5BsTy9ZiXw",
      imageSrc: "https://assets.moxfield.net/cards/card-jq3vg-art_crop.webp",
      imageAlt: "Omo, Queen of Vesuva",
      tags: ["Simic", "Tribal", "Landfall", "Value"],
    },
    {
      name: "Extinction Event",
      description:
        "Pure dino stampede: Gishath flips colossal reptiles for free, the herd snowballs fast, and the table gets flattened under prehistoric hoofbeats.",
      href: "https://moxfield.com/decks/UZijnDsBtkaFwADckZ_ZPQ",
      imageSrc: "https://assets.moxfield.net/cards/card-g31av-art_crop.webp",
      imageAlt: "Gishath, Sun's Avatar",
      tags: ["Naya", "Dinosaurs", "Stompy", "Ramp"],
    },
    {
      name: "Stay in the House, Coral!",
      description:
        "Scarab God conducts a dimir zombie jam session, recurring a shambling choir while draining tables dry with aristocrats, altars, and a splash of mill menace.",
      href: "https://moxfield.com/decks/9GqIXuP9MU225taRstIO-A",
      imageSrc: "https://assets.moxfield.net/cards/card-N9nrl-art_crop.webp",
      imageAlt: "The Scarab God",
      tags: ["Dimir", "Zombies", "Aristocrats", "Reanimator"],
    },
  ];

  return (
    <LifeBoardProvider>
      <div
        className="relative h-screen w-full overflow-hidden"
        style={{ background: "var(--app-bg)", color: "var(--text-primary)" }}
      >
        <LifeBackground />
        <LifeBoardControls />
        <main
          className="relative z-10 flex h-full flex-col gap-8 overflow-y-auto scroll-smooth px-6 py-10"
          data-scroll-container
        >
          <ProfileCard />
          <section
            id="resume"
            className="mx-auto w-full max-w-5xl space-y-6 scroll-mt-8"
          >
            <SectionHeader
              id="resume"
              title="Resumé"
              description="Full-stack leadership, compliance-driven systems, and automation."
            />
            <div className="card border border-base-300/60 bg-base-100/70 shadow-2xl backdrop-blur rounded-2xl">
              <div className="card-body gap-6 text-left">
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold">Summary</h3>
                  <p className="text-sm text-base-content/70">
                    Seasoned Full-Stack Developer with over a decade of
                    experience architecting scalable solutions, mentoring teams,
                    and solving complex problems in compliance-driven
                    industries. Expertise in React, TypeScript, GraphQL, Ruby,
                    and CI/CD pipelines. Leads GitHub Actions automation for
                    release workflows, QA builds, and delivery pipelines, plus
                    Ruby-based Fastlane workflows for iOS and Android. Pushes
                    innovation by setting strong foundations through strict
                    standards adherence. Proven ability to lead multi-quarter
                    projects and deliver impactful, maintainable software
                    solutions that empower teams and improve operational
                    efficiency.
                  </p>
                </div>
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold">Experience</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                        <div className="font-semibold">
                          Senior Full-Stack Developer ·{" "}
                          <a
                            className="link link-primary"
                            href="https://www.yellowdogsoftware.com"
                            target="_blank"
                            rel="noreferrer"
                          >
                            Yellow Dog Software
                          </a>
                        </div>
                        <div className="text-xs text-base-content/60">
                          Mar 2017 - Present
                        </div>
                      </div>
                      <ul className="list-disc space-y-1 pl-5 text-sm text-base-content/70">
                        <li>
                          Architected and implemented the Dingo GraphQL API,
                          increasing data efficiency by 30%.
                        </li>
                        <li>
                          Scaled deployment pipelines with GitHub Actions and
                          Sentry, reducing deployment time.
                        </li>
                        <li>
                          Unblocked teammates through guidance, thorough PR
                          reviews, and clear technical specs.
                        </li>
                        <li>
                          Automated iOS and Android build/test/release workflows
                          with Ruby and Fastlane.
                        </li>
                        <li>
                          Led RFID integration in Count XL and built Balto web
                          pages for RFID tag printing.
                        </li>
                        <li>
                          Automated release cycles with release-please across
                          applications and libraries.
                        </li>
                        <li>
                          Maintained 100% code coverage for internal libraries.
                        </li>
                        <li>
                          Go-to developer for git troubleshooting and best
                          practices.
                        </li>
                        <li>
                          Partnered cross-functionally to ship maintainable,
                          scalable solutions.
                        </li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                        <div className="font-semibold">
                          Co-owner ·{" "}
                          <a
                            className="link link-primary"
                            href="https://www.schiehealth.com"
                            target="_blank"
                            rel="noreferrer"
                          >
                            Schie Health
                          </a>
                        </div>
                        <div className="text-xs text-base-content/60">
                          Jul 2019 - Present
                        </div>
                      </div>
                      <ul className="list-disc space-y-1 pl-5 text-sm text-base-content/70">
                        <li>
                          Built a cost-of-service estimator to improve pricing
                          accuracy using insurance data.
                        </li>
                        <li>
                          Developing a documentation audit tool to improve
                          workflows and reduce rejections.
                        </li>
                        <li>
                          Led operational improvements to reduce burnout while
                          maintaining profitability.
                        </li>
                        <li>
                          Manage payroll, accounting, maintenance, and overall
                          business direction.
                        </li>
                        <li>
                          Managed IT infrastructure and ensured HIPAA
                          compliance.
                        </li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                        <div className="font-semibold">
                          Software Developer ·{" "}
                          <a
                            className="link link-primary"
                            href="https://www.atni.com"
                            target="_blank"
                            rel="noreferrer"
                          >
                            ATN International
                          </a>
                        </div>
                        <div className="text-xs text-base-content/60">
                          May 2015 - Mar 2017
                        </div>
                      </div>
                      <ul className="list-disc space-y-1 pl-5 text-sm text-base-content/70">
                        <li>
                          Built customer-facing applications in Ruby on Rails.
                        </li>
                        <li>
                          Migrated reporting systems to Apache Hadoop to cut
                          processing time.
                        </li>
                        <li>
                          Improved deployment efficiency with CI automation.
                        </li>
                        <li>Ensured PCI compliance in payment systems.</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold">Active Skills</h3>
                  <div className="flex flex-wrap gap-2 text-sm">
                    {[
                      "API Design",
                      "Android",
                      "App Store Deployment",
                      "AWS Amplify",
                      "AWS Lambda",
                      "AWS S3",
                      "AWS SAM",
                      "AWS Secrets Manager",
                      "AWS Textract",
                      "CI/CD Pipelines",
                      "DaisyUI",
                      "Docker",
                      "Fastlane",
                      "Git",
                      "GitHub Actions",
                      "GitHub Copilot",
                      "GitHub Pages",
                      "Google Play Deployment",
                      "GraphQL",
                      "iOS",
                      "Leadership",
                      "Mentorship",
                      "NPM Libraries",
                      "OpenAI Codex",
                      "Product Discovery",
                      "Project Planning",
                      "React",
                      "React Native",
                      "Release Please",
                      "Requirements Gathering",
                      "Roadmapping",
                      "Ruby",
                      "Sentry",
                      "Specification Writing",
                      "SQL (MySQL, SQLite, MSSQL)",
                      "Stakeholder Communication",
                      "Tailwind CSS",
                      "Team Leadership",
                      "Technical Writing",
                      "Terraform (Familiarity)",
                      "TypeScript",
                      "Vector Databases (Milvus)",
                      "Vite",
                      "ZPL",
                    ].map((skill) => (
                      <span key={skill} className="badge badge-outline">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Education</h3>
                  <div className="text-sm text-base-content/70">
                    Armstrong State University · B.S. Computer Science (2010 -
                    2014)
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section
            id="public-work"
            className="mx-auto w-full max-w-5xl space-y-6 scroll-mt-8"
          >
            <SectionHeader
              id="public-work"
              title="Public Professional Work"
              description="Select applications I've worked on professionally that can be shared."
            />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <OpenSourceCard
                name="YD Mobile"
                description="Mobile inventory tools for item review, quick scans, price changes, transfers, count sheets, and invoice scanning."
                href="https://apps.apple.com/us/app/yd-mobile/id1382999286"
                primaryLabel="iOS"
                links={[
                  {
                    label: "Android",
                    href: "https://play.google.com/store/apps/details?id=com.yellowdogsoftware.ydmobile",
                  },
                ]}
                tags={[
                  "Inventory",
                  "Count Sheets",
                  "Transfers",
                  "Invoice Scanning",
                ]}
              />
              <OpenSourceCard
                name="Count XL"
                description="Hardened Android app for high-volume barcode counting and RFID scanning, built for offline inventory workflows and fast sync."
                href="https://play.google.com/store/apps/details?id=com.yellowdogsoftware.countxl&hl=en_US&pli=1"
                primaryLabel="Android"
                tags={["Barcode", "RFID", "Offline", "Inventory"]}
              />
              <OpenSourceCard
                name="Stand Dog"
                description="Event stand inventory workflow covering count-in/out, restocks, transfers, waste/comp tracking, and reconciliation."
                href="https://apps.apple.com/pw/app/stand-dog/id1508330911"
                primaryLabel="iOS"
                links={[
                  {
                    label: "Android",
                    href: "https://play.google.com/store/apps/details?id=com.yellowdogsoftware.standsheet&hl=en_US",
                  },
                ]}
                tags={[
                  "Count In/Out",
                  "Restock",
                  "Transfers",
                  "Reconciliation",
                ]}
              />
            </div>
          </section>
          <section
            id="open-source"
            className="mx-auto w-full max-w-5xl space-y-6 pb-10 scroll-mt-8"
          >
            <SectionHeader
              id="open-source"
              title="Open Source"
              description="Projects I maintain or help maintain."
            />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <NpmPackageCard
                name="react-native-device-info"
                description="React Native device information library used across mobile apps."
                href="https://github.com/react-native-device-info/react-native-device-info"
                npmPackage="react-native-device-info"
                links={[
                  {
                    label: "Docs",
                    href: "https://react-native-device-info.github.io/react-native-device-info",
                  },
                  {
                    label: "npm",
                    href: "https://www.npmjs.com/package/react-native-device-info",
                  },
                ]}
                tags={["React Native", "Mobile", "Library"]}
              />
              <NpmPackageCard
                name="@schie/fluent-zpl"
                description="Fluent API for generating Zebra Programming Language labels."
                href="https://github.com/schie/fluent-zpl"
                npmPackage="@schie/fluent-zpl"
                links={[
                  { label: "Docs", href: "https://fluent-zpl.schie.io" },
                  {
                    label: "npm",
                    href: "https://www.npmjs.com/package/@schie/fluent-zpl",
                  },
                ]}
                tags={["ZPL", "Printing", "TypeScript"]}
              />
              <NpmPackageCard
                name="@schie/epc"
                description="Type-safe EPC encoding and parsing for UHF RFID tag identifiers."
                href="https://github.com/schie/epc"
                npmPackage="@schie/epc"
                links={[
                  { label: "Docs", href: "https://epc.schie.io" },
                  {
                    label: "npm",
                    href: "https://www.npmjs.com/package/@schie/epc",
                  },
                ]}
                tags={["RFID", "EPC", "TypeScript"]}
              />
              <NpmPackageCard
                name="@schie/queue"
                description="Lightweight queue utilities for managing async workflows."
                href="https://github.com/schie/queue"
                npmPackage="@schie/queue"
                links={[
                  { label: "Docs", href: "https://queue.schie.io/" },
                  {
                    label: "npm",
                    href: "https://www.npmjs.com/package/@schie/queue",
                  },
                ]}
                tags={["Utilities", "Async"]}
              />
              <GitHubAppCard
                name="medical-out-of-pocket"
                description="Explore and understand the real costs of medical procedures."
                href="https://github.com/schie/medical-out-of-pocket"
                githubRepo="schie/medical-out-of-pocket"
                links={[
                  {
                    label: "Site",
                    href: "https://dustin.schie.io/medical-out-of-pocket/",
                  },
                ]}
                tags={["Health", "Data Viz"]}
              />
              <GitHubAppCard
                name="random-barcode"
                description="Generate randomized barcode assets for demos and prototypes."
                href="https://github.com/schie/random-barcode"
                githubRepo="schie/random-barcode"
                links={[
                  {
                    label: "Site",
                    href: "https://dustin.schie.io/random-barcode/",
                  },
                ]}
                tags={["Generators", "Assets"]}
              />
              <GitHubAppCard
                name="game-of-life"
                description="Interactive Conway’s Game of Life experiments."
                href="https://github.com/schie/game-of-life"
                githubRepo="schie/game-of-life"
                tags={["WebGL", "Experiments"]}
                links={[
                  {
                    label: "Site",
                    href: "https://dustin.schie.io/game-of-life/",
                  },
                ]}
              />
            </div>
          </section>
          <section
            id="other-things"
            className="mx-auto w-full max-w-5xl space-y-6 scroll-mt-8"
          >
            <SectionHeader
              id="other-things"
              title="Other Things"
              description="Side interests and hobby projects worth sharing."
            />
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
                  />
                ))}
              </div>
            </div>
          </section>
          <footer className="mt-auto space-y-1 pb-6 text-center text-xs text-base-content/60">
            <p>
              <a
                className="underline decoration-transparent underline-offset-4 transition hover:decoration-current"
                href="https://github.com/schie/schie.github.io"
              >
                Built with React, TypeScript, Vite, Tailwind, DaisyUI, d3, and
                Web Workers.
              </a>
            </p>
            <p>
              Version {APP_VERSION}
              <span className="mx-2 text-base-content/40">•</span>
              Last updated {LAST_UPDATED}
            </p>
          </footer>
        </main>
      </div>
    </LifeBoardProvider>
  );
}

export default App;
