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
		color: var(--k-colors-text-2);
		hr {
			width: 100%;
			height: var(--line-width);
			background-color: var(--k-colors-border-0);
			border: none;
		}
		> .content-container {
			padding: 0 0.5em;
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
