# Portfolio TUI

A terminal-UI style interactive portfolio for **Touha Zohair**. Visitors explore profile, experience, projects, and posts through a prompt-driven interface — typing slash-commands like `/projects` or `/about`, or chatting directly with an AI assistant grounded in the site's content.

Built with Next.js 16 (App Router) and React 19.

## Features

- **Terminal prompt UI** — command parsing with slash-prefix autocomplete and hint bar
- **AI chat** — free-text input streams responses from Google Gemini (`gemini-2.5-flash`), grounded in profile / experience / projects / posts / skills / socials
- **Themes** — cycle palettes with `/theme` (amber, matrix, azure, magenta, paper)
- **Mobile command bar** — touch-friendly command access on small screens
- **Posts** with featured-post support
- **DecapCMS admin at `/admin`** — Git-backed CMS (no DB) for editing all content JSON via a web UI. Auth via GitHub OAuth using a custom handler (`/api/decap/auth` + `/api/decap/callback`); approved edits commit straight to the repo. CMS itself is loaded from the unpkg CDN, so no npm dependency.
- **Content as JSON** — everything lives in `content/*.json` and `content/{projects,posts}/*.json`

## Tech stack

- Next.js `16.2.6` (App Router, Server Components)
- React `19.2.4` + TypeScript `6`
- Tailwind CSS `4`
- Zustand (state)
- `@google/genai` (Gemini SDK)

## Commands

| Command       | Description                    |
| ------------- | ------------------------------ |
| `/help`       | list all commands              |
| `/home`       | back to landing                |
| `/about`      | who I am, in 60 seconds        |
| `/experience` | work history                   |
| `/projects`   | selected work                  |
| `/skills`     | languages, frameworks, tooling |
| `/posts`      | writing                        |
| `/contact`    | ways to reach me + socials     |
| `/resume`     | download CV                    |
| `/theme`      | cycle color palette            |
| `/whoami`     | current user                   |
| `/uname`      | system info                    |
| `/echo`       | echo something back            |
| `/date`       | current date / time            |
| `/clear`      | clear the screen               |
| `/exit`       | ...don't                       |

Any input that does **not** start with `/` is sent to the AI chat endpoint.

## Getting started

Requires Node 20+ and npm (or pnpm/yarn/bun).

```bash
# 1. Install
npm install

# 2. Configure env
cp .env.example .env.local
# then fill in the values below

# 3. Dev server
npm run dev
```

Open <http://localhost:3000>.

### Environment variables

```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
GEMINI_API_KEY=your-gemini-api-key
GEMINI_MODEL=gemini-2.5-flash
GITHUB_OAUTH_CLIENT_ID=your-client-id
GITHUB_OAUTH_CLIENT_SECRET=your-client-secret
```

- `GEMINI_API_KEY` — required for `/api/chat`. Get one from <https://aistudio.google.com/apikey>.
- `GITHUB_OAUTH_CLIENT_ID` / `_SECRET` — required for the DecapCMS admin at `/admin`. Create a GitHub OAuth app whose callback URL is `<NEXT_PUBLIC_SITE_URL>/api/decap/callback`.

## Scripts

| Script              | Purpose               |
| ------------------- | --------------------- |
| `npm run dev`       | Start dev server      |
| `npm run build`     | Production build      |
| `npm run start`     | Run production server |
| `npm run lint`      | ESLint                |
| `npm run typecheck` | `tsc --noEmit`        |

## Project layout

```
content/                       # All editable content (JSON)
  profile.json
  experience.json
  skills.json
  socials.json
  featured.json
  projects/                    # one file per project
  posts/                       # one file per post
public/
  admin/                       # DecapCMS shell + config.yml
  uploads/                     # CMS media uploads
src/
  app/                         # App Router (routes, layouts, API)
    api/chat/route.ts          # Gemini streaming chat
    api/decap/{auth,callback}  # GitHub OAuth for DecapCMS
  common/api/content.ts        # Server-side content loader
  features/portfolio-tui/      # The TUI itself (components, hooks, stores, data)
```

See [`AGENTS.md`](./AGENTS.md) for the full directory and module conventions used in this codebase.

## Editing content

Two options:

1. **Via DecapCMS** — visit `/admin`, sign in with GitHub, edit through the UI. Saves commit directly to the repo branch the CMS is configured to track (see `public/admin/config.yml`).
2. **Directly in the repo** — edit the JSON files under `content/` and push. Content is loaded by `src/common/api/content.ts` at request time.
