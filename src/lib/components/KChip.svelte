<script lang="ts">
	import KBtn from './KBtn.svelte';
	import KIcon from './KIcon.svelte';
	import IonClose from '~icons/ion/close';
	import { createEventDispatcher } from 'svelte';
	import { Colors, Sizes, type Color, type Size } from '../types.d';
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
	export let color: Color | string = 'var(--k-colors-text-0)';
	/**
	 * @type {'pill' | 'circle' | 'sharp' | undefined}
	 */
	export let shape: 'sharp' | 'pill' | null = null;

	$: validSize = Sizes.includes(size as Size);
	$: _color = Colors.includes(color as Color) ? `var(--k-colors-${color}-darken-4)` : color;
	let restClass: string, restProps: any;
	$: (() => {
		const { class: _class, ...props } = $$restProps;
		restClass = _class;
		restProps = props;
	})();
</script>

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
				<IonClose />
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
