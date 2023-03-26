<script>
	export let bordered = true;
</script>

<div class="k-card" data-bordered={bordered}>
	{#if $$slots.header}
		<header>
			<slot name="header" />
		</header>
	{/if}
	<main>
		<slot />
	</main>
	{#if $$slots.footer}
		<footer>
			<slot name="footer" />
		</footer>
	{/if}
</div>

<style lang="scss">
	.k-card {
		background-color: var(--k-colors-background-1);
		border-radius: var(--k-roundness-large);
		&[data-bordered='true'] {
			border: 1px solid var(--k-colors-border-0);
		}
		> header {
			padding: 0.5rem 1rem;
			border-top-right-radius: var(--k-roundness-medium);
			border-top-left-radius: var(--k-roundness-medium);
			background-color: var(--k-colors-border-0);
		}
		> main {
			padding: 1rem;
		}
		> footer {
			border-bottom-right-radius: var(--k-roundness-medium);
			border-bottom-left-radius: var(--k-roundness-medium);
			background-color: var(--k-colors-border-0);
		}
	}
</style>
