<script lang="ts">
	import { Colors, Sizes, type Color, type Size } from '..';
	import KThemeProvider from './KThemeProvider.svelte';
	const uid = crypto.randomUUID();
	export let checked = false;
	export let shape: 'round' | 'sharp' | undefined = undefined;
	export let size: Size | string = 'medium';
	export let checkedColor: Color | string = 'var(--k-colors-success-darken-4)';
	export let uncheckedColor: string = 'var(--k-colors-background-2)';
	$: validSize = Sizes.includes(size as Size);
	$: _checkedColor = Colors.includes(checkedColor as Color)
		? `var(--k-colors-${checkedColor}-darken-4)`
		: checkedColor;
</script>

<KThemeProvider />

<div
	class="k-switch"
	style:--size={`var(--k-size-${validSize ? size : 'X'}, ${size})`}
	style:--border-radius={shape === 'round'
		? '9999px'
		: shape === 'sharp'
		? '0'
		: 'var(--k-switch-border-radius)'}
	style:--track-color={checked ? _checkedColor : uncheckedColor}
	class:checked
	on:click={() => (checked = !checked)}
	on:keyup={(e) => {
		if (e.key === 'Enter') {
			checked = !checked;
		}
	}}
>
	{#if $$slots.label}
		<label for={uid}>
			<slot name="label" />
		</label>
	{/if}
	<input type="checkbox" class="k-switch__input" id={uid} bind:checked />
	<div class="track">
		{#if $$slots.checked}
			<slot name="checked" />
		{/if}
		<div class="thumb">
			{#if $$slots.thumb}
				<slot name="thumb" />
			{/if}
		</div>
		{#if $$slots.unchecked}
			<slot name="unchecked" />
		{/if}
	</div>
</div>

<style lang="scss">
	.k-switch {
		> input {
			display: none;
		}
		font-size: var(--size);
		display: inline-flex;
		align-items: center;
		cursor: pointer;
		user-select: none;
		> label {
			margin-right: 0.5rem;
		}
		> .track {
			position: relative;
			background-color: var(--track-color);
			width: calc(var(--k-switch-size) * 2);
			height: var(--k-switch-size);
			border-width: var(--k-switch-border-width);
			border-style: solid;
			border-color: var(--track-color);
			border-radius: var(--border-radius);
			box-sizing: content-box;
			> .thumb {
				border-radius: var(--border-radius);
				position: absolute;
				transition-property: transform;
				left: 0;
				top: 0;
				height: 100%;
				aspect-ratio: 1/1;
				background-color: var(--k-switch-thumb-color);
			}
		}
		&.checked {
			> .track {
				> .thumb {
					transform: translateX(100%);
				}
			}
		}
	}
</style>
