<script lang="ts">
	import ComponentPage from '../../../layouts/component-page.layout.svelte';
	import ComponentDemo from '../../../components/component-demo.svelte';
	import type { PageData } from './$types';
	import sveld from '$lib/components/KCode.svelte?raw&sveld';

	export let data: PageData;
</script>

<svelte:head>
	<title>KUI Code</title>
	<meta name="description" content="WIP - Kilo UI Code" />
</svelte:head>

<ComponentPage {sveld}>
	<svelte:fragment slot="header">Code</svelte:fragment>
	<div class="flex flex-col gap-2" slot="comment">
		<p>
			Uses <a href="https://prismjs.com/">PrismJS</a> to highlight code.
		</p>
	</div>
	{#each data.demos as demo}
		<ComponentDemo title={demo.path.split('/').pop()?.split('.').shift()} code={demo.code}>
			<svelte:component this={demo.module} />
		</ComponentDemo>
	{/each}
</ComponentPage>
