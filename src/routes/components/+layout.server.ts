import { getPages } from '../../util/svelte';
import type { LayoutServerLoad } from './$types';

export const load = (async () => {
	const pages = getPages(import.meta.url, import.meta.glob('./**/*.svelte'))
		.map((path) => path.split('/')[3])
		.filter((name) => !name.startsWith('+'))
		.reduce((acc, name) => {
			if (!acc.includes(name)) {
				acc.push(name);
			}
			return acc;
		}, [] as string[]);
	return {
		test: 'test',
		pages
	};
}) satisfies LayoutServerLoad;
