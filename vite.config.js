import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/",
  plugins: [react()],
  build: {
    outDir: "dist", // Ensure output directory is correct
    emptyOutDir: true, // Clean old builds
    target: "esnext", // Optimize for latest browsers
  },
});
