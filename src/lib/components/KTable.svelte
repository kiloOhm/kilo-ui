<script lang="ts">
	import { Colors, Sizes, type Color, type Size } from '../types.d';
	import KThemeProvider from './KThemeProvider.svelte';

	/**
	 * @type {'3xs' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl' | '9xl' | string}
	 */
	export let size: Size | string = 'md';
	export let bordered = true;
	export let rowBorder = true;
	export let colBorder = true;
	/**
	 * @type {string | undefined}
	 */
	export let caption: string | undefined = undefined;
	/**
	 * @type {'top' | 'bottom'}
	 */
	export let captionSide: 'top' | 'bottom' = 'top';
	/**
	 * @type {'start' | 'center' | 'end'}
	 */
	export let captionAlign: 'start' | 'center' | 'end' = 'start';
	/**
	 * @type {'blue' | 'purple' | 'green' | 'yellow' | 'red' | string}
	 */
	export let color: Color | string | undefined = undefined;
	export let zebra = false;

	$: validSize = Sizes.includes(size as Size);
	$: validColor = !color || Colors.includes(color as Color);
	let restClass: string, restProps: any;
	$: (() => {
		const { class: _class, ...props } = $$restProps;
		restClass = _class;
		restProps = props;
	})();
</script>

<KThemeProvider>
	<table
		class="k-table {restClass ?? ''}"
		{...restProps}
		class:bordered
		class:rowBorder
		class:colBorder
		style:--caption-align={captionAlign}
		style:--caption-side={captionSide}
		style:--size={`var(--k-size-${validSize ? size : 'X'}, ${size})`}
		style:--color={!validColor
			? color
			: `var(--k-colors-${color}-darken-4, var(--k-colors-border-0)`}
		data-zebra={zebra}
	>
		{#if caption}
			<caption>
				<span>{caption}</span>
			</caption>
		{/if}
		<slot />
	</table>
</KThemeProvider>

<style lang="scss">
	table {
		font-size: var(--size);
		border-style: solid;
		border-collapse: separate;
		border-spacing: 0;
		background-color: var(--color);
		overflow: hidden;
		padding: 0;
		width: 100%;
		&[data-zebra='true'] {
			> :global(tbody) {
				> :global(tr:nth-child(even)) {
					> :global(td) {
						background-color: var(--color);
					}
				}
			}
		}
		&.bordered {
			border-color: var(--k-colors-border-1);
			border-width: var(--k-table-border-width);
			border-radius: var(--k-table-border-radius);
		}
		&.rowBorder {
			> :global(thead) {
				> :global(tr:not(:first-child)) {
					> :global(th) {
						border-top: var(--k-table-border-width) solid var(--k-colors-border-1);
					}
				}
			}
			> :global(tbody) {
				> :global(tr:not(:first-child)) {
					> :global(td) {
						border-top: var(--k-table-border-width) solid var(--k-colors-border-1);
					}
				}
			}
			> :global(tfoot) {
				> :global(tr:not(:first-child)) {
					> :global(td) {
						border-top: var(--k-table-border-width) solid var(--k-colors-border-1);
					}
				}
			}
		}
		&.colBorder {
			> :global(thead) {
				> :global(tr) {
					> :global(th:not(:last-child)) {
						border-right: var(--k-table-border-width) solid var(--k-colors-border-1);
					}
				}
			}
			> :global(tbody) {
				> :global(tr) {
					> :global(td:not(:last-child)) {
						border-right: var(--k-table-border-width) solid var(--k-colors-border-1);
					}
				}
			}
			> :global(tfoot) {
				> :global(tr) {
					> :global(td:not(:last-child)) {
						border-right: var(--k-table-border-width) solid var(--k-colors-border-1);
					}
				}
			}
		}
		> :global(caption) {
			caption-side: var(--caption-side);
			text-align: var(--caption-align);
			padding: var(--k-table-caption-padding);
			font-size: 1.25em;
		}
		> :global(thead) {
			> :global(tr) {
				> :global(th:first-child) {
					border-top-left-radius: var(--k-table-border-radius);
				}
				> :global(th:last-child) {
					border-top-right-radius: var(--k-table-border-radius);
				}
				> :global(th) {
					background-color: var(--color);
					padding: var(--k-table-header-padding);
				}
			}
		}
		> :global(tbody) {
			> :global(tr) {
				> :global(td) {
					padding: var(--k-table-body-padding);
					background-color: var(--k-colors-background-1);
				}
			}
		}
		> :global(tfoot) {
			background-color: var(--color);
			> :global(tr) {
				> :global(td:first-child) {
					border-bottom-left-radius: var(--k-table-border-radius);
				}
				> :global(td:last-child) {
					border-bottom-right-radius: var(--k-table-border-radius);
				}
				> :global(td) {
					padding: var(--k-table-footer-padding);
				}
			}
		}
	}
</style>
