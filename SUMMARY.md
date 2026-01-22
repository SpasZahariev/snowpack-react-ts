# Portfolio Website - Repository Summary

## Overview

This is a **React + TypeScript portfolio website** for Spas Zahariev, a fullstack software engineer. The website showcases personal information, professional experience, certifications, skills, and featured projects. Despite the repository name mentioning "snowpack", the project actually uses **Webpack** for bundling and development.

## Tech Stack

### Core Technologies
- **React 17.0.2** - UI library
- **TypeScript 4.3.5** - Type-safe JavaScript
- **Webpack 5.46.0** - Module bundler and build tool
- **Babel** - JavaScript transpiler (handles TypeScript via `@babel/preset-typescript`)

### UI Libraries & Components
- **Material-UI (v4)** - Component library (`@material-ui/core`, `@material-ui/icons`)
- **react-tsparticles** - Interactive particle background animation
- **react-responsive-carousel** - Image carousel component for project showcases

### Development Tools
- **Webpack Dev Server** - Development server with hot reloading
- **Jest** - Testing framework
- **@testing-library/react** - React testing utilities
- **Prettier** - Code formatting

### Build Configuration
- **Webpack** handles bundling (not Snowpack, despite the repo name)
- Separate webpack configs for dev and production (`webpack.dev.js`, `webpack.prod.js`)
- CSS is processed with `css-loader` and `style-loader`
- Images and fonts are handled as assets

## Project Structure

```
snowpack-react-ts/
├── src/
│   ├── components/          # React components
│   │   ├── common/          # Reusable components
│   │   │   ├── FadeInSection/        # Scroll-triggered fade-in animation
│   │   │   └── SwipeableBottomDrawer/ # Mobile navigation drawer
│   │   ├── navbar/          # Top navigation bar
│   │   ├── NqmeProject/      # Featured project: Nqme music player
│   │   ├── ProjectManagement/ # Featured project: Project tracking app
│   │   ├── Doily/           # Featured project: Java painting app
│   │   └── OtherProjects/   # Other GitHub projects showcase
│   ├── pages/
│   │   └── app/
│   │       └── App.tsx      # Main application component
│   ├── assets/              # Static assets (particles config)
│   ├── index.tsx            # Application entry point
│   └── index.css            # Global styles
├── public/                  # Static public files
│   ├── images/              # Optimized project images
│   ├── index.html           # HTML template
│   ├── Spas-Zahariev-CV.pdf # Resume PDF
│   └── *.woff2, *.ttf       # Custom fonts
├── webpack/                 # Webpack configuration files
│   ├── webpack.config.js    # Main config (merges common + env)
│   ├── webpack.common.js    # Shared webpack config
│   ├── webpack.dev.js       # Development config
│   └── webpack.prod.js      # Production config
├── optimised-images/        # Optimized image assets (lossful/lossless)
├── original-images/         # Original source images
├── types/                   # TypeScript type definitions
└── jest.config.js           # Jest testing configuration
```

## Key Components

### Main App Component (`src/pages/app/App.tsx`)
The central component that orchestrates the entire portfolio. It includes:

- **Navigation**: Smooth scroll navigation to different sections
- **Particle Background**: Interactive particle system using `react-tsparticles`
- **Section Management**: Multiple sections with scroll-triggered visibility:
  - Introduction/Home
  - About Me
  - Experience & Certifications
  - Skills
  - Featured Projects
  - Contact Information

### Navigation Bar (`src/components/navbar/navbar.tsx`)
- Fixed navigation bar that hides/shows on scroll
- Desktop: Horizontal menu with section links
- Mobile: Hamburger menu that opens a swipeable bottom drawer
- Custom SVG logo

### FadeInSection (`src/components/common/FadeInSection/fadeInSection.tsx`)
- Reusable component for scroll-triggered animations
- Uses Intersection Observer API to detect when elements enter viewport
- Applies fade-in CSS animation when visible
- Prevents re-triggering once animated (permanent visibility state)

### Project Showcase Components
Each featured project component follows a similar structure:
- **NqmeProject**: Shared music player web app (React, Flask, GraphQL, SocketIO)
- **ProjectManagement**: Task assignment web app (Angular, AWS services)
- **Doily**: Java painting application with symmetrical drawing
- **OtherProjects**: Carousel showcasing other GitHub projects

All project components include:
- Project header with title and links (GitHub, live demo)
- Image carousel using `react-responsive-carousel`
- Technology stack chips (Material-UI Chips)

## Features

