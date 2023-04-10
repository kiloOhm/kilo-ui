<script lang="ts">
	import ComponentPage from '../../../layouts/component-page.layout.svelte';
	import ComponentDemo from '../../../components/component-demo.svelte';
	import type { PageData } from './$types';
	import sveld from '$lib/components/KChip.svelte?raw&sveld';

	export let data: PageData;
</script>

<svelte:head>
	<title>KUI Chip</title>
	<meta name="description" content="WIP - Kilo UI Chip" />
</svelte:head>

<ComponentPage {sveld}>
	<svelte:fragment slot="header">Chip</svelte:fragment>
	{#each data.demos as demo}
		<ComponentDemo title={demo.path.split('/').pop()?.split('.').shift()} code={demo.code}>
			<svelte:component this={demo.module} />
		</ComponentDemo>
	{/each}
</ComponentPage>
