import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import svgr from 'vite-plugin-svgr';
import legacy from '@vitejs/plugin-legacy';
import eslintPlugin from 'vite-plugin-eslint';
import { getAliases } from "vite-aliases";

const aliases = getAliases();

export default defineConfig({
  esbuild: {
    jsxInject: 'import React from "react"',
  },
  resolve: {
    alias: aliases,
  },
  plugins: [
    reactRefresh(),
    svgr(),
    eslintPlugin({ include: 'src/**/*.+(js|jsx|ts|tsx)', cache: false }),
    legacy({
      targets: [">0.2%", "not dead", "not op_mini all"],
      modernPolyfills: true,
    }),
  ],
});
