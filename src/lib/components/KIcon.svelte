<script lang="ts">
	import { KThemeProvider } from '.';
	import { Sizes, type Size, type KColor } from '..';
	/**
	 * @type {'3xs' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl' | '9xl' | string}
	 */
	export let size: Size | string = 'medium';
	/**
	 * @type {'blue' | 'purple' | 'green' | 'yellow' | 'red' | string}
	 */
	export let color: KColor | undefined = undefined;
	export let noColorCorrection: boolean = false;
	$: validSize = Sizes.includes(size as Size);
	let restClass: string, restProps: any;
	$: (() => {
		const { class: _class, ...props } = $$restProps;
		restClass = _class;
		restProps = props;
	})();
</script>

<KThemeProvider />
<div
	class="k-icon {restClass ?? ''}"
	{...restProps}
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
