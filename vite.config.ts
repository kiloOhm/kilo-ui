import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import Icons from 'unplugin-icons/vite';
import { Sitemap } from 'vite-plugin-svelte-sitemap';

export default defineConfig({
	define: {
		APP_VERSION: JSON.stringify(process.env.npm_package_version)
	},
	publicDir: 'static',
	plugins: [
		sveltekit(),
		Icons({
			compiler: 'svelte',
			autoInstall: true
		}),
		Sitemap({
			baseurl: 'https://kiloui.com'
		})
	]
});
