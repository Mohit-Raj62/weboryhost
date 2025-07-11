import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import sitemap from "vite-plugin-sitemap";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    sitemap({
      hostname: "https://webory.netlify.app",
      readable: true,
      allowRobots: true,
      exclude: ["/admin/*", "/admin/login", "/admin/signup"],
      dynamicRoutes: [
        "/",
        "/client",
        "/web-design",
        "/web-development",
        "/app-development",
        "/seo",
        "/mlm",
        "/consulting",
        "/maintenance",
        "/support",
        "/about",
        "/services",
        "/contact",
        "/privacy",
        "/terms",
        "/cookies",
        "/blog",
        "/career",
        "/login",
        "/register",
        "/get-started",
      ],
    }),
  ],
  define: {
    // Force production environment variables
    "import.meta.env.VITE_API_URL": JSON.stringify(
      process.env.VITE_API_URL || "https://webory.onrender.com"
    ),
    "import.meta.env.VITE_NODE_ENV": JSON.stringify(
      process.env.VITE_NODE_ENV || "production"
    ),
  },
  build: {
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendors": ["react", "react-dom"],
          "mui-vendors": ["@mui/material", "@mui/icons-material"],
          "recharts-vendors": ["recharts"],
        },
      },
    },
  },
  server: {
    port: 3001,
  },
});
