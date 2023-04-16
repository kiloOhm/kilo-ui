<script lang="ts">
	import { KIcon } from '.';
	import { Colors, Sizes, type Color, type Size } from '../types.d';
	import { getContext, onDestroy } from 'svelte';
	import KThemeProvider from './KThemeProvider.svelte';

	export let show = true;
	/**
	 * if defined, prepends header with caret and title
	 * @type {string | null}
	 */
	export let title: string | null = null;
	/**
	 * @type {'3xs' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl' | '9xl' | string}
	 */
	export let size: Size | string = 'xl';
	/**
	 * @type {'blue' | 'purple' | 'green' | 'yellow' | 'red' | string}
	 */
	export let color: Color | string | undefined = undefined;
	export let bordered = false;
	/**
	 * @type {'start' | 'end' }
	 */
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
	let restClass: string, restProps: any;
	$: (() => {
		const { class: _class, ...props } = $$restProps;
		restClass = _class;
		restProps = props;
	})();
</script>

<KThemeProvider />
<div
	class="k-collapse {restClass ?? ''}"
	{...restProps}
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
								<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"
									><path
										d="M256 217.9L383 345c9.4 9.4 24.6 9.4 33.9 0 9.4-9.4 9.3-24.6 0-34L273 167c-9.1-9.1-23.7-9.3-33.1-.7L95 310.9c-4.7 4.7-7 10.9-7 17s2.3 12.3 7 17c9.4 9.4 24.6 9.4 33.9 0l127.1-127z"
										fill="currentColor"
									/></svg
								>
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
