<script lang="ts">
	import { KCard, KMasonryLayout } from '$lib';
</script>

<div class="m-4">
	<header class="flex gap-2 items-center mb-4">
		<h1 class="text-2xl">
			<slot name="header" />
		</h1>
	</header>

	{#if $$slots.comment}
		<div class="mb-4">
			<KCard bordered={false}>
				<div slot="header">
					{#if $$slots.comment}
						<slot name="comment" />
					{/if}
				</div>
			</KCard>
		</div>
	{/if}

	<main class="pb-10 h-full">
		<KMasonryLayout minColumnWidth={500} animated={false}>
			<slot />
		</KMasonryLayout>
	</main>
</div>
