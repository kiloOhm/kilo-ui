<script lang="ts">
	import { type Color, Colors } from '../types.d';

	export let vertical: boolean = false;
	export let width: string = '1px';
	/**
	 * @type {'blue' | 'purple' | 'green' | 'yellow' | 'red' | string}
	 */
	export let color: Color | string = 'var(--k-colors-border-1)';
	$: _color = Colors.includes(color as Color) ? `var(--k-colors-${color}-darken-4)` : color;
	let restClass: string, restProps: any;
	$: (() => {
		const { class: _class, ...props } = $$restProps;
		restClass = _class;
		restProps = props;
	})();
</script>

<div
	class="k-divider {restClass ?? ''}"
	{...restProps}
	class:vertical
	style:flex-direction={vertical ? 'column' : 'row'}
	style:--line-width={width}
	style:--color={_color}
>
	<hr />
	{#if $$slots.default}
		<div class="content-container">
			<slot />
		</div>
		<hr />
	{/if}
</div>

<style lang="scss">
	.k-divider {
		display: flex;
		justify-content: stretch;
		align-items: center;
		color: var(--color);
		> hr {
			width: 100%;
			height: var(--line-width);
			background-color: var(--color, red);
			border: none;
		}
		> .content-container {
			padding: 0 0.5em;
			white-space: nowrap;
		}
		&.vertical {
			> hr {
				width: var(--line-width);
				height: 100%;
			}
			> .content-container {
				padding: 0.5em 0;
			}
		}
	}
</style>
