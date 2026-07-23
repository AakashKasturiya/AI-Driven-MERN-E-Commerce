import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  css: {
    theme: {
      colors: {
        'bg-coral': '#FF6B6B',
        'text-coral': '#FF6B6B',
      },
    },
  },
})