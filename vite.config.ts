import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        contentScript: "src/content-script.ts",
      },
      output: {
        entryFileNames: "content-script.js",
      },
    },
    watch: {
      include: ["src/**", "manifest.json"],
    },
  },
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: "manifest.json",
          dest: ".",
        },
      ],
    }),
  ],
});
