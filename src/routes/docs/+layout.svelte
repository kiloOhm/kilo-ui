<script lang="ts">
	import { getContext } from 'svelte';
	import { page } from '$app/stores';
	import { goto, preloadData } from '$app/navigation';
	import type { AdaptiveNavItem } from '../../components/KAdaptiveNav';
	import KAdaptiveNav from '../../components/KAdaptiveNav.svelte';
	import KPageTransitionProvider from '../../components/KPageTransitionProvider.svelte';
	import type { LayoutData } from './$types';
	const pages = Object.entries(import.meta.glob('./**/*.svelte'))
		.map(([path, _]) => path.split('/')[1])
		.filter((name) => !name.startsWith('+'))
		.reduce((acc, name) => {
			if (!acc.includes(name)) {
				acc.push(name);
			}
			return acc;
		}, [] as string[]);
	let show = false;
	let collapsible = false;
	const items: AdaptiveNavItem[] = [
		{
			type: 'item',
			key: 'Components'
		},
		{
			type: 'item',
			key: 'Documentation'
		},
		{
			type: 'divider'
		},
		...pages.map((name) => ({
			type: 'item',
			key: name
		}))
	];
	const setHamburger = getContext('header-set-hamburger') as (show: boolean) => void;
	$: setHamburger(collapsible);
	const setHamBurgerClickCallback = getContext('header-on-hamburger-click') as (
		callback: () => void
	) => void;
	$: setHamBurgerClickCallback(() => (show = !show));
	let active: string[] = pages.includes($page.route.id?.split('/')?.pop() ?? '')
		? $page.route.id?.split('/')?.pop()
			? [$page.route.id?.split('/')?.pop()!]
			: ['Documentation']
		: ['Documentation'];
	$: (() => {
		if (typeof window === 'undefined') return;
		if (active) {
			let target;
			switch (active[0]) {
				case 'Documentation':
					target = '/docs';
					break;
				case 'Components':
					target = '/components';
					break;
				default:
					target = '/docs/' + active;
			}
			if (!target) return;
			goto(target).then(() => {
				show = false;
			});
		}
	})();
	const loaded = new Set();
	function hover(key: string) {
		if (loaded.has(key)) return;
		let url = `/docs/${key}`;
		if (key === 'Documentation') {
			url = '/docs';
		}
		if (key === 'Components') {
			url = '/components';
		}
		preloadData(url).then(() => {
			loaded.add(key);
		});
	}
	export let data: LayoutData;
	$: path = data.pathname.split('/')[2];
</script>

<div class="docs-layout">
	<KAdaptiveNav
		bind:collapsible
		bind:show
		{items}
		bind:active
		on:hover={(e) => hover(e.detail.key)}
	>
		<KPageTransitionProvider {path}>
			<slot />
		</KPageTransitionProvider>
	</KAdaptiveNav>
</div>

<style lang="scss">
	.docs-layout {
		@apply h-full w-full;
		> :global(*) {
			@apply h-full;
		}
	}
</style>
