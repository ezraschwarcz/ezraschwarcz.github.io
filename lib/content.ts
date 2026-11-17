import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import site from "@/content/site.json";

/** All of the site's words and projects live in the `content` folder:
 *  `site.json` for the home page, and one Markdown file per project in
 *  `content/projects`. Edit those; nothing in the code needs to change. */

export { site };

export type Project = {
  slug: string;
  title: string;
  order: number;
  year: string;
  kind: string;
  summary: string;
  live?: string;
  cover?: string;
  roles: string[];
  stack: string[];
  facts: { label: string; value: string }[];
  gallery: { src: string; caption?: string }[];
  phone: string[];
  html: string;
};

const DIR = path.join(process.cwd(), "content/projects");

export function getProjects(): Project[] {
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".md") && !f.startsWith("_"))
    .map((file) => {
      const { data, content } = matter(fs.readFileSync(path.join(DIR, file), "utf8"));
      return {
        slug: file.replace(/\.md$/, ""),
        title: String(data.title ?? file),
        order: Number(data.order ?? 99),
        year: String(data.year ?? ""),
        kind: String(data.kind ?? ""),
        summary: String(data.summary ?? ""),
        live: data.live ? String(data.live) : undefined,
        cover: data.cover ? String(data.cover) : undefined,
        roles: Array.isArray(data.roles) ? data.roles.map(String) : [],
        stack: Array.isArray(data.stack) ? data.stack.map(String) : [],
        facts: Array.isArray(data.facts) ? data.facts : [],
        gallery: Array.isArray(data.gallery) ? data.gallery : [],
        phone: Array.isArray(data.phone) ? data.phone.map(String) : [],
        html: marked.parse(content, { async: false }) as string,
      };
    })
    .sort((a, b) => a.order - b.order);
}

export function getProject(slug: string): Project | null {
  return getProjects().find((p) => p.slug === slug) ?? null;
}
