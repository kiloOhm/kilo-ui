<script lang="ts">
	import ComponentPage from '../../../layouts/component-page.layout.svelte';
	import ComponentDemo from '../../../components/component-demo.svelte';
	import type { PageData } from './$types';
	import sveld from '$lib/components/KAnchor.svelte?raw&sveld';

	export let data: PageData;
</script>

<svelte:head>
	<title>KUI Anchor</title>
	<meta name="description" content="WIP - Kilo UI Anchor" />
</svelte:head>

<ComponentPage {sveld}>
	<svelte:fragment slot="header">Anchor</svelte:fragment>
	<div class="flex flex-col gap-2" slot="comment">
		<p>
			Utility wrapper around the <code>&lt;a&gt;</code> tag. Hyperlink button copies link to clipboard
		</p>
	</div>
	{#each data.demos as demo}
		<ComponentDemo title={demo.path.split('/').pop()?.split('.').shift()} code={demo.code}>
			<svelte:component this={demo.module} />
		</ComponentDemo>
	{/each}
</ComponentPage>
