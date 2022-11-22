import path from 'node:path'
import process from 'node:process'
import { defineConfig } from 'vite'

// https://github.com/gxmari007/vite-plugin-eslint
import eslintPlugin from 'vite-plugin-eslint'

// https://github.com/vitejs/vite/tree/main/packages/plugin-vue#readme
import vue from '@vitejs/plugin-vue'

/// https://github.com/antfu/unplugin-vue-components
import Components from 'unplugin-vue-components/vite'
import { Vuetify3Resolver } from 'unplugin-vue-components/resolvers'

// https://github.com/brillout/vite-plugin-ssr
import ssr from 'vite-plugin-ssr/plugin'

const envConfig = process.env.NODE_ENV === 'production' ? {} : {}

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		assetsInlineLimit: 256
	},

	plugins: [
		eslintPlugin(),
		vue(),
		Components({
			resolvers: [Vuetify3Resolver()]
		}),
		ssr({
			includeAssetsImportedByServer: true
			// prerender: true
		})
	],

	resolve: {
		alias: {
			'#root': path.resolve('./src')
		}
	},

	ssr: { noExternal: ['vuetify'] },

	...envConfig
})
