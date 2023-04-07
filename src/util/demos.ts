/**
 * @param raw import.meta.glob('./demos/*.svelte', { query: 'raw' })
 */
export async function loadComponentDemos(
	raw: Record<string, () => Promise<unknown>>,
	modules: Record<string, () => Promise<unknown>>
): Promise<{ demos: { path: string; module: any; code: any }[] }> {
	if (typeof window === 'undefined') {
		return {
			demos: []
		};
	}
	return {
		demos: await Promise.all(
			Object.entries(raw)
				.sort((a, b) => {
					const aName = a[0].split('/').pop();
					const bName = b[0].split('/').pop();
					if (!aName || !bName) return 0;
					try {
						const aNum = Number(aName.split(' ')[0]);
						const bNum = Number(bName.split(' ')[0]);
						if (isNaN(aNum) || isNaN(bNum)) {
							return aName.localeCompare(bName);
						}
						return aNum - bNum;
					} catch {
						return aName.localeCompare(bName);
					}
				})
				.map(([path, moduleGetter]) =>
					(async () => {
						return {
							path,
							module: ((await modules[path]()) as any).default,
							code: (((await moduleGetter()) as any).default as string).replaceAll(
								'$lib',
								'kilo-ui'
							)
						};
					})()
				)
		)
	};
}
