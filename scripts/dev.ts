#!/usr/bin/env bun

import { serve, build } from "bun";
import { readFileSync, existsSync, watchFile, mkdirSync, rmSync } from "fs";
import { join } from "path";

const PORT = 3000;
const PUBLIC_DIR = join(process.cwd(), "public");
const HTML_TEMPLATE = join(PUBLIC_DIR, "index.html");
const ENTRY_POINT = join(process.cwd(), "src", "index.tsx");
const DEV_BUILD_DIR = join(process.cwd(), ".dev-build");
const CSS_INPUT = join(process.cwd(), "src", "styles", "globals.css");
const CSS_OUTPUT = join(DEV_BUILD_DIR, "styles.css");

// Ensure dev build directory exists
if (!existsSync(DEV_BUILD_DIR)) {
  mkdirSync(DEV_BUILD_DIR, { recursive: true });
}

// Build Tailwind CSS
async function buildCSS() {
  console.log("Building Tailwind CSS...");
  const cssResult = Bun.spawnSync({
    cmd: ["bun", "run", "tailwindcss", "-i", CSS_INPUT, "-o", CSS_OUTPUT],
    stdout: "inherit",
    stderr: "inherit",
  });
  
  if (cssResult.exitCode !== 0) {
    console.error("Tailwind CSS build failed");
    return false;
  }
  console.log("Tailwind CSS built successfully");
  return true;
}

// Initial CSS build
await buildCSS();

// Build function for dev mode (no minification)
async function buildDev() {
  console.log("Building for development...");
  const result = await build({
    entrypoints: [ENTRY_POINT],
    minify: false,
    target: "browser",
    format: "iife",
    sourcemap: "inline",
  });

  if (!result.success) {
    console.error("Build failed:");
    result.logs.forEach((log) => console.error(log));
    return false;
  }
  
  // Write bundle to dev build directory
  if (result.outputs && result.outputs.length > 0) {
    const bundlePath = join(DEV_BUILD_DIR, "myMegaBundle.js");
    const bundleContent = await result.outputs[0].arrayBuffer();
    await Bun.write(bundlePath, bundleContent);
    
    // Also write source map if available
    if (result.outputs.length > 1) {
      const mapPath = join(DEV_BUILD_DIR, "myMegaBundle.js.map");
      const mapContent = await result.outputs[1].arrayBuffer();
      await Bun.write(mapPath, mapContent);
    }
  }
  
  console.log("Build complete");
  return true;
}

// Initial build
await buildDev();

// Track SSE clients for hot reload
const sseClients: Set<ReadableStreamDefaultController> = new Set();

// Function to notify all connected clients to reload
function notifyReload() {
  const message = `data: reload\n\n`;
  sseClients.forEach((controller) => {
    try {
      controller.enqueue(new TextEncoder().encode(message));
    } catch (e) {
      // Client disconnected, remove it
      sseClients.delete(controller);
    }
  });
}

// Watch for changes and rebuild
watchFile(join(process.cwd(), "src"), { recursive: true }, async () => {
  console.log("File changed, rebuilding...");
  await buildDev();
  // Notify clients to reload after rebuild completes
  notifyReload();
});

// Watch for CSS changes
watchFile(CSS_INPUT, { recursive: false }, async () => {
  console.log("CSS file changed, rebuilding...");
  await buildCSS();
  // Notify clients to reload after CSS rebuild completes
  notifyReload();
});

// Watch for public directory changes (images, PDFs, etc.)
watchFile(PUBLIC_DIR, { recursive: true }, async () => {
  console.log("Public files changed, reloading...");
  // Just reload, no rebuild needed for static files
  notifyReload();
});

