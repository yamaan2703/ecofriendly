// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react-swc";
// import path from "path";
// import { componentTagger } from "lovable-tagger";

// // https://vitejs.dev/config/
// export default defineConfig(({ mode }) => ({
//   server: {
//     host: "::",
//     port: 8080,
//   },
//   plugins: [
//     react(),
//     mode === 'development' &&
//     componentTagger(),
//   ].filter(Boolean),
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
//   build: {
//     rollupOptions: {
//       output: {
//         manualChunks: {
//           // Separate vendor chunks
//           vendor: ['react', 'react-dom'],
//           // Separate Quill chunk
//           quill: ['quill', 'react-quill'],
//           // Separate UI components
//           ui: ['framer-motion', 'lucide-react'],
//         },
//       },
//     },
//     chunkSizeWarningLimit: 1000,
//   },
// }));

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          quill: ["quill", "react-quill"],
          ui: ["framer-motion", "lucide-react"],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  base: "/",
}));
