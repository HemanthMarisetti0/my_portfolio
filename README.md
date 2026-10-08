# Hemanth Kumar — Portfolio

Personal portfolio site for Hemanth Kumar Marisetti, Software Developer. A single-page app built with React 19, TypeScript, Vite and Tailwind CSS v4, with Framer Motion animations and a light/dark theme.

## Tech stack

- **React 19** + **TypeScript**
- **Vite** for dev server and builds
- **Tailwind CSS v4** (via `@tailwindcss/vite`)
- **Framer Motion** for animations
- **lucide-react** for icons

## Getting started

Requires Node.js and [pnpm](https://pnpm.io).

```bash
pnpm install
pnpm dev        # start the dev server
```

### Scripts

| Command          | Description                                   |
| ---------------- | --------------------------------------------- |
| `pnpm dev`       | Start the Vite dev server                     |
| `pnpm build`     | Type-check, then build to `dist/`             |
| `pnpm preview`   | Serve the production build locally            |
| `pnpm typecheck` | Run the TypeScript compiler without emitting  |

## Project structure

```
public/            Static assets: resume.pdf, OG image, favicons,
                   project screenshots and certificate images
src/
  data/            All site content (see below)
  sections/        Page sections: Hero, About, Experience, Projects, ...
  components/      Cards, forms and modals
    layout/        Navbar, Footer, scroll progress
    ui/            Reusable primitives (Button, Section, Modal, ...)
    visuals/       Diagrams, window frames, contribution graph
  hooks/           useTheme, useGitHubRepos, useActiveSection, ...
  lib/             Utilities, motion presets, date helpers
  styles/          Global CSS / Tailwind entry
```

The `@` import alias points to `src/`.

## Editing content

Content lives in `src/data/` and is separate from the components, so most updates don't touch any JSX:

- `site.ts` — name, role, contact email, social links, resume path, GitHub username, contact form endpoint
- `about.ts`, `experience.ts`, `education.ts`, `skills.ts`, `capabilities.ts`
- `projects.ts` — featured and mini projects (screenshots go in `public/projects/`)
- `certifications.ts` — certificate images go in `public/certificates/`
- `navigation.ts` — navbar links

Any value written as `[Like This]` is a placeholder. Links that are still placeholders render as disabled buttons instead of broken links, and in development the browser console lists the placeholders that still need real values.

## Integrations

- **Contact form** — posts to the [Formspree](https://formspree.io) endpoint in `site.contactFormEndpoint`. If no endpoint is set, it falls back to opening the visitor's email app.
- **GitHub activity** — fetches public, non-fork repositories for `site.githubUsername` from the unauthenticated GitHub REST API. No token needed.

## Deployment

`pnpm build` produces a static site in `dist/` that can be deployed to any static host (Vercel, Netlify, GitHub Pages, Cloudflare Pages, ...).
