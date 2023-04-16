<script lang="ts">
	import KBtn from './KBtn.svelte';
	import KIcon from './KIcon.svelte';
	import { createEventDispatcher } from 'svelte';
	import { KColors, Sizes, type KColor, type Size } from '../types.d';
	import { KThemeProvider } from '.';
	const dispatch = createEventDispatcher();

	/**
	 * @type {string | null}
	 */
	export let text: string | null = null;
	export let ghost = false;
	/**
	 * @type {'3xs' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl' | '9xl' | string}
	 */
	export let size: Size | string = 'md';
	/**
	 * @type {'blue' | 'purple' | 'green' | 'yellow' | 'red' | string}
	 */
	export let color: KColor | string = 'var(--k-colors-text-0)';
	/**
	 * @type {'pill' | 'circle' KColorarp' | undefined}
	 */
	export let shape: 'sharp' | 'pill' | null = null;

	$: validSize = Sizes.includes(size as Size);
	$: _color = KColors.includes(color as KColor) ? `var(--k-colors-${color}-darken-4)` : color;
	let restClass: string, restProps: Record<string, any>;
	$: (() => {
		const { class: _class, ...props } = $$restProps;
		restClass = _class;
		restProps = props;
	})();
</script>

<KThemeProvider />
<div
	class="k-chip {restClass ?? ''}"
	{...restProps}
	class:ghost
	data-shape={shape}
	style:--size={`var(--k-size-${validSize ? size : 'X'}, ${size})`}
	style:--color={_color}
>
	{#if $$slots.default}
		<slot />
	{:else}
		<span>
			{text}
		</span>
	{/if}
	<KBtn
		on:click={() => dispatch('close')}
		size=".3em"
		{color}
		priority="tertiary"
		shape="circle"
		on:click={() => dispatch('close')}
	>
		{#if $$slots.close}
			<slot name="close" />
		{:else}
			<KIcon size="2.5em">
				<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"
					><path
						fill="currentColor"
						d="m289.94 256l95-95A24 24 0 0 0 351 127l-95 95l-95-95a24 24 0 0 0-34 34l95 95l-95 95a24 24 0 1 0 34 34l95-95l95 95a24 24 0 0 0 34-34Z"
					/></svg
				>
			</KIcon>
		{/if}
	</KBtn>
</div>

<style lang="scss">
	.k-chip {
		font-size: var(--size);
		color: var(--color);
		background-color: var(--k-colors-background-2);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--k-chip-padding);
		gap: var(--k-chip-gap);
		border-radius: var(--k-chip-border-radius);
		border-color: transparent;
		border-width: var(--k-chip-border-width);
		border-style: solid;
		transition-property: border-color;
		&[data-shape='pill'] {
			border-radius: 9999px;
		}
		&[data-shape='sharp'] {
			border-radius: 0;
		}
		&.ghost {
			background-color: transparent;
			color: var(--color);
			border-color: var(--color);
		}
	}
</style>
