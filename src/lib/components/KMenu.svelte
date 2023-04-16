<script lang="ts">
	// Events
	/**
	 * @event {{ key: string }} hover - Fired when hovering a menu item, useful for preloading
	 * @event {{ key: string }} select - Fired when a menu item is selected
	 * @event {{ active: string[] | null }} transitionend - Fired when the pointer transition ends
	 */
	import KThemeProvider from './KThemeProvider.svelte';
	import { type MenuItemMixed, type MenuItem, KDivider } from '.';
	import { createEventDispatcher } from 'svelte';
	import { Colors, Sizes, type Color, type Size } from '../types.d';
	const dispatch = createEventDispatcher();

	export let items: MenuItemMixed[];
	$: itemsWithoutDividers = items.filter((item) => item.type !== 'divider') as MenuItem[];
	/**
	 * @type {string[] | null}
	 */
	export let active: string[] | null = [];
	export let multiple = false;
	/**
	 * @type {number | null}
	 */
	export let maxSelected: number | null = null;
	export let nullable = false;
	export let tabs = false;
	export let backgroundPointer = true;
	export let edgePointer = false;
	/**
	 * @type {'start' | 'end'}
	 */
	export let edgePosition: 'start' | 'end' = 'start';
	/**
	 * @type {Color | string | undefined}
	 */
	export let color: Color | string | undefined = undefined;
	/**
	 * @type {Size | string}
	 */
	export let size: Size | string = 'md';
	/**
	 * @type {'pill' | 'sharp' | undefined}
	 */
	export let shape: 'pill' | 'sharp' | undefined = undefined;
	/**
	 * recomputes pointer position, only works if multiple = false
	 * @type {() => void}
	 */
	export function updatePointerPos() {
		if (!activeElement || !menuRef) return;
		const { top, left, height, width } = activeElement.getBoundingClientRect();
		const { top: menuTop, left: menuLeft } = menuRef.getBoundingClientRect();
		pointerPos = {
			top: top - menuTop,
			left: left - menuLeft,
			height,
			width
		};
	}

	$: validColor = !color || Colors.includes(color as Color);
	$: validSize = Sizes.includes(size as Size);

	let menuRef: HTMLElement;
	let bgPointerRef: HTMLElement;
	let edgePointerRef: HTMLElement;
	function toggle(key: string) {
		if (multiple) {
			if (active?.includes(key) && (active.length > 1 || nullable)) {
				active = active.filter((k) => k !== key);
			} else if (!active?.includes(key)) {
				if (active && maxSelected && active.length >= maxSelected) {
					active = active?.slice(1);
				}
				dispatch('select', key);
				active = [...(active ?? []), key];
			}
			if (active.length === 0 && nullable) {
				active = null;
			}
		} else {
			if (active?.includes(key) && nullable) {
				active = null;
			} else {
				dispatch('select', key);
				active = [key];
			}
		}
	}
	let activeElement: Element | null = null;
	$: if (items?.length) {
		updatePointerPos();
	}
	let cleanup: (() => void) | null = null;
	$: (() => {
		if (activeElement) {
			cleanup?.();
			const ro = new ResizeObserver(updatePointerPos);
			ro.observe(activeElement);
			const wheelListener = (e: WheelEvent) => {
				if (e.target === menuRef) {
					updatePointerPos();
				}
			};
			const io = new IntersectionObserver(updatePointerPos, {
				root: menuRef,
				rootMargin: '0px',
				threshold: 1.0
			});
			io.observe(activeElement);
			menuRef.addEventListener('wheel', wheelListener, {
				passive: true
			});
			cleanup = () => {
				ro.disconnect();
				io.disconnect();
				menuRef.removeEventListener('wheel', wheelListener);
			};
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
				active?.includes(item.getAttribute('data-key')!)
			);
			if (activeElements.length) {
				activeElement = activeElements[0];
			} else {
				activeElement = null;
			}
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
	let restClass: string, restProps: any;
	$: (() => {
		const { class: _class, ...props } = $$restProps;
		restClass = _class;
		restProps = props;
	})();
</script>

<KThemeProvider>
	<div
		class="k-menu {restClass ?? ''}"
		{...restProps}
		bind:this={menuRef}
		class:tabs
		data-edge-pos={edgePosition}
		data-shape={shape}
		style:--color={!validColor ? color : `var(--k-colors-${color}, var(--k-colors-blue)`}
		style:--size={!validSize ? size : `var(--k-sizes-${size}, var(--k-sizes-md)`}
	>
		{#each items as item}
			{#if item.type === 'divider'}
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
					<span>
						{item.label ?? item.key}
					</span>
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
</KThemeProvider>

<style lang="scss">
	.k-menu {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: stretch;
		overflow: auto;
		font-size: var(--size);
		&.tabs {
			flex-direction: row;
		}
		gap: var(--k-menu-item-gap);
		> .category,
		.item {
			position: relative;
			padding: var(--k-menu-item-padding);
			border-radius: var(--k-menu-item-border-radius);
			cursor: pointer;
			white-space: nowrap;
			user-select: none;
			transition-property: background-color;
			&:hover {
				background: var(--k-colors-background-1-lighten-4);
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
		&[data-shape='pill'] {
			.pointer.bg {
				border-radius: 9999px;
			}
		}
		&[data-shape='sharp'] {
			.pointer.bg {
				border-radius: 0;
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
				width: var(--k-menu-edge-width);
				height: 100%;
			}
		}

		&.tabs {
			> .pointer {
				&.edge {
					width: 100%;
					height: var(--k-menu-edge-width);
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
