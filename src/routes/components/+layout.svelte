<script lang="ts">
	import { KAdaptiveNav, type AdaptiveNavItem } from '$lib';
	import { getContext } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import type { LayoutData } from './$types';
	import KPageTransitionProvider from '$lib/components/KPageTransitionProvider.svelte';
	export let data: LayoutData;

	$: path = data.pathname.split('/')[2];
	let show = false;
	let collapsible = false;
	const items: AdaptiveNavItem[] = data.pages.map((name) => ({
		type: 'item',
		key: name
	}));
	const setHamburger = getContext('header-set-hamburger') as (show: boolean) => void;
	$: setHamburger(collapsible);
	const setHamBurgerClickCallback = getContext('header-on-hamburger-click') as (
		callback: () => void
	) => void;
	$: setHamBurgerClickCallback(() => (show = !show));
	let active: string | null = data.pages.includes($page.route.id?.split('/')?.pop() ?? '')
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
	<KAdaptiveNav bind:collapsible bind:show {items} bind:active>
		<div
			class="w-full p-4 text-center cursor-pointer"
			slot="before"
			on:click={() => {
				active = null;
				goto('/components');
			}}
			on:keypress={() => {
				active = null;
				goto('/components');
			}}
		>
			<h1 class="text-lg" style="color: var(--k-colors-text-1)">Components</h1>
		</div>
		<KPageTransitionProvider {path}>
			<slot />
		</KPageTransitionProvider>
	</KAdaptiveNav>
</div>

<style lang="scss">
	.components-layout {
		@apply h-full w-full grid;
	}
</style>
