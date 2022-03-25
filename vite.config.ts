import { defineConfig } from 'vite'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import laravel, { callArtisan, findPhpPath } from 'vite-plugin-laravel'
import vue from '@vitejs/plugin-vue'
import inertia from './resources/scripts/vite/inertia-layout'

export default defineConfig({
	plugins: [
		inertia(),
		vue(),
		laravel({
			postcss: [
				tailwindcss(),
				autoprefixer(),
			],
			watch: [
				{
					condition: (file) => file.includes('routes/'),
					handle: () => callArtisan(findPhpPath(), 'ziggy:generate', './resources/scripts/ziggy.js'),
				},
			]
		}),
	],
})