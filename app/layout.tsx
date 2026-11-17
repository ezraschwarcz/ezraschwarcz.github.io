import type { Metadata } from "next";
import Link from "next/link";
import "@fontsource-variable/inter";
import "./globals.css";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | ${site.role}`, template: `%s | ${site.name}` },
  description: site.intro,
  openGraph: { title: `${site.name} | ${site.role}`, description: site.intro, type: "website" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <header className="nav">
          <Link href="/" className="nav-name">
            <span className="nav-dot" aria-hidden="true" />
            {site.name}
          </Link>
          <nav aria-label="Main">
            <Link href="/#work">Work</Link>
            <Link href="/#services">Services</Link>
            <Link href="/#process">Process</Link>
            <a className="nav-cta" href={`mailto:${site.email}`}>
              Start a project
            </a>
          </nav>
        </header>
        <main id="main">{children}</main>
        <footer className="foot">
          <p className="foot-big">
            Have something to build?{" "}
            <a href={`mailto:${site.email}?subject=Project%20inquiry`}>{site.email}</a>
          </p>
          <p className="foot-small">
            © {new Date().getFullYear()} {site.name} · {site.location}
          </p>
        </footer>
      </body>
    </html>
  );
}
