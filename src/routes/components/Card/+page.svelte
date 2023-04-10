<script lang="ts">
	import ComponentDemo from '../../../components/component-demo.svelte';
	import ComponentPage from '../../../layouts/component-page.layout.svelte';
	import type { PageData } from './$types';
	import sveld from '$lib/components/KCard.svelte?raw&sveld';

	export let data: PageData;
</script>

<svelte:head>
	<title>KUI Card</title>
	<meta name="description" content="WIP - Kilo UI Card" />
</svelte:head>

<ComponentPage {sveld}>
	<svelte:fragment slot="header">Card</svelte:fragment>
	{#each data.demos as demo}
		<ComponentDemo title={demo.path.split('/').pop()?.split('.').shift()} code={demo.code}>
			<svelte:component this={demo.module} />
		</ComponentDemo>
	{/each}
</ComponentPage>
