<script lang="ts">
	import { KThemeProvider } from '.';
	import { Sizes, type Size, type Color } from '..';
	export let size: Size | string = 'medium';
	export let color: Color | undefined = undefined;
	export let noColorCorrection: boolean = false;
	$: validSize = Sizes.includes(size as Size);
</script>

<KThemeProvider />

<div
	class="k-icon"
	style:--size={`var(--k-size-${validSize ? size : 'X'}, ${size})`}
	style:--color={`var(--k-colors-${color}, currentColor)`}
	class:noColorCorrection
>
	<slot />
</div>

<style lang="scss">
	.k-icon {
		line-height: 1;
		font-size: var(--size);
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: var(--k-icon-size);
		height: var(--k-icon-size);
		&:not(.noColorCorrection) > :global(svg) {
			color: var(--color);
			fill: var(--color);
			stroke: var(--color);
		}
		> :global(svg) {
			width: var(--k-icon-size);
			height: var(--k-icon-size);
		}
	}
</style>
