import Link from "next/link";
import Stack from "@/components/Stack";
import { getProjects, inline, site } from "@/lib/content";

export default function Home() {
  const projects = getProjects();
  const lead = projects.find((p) => p.cover);
  const mail = `mailto:${site.email}?subject=Project%20inquiry`;
  return (
    <>
      <section className="letter">
        <p>{site.greeting}</p>
        <h1>{site.intro}</h1>
      </section>

      {lead?.cover ? (
        <Stack
          image={lead.cover}
          alt={`${lead.title}, signed in: a wall of film posters`}
          href={`/work/${lead.slug}`}
          layers={site.layers}
          floorLabel={site.floorLabel}
          floor={site.floor}
          caption={site.layersCaption}
          cta={site.stackCta}
        />
      ) : null}

      <section className="letter after-stack">
        {site.letter.map((p) => (
          <p key={p} dangerouslySetInnerHTML={{ __html: inline(p) }} />
        ))}
        <p className="sign">— {site.name}</p>
        <p>
          <a className="btn" href={mail}>
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
        <ul className="cards">
          {projects.map((p) => (
            <li key={p.slug}>
              <Link href={`/work/${p.slug}`} className="card">
                {p.cover ? (
                  <span className="card-media">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.cover} alt="" loading="lazy" />
                  </span>
                ) : p.facts.length > 0 ? (
                  <span className="card-media figures">
                    {p.facts.slice(0, 3).map((f) => (
                      <span key={f.label}>
                        <b>{f.value}</b>
                        <small>{f.label}</small>
                      </span>
                    ))}
                  </span>
                ) : null}
                <span className="card-body">
                  <span className="mono">
                    {p.kind.toLowerCase()} · {p.year}
                  </span>
                  <span className="card-title">{p.title}</span>
                  <span className="row-text">{p.summary}</span>
                  <span className="card-cta">
                    View the case study <span aria-hidden="true">→</span>
                  </span>
                </span>
              </Link>
            </li>
          ))}
          <li>
            <a href={mail} className="card empty">
              <span className="card-body">
                <span className="card-title">Your project</span>
                <span className="row-text">The next case study could be yours.</span>
                <span className="card-cta">
                  Start a project <span aria-hidden="true">→</span>
                </span>
              </span>
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
