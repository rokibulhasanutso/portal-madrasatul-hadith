import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import { qrcode } from "vite-plugin-qrcode";

// https://vite.dev/config/
export default defineConfig({
  plugins: [qrcode(), react(), tailwindcss()],
  server: {
    port: 3000,
    // open: true,
    host: true,
  },
});
