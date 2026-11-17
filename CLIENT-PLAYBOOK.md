# How to structure a client project

A checklist for setting up GitHub, Vercel, a database and the other services for each client, so the client owns everything and you can hand over or walk away cleanly.

## The one rule

**The client owns every account. You are invited in.** The domain, GitHub organization, Vercel team, database, payment and email accounts are created with the client's email and the client's card. If the relationship ends, they remove you and nothing breaks. It also keeps their bills and their legal liability off your accounts.

## Per client

| Thing | Set-up | Why |
| --- | --- | --- |
| Domain | Client's registrar account | Whoever holds the domain holds the business |
| GitHub | A GitHub organization per client; you are a member | Clean transfer; their code is never in your personal account |
| Repos | One repo per product. Web and mobile can share one repo in folders (`web/`, `mobile/`) when they share a backend | One place for issues and history |
| Vercel | A Vercel team per client, connected to their GitHub organization | Separate billing, logs and environment variables |
| Database | A separate Supabase organization and project per client | No client's data ever sits beside another's |
| Email, video, payments | Client's own Resend, Mux, Stripe accounts | Their sender reputation, their payouts |
| Passwords and keys | A shared vault in a password manager (1Password, Bitwarden) | Never in chat, email or the repo |

## Environments

- **Production:** the live site, on the `main` branch.
- **Preview:** every pull request gets its own Vercel preview link. The client approves there before anything goes live.
- **Staging database:** once real customers or money are involved, add a second database project for testing, and point preview builds at it. Before that, one database is fine.

## Working rules

- Nothing goes straight to `main`. Every change is a pull request with a preview.
- Database changes are numbered script files kept in the repo (`supabase/migrations`), run in order, and safe to run twice.
- Access rules live in the database (row-level security and checked functions), not only in the screens.
- Secrets live in Vercel environment variables, marked Sensitive. Only values that are meant to be public get a `NEXT_PUBLIC_` name.
- Turn on two-step sign-in on GitHub, Vercel and the database for you and the client.
- Turn on database backups before launch, and try one restore.

## What the client gets at handover

- A README: what each service does, where to sign in, how to put a change live.
- An admin screen for day-to-day work, so they do not need you for content.
- A list of monthly costs by service.
- A written note of anything unfinished or untested.

## Money

- Vercel's free Hobby plan is for personal, non-commercial sites. A client's business site belongs on a paid plan (Pro), on their card. Check Vercel's current terms and price before quoting.
- Start each service on its free tier and write down the trigger for upgrading (emails a day, video minutes, database size), so the first bill is never a surprise.
- Bill your time separately from their running costs; never resell hosting unless you want to be on call for it.

## Naming

Keep names predictable across services: organization `clientname`, repo `clientname-web`, Vercel project `clientname-web`, database project `clientname-prod` (and `clientname-staging`).
