<script lang="ts">
	import KCode from '$lib/components/KCode.svelte';
	import GithubQuote from '../../../components/GithubQuote.svelte';
	import 'prism-svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>KUI Theming</title>
	<meta name="description" content="KUI Theming" />
</svelte:head>

<main class="p-4 flex flex-col gap-4">
	<h1 class="text-2xl">Theming</h1>
	<section>
		<p>Theming is done via the <code>KThemeProvider</code> Component</p>
		<p>You can pass in theme-overrides via the <code>overrides</code> prop</p>
		<KCode code={data.demo} language="Svelte" />
	</section>
	<GithubQuote>
		Every component is wrapped in its own <code>KThemeProvider</code>, so if you're happy with the
		default theme, you don't need to do anything
	</GithubQuote>
</main>
