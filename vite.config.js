import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  ssr: {
    // Bundle these for the Node prerender pass to avoid CJS/ESM interop crashes.
    noExternal: ['react-helmet-async', 'lucide-react'],
  },
  ssgOptions: {
    entry: 'src/main.jsx',
    // /test/reaction-time -> dist/test/reaction-time/index.html (clean URLs on Vercel)
    dirStyle: 'nested',
  },
})
