<script lang="ts">
	import { goto } from '$app/navigation';
	import { getContext } from 'svelte';
	import { page } from '$app/stores';
	import type { LayoutParentData } from './$types';
	import type { AdaptiveNavItem } from '../../components/KAdaptiveNav';
	import KAdaptiveNav from '../../components/KAdaptiveNav.svelte';
	export let data: LayoutParentData;
	$: path = data.pathname.split('/')[2];
	let show = false;
	let collapsible = false;
	const pages = Object.entries(import.meta.glob('./**/*.svelte'))
		.map(([path, _]) => path.split('/')[1])
		.filter((name) => !name.startsWith('+'))
		.reduce((acc, name) => {
			if (!acc.includes(name)) {
				acc.push(name);
			}
			return acc;
		}, [] as string[]);
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
	let active: string | null = pages.includes($page.route.id?.split('/')?.pop() ?? '')
		? $page.route.id?.split('/')?.pop() ?? null
		: null;
	$: (() => {
		if (typeof window === 'undefined') return;
		if (active) {
			goto('/components/' + active).then(() => {
				show = false;
			});
		}
	})();
</script>

<div class="components-layout">
	<slot />
</div>

<style lang="scss">
	.components-layout {
		@apply h-full flex flex-col;
		> header {
			background-color: var(--k-colors-background-1);
			border-bottom: 1px solid var(--k-colors-border-0);
		}
	}
</style>
