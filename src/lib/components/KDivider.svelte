<script lang="ts">
	export let vertical: boolean = false;
	export let width: string = '1px';
</script>

<div
	class="k-divider"
	class:vertical
	style:flex-direction={vertical ? 'column' : 'row'}
	style:--line-width={width}
>
	<div class="line" />
	{#if $$slots.default}
		<slot />
		<div class="line" />
	{/if}
</div>

<style lang="scss">
	.k-divider {
		display: flex;
		justify-content: stretch;
		align-items: center;
		gap: 0.5rem;
		color: var(--k-colors-text-2);
		.line {
			width: 100%;
			height: var(--line-width);
			background-color: var(--k-colors-border-0);
		}
		&.vertical {
			> .line {
				width: var(--line-width);
				height: 100%;
			}
		}
	}
</style>
