import { defineConfig } from 'vite'

export default defineConfig({
  base: './',

  server: {
  host: '0.0.0.0',
  port: 5173,
  open: false,
  allowedHosts: [
    'localhost',
    '.ngrok-free.dev',
    '.ngrok.io',
    '.loca.lt'
  ]
  },

  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    minify: 'terser',
    sourcemap: false,
    assetsInlineLimit: 4096,
    rollupOptions: {
      output: {
        manualChunks: undefined,
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js'
      }
    }
  },

  css: {
    devSourcemap: true
  },

  preview: {
    port: 4173,
    open: true
  }
})
