<script lang="ts">
	import KThemeProvider from './KThemeProvider.svelte';
	import type { MenuItemMixed, MenuItem } from '.';
	import { KMenu } from '.';
	import { randomString } from '$lib/util';
	export let items: MenuItemMixed[];
	export let active: string | null = null;
	const uid = randomString(8);
	let menuRef: HTMLElement;
	let pointerRef: HTMLElement;
	function setActive(key: string) {
		active = key;
	}
	$: (() => {
		if (!pointerRef) return;
		if (active) {
			pointerRef.style.opacity = '.2';
			const activeElement = document.getElementById(`k-menu-item-${uid}-${active}`);
			if (activeElement) {
				const { top, left, height, width } = activeElement.getBoundingClientRect();
				const { top: menuTop } = menuRef.getBoundingClientRect();
				pointerRef.style.top = `${top - menuTop}px`;
				pointerRef.style.height = `${height}px`;
				pointerRef.style.left = `${left}px`;
				pointerRef.style.width = `${width}px`;
			}
		} else {
			pointerRef.style.opacity = '0';
		}
	})();
</script>

<KThemeProvider />

<div bind:this={menuRef} class="k-menu">
	{#each items as item}
		{#if item.type === 'category'}
			<div class="category">
				{item.label ?? item.key}
			</div>
		{:else if item.type === 'divider'}
			<div class="divider">
				<div class="line" />
				{#if item.label}
					<div class="label">
						{item.label}
					</div>
					<div class="line" />
				{/if}
			</div>
		{:else if item.type === 'item'}
			{@const { key } = item}
			<div
				class="item"
				id={`k-menu-item-${uid}-${key}`}
				class:active={active === key}
				on:click={() => setActive(key)}
				on:keypress={() => setActive(key)}
			>
				{item.label ?? item.key}
			</div>
		{/if}
	{/each}
	<div class="pointer" bind:this={pointerRef} />
</div>

<style lang="scss">
	.k-menu {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 0.5em;
		padding: 0.5em;
		> .category,
		.item {
			padding: 0.25em 4em 0.25em 1em;
			border-radius: var(--k-menu-item-border-radius);
			cursor: pointer;
			white-space: nowrap;
			transition-property: background-color, color;
			&:hover {
				background: var(--k-colors-background-1);
			}
			&.active {
				color: var(--k-colors-info);
			}
		}
		> .divider {
			display: flex;
			align-items: center;
			gap: 0.5em;
			color: var(--k-menu-divider-color);
			> .line {
				height: 2px;
				min-width: 2em;
				background: var(--k-menu-divider-color);
			}
		}
		> .pointer {
			position: absolute;
			transition-property: left, top, opacity;
			background-color: var(--k-colors-info);
			opacity: 0.2;
			width: 100%;
			border-radius: var(--k-menu-item-border-radius);
		}
	}
</style>
