import Link from "next/link";
import { getProjects, site } from "@/lib/content";

export default function Home() {
  const projects = getProjects();
  return (
    <>
      <section className="hero wrap">
        <p className="status">
          <span className="status-dot" aria-hidden="true" />
          {site.availability}
        </p>
        <h1>{site.headline}</h1>
        <p className="lede">{site.intro}</p>
        <p className="hero-actions">
          <a className="btn" href={`mailto:${site.email}?subject=Project%20inquiry`}>
            Start a project
          </a>
          <Link className="btn ghost" href="#work">
            See the work
          </Link>
        </p>
        <ul className="stack" aria-label="Tools I build with">
          {site.stack.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </section>

      <section id="work" className="wrap section">
        <div className="section-head">
          <h2>Work</h2>
          <span className="count">{String(projects.length).padStart(2, "0")}</span>
        </div>
        <div className="work">
          {projects.map((p, i) => (
            <Link key={p.slug} href={`/work/${p.slug}`} className={`card${i === 0 ? " wide" : ""}`}>
              <span className="card-shot">
                {p.cover ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.cover} alt={`${p.title} screenshot`} loading={i === 0 ? "eager" : "lazy"} />
                ) : null}
              </span>
              <span className="card-meta">
                <span className="card-title">{p.title}</span>
                <span className="card-kind">
                  {p.kind} · {p.year}
                </span>
              </span>
              <span className="card-summary">{p.summary}</span>
              <span className="tags">
                {p.roles.map((r) => (
                  <span key={r}>{r}</span>
                ))}
              </span>
            </Link>
          ))}
          <a className="card next" href={`mailto:${site.email}?subject=Project%20inquiry`}>
            <span className="next-plus" aria-hidden="true">
              +
            </span>
            <span className="card-title">Your project</span>
            <span className="card-summary">The next case study could be yours. Tell me what you are building.</span>
          </a>
        </div>
      </section>

      <section id="services" className="wrap section">
        <div className="section-head">
          <h2>Services</h2>
          <span className="count">{String(site.services.length).padStart(2, "0")}</span>
        </div>
        <div className="grid3">
          {site.services.map((s, i) => (
            <article key={s.title} className="tile">
              <span className="tile-n">{String(i + 1).padStart(2, "0")}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="process" className="wrap section">
        <div className="section-head">
          <h2>Process</h2>
        </div>
        <ol className="steps">
          {site.process.map((s) => (
            <li key={s.title}>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
        <p className="note">{site.howIWork}</p>
      </section>
    </>
  );
}
