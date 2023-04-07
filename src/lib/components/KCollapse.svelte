<script lang="ts">
	import { KIcon } from '.';
	import IonIosArrowUp from '~icons/ion/ios-arrow-up';
	import { Colors, Sizes, type Color, type Size } from '../types.d';
	import { getContext, onDestroy } from 'svelte';
	import KThemeProvider from './KThemeProvider.svelte';

	export let show = true;
	export let title: string | null = null;
	export let size: Size | string = 'xl';
	export let color: Color | string | undefined = undefined;
	export let bordered = false;
	export let caretPosition: 'start' | 'end' = 'end';
	let ref: HTMLElement;
	let offscreenRef: HTMLElement;
	let width: string;
	let height: string;

	let observers: ResizeObserver[] = [];
	$: (() => {
		for (let observer of observers) {
			observer.disconnect();
		}
		observers = [];
		if (ref) {
			const observer = new ResizeObserver((entries) => {
				width = `${entries[0].contentRect.width}px`;
			});
			observer.observe(ref);
			observers.push(observer);
		}
		if (offscreenRef) {
			const observer = new ResizeObserver((entries) => {
				height = `${entries[0].contentRect.height}px`;
			});
			observer.observe(offscreenRef);
			observers.push(observer);
		}
	})();
	let ctxToggle: () => void;
	function toggle() {
		if (ctxToggle) {
			ctxToggle();
		} else {
			show = !show;
		}
	}
	$: validSize = Sizes.includes(size as Size);
	$: validColor = !color || Colors.includes(color as Color);
	const accordionCTX = getContext('k-accordion-ctx') as (callback: (active: boolean) => void) => {
		cleanup(): void;
		toggle(): void;
	};
	if (accordionCTX) {
		const { cleanup, toggle: _toggle } = accordionCTX((active) => {
			show = active;
		});
		onDestroy(cleanup);
		ctxToggle = _toggle;
	}
</script>

<KThemeProvider />

<div
	class="k-collapse"
	style:--size={`var(--k-size-${validSize ? size : 'X'}, ${size})`}
	style:--color={!validColor ? color : `var(--k-colors-${color}-darken-4, var(--k-colors-border-0)`}
	style:border-color={bordered && (show || title || $$slots.header)
		? 'var(--color)'
		: 'transparent'}
>
	{#if $$slots.header || title}
		<header>
			{#if $$slots.header}
				<slot name="header" />
			{:else if title}
				<div class="premade" on:click={toggle} on:keypress={toggle} data-caret-pos={caretPosition}>
					<div class="caret-wrapper" style:transform={`rotate(${show ? 180 : 0}deg)`}>
						{#if $$slots.caret}
							<slot name="caret" />
						{:else}
							<KIcon size={`calc(${size} / 2)`}>
								<IonIosArrowUp />
							</KIcon>
						{/if}
					</div>
					<h3>{title}</h3>
				</div>
			{/if}
		</header>
	{/if}
	<div
		bind:this={ref}
		style:height={show ? height : '0'}
		style:opacity={show ? 1 : 0}
		class="collapse-container"
	>
		<div class="content-container">
			<slot />
		</div>
	</div>
	<div class="offscreen" style:width bind:this={offscreenRef}>
		<div>
			<slot />
		</div>
	</div>
</div>

<style lang="scss">
	.k-collapse {
		border-radius: var(--k-collapse-header-border-radius);
		border-width: var(--k-collapse-header-border-width);
		overflow: hidden;
		box-sizing: border-box;
		> header {
			> .premade {
				cursor: pointer;
				display: flex;
				align-items: center;
				gap: 1rem;
				padding: var(--k-collapse-header-padding);
				background-color: var(--color);
				user-select: none;
				&[data-caret-pos='end'] {
					flex-direction: row-reverse;
				}
				> .caret-wrapper {
					display: flex;
				}
				> h3 {
					flex-grow: 1;
					font-size: var(--size);
				}
			}
		}
		> .collapse-container {
			overflow: hidden;
			position: relative;
			transition-property: opacity, height;
			> .content-container {
				position: absolute;
				left: 0;
				right: 0;
				bottom: 0;
			}
		}
	}
	.offscreen {
		position: fixed;
		box-sizing: border-box;
		top: -9999px;
		left: -9999px;
	}
</style>
