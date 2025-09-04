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
        // Enable Fast Refresh
        fastRefresh: true,
        // Only include React specific babel transforms in production
        babel: isProduction ? {
          plugins: [
            ['babel-plugin-jsx-remove-data-test-id', { attributes: ['data-testid'] }]
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
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes('node_modules')) {
              if (id.includes('react') || id.includes('react-dom')) {
                return 'vendor-react';
              }
              if (id.includes('@chakra-ui')) {
                return 'vendor-chakra';
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
          pure: ['console.log', 'console.info'],
        },
        format: {
          comments: false,
        },
      },
      // Enable brotli and gzip compression
      reportCompressedSize: true,
      chunkSizeWarningLimit: 1000,
    },

    server: {
      port: 3000,
      open: true,
      host: true,
      // Enable HMR with faster updates
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
      // Enable CSS code splitting
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/styles/variables.scss";`,
        },
      },
    },
    
    // Optimize deps for better caching
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-router-dom'],
      esbuildOptions: {
        // Enable esbuild's tree shaking
        treeShaking: true,
      },
    },
    
    // Enable build caching for faster rebuilds
    cacheDir: `./node_modules/.vite`,
  };
});
