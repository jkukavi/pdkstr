import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import tsconfigPaths from "vite-tsconfig-paths";
import svgr from "vite-plugin-svgr";
import { viteCommonjs, esbuildCommonjs } from "@originjs/vite-plugin-commonjs";

const logging = 0;

const loggingConfig = {};

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "^/api|/rt|/login|/logout": {
        target: "http://localhost:8080",
        changeOrigin: true,
        secure: false,
        ws: true,
        configure: (proxy, _options) => {
          proxy.on("error", (err, _req, _res) => {
            console.log("proxy error", err);
          });
          proxy.on("proxyReq", (proxyReq, req, _res) => {
            console.log("Sending Request to the Target:", req.method, req.url);
          });
          proxy.on("proxyRes", (proxyRes, req, _res) => {
            console.log(
              "Received Response from the Target:",
              proxyRes.statusCode,
              req.url
            );
          });
        },
      },
    },
    assetsInlineLimit: 0,
  },
  dev: {
    sourcemap: true,
  },
  // This changes the out put dir from dist to build
  // comment this out if that isn't relevant for your project
  build: {
    outDir: "build",
    assetsInlineLimit: 0,
  },
  plugins: [viteCommonjs(), reactRefresh(), tsconfigPaths(), svgr({})],
  optimizeDeps: {
    esbuildOptions: {
      plugins: [
        // Solves:
        // https://github.com/vitejs/vite/issues/5308
        // add the name of your package
        esbuildCommonjs(["@mikivela/plyr"]),
      ],
    },
  },
});
