<script>
	import { KCode } from '$lib';
	import KDivider from '$lib/components/KDivider.svelte';
	import GithubQuote from '../../components/GithubQuote.svelte';
	import 'prismjs/components/prism-bash.min.js';
</script>

<svelte:head>
	<title>KUI Docs</title>
	<meta name="description" content="WIP - Kilo UI Documentation" />
</svelte:head>

<main class="p-4 flex flex-col gap-8">
	<h1 class="text-2xl font-bold">Documentation</h1>
	<section class="flex flex-col gap-2">
		<h2 class="text-xl font-semibold">Getting Started</h2>
		<p>To get started, install the package from npm:</p>
		<KCode language="bash" code={`npm i kilo-ui;`} />
		<GithubQuote>
			Setting up a library like this should be as frictionless as possible. Just import and go.
		</GithubQuote>
	</section>
	<KDivider />
	<section class="flex flex-col gap-2">
		<h2 class="text-xl font-semibold">Typescript</h2>
		<p>We highly recommend using Typescript with KUI. We have not yet tested without Typescript.</p>
	</section>
	<KDivider />
	<section class="flex flex-col gap-2">
		<h2 class="text-xl font-semibold">Tailwind</h2>
		<p>
			KUI doesn't depend on Tailwind. We use it in our docs, but you can use any CSS framework you
			want.
		</p>
		<p>We test with and without preflight to make sure there are no collisions.</p>
		<GithubQuote>Tailwind is awesome, but not everyone wants to / is able to use it.</GithubQuote>
	</section>
	<KDivider />
	<section class="flex flex-col gap-2">
		<h2 class="text-xl font-semibold">Credits</h2>
		<p>
			This library was inspired by <a href="https://naiveui.com" target="_blank">Naive UI</a>
		</p>
		<GithubQuote>
			<a href="https://naiveui.com" target="_blank">Naive UI</a> is my all time favourite Vue 3
			Framework. I use it in every project. Thanks <a href="https://www.tusimple.com/">ToSimple</a> ❤️</GithubQuote
		>
	</section>
</main>
