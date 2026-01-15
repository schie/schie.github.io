import profilePic from "../assets/profile.jpeg";

export function ProfileCard() {
  return (
    <section className="mx-auto w-full max-w-md">
      <div className="card border border-base-300/60 bg-base-100/70 shadow-2xl backdrop-blur rounded-2xl">
        <div className="card-body items-center gap-3 px-6 py-5 text-center">
          <div className="avatar">
            <div className="w-28 rounded-full ring-4 ring-primary ring-offset-4 ring-offset-base-100 shadow-primary shadow-lg">
              <img src={profilePic} alt="Portrait of Dustin Schie" />
            </div>
          </div>
          <div className="space-y-1">
            <h1 className="text-3xl font-semibold">Dustin Schie</h1>
          </div>
          <div className="card-actions flex-wrap justify-center">
            <a
              className="btn btn-soft gap-2 rounded-2xl"
              href="https://github.com/schie"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fa-brands fa-github text-xl" aria-hidden="true" />
              @schie
            </a>
            <a
              className="btn btn-soft gap-2 rounded-2xl btn-accent"
              href="https://www.linkedin.com/in/dustin-schie-9431945b"
              target="_blank"
              rel="noreferrer"
            >
              <i
                className="fa-brands fa-linkedin-in text-xl"
                aria-hidden="true"
              />
              LinkedIn
            </a>
            <a
              className="btn btn-soft btn-info gap-2 rounded-2xl"
              href="https://bsky.app/profile/schie.io"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fa-brands fa-bluesky text-xl" aria-hidden="true" />
              @schie.io
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
