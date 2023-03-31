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
			Object.entries(raw).map(([path, moduleGetter]) =>
				(async () => {
					return {
						path,
						module: ((await modules[path]()) as any).default,
						code: (((await moduleGetter()) as any).default as string).replaceAll('$lib', 'kilo-ui')
					};
				})()
			)
		)
	};
}
