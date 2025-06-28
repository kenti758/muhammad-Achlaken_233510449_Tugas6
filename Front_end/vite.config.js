import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  // Kalau deploy di root Netlify ➜ base kosong
  base: '',
})
