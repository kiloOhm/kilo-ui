<script lang="ts">
	import KThemeProvider from './KThemeProvider.svelte';
	import { type MenuItemMixed, type MenuItem, KDivider } from '.';
	import { createEventDispatcher } from 'svelte';
	import { Colors, type Color } from '$lib';
	const dispatch = createEventDispatcher();

	export let items: MenuItemMixed[];
	$: itemsWithoutDividers = items.filter((item) => item.type !== 'divider') as MenuItem[];
	export let active: string[] | null = [];
	export let multiple = false;
	export let nullable = false;
	export let tabs = false;
	export let backgroundPointer = true;
	export let edgePointer = false;
	export let edgePosition: 'start' | 'end' = 'start';
	export let color: Color | string | undefined = undefined;
	$: validColor = !color || Colors.includes(color as Color);

	let menuRef: HTMLElement;
	let bgPointerRef: HTMLElement;
	let edgePointerRef: HTMLElement;
	function toggle(key: string) {
		if (multiple) {
			if (active?.includes(key) && (active.length > 1 || nullable)) {
				active = active.filter((k) => k !== key);
			} else if (!active?.includes(key)) {
				active = [...(active ?? []), key];
			}
			if (active.length === 0 && nullable) {
				active = null;
			}
		} else {
			if (active?.includes(key) && nullable) {
				active = null;
			} else {
				active = [key];
			}
		}
	}
	let activeElement: Element | null = null;
	let cleanup: (() => void) | null = null;
	$: (() => {
		if (activeElement) {
			cleanup?.();
			const observer = new ResizeObserver(() => {
				if (!activeElement || !menuRef) return;
				const { top, left, height, width } = activeElement.getBoundingClientRect();
				const { top: menuTop, left: menuLeft } = menuRef.getBoundingClientRect();
				pointerPos = {
					top: top - menuTop,
					left: left - menuLeft,
					height,
					width
				};
			});
			observer.observe(activeElement);
			cleanup = () => observer.disconnect();
		} else {
			pointerPos = null;
		}
	})();
	let pointerPos: { top: number; left: number; height: number; width: number } | null = null;
	$: (() => {
		if (!menuRef) return;
		if (!active?.length && !nullable) {
			active = [itemsWithoutDividers[0].key];
		}
		if (active && !multiple) {
			const items = menuRef.querySelectorAll('.item');
			const activeElements = Array.from(items).filter((item) =>
				active!.includes(item.getAttribute('data-key')!)
			);
			activeElement = activeElements[0];
		} else {
			activeElement = null;
		}
	})();
	$: (() => {
		if (pointerPos) {
			const { top, left, height, width } = pointerPos;
			if (bgPointerRef) {
				bgPointerRef.style.top = `${top}px`;
				bgPointerRef.style.height = `${height}px`;
				bgPointerRef.style.left = `${left}px`;
				bgPointerRef.style.width = `${width}px`;
				bgPointerRef.style.opacity = '.2';
			}
			if (edgePointerRef) {
				if (tabs) {
					edgePointerRef.style.left = `${left}px`;
					edgePointerRef.style.width = `${width}px`;
				} else {
					edgePointerRef.style.top = `${top}px`;
					edgePointerRef.style.height = `${height}px`;
				}
				edgePointerRef.style.opacity = '1';
			}
		} else {
			if (bgPointerRef) bgPointerRef.style.opacity = '0';
			if (edgePointerRef) edgePointerRef.style.opacity = '0';
		}
	})();
	function transitionEnd() {
		dispatch('transitionend', active);
	}
</script>

<KThemeProvider />

<div
	bind:this={menuRef}
	class:tabs
	data-edge-pos={edgePosition}
	class="k-menu"
	style:--color={!validColor ? color : `var(--k-colors-${color}, var(--k-colors-blue)`}
>
	{#each items as item}
		{#if item.type === 'category'}
			<div class="category">
				{item.label ?? item.key}
			</div>
		{:else if item.type === 'divider'}
			{#if item.label}
				<KDivider vertical={tabs}>
					{item.label}
				</KDivider>
			{:else}
				<KDivider vertical={tabs} />
			{/if}
		{:else if item.type === 'item'}
			{@const { key } = item}
			<div
				class="item"
				data-key={key}
				class:active={active?.includes(key)}
				on:click={() => toggle(key)}
				on:keypress={() => toggle(key)}
				on:mouseenter={() => dispatch('hover', { key })}
				on:touchstart={() => dispatch('hover', { key })}
			>
				{item.label ?? item.key}
				{#if multiple}
					{#if backgroundPointer}
						<div class="pointer bg" on:transitionend={transitionEnd} />
					{/if}
					{#if edgePointer}
						<div class="pointer edge" on:transitionend={transitionEnd} />
					{/if}
				{/if}
			</div>
		{/if}
	{/each}
	{#if !multiple}
		{#if backgroundPointer}
			<div class="pointer bg" bind:this={bgPointerRef} on:transitionend={transitionEnd} />
		{/if}
		{#if edgePointer}
			<div class="pointer edge" bind:this={edgePointerRef} on:transitionend={transitionEnd} />
		{/if}
	{/if}
</div>

<style lang="scss">
	.k-menu {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: stretch;
		&.tabs {
			flex-direction: row;
		}
		gap: 0.5em;
		> .category,
		.item {
			position: relative;
			padding: 0.25em 1em;
			margin: 0 0.5em;
			border-radius: var(--k-menu-item-border-radius);
			cursor: pointer;
			white-space: nowrap;
			user-select: none;
			transition-property: background-color, color;
			&:hover {
				background: var(--k-colors-background-1-lighten-1);
			}
			&.active {
				color: var(--color);
				> .pointer {
					opacity: 0.2;
					&.edge {
						opacity: 1;
					}
				}
			}
			> .pointer {
				inset: 0;
			}
		}
		.pointer {
			position: absolute;
			transition-property: left, top, width, height, opacity;
			background-color: var(--color);
			opacity: 0;
			filter: brightness(0.8);
			pointer-events: none;
			&.bg {
				border-radius: var(--k-menu-item-border-radius);
			}
			&.edge {
				width: 2px;
				height: 100%;
			}
		}

		&.tabs {
			> .pointer {
				&.edge {
					width: 100%;
					height: 2px;
				}
			}
		}
		&[data-edge-pos='start'] {
			.pointer.edge {
				left: 0;
			}
			&.tabs {
				.pointer.edge {
					top: 0;
				}
			}
		}
		&[data-edge-pos='end'] {
			.pointer.edge {
				right: 0;
			}
			&.tabs {
				.pointer.edge {
					bottom: 0;
				}
			}
		}
	}
</style>
