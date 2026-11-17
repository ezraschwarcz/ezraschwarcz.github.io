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
        <header className="site-top">
          <Link href="/" className="mark" aria-label={`${site.name}, home`}>
            <span aria-hidden="true">{site.name.split(" ").map((w) => w[0]).join("")}</span>
          </Link>
        </header>
        <main id="main">{children}</main>
        <footer className="foot mono">
          <Link href="/#work">work</Link>
          <Link href="/#services">services</Link>
          <Link href="/#process">process</Link>
          <a href={`mailto:${site.email}?subject=Project%20inquiry`}>email</a>
          <span>
            © {new Date().getFullYear()} {site.name.toLowerCase()}
          </span>
        </footer>
      </body>
    </html>
  );
}
