import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [{ src: "src/popup.html", dest: "." }],
    }),
  ],
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        contentScript: resolve(__dirname, "src/content/contentScript.jsx"),
      },
      output: {
        entryFileNames: "[name].js",
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith(".css")) return "contentStyle.css";
          return "assets/[name][extname]";
        },
      },
    },
    target: "esnext",
    assetsInlineLimit: 0,
  },
});
