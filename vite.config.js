import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import dns from "dns";

dns.setDefaultResultOrder("verbatim");

const PORT = 3000;

export default defineConfig({
  server: {
    port: PORT,
  },
  plugins: [
    react(),
    tsconfigPaths({
      root: "./",
    }),
  ],
  resolve: {
    alias: {
      process: "process/browser",
      stream: "stream-browserify",
      zlib: "browserify-zlib",
      util: "util",
    },
  },
});
