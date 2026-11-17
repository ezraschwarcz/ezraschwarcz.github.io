---
title: Tohu Movies
order: 1
year: "2026"
kind: Streaming platform
summary: A free, ad-supported streaming service for independent film, with accounts, a social layer, an admin control room and phone apps.
live: https://www.tohumovies.com
cover: /work/tohu-movies/00-wall.jpg
roles: [Product design, Web app, Mobile app, Database, Email, SEO]
stack: [Next.js 16, React 19, TypeScript, Supabase, Postgres, Mux, Resend, Vercel, Expo]
facts:
  - label: Films streaming
    value: "55"
  - label: Platforms
    value: Web, iOS, Android
  - label: Pages generated for search
    value: "360+"
  - label: Sign-in methods
    value: "4"
gallery:
  - src: /work/tohu-movies/00-wall.jpg
    caption: The library, signed in. Cover art does the selling.
  - src: /work/tohu-movies/01-collection.jpg
    caption: Collections and genre pages, generated from the catalog.
  - src: /work/tohu-movies/02-control-room.jpg
    caption: The control room. Sample data shown.
  - src: /work/tohu-movies/03-profile.jpg
    caption: Member profile with viewing history and ratings. Sample data shown.
  - src: /work/tohu-movies/05-admin-films.jpg
    caption: Film management, with a live check of what search engines will read.
  - src: /work/tohu-movies/04-browse.jpg
    caption: Browse.
  - src: /work/tohu-movies/06-sign-in.jpg
    caption: One sign-in screen for new and returning members.
phone:
  - /work/tohu-movies/m1-browse.jpg
  - /work/tohu-movies/m2-profile.jpg
  - /work/tohu-movies/m3-collection.jpg
---

## The brief

Tohu Movies had a catalog of licensed independent films and a basic site that played them. The goal: make it look and behave like a product from a company a hundred times the size, and make it something the owner can run without a developer.

## What I built

### A streaming experience that feels premium

- A redesigned home page with a rotating feature banner, ranked rows and official cover art.
- A custom video player: skip controls, keyboard shortcuts, scrub previews, resume where you left off, AirPlay, and adaptive quality tuned for high-resolution screens.
- Browse pages by genre, hand-picked collections, and a page for every actor and director, all generated from the catalog.

### Accounts without friction

- One sign-in screen for new and returning members: email code, Google, passkey or password.
- Email links that work in any browser, plus a six-digit code, which fixed the most common sign-up failure.
- Profiles with photo cropping on any device, viewing history, ratings that follow the member across devices, and a public member page.

### A social layer with guardrails

- Comments and replies with moderation, reporting and member blocking.
- Three access levels (member, admin, super admin) enforced inside the database, with a tamper-proof log of every admin action.

### A control room the owner actually uses

- Add, edit, hide and delete films; upload cover art; see a live preview of the Google result.
- Moderate comments, manage members, choose the weekly featured film, preview and test every email.
- Viewing and sign-up funnels, most-watched films, and where new members came from.

### Email that runs itself

- Branded sign-in emails, a welcome email, a weekly pick, new-film alerts and reply notices.
- A daily scheduled job that never sends the same email twice and stays inside the sending allowance.

### Built to be found

- Structured data for every film, person and list; a generated sitemap; share cards drawn per film in the brand typeface.
- A plain-text site guide for AI assistants.

### Phone apps from the same backend

- An iPhone and Android app in one codebase, sharing accounts, watchlists and progress with the website. In pre-release.

### Checked on every change

- 71 automated browser tests click through the site on desktop and phone before any change can go live: public pages, member pages, and every tab of the control room, including accessibility checks.
- Security scans on every change: for passwords or keys saved by mistake, packages with known problems, and common coding mistakes.
- The live site is re-checked every week for speed, search basics, accessibility and broken links.
- All of it uses open-source tools and costs nothing to run.

## How it is put together

- **Front end:** Next.js on Vercel, server-rendered with cached pages that refresh every minute.
- **Data:** Postgres on Supabase. Every sensitive action is a database function that checks who is calling, so the rules hold no matter which app is talking to it.
- **Video:** Mux for adaptive streaming and watch-time data.
- **Email:** Resend, with a daily job on Vercel's scheduler.
- **Delivery:** every change ships as a pull request with a live preview, and has to pass the tests and scans before it reaches the public site.

## Result

A site that plays films became a product: searchable, social, measurable, tested on every change, and run day to day by its owner from a single screen.
