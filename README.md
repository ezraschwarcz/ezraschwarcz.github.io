# Ezra Schwarcz: portfolio

A small Next.js site. All of the words and projects are in the `content`
folder, so you can update the site without touching code.

## Change the words on the home page

1. On GitHub, open `content/site.json` and click the pencil icon.
2. Change the text between the quotation marks. Keep the quotation marks and commas.
3. Click **Commit changes**. Vercel rebuilds the site in about a minute.

`site.json` holds your name, headline, intro, email, services, process steps and the list of tools.

## Add a project

1. Open `content/projects/_template.md`, click **Raw**, and copy everything.
2. In `content/projects`, click **Add file → Create new file**. Name it like `client-name.md`. The name becomes the page address (`/work/client-name`).
3. Paste, fill it in, and commit.
4. Screenshots: in `public/work`, click **Add file → Upload files** and upload into a folder named after the project. Then list them under `cover` and `gallery` in the project file, as `/work/client-name/01.jpg`.

`order` decides the position on the home page (1 is first). A file whose name starts with `_` is ignored.

## Edit a project

Open its file in `content/projects`, click the pencil, change it, commit. The top part (between the `---` lines) is the facts; the part below is the case study, written in Markdown (`##` for a heading, `-` for a bullet).

## If a change breaks the site

Vercel keeps the last working version live and emails you. Open the file's **History** on GitHub and revert the change, or fix the typo (usually a missing quotation mark or comma in `site.json`).

## Replace the Tohu screenshots

The images in `public/work/tohu-movies` were captured from a test copy with sample data. To use your own, upload files with the same names.

## Run it on your own computer (optional)

```
npm install
npm run dev
```

Then open http://localhost:3000.
