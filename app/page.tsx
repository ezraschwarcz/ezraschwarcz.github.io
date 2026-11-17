import Link from "next/link";
import Stack from "@/components/Stack";
import { getProjects, site } from "@/lib/content";

export default function Home() {
  const projects = getProjects();
  const lead = projects[0];
  return (
    <>
      <section className="letter">
        <p>{site.greeting}</p>
        <h1>{site.intro}</h1>
      </section>

      {lead?.cover ? (
        <Stack
          image={lead.cover}
          alt={`${lead.title} screenshot`}
          layers={site.layers}
          floorLabel={site.floorLabel}
          tools={site.stack}
          caption={site.layersCaption}
        />
      ) : null}

      <section className="letter">
        {site.letter.map((p) => (
          <p key={p}>{p}</p>
        ))}
        <p className="sign">— {site.name}</p>
        <p>
          <a className="btn" href={`mailto:${site.email}?subject=Project%20inquiry`}>
            {site.cta} <span aria-hidden="true">→</span>
          </a>
        </p>
        <div className="ps">
          {site.ps.map((line, i) => (
            <p key={line}>
              <strong>{"P.".repeat(i + 1)}S.</strong> {line}
            </p>
          ))}
        </div>
      </section>

      <section id="work" className="letter block">
        <h2 className="mono">work</h2>
        <ul className="rows">
          {projects.map((p) => (
            <li key={p.slug}>
              <Link href={`/work/${p.slug}`}>
                <span className="row-title">{p.title}</span>
                <span className="row-text">{p.summary}</span>
                <span className="mono row-meta">
                  {p.kind.toLowerCase()} · {p.year} · read the case study →
                </span>
              </Link>
            </li>
          ))}
          <li>
            <a href={`mailto:${site.email}?subject=Project%20inquiry`}>
              <span className="row-title muted">Your project</span>
              <span className="row-text">The next case study could be yours.</span>
            </a>
          </li>
        </ul>
      </section>

      <section id="services" className="letter block">
        <h2 className="mono">services</h2>
        <ul className="rows">
          {site.services.map((s) => (
            <li key={s.title}>
              <div>
                <span className="row-title">{s.title}</span>
                <span className="row-text">{s.text}</span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section id="process" className="letter block">
        <h2 className="mono">process</h2>
        <ol className="rows numbered">
          {site.process.map((s) => (
            <li key={s.title}>
              <div>
                <span className="row-title">{s.title}</span>
                <span className="row-text">{s.text}</span>
              </div>
            </li>
          ))}
        </ol>
        <p className="mono avail">
          <span className="dot" aria-hidden="true" /> {site.availability.toLowerCase()} · {site.location.toLowerCase()}
        </p>
      </section>
    </>
  );
}
