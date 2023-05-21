import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Get the directory name of the current file
const __dirname = path.dirname(new URL(import.meta.url).pathname);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
  },
});
