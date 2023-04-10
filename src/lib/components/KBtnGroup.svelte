<script lang="ts">
	export let vertical = false;
	let restClass: string, restProps: any;
	$: (() => {
		const { class: _class, ...props } = $$restProps;
		restClass = _class;
		restProps = props;
	})();
</script>

<div class="k-btn-group {restClass ?? ''}" {...restProps} class:vertical>
	<slot />
</div>

<style lang="scss">
	.k-btn-group {
		display: flex;
		flex-wrap: nowrap;
		&.vertical {
			flex-direction: column;
			:global(.k-btn) {
				&:first-child {
					> :global(.ripple-container) {
						border-bottom-left-radius: 0;
						border-bottom-right-radius: 0;
					}
					> :global(.background) {
						border-bottom-left-radius: 0;
						border-bottom-right-radius: 0;
					}
					border-bottom-left-radius: 0;
					border-bottom-right-radius: 0;
				}
				&:last-child {
					> :global(.ripple-container) {
						border-top-left-radius: 0;
						border-top-right-radius: 0;
					}
					> :global(.background) {
						border-top-left-radius: 0;
						border-top-right-radius: 0;
					}
					border-top-left-radius: 0;
					border-top-right-radius: 0;
				}
			}
		}
		&:not(.vertical) > :global(.k-btn) {
			&:first-child {
				> :global(.ripple-container) {
					border-bottom-right-radius: 0;
					border-top-right-radius: 0;
				}
				> :global(.background) {
					border-bottom-right-radius: 0;
					border-top-right-radius: 0;
				}
				border-bottom-right-radius: 0;
				border-top-right-radius: 0;
			}
			&:last-child {
				> :global(.ripple-container) {
					border-bottom-left-radius: 0;
					border-top-left-radius: 0;
				}
				> :global(.background) {
					border-bottom-left-radius: 0;
					border-top-left-radius: 0;
				}
				border-bottom-left-radius: 0;
				border-top-left-radius: 0;
			}
		}
		> :global(.k-btn) {
			&:not(:first-child):not(:last-child) {
				> :global(.ripple-container) {
					border-radius: 0;
				}
				> :global(.background) {
					border-radius: 0;
				}
				border-radius: 0;
			}
		}
	}
</style>
