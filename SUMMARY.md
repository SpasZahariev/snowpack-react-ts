# Portfolio Website - Repository Summary

## Overview

This is a **React 19 + TypeScript portfolio website** for Spas Zahariev, a fullstack software engineer. The website showcases personal information, professional experience, certifications, skills, and featured projects. It uses **Bun** for bundling and **Tailwind CSS v4** for styling.

## Tech Stack

### Core Technologies
- **React 19** - UI library (using createRoot API)
- **TypeScript 5** - Type-safe JavaScript
- **Bun** - Runtime, package manager, and bundler
- **Tailwind CSS v4** - Utility-first CSS framework

### UI & Styling
- **Tailwind CSS v4** - All styling via utility classes
- **Lucide React** - Icon library (replaced Material-UI icons)
- **@tsparticles/react** - Interactive particle background
- **react-responsive-carousel** - Image carousel for project showcases

### Development Tools
- **Bun Dev Server** - Development server with hot reloading
- **Bun test** - Testing framework
- **@testing-library/react** - React testing utilities
- **Prettier** - Code formatting

### Build Configuration
- **Bun** handles TypeScript/JSX bundling natively
- **@tailwindcss/cli** - Tailwind CSS compilation
- Separate scripts for dev and production builds

## Project Structure

```
snowpack-react-ts/
├── src/
│   ├── components/          # React components
│   │   ├── ui/              # Shared UI components
│   │   │   ├── Button.tsx   # Custom button (replaces MUI Button)
│   │   │   ├── Chip.tsx     # Technology badge (replaces MUI Chip)
│   │   │   ├── Drawer.tsx   # Mobile drawer (replaces MUI Drawer)
│   │   │   └── IconLink.tsx # Icon link wrapper
│   │   ├── common/          # Reusable components
│   │   │   ├── FadeInSection/        # Scroll-triggered fade-in animation
│   │   │   └── SwipeableBottomDrawer/ # Mobile navigation drawer
│   │   ├── navbar/          # Top navigation bar
│   │   ├── NqmeProject/     # Featured project: Nqme music player
│   │   ├── ProjectManagement/ # Featured project: Project tracking app
│   │   ├── Doily/           # Featured project: Java painting app
│   │   └── OtherProjects/   # Other GitHub projects showcase
│   ├── pages/
│   │   └── app/
│   │       └── App.tsx      # Main application component
│   ├── styles/
│   │   └── globals.css      # Tailwind CSS entry with theme config
│   └── index.tsx            # Application entry point (React 19 createRoot)
├── public/                  # Static public files
│   ├── images/              # Project images
│   ├── index.html           # HTML template
│   ├── Spas-Zahariev-CV.pdf # Resume PDF
│   └── *.woff2, *.ttf       # Custom fonts
├── scripts/                 # Build scripts
│   ├── build.ts             # Production build (Bun + Tailwind)
│   └── dev.ts               # Development server
├── optimised-images/        # Optimized image assets
├── test/                    # Test configuration
│   └── setup.ts             # Test setup (jest-dom)
├── tailwind.config.ts       # Tailwind configuration
├── postcss.config.js        # PostCSS configuration
└── bunfig.toml              # Bun configuration
```

## Key Components

### Main App Component (`src/pages/app/App.tsx`)
The central component that orchestrates the entire portfolio:

- **React 19 Patterns**: Uses `createRoot`, `useCallback` for stable handlers
- **Particle Background**: Interactive particle system using `@tsparticles/react`
- **Section Management**: Multiple sections with scroll-triggered visibility via `FadeInSection`
- **All Tailwind**: No CSS files, uses utility classes throughout

### Shared UI Components (`src/components/ui/`)
Custom components replacing Material-UI:

- **Button**: Variants for primary, outline, ghost with href support
- **Chip**: Technology badge with outlined variant
- **Drawer**: Mobile-friendly bottom drawer with animations
- **IconLink**: Consistent icon link styling

