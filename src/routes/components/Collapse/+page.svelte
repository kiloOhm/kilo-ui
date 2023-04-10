<script lang="ts">
	import ComponentPage from '../../../layouts/component-page.layout.svelte';
	import ComponentDemo from '../../../components/component-demo.svelte';
	import type { PageData } from './$types';
	import sveld from '$lib/components/KCollapse.svelte?raw&sveld';

	export let data: PageData;
</script>

<svelte:head>
	<title>KUI Collapse</title>
	<meta name="description" content="WIP - Kilo UI Collapse" />
</svelte:head>

<ComponentPage {sveld}>
	<svelte:fragment slot="header">Collapse</svelte:fragment>
	<div slot="comment" class="flex flex-col gap-2">
		<p>Renders a second copy of the default slot off-screen to grab height value.</p>
		<p>This is kind of a hacky solution, but it works.</p>
	</div>
	{#each data.demos as demo}
		<ComponentDemo title={demo.path.split('/').pop()?.split('.').shift()} code={demo.code}>
			<svelte:component this={demo.module} />
		</ComponentDemo>
	{/each}
</ComponentPage>
