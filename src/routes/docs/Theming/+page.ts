import { loadComponentDemos } from '../../../util/demos';
import type { PageLoad } from './$types';

export const load = (async () => {
	return loadComponentDemos(
		import.meta.glob('./demos/*.svelte', { query: 'raw' }),
		import.meta.glob('./demos/*.svelte')
	);
}) satisfies PageLoad;
