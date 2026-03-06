# TagQuest

> Learn HTML structure through game-like exercises. Build structural sense, not just memorize tags.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/mango0422/TagQuest)

## Overview

TagQuest is an interactive HTML structure training tool for beginners. Instead of reading long documentation, users solve short problems and get instant visual feedback through a live DOM tree.

**Key Features:**
- 3-panel layout: Target Structure | Editor | Live DOM Tree
- Instant structural validation with clear error messages
- 4 tracks, 20 levels covering text tags, lists, layout, and content semantics
- Multiple problem types: tag select, fill-in-the-blank, direct input, semantic choice
- Progress saved locally (localStorage)
- i18n support (Korean default, English available)

## Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Code Editor | CodeMirror 6 |
| State | Zustand |
| Animation | Framer Motion |
| Deployment | Vercel |

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
  app/                    # Pages (App Router)
  components/             # UI components
    editor/               # CodeEditor, TagSelector, FillInBlank
    visualizer/           # DomTreeView, TargetStructureView
    feedback/             # FeedbackPanel, SuccessModal
    layout/               # LevelPlayer, LocaleSwitcher
  engine/                 # Core logic
    parser.ts             # DOMParser wrapper
    contentModel.ts       # HTML content model rules
    validator.ts          # Structure validator
    differ.ts             # Answer comparison
  data/
    tracks/ko/            # Level data (Korean)
    tracks/en/            # Level data (English)
    schema.ts             # TypeScript types
  i18n/                   # Internationalization
  store/                  # Zustand stores
```

## Environment Variables

Copy `.env.example` to `.env.local` and configure:

```bash
cp .env.example .env.local
```

| Variable | Description |
|----------|-----------|
| `NEXT_PUBLIC_APP_ENV` | `development` or `production` |
| `NEXT_PUBLIC_APP_URL` | Base URL |
| `NEXT_PUBLIC_APP_NAME` | App display name |

## Deployment

Deployed on [Vercel](https://vercel.com). Every push to `main` triggers an automatic deployment.

## License

MIT
