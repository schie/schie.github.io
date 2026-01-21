import { SectionHeader } from "./SectionHeader";

const SKILLS = [
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
];

export function ResumeSection() {
  return (
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
              Seasoned Full-Stack Developer with over a decade of experience
              architecting scalable solutions, mentoring teams, and solving
              complex problems in compliance-driven industries. Expertise in
              React, TypeScript, GraphQL, and CI/CD pipelines. Leads GitHub
              Actions automation for release workflows, QA builds, and delivery
              pipelines, plus Ruby-based Fastlane workflows for iOS and Android.
              Pushes innovation by setting strong foundations through strict
              standards adherence. Proven ability to lead multi-quarter projects
              and deliver impactful, maintainable software solutions that
              empower teams and improve operational efficiency.
            </p>
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Experience</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <div className="font-semibold">
                    Senior Developer ·{" "}
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
                    Jul 2022 - Present
                  </div>
                </div>
                <ul className="list-disc space-y-1 pl-5 text-sm text-base-content/70">
                  <li>
                    Leads React/Vite architecture patterns and component
                    conventions to keep the frontend maintainable at scale.
                  </li>
                  <li>
                    Leads GraphQL schema design and versioning strategy in
                    Apollo Server to keep clients stable.
                  </li>
                  <li>
                    Improves API performance with caching, batching, and
                    resolver optimization.
                  </li>
                  <li>
                    Owns React Native release workflows with Fastlane, reducing
                    build friction and release risk.
                  </li>
                  <li>
                    Owns mobile release compliance (signing, provisioning, store
                    metadata, phased rollouts).
                  </li>
                  <li>
                    Improves React + Amplify deployment workflows by
                    collaborating with DevOps on CI/CD guardrails and previews.
                  </li>
                  <li>
                    Contributes to Dockerization, ECS deployments, and
                    Terraform changes in partnership with DevOps.
                  </li>
                  <li>
                    Improves production visibility by adding Sentry across web,
                    mobile, and API projects (3 React Native apps, 3 React apps,
                    3 RESTful APIs, 1 GraphQL API, 1 AWS SAM application),
                    cutting customer-reported error resolution time by up to
                    200%.
                  </li>
                  <li>
                    Improves test rigor by maintaining 100% code coverage
                    across five internal libraries.
                  </li>
                  <li>
                    Improves developer experience with local tooling, scripts,
                    and docs to shorten onboarding.
                  </li>
                </ul>
              </div>
              <div className="space-y-2">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <div className="font-semibold">
                    Developer ·{" "}
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
                    Mar 2017 - Jul 2022
                  </div>
                </div>
                <ul className="list-disc space-y-1 pl-5 text-sm text-base-content/70">
                  <li>
                    Led the proof-of-concept that replaced a scrapped mobile
                    effort and became the company's first shipped mobile app.
                  </li>
                  <li>
                    Expanded the product footprint from one core app and a
                    single web API to 3 mobile apps (iOS and Android), 3+ web
                    apps, and multiple web APIs through direct contributions.
                  </li>
                  <li>
                    Improves data efficiency by architecting and implementing
                    the Dingo GraphQL API, boosting it by 60%.
                  </li>
                  <li>
                    Owns iOS and Android build/test/release automation with Ruby
                    and Fastlane.
                  </li>
                  <li>
                    Leads git troubleshooting and best-practice guidance for the
                    team.
                  </li>
                  <li>
                    Leads cross-functional collaboration to ship maintainable,
                    scalable solutions.
                  </li>
                  <li>
                    Earned promotion to Senior Developer in Jul 2022.
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
                    Developing a documentation audit tool to improve workflows
                    and reduce rejections.
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
                    Managed IT infrastructure and ensured HIPAA compliance.
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
                  <li>Built customer-facing applications in Ruby on Rails.</li>
                  <li>
                    Migrated reporting systems to Apache Hadoop to cut
                    processing time.
                  </li>
                  <li>Improved deployment efficiency with CI automation.</li>
                  <li>Ensured PCI compliance in payment systems.</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Active Skills</h3>
            <div className="flex flex-wrap gap-2 text-sm">
              {SKILLS.map((skill) => (
                <span key={skill} className="badge badge-outline">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Education</h3>
            <div className="text-sm text-base-content/70">
              Armstrong State University · B.S. Computer Science (2010 - 2014)
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
