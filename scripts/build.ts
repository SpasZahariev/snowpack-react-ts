#!/usr/bin/env bun

import { existsSync, mkdirSync, readFileSync, writeFileSync, cpSync, rmSync } from "fs";
import { join } from "path";

const BUILD_DIR = join(process.cwd(), "build");
const PUBLIC_DIR = join(process.cwd(), "public");
const OPTIMISED_IMAGES_DIR = join(process.cwd(), "optimised-images", "lossful", "images");
const ENTRY_POINT = join(process.cwd(), "src", "index.tsx");
const HTML_TEMPLATE = join(PUBLIC_DIR, "index.html");

// Clean and create build directory
if (existsSync(BUILD_DIR)) {
  rmSync(BUILD_DIR, { recursive: true, force: true });
}
mkdirSync(BUILD_DIR, { recursive: true });

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

// Copy images
if (existsSync(OPTIMISED_IMAGES_DIR)) {
  const imagesDest = join(BUILD_DIR, "images");
  console.log(`Copying images from ${OPTIMISED_IMAGES_DIR} to ${imagesDest}...`);
  cpSync(OPTIMISED_IMAGES_DIR, imagesDest, { recursive: true });
  console.log("Images copied successfully");
} else {
  console.warn(`Warning: Images directory not found at ${OPTIMISED_IMAGES_DIR}`);
}

// Copy PDF
const pdfSource = join(PUBLIC_DIR, "Spas-Zahariev-CV.pdf");
if (existsSync(pdfSource)) {
  console.log(`Copying PDF from ${pdfSource}...`);
  cpSync(pdfSource, join(BUILD_DIR, "Spas-Zahariev-CV.pdf"));
  console.log("PDF copied successfully");
} else {
  console.warn(`Warning: PDF not found at ${pdfSource}`);
}

// Copy favicon if it exists
const faviconSource = join(PUBLIC_DIR, "spas-logo.svg");
if (existsSync(faviconSource)) {
  cpSync(faviconSource, join(BUILD_DIR, "spas-logo.svg"));
}

// Copy other public assets (fonts, etc.)
const fontFiles = ["Camcorder-Regular.woff2", "cozette_bitmap.ttf", "kongtext.ttf"];
for (const font of fontFiles) {
  const fontPath = join(PUBLIC_DIR, font);
  if (existsSync(fontPath)) {
    cpSync(fontPath, join(BUILD_DIR, font));
  }
}

// Read HTML template
if (!existsSync(HTML_TEMPLATE)) {
  console.error(`Error: HTML template not found at ${HTML_TEMPLATE}`);
  process.exit(1);
}

let html = readFileSync(HTML_TEMPLATE, "utf-8");

// Inject the bundle script before closing </body> tag
const scriptTag = '  <script src="myMegaBundle.js"></script>\n</body>';
html = html.replace("</body>", scriptTag);

// Write the final HTML
const outputHtml = join(BUILD_DIR, "index.html");
writeFileSync(outputHtml, html, "utf-8");

console.log("HTML generated successfully");
console.log(`\nBuild complete! Output directory: ${BUILD_DIR}`);
