import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePluginFonts } from 'vite-plugin-fonts'
import glsl from 'vite-plugin-glsl'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    glsl(),
    VitePluginFonts({
      google: {
        families: ['Kumar One Outline', 'Kumar One'],
      },
    }),
  ],
})
