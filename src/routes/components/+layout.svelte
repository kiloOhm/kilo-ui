<script lang="ts">
	import { getContext } from 'svelte';
	import { page } from '$app/stores';
	import { goto, preloadData } from '$app/navigation';
	import type { AdaptiveNavItem } from '../../components/KAdaptiveNav';
	import KAdaptiveNav from '../../components/KAdaptiveNav.svelte';
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
	const items: AdaptiveNavItem[] = pages.map((name) => ({
		type: 'item',
		key: name
	}));
	const setHamburger = getContext('header-set-hamburger') as (show: boolean) => void;
	$: setHamburger(collapsible);
	const setHamBurgerClickCallback = getContext('header-on-hamburger-click') as (
		callback: () => void
	) => void;
	$: setHamBurgerClickCallback(() => (show = !show));
	let active: string[] = pages.includes($page.route.id?.split('/')?.pop() ?? '')
		? $page.route.id?.split('/')?.pop()
			? [$page.route.id?.split('/')?.pop()!]
			: ['Button']
		: ['Button'];
	$: (() => {
		if (typeof window === 'undefined') return;
		if (active) {
			goto('/components/' + active).then(() => {
				show = false;
			});
		}
	})();
	const loaded = new Set();
	function hover(key: string) {
		if (loaded.has(key)) return;
		preloadData(`/components/${key}`).then(() => {
			loaded.add(key);
		});
	}
</script>

<div class="components-layout">
	<KAdaptiveNav
		bind:collapsible
		bind:show
		{items}
		bind:active
		on:hover={(e) => hover(e.detail.key)}
	>
		<div class="flex-grow overflow-auto">
			<slot />
		</div>
	</KAdaptiveNav>
</div>

<style lang="scss">
	.components-layout {
		@apply h-full w-full;
	}
</style>