### 1. Scroll-Based Animations
- Sections fade in as user scrolls
- Uses Intersection Observer for performance
- One-time animations (don't re-trigger)

### 2. Responsive Design
- Mobile-friendly navigation with swipeable drawer
- Responsive typography (fluid font sizing)
- Image carousels for project showcases

### 3. Interactive Elements
- Particle background with hover/click interactions
- Smooth scroll navigation between sections
- Material-UI components for consistent styling

### 4. Professional Sections
- **Introduction**: Name, tagline, contact buttons, resume link
- **About**: Personal background and current role at JPMorgan Chase
- **Experience**: Work history and education timeline
- **Certifications**: Azure, OCI, Unity certificates with verification links
- **Skills**: Organized grid of languages, technologies, services, and other skills
- **Projects**: Featured projects with images and tech stacks
- **Contact**: Email, phone, social media links (GitHub, LinkedIn, Instagram)

## Build & Development

### Scripts (from `package.json`)
- `npm start` - Start development server (webpack-dev-server on port 8080)
- `npm run build` - Create production build in `build/` directory
- `npm test` - Run Jest tests
- `npm run format` - Format code with Prettier
- `npm run lint` - Check code formatting

### Webpack Configuration
- **Entry**: `src/index.tsx`
- **Output**: `build/myMegaBundle.js`
- **Loaders**:
  - Babel loader for TypeScript/JavaScript
  - CSS loader for stylesheets
  - Asset loaders for images and fonts
- **Plugins**:
  - `HtmlWebpackPlugin` - Injects bundle into HTML template
  - `CopyPlugin` - Copies optimized images and PDF to build directory

### Image Optimization
- Original images stored in `original-images/`
- Optimized versions in `optimised-images/` (lossful JPG and lossless PNG)
- Webpack copies optimized images to build directory during build

## Styling

### CSS Architecture
- Global styles in `src/index.css`
- Component-specific CSS files (e.g., `App.css`, `navbar.css`)
- CSS variables for theming (colors, padding, fonts)
- Responsive design with media queries
- Custom scrollbar styling

### Design System
- Color palette: Whiteish background, light blue, dark blue accents
- Typography: Open Sans font family
- Spacing: Consistent padding variables
- Material-UI components for UI consistency

## Testing

- **Jest** configured for unit testing
- **@testing-library/react** for React component testing
- Test setup file: `jest.setup.js`
- Example test file: `src/pages/app/App.test.tsx`

## Assets

### Images
- Project screenshots organized by project:
  - `nqme/` - Nqme project images
  - `cloud-app-dev/` - Project management app images
  - `doily/` - Doily painting app images
  - `other/` - Miscellaneous project images

### Fonts
- Custom fonts: `Camcorder-Regular.woff2`, `cozette_bitmap.ttf`, `kongtext.ttf`
- Google Fonts: Open Sans

### Documents
- Resume PDF: `Spas-Zahariev-CV.pdf`

## Important Notes

1. **Repository Name vs. Reality**: Despite being named "snowpack-react-ts", this project uses **Webpack**, not Snowpack. The `snowpack.config.json` exists but is minimal and not actively used.

2. **TypeScript Configuration**: TypeScript is used for type checking only. Actual transpilation is handled by Babel (`@babel/preset-typescript`), which is why `tsconfig.json` has `"noEmit": true`.

3. **Build Output**: Production builds go to the `build/` directory (not `dist/`), and the main bundle is named `myMegaBundle.js`.

4. **Image Workflow**: The project maintains both original and optimized images. During build, only optimized images are copied to the output.

5. **Particle Configuration**: Particle background settings are hardcoded in `App.tsx`, but there's also a `particlesjs-config.json` file in assets (not currently used).

## Development Workflow

1. **Start Development**: `npm start` - Opens browser at `http://localhost:8080`
2. **Make Changes**: Edit components in `src/`
3. **Hot Reload**: Webpack dev server automatically reloads on file changes
4. **Format Code**: Run `npm run format` before committing
5. **Build for Production**: `npm run build` creates optimized bundle in `build/`

## Deployment

The build output (`build/` directory) contains:
- `index.html` with injected bundle
- `myMegaBundle.js` - All JavaScript code
- `images/` - Optimized project images
- `Spas-Zahariev-CV.pdf` - Resume
- Static assets (fonts, etc.)

This can be deployed to any static hosting service (AWS S3, Netlify, Vercel, etc.).

## Contact & Links

The portfolio includes links to:
- Email: spas.zah@gmail.com
- GitHub: https://github.com/SpasZahariev
- LinkedIn: https://www.linkedin.com/in/spaszahariev/
- Instagram: https://www.instagram.com/spas_zah/

---

**Last Updated**: Based on current repository state
**Maintainer**: Spas Zahariev
