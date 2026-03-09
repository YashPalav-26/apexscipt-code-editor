import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on mode
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    server: {
      proxy: {
        "/api/execute": {
          target: "https://api.onecompiler.com/v1/run",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/execute/, ""),
          configure: (proxy, options) => {
            proxy.on("proxyReq", (proxyReq, req, res) => {
              const apiKey = env.VITE_ONECOMPILER_API_KEY;
              if (apiKey && apiKey !== "YOUR_API_KEY") {
                proxyReq.setHeader("X-API-Key", apiKey);
              } else {
                console.warn(
                  "[WARN] OneCompiler API key not configured. Set VITE_ONECOMPILER_API_KEY in .env file."
                );
              }
            });
          },
        },
      },
    },
  };
});
