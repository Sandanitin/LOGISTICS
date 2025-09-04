import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import path from 'path';

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';

  return {
    plugins: [
      react({
        fastRefresh: !isProduction,
        babel: isProduction ? {
          plugins: [
            ['babel-plugin-jsx-remove-data-test-id', { attributes: ['data-testid'] }],
            'babel-plugin-lodash',
            'babel-plugin-transform-remove-console',
          ]
        } : {}
      }),
      isProduction && visualizer({
        open: true,
        filename: 'dist/stats.html',
        gzipSize: true,
        brotliSize: true,
      }),
      ViteImageOptimizer({
        png: { quality: 80 },
        jpeg: { quality: 80 },
        jpg: { quality: 80 },
        webp: { quality: 80 },
      }),
    ].filter(Boolean),

    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },

    build: {
      outDir: 'dist',
      sourcemap: true,
      minify: isProduction ? 'terser' : false,
      cssMinify: isProduction,
      chunkSizeWarningLimit: 1000,
      reportCompressedSize: true,
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes('node_modules')) {
              // Group React and related packages
              if (id.includes('react') || id.includes('react-dom') || id.includes('scheduler')) {
                return 'vendor-react';
              }
              // Group UI libraries
              if (id.includes('@chakra-ui') || id.includes('@emotion') || id.includes('framer-motion')) {
                return 'vendor-ui';
              }
              // Group utility libraries
              if (id.includes('lodash') || id.includes('date-fns') || id.includes('axios')) {
                return 'vendor-utils';
              }
              return 'vendor';
            }
          },
        },
      },
      terserOptions: {
        compress: {
          drop_console: isProduction,
          drop_debugger: isProduction,
          pure: ['console.log', 'console.info', 'console.warn'],
        },
        format: {
          comments: false,
        },
      },
    },

    server: {
      port: 3000,
      open: true,
      host: true,
      hmr: {
        overlay: false,
      },
    },

    preview: {
      port: 3000,
      open: true,
    },

    css: {
      devSourcemap: !isProduction,
      modules: {
        generateScopedName: isProduction ? '[hash:base64:5]' : '[name]__[local]',
      },
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/styles/variables.scss";`,
        },
      },
    },
    
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-router-dom'],
      exclude: [],
      esbuildOptions: {
        treeShaking: true,
      },
    },
    
    cacheDir: `./node_modules/.vite`,
  };
});
