<script lang="ts">
	import type { Direction } from '$lib/types';
	import { KDrawer } from '.';
	import { fly } from 'svelte/transition';
	import type { AdaptiveNavItem, AdaptiveNavStyle } from './KAdaptiveNav';
	import KNavMenu from '../util/components/KNavMenu.svelte';
	import KThemeProvider from './KThemeProvider.svelte';

	export let breakpoints: Record<number, AdaptiveNavStyle> = {
		0: 'side-drawer-menu',
		600: 'side-menu'
	};
	export let items: AdaptiveNavItem[] = [];
	export let direction: Direction = 'left';
	export let show = false;
	export let collapsible = false;
	export let active: string | null = null;

	let currentWidth = typeof window !== 'undefined' ? window.innerWidth : 0;
	$: currentStyle =
		Object.entries(breakpoints)
			.sort(([a], [b]) => Number(b) - Number(a))
			.find(([a]) => currentWidth >= Number(a))?.[1] ?? 'side-drawer-menu';
	$: collapsible = currentStyle === 'side-drawer-menu' || currentStyle === 'collapse-menu';
</script>

<svelte:window bind:innerWidth={currentWidth} />

<KThemeProvider />

<div class="k-adaptive-nav" data-style={currentStyle} data-direction={direction}>
	{#if currentStyle === 'side-drawer-menu'}
		<KDrawer bind:show direction="left">
			<KNavMenu {items} bind:active>
				<svelte:fragment slot="before">
					{#if $$slots.before}
						<slot name="before" />
					{/if}
				</svelte:fragment>
				<svelte:fragment slot="after">
					{#if $$slots.after}
						<slot name="after" />
					{/if}
				</svelte:fragment>
			</KNavMenu>
		</KDrawer>
	{:else if currentStyle === 'side-menu'}
		<KNavMenu {items} bind:active>
			<svelte:fragment slot="before">
				{#if $$slots.before}
					<slot name="before" />
				{/if}
			</svelte:fragment>
			<svelte:fragment slot="after">
				{#if $$slots.after}
					<slot name="after" />
				{/if}
			</svelte:fragment>
		</KNavMenu>
	{:else}
		<span>Not Implemented</span>
	{/if}
	<slot />
</div>

<style lang="scss">
	.k-adaptive-nav {
		&[data-style='side-menu'] {
			display: flex;
			gap: 0.5rem;
			height: 100%;
			> nav {
				height: 100%;
			}
			&[data-direction='left'] {
				flex-direction: row;
			}
			&[data-direction='right'] {
				flex-direction: row-reverse;
			}
		}
		&.tabs,
		&[data-style='collapse-menu'] {
			display: flex;
			width: 100%;
			&[data-direction='top'] {
				flex-direction: column;
			}
			&[data-direction='bottom'] {
				flex-direction: column-reverse;
			}
		}
	}
</style>
