import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
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
