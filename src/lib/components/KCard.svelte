<script lang="ts">
	import { KThemeProvider } from '.';
	import { Sizes, type Size, type Color, Colors } from '..';
	export let size: Size | string = 'md';
	export let color: Color | string | undefined = undefined;
	export let bordered = true;
	$: validSize = Sizes.includes(size as Size);
	$: validColor = !color || Colors.includes(color as Color);
</script>

<KThemeProvider />

<div
	class="k-card"
	data-bordered={bordered}
	style:--size={`var(--k-size-${validSize ? size : 'X'}, ${size})`}
	style:--color={!validColor ? color : `var(--k-colors-${color}-darken-4, var(--k-colors-border-0)`}
>
	{#if $$slots.header}
		<header>
			<slot name="header" />
		</header>
	{/if}
	{#if $$slots.default}
		<main>
			<slot />
		</main>
	{/if}
	{#if $$slots.footer}
		<footer>
			<slot name="footer" />
		</footer>
	{/if}
</div>

<style lang="scss">
	.k-card {
		display: flex;
		flex-direction: column;
		font-size: var(--size);
		background-color: var(--k-colors-background-1);
		border-radius: var(--k-card-border-radius);
		overflow: hidden;
		&[data-bordered='true'] {
			border-style: solid;
			border-width: var(--k-card-border-width);
			border-color: var(--color);
		}
		> header {
			padding: var(--k-card-header-padding);
			background-color: var(--color);
		}
		> main {
			flex-grow: 1;
			padding: var(--k-card-main-padding);
		}
		> footer {
			color: var(--text-color);
			padding: var(--k-card-footer-padding);
			background-color: var(--color);
		}
	}
</style>
