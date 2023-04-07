<script lang="ts">
	import ComponentPage from '../../../layouts/component-page.layout.svelte';
	import ComponentDemo from '../../../components/component-demo.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>KUI Accordion</title>
	<meta name="description" content="WIP - Kilo UI Accordion" />
</svelte:head>

<ComponentPage>
	<svelte:fragment slot="header">Accordion</svelte:fragment>
	<div slot="comment" class="flex flex-col gap-2">
		<p>Works best with collapse's built-in title prop</p>
	</div>
	{#each data.demos as demo}
		<ComponentDemo title={demo.path.split('/').pop()?.split('.').shift()} code={demo.code}>
			<svelte:component this={demo.module} />
		</ComponentDemo>
	{/each}
</ComponentPage>
