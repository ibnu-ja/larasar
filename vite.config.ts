import laravel, { callArtisan, findPhpPath } from 'vite-plugin-laravel'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'
import autoprefixer from 'autoprefixer'
import { defineConfig } from 'vite'
import inertia from './resources/scripts/vite/inertia-layout'
import tailwindcss from 'tailwindcss'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    inertia(),
    vue({
      template: { transformAssetUrls }
    }),

    quasar({
      sassVariables: 'resources/css/quasar-variables.scss'
    }),
    laravel({
      postcss: [
        tailwindcss(),
        autoprefixer()
      ],
      watch: [
        {
          condition: (file) => file.includes('routes/'),
          handle: () => callArtisan(findPhpPath(), 'ziggy:generate', './resources/scripts/ziggy.js')
        }
      ]
    })
  ]
})
