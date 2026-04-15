#!/usr/bin/env bun

import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync, cpSync, rmSync } from "fs";
import { join } from "path";

const BUILD_DIR = join(process.cwd(), "build");

/** Wipe build output but keep submodule metadata and CNAME for GitHub Pages custom domain. */
function cleanBuildDirPreservingGit(dir: string) {
  if (!existsSync(dir)) return;
  for (const name of readdirSync(dir, { withFileTypes: true })) {
    if (name.name === ".git" || name.name === "CNAME") continue;
    rmSync(join(dir, name.name), { recursive: true, force: true });
  }
}
const PUBLIC_DIR = join(process.cwd(), "public");
const OPTIMISED_IMAGES_DIR = join(process.cwd(), "optimised-images", "lossful", "images");
const ENTRY_POINT = join(process.cwd(), "src", "index.tsx");
const HTML_TEMPLATE = join(PUBLIC_DIR, "index.html");
const CSS_INPUT = join(process.cwd(), "src", "styles", "globals.css");
const CSS_OUTPUT = join(BUILD_DIR, "styles.css");
// Run Tailwind CLI with Node when available: see scripts/dev.ts.
const TAILWIND_CLI = join(
  process.cwd(),
  "node_modules",
  "@tailwindcss",
  "cli",
  "dist",
  "index.mjs",
);

// Clean build directory (preserve .git when build/ is a submodule)
if (!existsSync(BUILD_DIR)) {
  mkdirSync(BUILD_DIR, { recursive: true });
} else {
  cleanBuildDirPreservingGit(BUILD_DIR);
}

// Build Tailwind CSS
console.log("Building Tailwind CSS...");
const node = Bun.which("node");
const cssResult = Bun.spawnSync({
  cmd: node
    ? [node, TAILWIND_CLI, "-i", CSS_INPUT, "-o", CSS_OUTPUT, "--minify"]
    : ["bun", "run", "tailwindcss", "-i", CSS_INPUT, "-o", CSS_OUTPUT, "--minify"],
  stdout: "inherit",
  stderr: "inherit",
});

if (cssResult.exitCode !== 0) {
  console.error("Tailwind CSS build failed");
  process.exit(1);
}
console.log("Tailwind CSS built successfully");

console.log("Building bundle with Bun...");

// Build the bundle using Bun's native bundler
const OUTPUT_BUNDLE = join(BUILD_DIR, "myMegaBundle.js");

// Build the bundle - Bun will create outputs we can read
const buildResult = await Bun.build({
  entrypoints: [ENTRY_POINT],
  minify: true,
  target: "browser",
  format: "iife",
  sourcemap: "none",
});

if (!buildResult.success) {
  console.error("Build failed:");
  buildResult.logs.forEach((log) => console.error(log));
  process.exit(1);
}

// Write the bundle to the output file
if (buildResult.outputs && buildResult.outputs.length > 0) {
  const output = buildResult.outputs[0];
  // Get the bundle content as a blob/arrayBuffer
  const bundleContent = await output.arrayBuffer();
  await Bun.write(OUTPUT_BUNDLE, bundleContent);
  console.log(`Bundle written to: ${OUTPUT_BUNDLE}`);
} else {
  console.error("Error: No output files from Bun.build");
  process.exit(1);
}

// Verify the bundle was created
if (!existsSync(OUTPUT_BUNDLE)) {
  console.error(`Error: Bundle file not created at ${OUTPUT_BUNDLE}`);
  process.exit(1);
}

console.log("Bundle created successfully");

// Copy images (optimised lossful assets used by most projects)
const imagesDest = join(BUILD_DIR, "images");
if (existsSync(OPTIMISED_IMAGES_DIR)) {
  console.log(`Copying images from ${OPTIMISED_IMAGES_DIR} to ${imagesDest}...`);
  cpSync(OPTIMISED_IMAGES_DIR, imagesDest, { recursive: true });
  console.log("Images copied successfully");
} else {
  console.warn(`Warning: Images directory not found at ${OPTIMISED_IMAGES_DIR}`);
}

// Merge in public/images (profile photo, RAG screenshots, etc. — not always under optimised-images)
const publicImagesDir = join(PUBLIC_DIR, "images");
if (existsSync(publicImagesDir)) {
  mkdirSync(imagesDest, { recursive: true });
  console.log(`Merging public/images into ${imagesDest}...`);
  cpSync(publicImagesDir, imagesDest, { recursive: true });
  console.log("Public images merged successfully");
}

// Copy PDF
const pdfSource = join(PUBLIC_DIR, "resume.pdf");
if (existsSync(pdfSource)) {
  console.log(`Copying PDF from ${pdfSource}...`);
  cpSync(pdfSource, join(BUILD_DIR, "resume.pdf"));
  console.log("PDF copied successfully");
} else {
  console.warn(`Warning: PDF not found at ${pdfSource}`);
}

// Copy favicon and logo from public
const faviconSvg = join(PUBLIC_DIR, "favicon.svg");
if (existsSync(faviconSvg)) {
  cpSync(faviconSvg, join(BUILD_DIR, "favicon.svg"));
}
const logoSource = join(PUBLIC_DIR, "spas-logo.svg");
if (existsSync(logoSource)) {
  cpSync(logoSource, join(BUILD_DIR, "spas-logo.svg"));
}

const robotsSource = join(PUBLIC_DIR, "robots.txt");
if (existsSync(robotsSource)) {
  cpSync(robotsSource, join(BUILD_DIR, "robots.txt"));
}

// Copy other public assets (fonts, etc.)
const fontFiles = ["Camcorder-Regular.woff2", "cozette_bitmap.ttf", "kongtext.ttf"];
for (const font of fontFiles) {
  const fontPath = join(PUBLIC_DIR, font);
  if (existsSync(fontPath)) {
    cpSync(fontPath, join(BUILD_DIR, font));
  }
}

// Copy 2021 legacy portfolio
const legacySource = join(PUBLIC_DIR, "2021");
if (existsSync(legacySource)) {
  console.log("Copying 2021 legacy portfolio...");
  cpSync(legacySource, join(BUILD_DIR, "2021"), { recursive: true });
  console.log("2021 portfolio copied successfully");
}

// Read HTML template
if (!existsSync(HTML_TEMPLATE)) {
  console.error(`Error: HTML template not found at ${HTML_TEMPLATE}`);
  process.exit(1);
}

let html = readFileSync(HTML_TEMPLATE, "utf-8");

// Inject the CSS link in <head>
const cssLink = '  <link rel="stylesheet" href="styles.css">\n</head>';
html = html.replace("</head>", cssLink);

// Inject the bundle script before closing </body> tag
const scriptTag = '  <script src="myMegaBundle.js"></script>\n</body>';
html = html.replace("</body>", scriptTag);

// Write the final HTML
const outputHtml = join(BUILD_DIR, "index.html");
writeFileSync(outputHtml, html, "utf-8");

console.log("HTML generated successfully");
console.log(`\nBuild complete! Output directory: ${BUILD_DIR}`);
