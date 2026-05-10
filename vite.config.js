import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import { qrcode } from "vite-plugin-qrcode";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [qrcode(), react(), tailwindcss()],
  server: {
    port: 3000,
    // open: true,
    host: true,
  },
  resolve: {
    alias: [
      {
        find: "@",
        replacement: path.resolve("src"),
      },
    ],
  },
});
