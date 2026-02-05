import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    cssCodeSplit: true,
    rollupOptions: {
      input: {
        contentScript: "src/content/contentScript.jsx",
      },
      output: {
        entryFileNames: "[name].js",
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith(".css")) {
            return "contentStyle.css";
          }
          return "[name].[ext]";
        },
      },
    },
  },
});
