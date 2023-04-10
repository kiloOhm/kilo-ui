<script lang="ts">
	import ComponentPage from '../../../layouts/component-page.layout.svelte';
	import ComponentDemo from '../../../components/component-demo.svelte';
	import type { PageData } from './$types';
	import sveld from '$lib/components/KMasonryLayout.svelte?raw&sveld';

	export let data: PageData;
</script>

<svelte:head>
	<title>KUI Masonry layout</title>
	<meta name="description" content="WIP - Kilo UI Masonry layout" />
</svelte:head>

<ComponentPage {sveld}>
	<svelte:fragment slot="header">Masonry Layout</svelte:fragment>
	<div class="flex flex-col gap-2" slot="comment">
		<p>
			Until <a
				href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/Masonry_Layout"
				>'grid-template-rows: masonry;'</a
			> get's adopted by all browsers, this component is a good way to create a masonry layout.
		</p>
		<p>
			Because we need to use the gap sizes in numeric calculation, they have to be absolute pixel
			values.
		</p>
	</div>
	{#each data.demos as demo}
		<ComponentDemo title={demo.path.split('/').pop()?.split('.').shift()} code={demo.code}>
			<svelte:component this={demo.module} />
		</ComponentDemo>
	{/each}
</ComponentPage>
