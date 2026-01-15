import { LifeBackground } from "./components/LifeBackground";
import { LifeBoardControls } from "./components/LifeBoardControls";
import { GitHubAppCard } from "./components/GitHubAppCard";
import { NpmPackageCard } from "./components/NpmPackageCard";
import { OpenSourceCard } from "./components/OpenSourceCard";
import { ProfileCard } from "./components/ProfileCard";
import { SectionHeader } from "./components/SectionHeader";
import { ResumeSection } from "./components/ResumeSection";
import { MobileFooter } from "./components/MobileFooter";
import { CommanderDecksSection } from "./components/CommanderDecksSection";
import {
  LifeBoardProvider,
  useLifeBoardControls,
} from "./contexts/LifeBoardContext";
import { useTheme } from "./hooks/useTheme";
import { useEffect, useRef, useState } from "react";

const APP_VERSION = __APP_VERSION__ || "dev";
const LAST_UPDATED_RAW = __LAST_UPDATED__ || "";
const LAST_UPDATED = LAST_UPDATED_RAW
  ? new Date(LAST_UPDATED_RAW).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  : "dev";

function AppShell() {
  useTheme();
  const mainRef = useRef<HTMLElement | null>(null);
  const profileRef = useRef<HTMLDivElement | null>(null);
  const [showMobileFooter, setShowMobileFooter] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { isForegroundVisible } = useLifeBoardControls();

  useEffect(() => {
    const profileElement = profileRef.current;
    if (!profileElement || !isMobile) {
      setShowMobileFooter(false);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowMobileFooter(!entry.isIntersecting);
      },
      { root: mainRef.current, threshold: 0.25 }
    );

    observer.observe(profileElement);
    return () => {
      observer.disconnect();
    };
  }, [isMobile]);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return (
    <div
      className="relative h-screen w-full overflow-hidden"
      style={{ background: "var(--app-bg)", color: "var(--text-primary)" }}
    >
      <LifeBackground />
      <LifeBoardControls isMobileFooterVisible={showMobileFooter} />
      <main
        ref={mainRef}
        className={`relative z-10 flex h-full flex-col gap-8 overflow-y-auto scroll-smooth px-6 py-10 transition-opacity duration-300 ${
          isForegroundVisible
            ? "opacity-100"
            : "pointer-events-none select-none opacity-0"
        }`}
        data-scroll-container
        aria-hidden={!isForegroundVisible}
      >
        <div ref={profileRef}>
          <ProfileCard />
        </div>
        <ResumeSection />
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
              tags={["Count In/Out", "Restock", "Transfers", "Reconciliation"]}
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
            description="Projects I maintain"
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
          <div className="h-8" aria-hidden="true" />
          <CommanderDecksSection />
        </section>
        <div className="h-64" aria-hidden="true" />
        <div className="h-64" aria-hidden="true" />
        <div className="h-64" aria-hidden="true" />
        <footer className="mt-auto space-y-1 pb-6 text-center text-xs text-base-content/60">
          <p>
            <a
              className="underline decoration-transparent underline-offset-4 transition hover:decoration-current"
              href="https://github.com/schie/schie.github.io"
            >
              Built with React, TypeScript, Vite, Tailwind, DaisyUI, d3, and Web
              Workers.
            </a>
          </p>
          <p>
            Version {APP_VERSION}
            <span className="mx-2 text-base-content/40">•</span>
            Last updated {LAST_UPDATED}
          </p>
          <p>
            Made with ❤️ by{" "}
            <a
              href="https://github.com/schie"
              className="underline decoration-transparent underline-offset-4 transition hover:decoration-current"
            >
              @schie
            </a>
          </p>
        </footer>
        <div className="h-64" aria-hidden="true" />
      </main>
      <MobileFooter isVisible={showMobileFooter && isForegroundVisible} />
    </div>
  );
}

function App() {
  return (
    <LifeBoardProvider>
      <AppShell />
    </LifeBoardProvider>
  );
}

export default App;
