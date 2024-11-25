import { vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";
import { vercelPreset } from "@vercel/remix/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

installGlobals();

export default defineConfig({
  plugins: [
    remix({
      ignoredRouteFiles: ["**/*.css"],
      presets: [vercelPreset()],
    }),
    tsconfigPaths(),
  ],
  ssr: {
    noExternal: ["tailwind-merge"],
  },
  server: {
    host: true,
    port: 5175,
  },
});
