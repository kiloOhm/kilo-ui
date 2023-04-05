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
	<hr />
	{#if $$slots.default}
		<slot />
		<hr />
	{/if}
</div>

<style lang="scss">
	.k-divider {
		display: flex;
		justify-content: stretch;
		align-items: center;
		gap: 0.5rem;
		color: var(--k-colors-text-2);
		hr {
			width: 100%;
			height: var(--line-width);
			background-color: var(--k-colors-border-0);
			border: none;
		}
		&.vertical {
			> hr {
				width: var(--line-width);
				height: 100%;
			}
		}
	}
</style>
