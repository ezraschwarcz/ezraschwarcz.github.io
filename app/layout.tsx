import type { Metadata, Viewport } from "next";
import Link from "next/link";
import "@fontsource-variable/inter";
import "./globals.css";
import { getProjects, site, siteUrl } from "@/lib/content";

const cover = getProjects().find((p) => p.cover)?.cover;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: { default: `${site.name} | ${site.role}`, template: `%s | ${site.name}` },
  description: site.intro,
  openGraph: {
    title: `${site.name} | ${site.role}`,
    description: site.intro,
    type: "website",
    images: cover ? [cover] : [],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#f2efe7" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const mail = `mailto:${site.email}?subject=Project%20inquiry`;
  return (
    <html lang="en">
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <header className="site-top">
          <Link href="/" className="mark" aria-label={`${site.name}, home`}>
            <span aria-hidden="true">
              {site.name
                .split(" ")
                .map((w) => w[0])
                .join("")}
            </span>
          </Link>
        </header>
        <main id="main">{children}</main>
        <footer className="foot mono">
          <nav aria-label="Footer">
            <Link href="/#work">work</Link>
            <Link href="/#services">services</Link>
            <Link href="/#process">process</Link>
            <a href={mail}>email</a>
          </nav>
          <p>
            © {new Date().getFullYear()} {site.name.toLowerCase()}
          </p>
        </footer>
      </body>
    </html>
  );
}
