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
  const others = getProjects().filter((o) => o.slug !== p.slug);
  return (
    <article className="case">
      <p className="crumb mono">
        <Link href="/#work">← work</Link>
      </p>
      <header className="case-head">
        <p className="mono">
          {p.kind.toLowerCase()} · {p.year}
        </p>
        <h1>{p.title}</h1>
        <p className="lede">{p.summary}</p>
        <p className="hero-actions">
          {p.live ? (
            <a className="btn" href={p.live} target="_blank" rel="noopener noreferrer">
              {p.liveLabel} ↗
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
          <h2>{p.stackLabel}</h2>
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

      {p.posts.length > 0 ? (
        <section className="posts" aria-labelledby="posts-title">
          <h2 id="posts-title">{p.postsTitle}</h2>
          <ul>
            {p.posts.map((post) => (
              <li key={post.url}>
                <a href={post.url} target="_blank" rel="noopener noreferrer">
                  {post.date ? <span className="mono">{post.date}</span> : null}
                  <span className="post-title">{post.title}</span>
                  {post.text ? <span className="row-text">{post.text}</span> : null}
                  {post.stats.length > 0 ? (
                    <span className="post-stats">
                      {post.stats.map((s) => (
                        <span key={s}>{s}</span>
                      ))}
                    </span>
                  ) : null}
                  <span className="post-open">Open the post ↗</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {p.phone.length > 0 ? (
        <div className="phones">
          {p.phone.map((src) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={src} src={src} alt={`${p.title} on a phone`} loading="lazy" />
          ))}
        </div>
      ) : null}

      {others.length > 0 ? (
        <nav className="more" aria-label="More work">
          <h2 className="mono">more work</h2>
          <ul className="rows">
            {others.map((o) => (
              <li key={o.slug}>
                <Link href={`/work/${o.slug}`}>
                  <span className="row-title">{o.title} →</span>
                  <span className="row-text">{o.summary}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </article>
  );
}
