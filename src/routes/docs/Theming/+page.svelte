<script lang="ts">
	import GithubQuote from '../../../components/GithubQuote.svelte';
	import 'prism-svelte';
	import type { PageData } from './$types';
	import ComponentDemo from '../../../components/component-demo.svelte';

	export let data: PageData;
</script>

<svelte:head>
	<title>KUI Theming</title>
	<meta name="description" content="KUI Theming" />
</svelte:head>

<main class="p-4 flex flex-col gap-4">
	<h1 class="text-2xl font-bold">Theming</h1>
	<section class="flex flex-col gap-2">
		<p>Theming is done via the <code>KThemeProvider</code> Component</p>
		<p>You can pass in theme-overrides via the <code>overrides</code> prop</p>
		{#each data.demos as demo}
			<ComponentDemo title={demo.path.split('/').pop()?.split('.').shift()} code={demo.code}>
				<svelte:component this={demo.module} />
			</ComponentDemo>
		{/each}
		<p>wrap your app in a <code>KThemeProvider</code> to apply the theme</p>
	</section>
	<GithubQuote>
		Every component is wrapped in its own <code>KThemeProvider</code>, so if you're happy with the
		default theme, you don't need to do anything
	</GithubQuote>
</main>
