import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/loginAuthentication/",
  server: {
    proxy: {
      "/jokes": "http://localhost:3000/",
    },
  },
  plugins: [react()],
});
