import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return {
    plugins: [react(), tailwindcss()],
    server: {
      proxy: {
        "/api": {
          target: process.env.VITE_BACKEND,
          changeOrigin: true,
          secure: false,
          // rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  };
});

//import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
