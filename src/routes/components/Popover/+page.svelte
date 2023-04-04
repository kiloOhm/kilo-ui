<script lang="ts">
	import ComponentPage from '../../../layouts/component-page.layout.svelte';
	import ComponentDemo from '../../../components/component-demo.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>KUI Popover</title>
	<meta name="description" content="WIP - Kilo UI Popover" />
</svelte:head>

<ComponentPage>
	<svelte:fragment slot="header">Popover</svelte:fragment>
	<div class="flex flex-col gap-2" slot="comment">
		<p>
			Uses <a href="https://floating-ui.com/">Floating UI</a> to position the popover.
		</p>
	</div>
	{#each data.demos as demo}
		<ComponentDemo title={demo.path.split('/').pop()?.split('.').shift()} code={demo.code}>
			<svelte:component this={demo.module} />
		</ComponentDemo>
	{/each}
</ComponentPage>
