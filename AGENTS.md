# AGENTS.md - AI Agent Guidelines

This document provides essential context for AI agents working on this codebase.

## Project Overview

This is a **personal portfolio website** for Spas Zahariev, built with React 19 and TypeScript, using **Bun** as the runtime, package manager, and bundler, with **Tailwind CSS v4** for styling.

**Live sections**: Introduction, About Me, Experience, Certifications, Skills, Featured Projects, Contact

## Tech Stack

| Category | Technology |
|----------|------------|
| Runtime & Bundler | Bun 1.3+ |
| Framework | React 19 |
| Language | TypeScript 5.x |
| Styling | Tailwind CSS v4 |
| Icons | Lucide React |
| Particles | @tsparticles/react |
| Testing | Bun test runner + @testing-library/react |
| Formatting | Prettier |

## Quick Reference

### Commands

```bash
bun install          # Install dependencies
bun run start        # Start dev server (port 3000)
bun run build        # Production build → ./build/
bun test             # Run tests
bun run format       # Format code with Prettier
bun run lint         # Check formatting
```

### Key Paths

```
src/index.tsx              # Application entry point
src/pages/app/App.tsx      # Main component (contains all sections)
src/components/            # Reusable components
src/components/ui/         # Shared UI components (Button, Chip, Drawer, IconLink)
src/styles/globals.css     # Tailwind entry point with theme config
scripts/build.ts           # Production build script
scripts/dev.ts             # Development server script
public/index.html          # HTML template
build/                     # Git submodule → github.com/SpasZahariev/spas-zahariev (GitHub Pages)
awesome-cv/                # Git submodule for generating the LaTeX resume
```

## Project Structure

```
├── src/
│   ├── index.tsx                    # Entry point, renders App with createRoot
│   ├── styles/
│   │   └── globals.css              # Tailwind CSS with theme configuration
│   ├── pages/app/
│   │   ├── App.tsx                  # Main app component (all Tailwind)
│   │   └── App.test.tsx             # App tests
│   └── components/
│       ├── ui/                      # Shared UI components
│       │   ├── Button.tsx           # Custom button component
│       │   ├── Chip.tsx             # Technology badge component
│       │   ├── Drawer.tsx           # Mobile drawer component
│       │   ├── IconLink.tsx         # Icon link wrapper
│       │   └── index.ts             # Barrel export
│       ├── common/                  # Shared components
│       │   ├── FadeInSection/       # Scroll-triggered animations
│       │   └── SwipeableBottomDrawer/  # Mobile nav drawer
│       ├── navbar/                  # Navigation bar
│       ├── NqmeProject/             # Featured project
│       ├── ProjectManagement/       # Featured project
│       ├── Doily/                   # Featured project
│       └── OtherProjects/           # Other projects showcase
├── scripts/
│   ├── build.ts                     # Bun + Tailwind build
│   └── dev.ts                       # Dev server with Tailwind
├── public/                          # Static assets
├── optimised-images/                # Build-time image source
├── test/
│   └── setup.ts                     # Test setup (jest-dom)
├── tailwind.config.ts               # Tailwind configuration
├── postcss.config.js                # PostCSS configuration
├── build/                           # Production output (git submodule: spas-zahariev)
└── awesome-cv/                      # LaTeX resume source (git submodule)
```

### Submodule Notes

- `build/` is a git submodule that stores production-ready website assets intended for deployment.
- `awesome-cv/` is a git submodule used to build and maintain the LaTeX resume.

## Tailwind CSS Configuration

This project uses **Tailwind CSS v4** with theme configuration in `src/styles/globals.css`:

### Custom Colors (use as `text-{color}`, `bg-{color}`, etc.)

```css
--color-whiteish: #f9f7f7;      /* Background */
--color-light-blue: #dbe2ef;    /* Accents */
--color-very-blue: #3f72af;     /* Links, highlights */
--color-dark-blue: #112d4e;     /* Primary text, headings */
--color-grayish: #707070;       /* Secondary text */
--color-almost-black: #242424;  /* Strong emphasis */
```

### Usage Examples

```tsx
// Colors
<div className="bg-whiteish text-dark-blue">
<span className="text-very-blue hover:text-dark-blue">

// Custom components defined in globals.css
<button className="btn-primary">Primary</button>
<button className="btn-outline">Outline</button>
<span className="chip">Badge</span>
```

## Component Patterns

### Creating Components (React 19 + TypeScript)

```typescript
import { useState, useCallback } from 'react';

interface Props {
  title: string;
  onAction: () => void;
}

function ComponentName({ title, onAction }: Props) {
  const [state, setState] = useState(false);
  
  const handleClick = useCallback(() => {
    onAction();
  }, [onAction]);

  return (
    <div className="p-4 bg-whiteish">
      <h2 className="text-xl text-dark-blue font-semibold">{title}</h2>
    </div>
  );
}

export default ComponentName;
```

