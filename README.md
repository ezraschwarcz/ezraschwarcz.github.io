# Ezra Schwarcz: portfolio

A small Next.js site. All of the words and projects are in the `content`
folder, so you can update the site without touching code.

## Change the words on the home page

1. On GitHub, open `content/site.json` and click the pencil icon.
2. Change the text between the quotation marks. Keep the quotation marks and commas.
3. Click **Commit changes**. Vercel rebuilds the site in about a minute.

`site.json` holds your name, the letter on the home page (`intro`, `letter`, `ps`), your email, services and process steps.

The moving graphic on the home page is also set there:

- `layers` are the sheets under the screenshot. Each has a `label` and up to four short `chips`.
- `floor` is the field of tool names at the bottom. Write `"Postgres / database"` (name, space, slash, space, a short note) to make one stand out with a blue outline; write just `"React"` for a quiet one.
- `floorLabel` is the big word on the floor, `layersCaption` the line under the screenshot, and `stackCta` the blue button.
- The screenshot itself is the `cover` image of the first project that has one.

In `letter` you can link words like this: `[Tohu Movies](/work/tohu-movies)`.

When you have your own domain, put it in `url` (for example `"https://ezraschwarcz.com"`). Until then leave it as `""` and the site uses its Vercel address.

## Add a project

1. Open `content/projects/_template.md`, click **Raw**, and copy everything.
2. In `content/projects`, click **Add file → Create new file**. Name it like `client-name.md`. The name becomes the page address (`/work/client-name`).
3. Paste, fill it in, and commit.
4. Screenshots: in `public/work`, click **Add file → Upload files** and upload into a folder named after the project. Then list them under `cover` and `gallery` in the project file, as `/work/client-name/01.jpg`.

`order` decides the position on the home page (1 is first). A file whose name starts with `_` is ignored.

Delete any part of the template you do not need. A project with no `cover` shows its first three `facts` on the home page instead of a picture.

### Social media projects

List posts under `posts`. Each one becomes a card that links out to the post itself: a `title`, a `url`, and optionally a `date`, a line of `text` and a few `stats`. See `content/projects/exodus.md` for a working example. The cards only link to the posts; no images or video are copied onto this site.

`liveLabel` changes the words on the main button (for example "See the account on X") and `stackLabel` renames the "Stack" list (for example "Platform").

## Edit a project

Open its file in `content/projects`, click the pencil, change it, commit. The top part (between the `---` lines) is the facts; the part below is the case study, written in Markdown (`##` for a heading, `-` for a bullet).

## If a change breaks the site

Vercel keeps the last working version live and emails you. Open the file's **History** on GitHub and revert the change, or fix the typo (usually a missing quotation mark or comma in `site.json`).

## Replace the Tohu screenshots

The images in `public/work/tohu-movies` were captured from a test copy with sample data and a stand-in profile picture. To use your own, upload files with the same names.

## Change the icon in the browser tab

The "ES" square is three files in the `app` folder: `icon.svg`, `favicon.ico` and `apple-icon.png` (used when someone saves the site to a phone home screen). Replace all three to change it.

## Run it on your own computer (optional)

```
npm install
npm run dev
```

Then open http://localhost:3000.
