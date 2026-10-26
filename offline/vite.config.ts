import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { viteSingleFile } from "vite-plugin-singlefile";
import path from "node:path";

export default defineConfig({
  root: path.resolve(__dirname),
  base: "./",
  resolve: { alias: [
    { find: "next/image", replacement: path.resolve(__dirname, "image.tsx") },
    { find: "@/lib/pdf", replacement: path.resolve(__dirname, "pdf.ts") },
    { find: "@/lib/model", replacement: path.resolve(__dirname, "../src/lib/model.ts") },
  ] },
  plugins: [react(), tailwindcss(), viteSingleFile()],
  build: { outDir: path.resolve(__dirname, "../offline-dist"), emptyOutDir: true, assetsInlineLimit: 10000000, cssCodeSplit: false },
});
