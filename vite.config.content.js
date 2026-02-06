import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    emptyOutDir: false,
    rollupOptions: {
      input: {
        contentScript: resolve(__dirname, "src/content/contentScript.jsx"),
      },
      output: {
        entryFileNames: "[name].js",
        format: "iife",
        inlineDynamicImports: true,
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith(".css")) return "contentStyle2.css";
          return "assets/[name][extname]";
        },
      },
    },
    target: "esnext",
    assetsInlineLimit: 100000,
  },
});
