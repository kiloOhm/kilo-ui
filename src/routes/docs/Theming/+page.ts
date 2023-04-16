import type { PageLoad } from './$types';

export const load = (async () => {
	return {
		demo: (((await import('./demo.svelte?raw')) as any).default as string).replaceAll(
			'$lib',
			'kilo-ui'
		)
	};
}) satisfies PageLoad;
