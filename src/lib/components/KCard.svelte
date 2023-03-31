<script lang="ts">
	import { KThemeProvider } from '.';
	import { Sizes, type Size, type State } from '..';
	export let size: Size | string = 'medium';
	export let state: State | undefined = undefined;
	export let bordered = true;
	$: validSize = Sizes.includes(size as Size);
</script>

<KThemeProvider />

<div
	class="k-card"
	data-bordered={bordered}
	style:--text-color={state ? `var(--k-colors-background-0)` : 'var(--k-colors-text-0)'}
	style:--size={`var(--k-size-${validSize ? size : 'X'}, ${size})`}
	style:--color={`var(--k-colors-${state})`}
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
			border-color: var(--color, var(--k-colors-border-0));
		}
		> header {
			color: var(--text-color);
			padding: var(--k-card-header-padding);
			background-color: var(--color, var(--k-colors-border-0));
		}
		> main {
			flex-grow: 1;
			padding: var(--k-card-main-padding);
		}
		> footer {
			color: var(--text-color);
			padding: var(--k-card-footer-padding);
			background-color: var(--color, var(--k-colors-border-0));
		}
	}
</style>
