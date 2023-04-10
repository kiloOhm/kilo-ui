<script lang="ts">
	import { KThemeProvider } from '.';
	import { Sizes, type Size, type Color, Colors } from '..';
	export let bordered = true;
	/**
	 * @type {'3xs' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl' | '9xl' | string}
	 */
	export let size: Size | string = 'md';
	/**
	 * @type {'blue' | 'purple' | 'green' | 'yellow' | 'red' | string | undefined}
	 */
	export let color: Color | string = 'var(--k-colors-border-0)';
	$: validSize = Sizes.includes(size as Size);
	$: _color = Colors.includes(color as Color) ? `var(--k-colors-${color}-darken-4)` : color;
	let restClass: string, restProps: any;
	$: (() => {
		const { class: _class, ...props } = $$restProps;
		restClass = _class;
		restProps = props;
	})();
</script>

<KThemeProvider />

<div
	class="k-card {restClass ?? ''}"
	{...restProps}
	data-bordered={bordered}
	style:--size={`var(--k-size-${validSize ? size : 'X'}, ${size})`}
	style:--color={_color}
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
		&[data-bordered='true'] {
			border-width: var(--k-card-border-width);
			border-color: var(--color);
		}
		> header {
			padding: var(--k-card-header-padding);
			background-color: var(--color);
			border-top-left-radius: var(--k-card-border-radius);
			border-top-right-radius: var(--k-card-border-radius);
			&:only-child {
				border-radius: var(--k-card-border-radius);
			}
		}
		> main {
			flex-grow: 1;
			padding: var(--k-card-main-padding);
			&:only-child {
				border-radius: var(--k-card-border-radius);
			}
			&:first-child {
				border-top-left-radius: var(--k-card-border-radius);
				border-top-right-radius: var(--k-card-border-radius);
			}
			&:last-child {
				border-bottom-left-radius: var(--k-card-border-radius);
				border-bottom-right-radius: var(--k-card-border-radius);
			}
		}
		> footer {
			color: var(--text-color);
			padding: var(--k-card-footer-padding);
			background-color: var(--color);
			border-bottom-left-radius: var(--k-card-border-radius);
			border-bottom-right-radius: var(--k-card-border-radius);
			&:only-child {
				border-radius: var(--k-card-border-radius);
			}
		}
	}
</style>
