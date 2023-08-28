import { defineConfig } from 'vite';
import * as path from 'path';
import react from '@vitejs/plugin-react-swc';
// https://vitejs.dev/config/

export default defineConfig(({ command, mode }) => {
  return {
    plugins: [react()],
    resolve: {
      alias: {
        './runtimeConfig': './runtimeConfig.browser',
        '@': path.resolve(__dirname, 'src'),
      },
    },
    publicDir: 'public',
    build: {
      sourcemap: true,
      commonjsOptions: {
        include: [/node_modules/],
        extensions: ['.js', '.cjs'],
        strictRequires: true,
        // https://stackoverflow.com/questions/62770883/how-to-include-both-import-and-require-statements-in-the-bundle-using-rollup
        transformMixedEsModules: true,
      },
    },
    define: {
      'process.env': {},
    },
  };
});