### Navigation Bar (`src/components/navbar/navbar.tsx`)
- Fixed navigation that hides/shows on scroll
- Desktop: Horizontal menu with section links
- Mobile: Hamburger menu with animated drawer
- Custom SVG logo with hover animation

### FadeInSection (`src/components/common/FadeInSection/fadeInSection.tsx`)
- Scroll-triggered animations using Intersection Observer
- Tailwind classes for fade-in effect
- One-time animation (permanent visibility)

## Features

### 1. Scroll-Based Animations
- Sections fade in as user scrolls
- Uses Intersection Observer for performance
- Tailwind transition classes for smooth effects

### 2. Responsive Design
- Mobile-first approach with Tailwind breakpoints
- Responsive navigation with drawer on mobile
- Grid layouts for skills and experience sections

### 3. Interactive Elements
- Particle background (hidden on mobile for performance)
- Smooth scroll navigation between sections
- Hover states with Tailwind transitions

### 4. Professional Sections
- **Introduction**: Name, tagline, contact buttons, resume link
- **About**: Personal background and current role
- **Experience**: Work history and education timeline
- **Certifications**: Certificates with verification links
- **Skills**: Organized grid of languages, technologies, services
- **Projects**: Featured projects with images and tech stacks
- **Contact**: Email, phone, social media links

## Build & Development

### Scripts (from `package.json`)
- `bun run start` - Start development server (port 3000)
- `bun run build` - Create production build in `build/`
- `bun test` - Run tests with Bun test runner
- `bun run format` - Format code with Prettier
- `bun run lint` - Check code formatting

### Build Process
1. **Tailwind CSS**: Compiled via `@tailwindcss/cli`
2. **JavaScript**: Bundled by Bun's native bundler
3. **Assets**: Images and fonts copied to build directory
4. **HTML**: Template injected with CSS and JS links

### Tailwind Configuration
Theme configured in `src/styles/globals.css` using Tailwind v4's `@theme` directive:

```css
@theme {
  --color-whiteish: #f9f7f7;
  --color-light-blue: #dbe2ef;
  --color-very-blue: #3f72af;
  --color-dark-blue: #112d4e;
  --color-grayish: #707070;
  --color-almost-black: #242424;
}
```

## Testing

- **Bun test** configured for unit testing
- **@testing-library/react** for React component testing
- Test setup file: `test/setup.ts`

## Assets

### Images
- Project screenshots organized by project in `optimised-images/lossful/images/`
- Copied to `build/images/` during production build

### Fonts
- Custom fonts: Camcorder, Cozette, Kongtext
- Google Fonts: Open Sans (loaded via CSS import)

### Documents
- Resume PDF: `Spas-Zahariev-CV.pdf`

## Important Notes

1. **React 19**: Uses modern patterns like `createRoot`, no legacy APIs

2. **Tailwind v4**: Theme configured in CSS file, not JavaScript config

3. **No Material-UI**: Replaced with custom Tailwind components and Lucide icons

4. **No CSS Files**: All styling via Tailwind utility classes

5. **Build Output**: Production builds go to `build/` directory with:
   - `myMegaBundle.js` - Minified JavaScript
   - `styles.css` - Compiled Tailwind CSS
   - `images/` - Optimized project images

## Development Workflow

1. **Start Development**: `bun run start` - Opens at `http://localhost:3000`
2. **Make Changes**: Edit components in `src/`, use Tailwind classes
3. **Hot Reload**: Dev server rebuilds CSS and JS on file changes
4. **Format Code**: Run `bun run format` before committing
5. **Build for Production**: `bun run build` creates optimized bundle

## Contact & Links

- Email: spas.zah@gmail.com
- GitHub: https://github.com/SpasZahariev
- LinkedIn: https://www.linkedin.com/in/spaszahariev/
- Instagram: https://www.instagram.com/spas_zah/

---

**Last Updated**: February 2026  
**Maintainer**: Spas Zahariev
