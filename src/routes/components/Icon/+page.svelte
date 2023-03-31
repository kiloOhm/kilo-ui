<script lang="ts">
	import ComponentDemo from '../../../components/component-demo.svelte';
	import ComponentPage from '../../../layouts/component-page.layout.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>KUI Icon</title>
</svelte:head>

<ComponentPage>
	<svelte:fragment slot="header">Icon</svelte:fragment>
	<p slot="comment">
		This component "normalizes" svg icons. It overrides color and size to match the design system. I
		reccomend using <a href="https://github.com/antfu/unplugin-icons">unplugin-icons</a> and
		<a href="https://icones.js.org/">Icônes</a>
	</p>
	{#each data.demos as demo}
		<ComponentDemo title={demo.path.split('/').pop()?.split('.').shift()} code={demo.code}>
			<svelte:component this={demo.module} />
		</ComponentDemo>
	{/each}
</ComponentPage>
