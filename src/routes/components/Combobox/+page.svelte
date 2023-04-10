<script lang="ts">
	import ComponentPage from '../../../layouts/component-page.layout.svelte';
	import ComponentDemo from '../../../components/component-demo.svelte';
	import type { PageData } from './$types';
	import sveld from '$lib/components/KCombobox.svelte?raw&sveld';

	export let data: PageData;
</script>

<svelte:head>
	<title>KUI Combobox</title>
	<meta name="description" content="WIP - Kilo UI Combobox" />
</svelte:head>

<ComponentPage {sveld}>
	<svelte:fragment slot="header">Combobox</svelte:fragment>
	<div class="flex flex-col gap-2" slot="comment">
		<p>
			Uses <a href="https://fusejs.io/">Fuse.js</a> for fuzzy search.
		</p>
	</div>
	{#each data.demos as demo}
		<ComponentDemo title={demo.path.split('/').pop()?.split('.').shift()} code={demo.code}>
			<svelte:component this={demo.module} />
		</ComponentDemo>
	{/each}
</ComponentPage>
