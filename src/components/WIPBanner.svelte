<script lang="ts">
	let restClass: string, restProps: any;
	$: (() => {
		const { class: _class, ...props } = $$restProps;
		restClass = _class;
		restProps = props;
	})();
</script>

<div class="wip-banner {restClass ?? ''}" {...restProps}>
	<div class="stripes" />
	<div class="text">
		{#if $$slots.default}
			<slot />
		{:else}
			<h3 class="text-2xl">Under construction</h3>
		{/if}
	</div>
</div>

<style lang="scss">
	.wip-banner {
		@apply relative w-full h-20 p-10 overflow-hidden;
		background-color: var(--k-colors-yellow-darken-4);
		> .stripes {
			@apply absolute inset-0;
			background: repeating-linear-gradient(
				45deg,
				transparent,
				transparent 10px,
				var(--k-colors-background-1) 10px,
				var(--k-colors-background-1) 20px
			);
		}
		> .text {
			@apply text-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-max max-w-full px-4 py-2 backdrop-blur-sm;
			background-color: var(--k-colors-background-1-alpha-8);
			border-radius: 0.5em;
			text-shadow: 0 2px 10px var(--k-colors-background-0);
		}
	}
</style>