// Create dev server
const server = serve({
  port: PORT,
  async fetch(req) {
    const url = new URL(req.url);

    // Serve the HTML with injected CSS and bundle script
    if (url.pathname === "/" || url.pathname === "/index.html") {
      let html = readFileSync(HTML_TEMPLATE, "utf-8");
      // Inject CSS link
      const cssLink = '  <link rel="stylesheet" href="/styles.css">\n</head>';
      html = html.replace("</head>", cssLink);
      // Inject bundle script
      const scriptTag = '  <script src="/myMegaBundle.js"></script>\n</body>';
      html = html.replace("</body>", scriptTag);
      // Inject hot reload script
      const hotReloadScript = `
  <script>
    if (typeof EventSource !== 'undefined') {
      const eventSource = new EventSource('/__hot-reload');
      eventSource.onmessage = function(event) {
        if (event.data === 'reload') {
          console.log('🔄 Hot reload: Reloading page...');
          window.location.reload();
        }
      };
      eventSource.onerror = function(event) {
        console.error('Hot reload connection error');
      };
    }
  </script>
</body>`;
      html = html.replace("</body>", hotReloadScript);
      return new Response(html, {
        headers: { "Content-Type": "text/html" },
      });
    }

    // SSE endpoint for hot reload
    if (url.pathname === "/__hot-reload") {
      const stream = new ReadableStream({
        start(controller) {
          sseClients.add(controller);
          // Send initial connection message
          controller.enqueue(new TextEncoder().encode("data: connected\n\n"));
          
          // Clean up on client disconnect
          req.signal.addEventListener("abort", () => {
            sseClients.delete(controller);
            controller.close();
          });
        },
      });

      return new Response(stream, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          "Connection": "keep-alive",
        },
      });
    }

    // Serve CSS
    if (url.pathname === "/styles.css") {
      if (existsSync(CSS_OUTPUT)) {
        const file = Bun.file(CSS_OUTPUT);
        return new Response(file, {
          headers: { "Content-Type": "text/css" },
        });
      }
    }

    // Serve the bundle
    if (url.pathname === "/myMegaBundle.js") {
      const bundlePath = join(DEV_BUILD_DIR, "myMegaBundle.js");
      if (existsSync(bundlePath)) {
        const file = Bun.file(bundlePath);
        return new Response(file, {
          headers: { "Content-Type": "application/javascript" },
        });
      }
    }

    // Serve source maps
    if (url.pathname === "/myMegaBundle.js.map") {
      const mapPath = join(DEV_BUILD_DIR, "myMegaBundle.js.map");
      if (existsSync(mapPath)) {
        const file = Bun.file(mapPath);
        return new Response(file, {
          headers: { "Content-Type": "application/json" },
        });
      }
    }

    // Serve static files from public directory
    if (url.pathname.startsWith("/images/")) {
      const filePath = join(PUBLIC_DIR, url.pathname);
      if (existsSync(filePath)) {
        const file = Bun.file(filePath);
        return new Response(file);
      }
    }

    // Serve PDF
    if (url.pathname === "/Spas-Zahariev-CV.pdf") {
      const pdfPath = join(PUBLIC_DIR, "Spas-Zahariev-CV.pdf");
      if (existsSync(pdfPath)) {
        const file = Bun.file(pdfPath);
        return new Response(file, {
          headers: { "Content-Type": "application/pdf" },
        });
      }
    }

    // Serve fonts
    if (url.pathname.match(/\.(woff2|ttf|svg)$/)) {
      const filePath = join(PUBLIC_DIR, url.pathname.substring(1));
      if (existsSync(filePath)) {
        const file = Bun.file(filePath);
        return new Response(file);
      }
    }

    return new Response(null, { status: 404 });
  },
});

console.log(`🚀 Dev server running at http://localhost:${PORT}`);
console.log(`📝 Entry point: ${ENTRY_POINT}`);
console.log(`\nPress Ctrl+C to stop the server\n`);

process.on("SIGINT", () => {
  console.log("\n👋 Shutting down dev server...");
  server.stop();
  // Clean up dev build directory
  if (existsSync(DEV_BUILD_DIR)) {
    rmSync(DEV_BUILD_DIR, { recursive: true, force: true });
  }
  process.exit(0);
});
