import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, getProjects, site } from "@/lib/content";

export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return {
    title: `${p.title}: ${p.kind}`,
    description: p.summary,
    openGraph: { title: p.title, description: p.summary, images: p.cover ? [p.cover] : [] },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();
  const [first, ...rest] = p.gallery;
  return (
    <article className="wrap case">
      <p className="crumb">
        <Link href="/#work">← Work</Link>
      </p>
      <header className="case-head">
        <p className="card-kind">
          {p.kind} · {p.year}
        </p>
        <h1>{p.title}</h1>
        <p className="lede">{p.summary}</p>
        <p className="hero-actions">
          {p.live ? (
            <a className="btn" href={p.live} target="_blank" rel="noopener noreferrer">
              Visit the live site ↗
            </a>
          ) : null}
          <a className="btn ghost" href={`mailto:${site.email}?subject=Project%20inquiry`}>
            Build something like this
          </a>
        </p>
      </header>

      {p.facts.length > 0 ? (
        <dl className="facts">
          {p.facts.map((f) => (
            <div key={f.label}>
              <dd>{f.value}</dd>
              <dt>{f.label}</dt>
            </div>
          ))}
        </dl>
      ) : null}

      {first ? (
        <figure className="shot big">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={first.src} alt={first.caption ?? p.title} />
          {first.caption ? <figcaption>{first.caption}</figcaption> : null}
        </figure>
      ) : null}

      <div className="case-body">
        <aside className="case-side">
          <h2>Role</h2>
          <ul>
            {p.roles.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
          <h2>Stack</h2>
          <ul>
            {p.stack.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </aside>
        <div className="prose" dangerouslySetInnerHTML={{ __html: p.html }} />
      </div>

      {rest.length > 0 ? (
        <div className="shots">
          {rest.map((g) => (
            <figure key={g.src} className="shot">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={g.src} alt={g.caption ?? p.title} loading="lazy" />
              {g.caption ? <figcaption>{g.caption}</figcaption> : null}
            </figure>
          ))}
        </div>
      ) : null}

      {p.phone.length > 0 ? (
        <div className="phones">
          {p.phone.map((src) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={src} src={src} alt={`${p.title} on a phone`} loading="lazy" />
          ))}
        </div>
      ) : null}
    </article>
  );
}
