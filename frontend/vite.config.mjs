// Senior Bug Fix: Patch decodeURI and decodeURIComponent globally to handle Windows directory paths containing '%' (e.g. 'Lung Project 100%')
const _decodeURI = globalThis.decodeURI;
globalThis.decodeURI = function (str) {
  if (typeof str !== "string") return _decodeURI(str);
  try {
    return _decodeURI(str);
  } catch (e) {
    if (e instanceof URIError) {
      return _decodeURI(str.replace(/%(?![0-9a-fA-F]{2})/g, "%25"));
    }
    throw e;
  }
};

const _decodeURIComponent = globalThis.decodeURIComponent;
globalThis.decodeURIComponent = function (str) {
  if (typeof str !== "string") return _decodeURIComponent(str);
  try {
    return _decodeURIComponent(str);
  } catch (e) {
    if (e instanceof URIError) {
      return _decodeURIComponent(str.replace(/%(?![0-9a-fA-F]{2})/g, "%25"));
    }
    throw e;
  }
};

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tagger from "@dhiwise/component-tagger";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "build",
    chunkSizeWarningLimit: 2000,
  },
  resolve: {
    preserveSymlinks: true,
    alias: {
      "components": path.resolve(__dirname, "src/components"),
      "pages": path.resolve(__dirname, "src/pages"),
      "styles": path.resolve(__dirname, "src/styles"),
      "utils": path.resolve(__dirname, "src/utils"),
      "@": path.resolve(__dirname, "src"),
    },
  },
  plugins: [tsconfigPaths(), react(), tagger()],
  server: {
    port: 4028,
    host: "0.0.0.0",
    strictPort: true,
    allowedHosts: [".amazonaws.com", ".builtwithrocket.new"],
    fs: {
      allow: ["..", "D:/Local Disk (D)/Lung Project 100%"],
    },
  },
});