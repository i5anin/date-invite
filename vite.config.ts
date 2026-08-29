import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// На GitHub Pages сайт живёт в подпути /date-invite/, локально — в корне.
const base = process.env.GITHUB_ACTIONS ? '/date-invite/' : '/'

export default defineConfig({
  base,
  plugins: [vue()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  server: { host: '127.0.0.1', port: 5187 },
})