### Using Shared UI Components

```tsx
import { Button, Chip, IconLink } from '../ui';
import { Github, ExternalLink } from 'lucide-react';

// Button variants
<Button variant="primary">Primary</Button>
<Button variant="outline" href="mailto:...">Contact</Button>
<Button variant="ghost">Ghost</Button>

// Chip for technology badges
<Chip label="React" />
<Chip label="TypeScript" variant="outlined" />

// Icon links
<IconLink href="https://github.com/..." target="_blank">
  <Github size={24} />
</IconLink>
```

## Build System

### Development (`bun run start`)

- Runs `scripts/dev.ts`
- Builds Tailwind CSS to `.dev-build/styles.css`
- Builds JS bundle to `.dev-build/myMegaBundle.js`
- Serves on `http://localhost:3000`
- Watches for file changes and rebuilds both CSS and JS

### Production (`bun run build`)

- Runs `scripts/build.ts`
- Builds minified Tailwind CSS to `build/styles.css`
- Builds minified JS bundle to `build/myMegaBundle.js`
- Copies images, fonts, and PDF to `build/`
- Injects CSS and JS links into `index.html`
- Clears `build/` contents but **never removes `build/.git`** so `build/` stays a **git submodule** of [spas-zahariev](https://github.com/SpasZahariev/spas-zahariev) (live site: `https://spaszahariev.github.io/spas-zahariev/`). After building, commit and push **inside `build/`** to publish.

**Submodule setup (once):** `git submodule update --init --recursive` after clone; or `git submodule add https://github.com/SpasZahariev/spas-zahariev.git build` if not present.

## Testing

### Running Tests

```bash
bun test                    # Run all tests
bun test --watch            # Watch mode
bun test src/pages/app/     # Run specific tests
```

### Writing Tests

```typescript
import { render, screen } from '@testing-library/react';
import ComponentName from './ComponentName';

test('describes what it tests', () => {
  render(<ComponentName />);
  expect(screen.getByText(/expected text/i)).toBeInTheDocument();
});
```

## Common Tasks

### Adding a New Section

1. Add state: `const [isSectionVisible, setIsSectionVisible] = useState(false);`
2. Add handler with `useCallback`
3. Add section with `FadeInSection` wrapper
4. Use Tailwind classes for all styling

### Adding a New Featured Project

1. Create component in `src/components/ProjectName/`
2. Use Lucide icons: `import { Github, ExternalLink } from 'lucide-react'`
3. Use Chip component for technologies
4. Use Tailwind classes for styling
5. Add images to `optimised-images/lossful/images/project-name/`

### Adding Dependencies

```bash
bun add package-name          # Runtime dependency
bun add -d package-name       # Dev dependency
```

## Important Notes

### React 19 Patterns

- Uses `createRoot` (not `ReactDOM.render`)
- Functional components only
- Use `useCallback` for stable function references
- Use proper TypeScript interfaces (not `type Props = {}`)

### Tailwind v4 Specifics

- Theme configured in CSS file (`src/styles/globals.css`) using `@theme`
- Custom colors defined as CSS variables (`--color-*`)
- No `tailwind.config.ts` needed for basic configuration

### Bun-Specific Behavior

- TypeScript transpiled by Bun, not tsc
- Tailwind CSS built via `@tailwindcss/cli`
- No Webpack or Babel needed

## File Locations Quick Reference

| What | Where |
|------|-------|
| Entry point | `src/index.tsx` |
| Main component | `src/pages/app/App.tsx` |
| Tailwind config | `src/styles/globals.css` |
| UI components | `src/components/ui/` |
| Build script | `scripts/build.ts` |
| Dev server | `scripts/dev.ts` |
| HTML template | `public/index.html` |
| Resume PDF | `public/Spas-Zahariev-CV.pdf` |

## Debugging

### Build Issues

- Check Tailwind theme configuration in `src/styles/globals.css`
- Verify color names match (e.g., `bg-whiteish` not `bg-white-ish`)
- Check `@theme` block for proper CSS variable format

### Dev Server Issues

- Default port is 3000 (changed from 4000)
- Check `.dev-build/` for generated files
- Kill process on port if "EADDRINUSE" error

### Type Errors

- Run `bunx tsc --noEmit` to check types
- Ensure React 19 types are installed (`@types/react@^19`)

## Do Not Modify

- `bun.lock` - Managed by Bun
- `build/*` (except `.git`) - Regenerated by `bun run build`; publish by committing inside the `build/` submodule
- `.dev-build/` - Generated during development
- `node_modules/` - Managed by Bun
