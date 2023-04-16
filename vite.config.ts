import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import Icons from 'unplugin-icons/vite';
import sveld from 'vite-plugin-sveld';
import { Sitemap } from 'vite-plugin-svelte-sitemap';

export default defineConfig({
	define: {
		APP_VERSION: JSON.stringify(process.env.npm_package_version)
	},
	server: {
		host: true,
		port: 5174
	},
	ssr: {
		noExternal: ['@popperjs/core']
	},
	plugins: [
		sveltekit(),
		sveld(),
		Icons({
			compiler: 'svelte',
			autoInstall: true
		}),
		Sitemap({
			baseurl: 'https://kiloui.com'
		})
	]
});
