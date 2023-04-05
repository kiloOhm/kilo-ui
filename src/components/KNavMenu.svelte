<!-- FOR USE IN k-adaptive-nav because drawer only works with encapsulated styles -->

<script lang="ts">
	import { KMenu } from '$lib';
	import { createEventDispatcher } from 'svelte';
	import type { AdaptiveNavItem } from './KAdaptiveNav';
	const dispatch = createEventDispatcher();

	export let items: AdaptiveNavItem[] = [];
	export let active: string[] | null = null;
</script>

<nav class="py-8 px-2 overflow-auto">
	{#if $$slots.before}
		<slot name="before" />
	{/if}
	<KMenu
		{items}
		{active}
		on:transitionend={({ detail }) => (active = detail)}
		on:hover={(e) => dispatch('hover', { key: e.detail.key })}
	/>
	{#if $$slots.after}
		<slot name="after" />
	{/if}
</nav>

<style>
	nav {
		display: flex;
		flex-direction: column;
		background-color: var(--k-colors-background-2);
		border-color: var(--k-colors-border-0);
		border-right-width: 1px;
		border-style: solid;
		height: 100%;
	}
</style>
