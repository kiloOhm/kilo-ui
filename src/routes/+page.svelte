<script lang="ts">
	import { goto, preloadData } from '$app/navigation';
	import { KBtn, KCard, KIcon } from '$lib';
	import { getContext } from 'svelte';
	import KuiLogo from '../components/themed-kui-logo.svelte';
	import IonCoffee from '~icons/ion/coffee';
	import KDivider from '$lib/components/KDivider.svelte';
	import WipBanner from '../components/WIPBanner.svelte';
	const setHamburger = getContext('header-set-hamburger') as (show: boolean) => void;
	$: setHamburger(false);
</script>

<svelte:head>
	<title>Kilo-UI</title>
	<meta name="description" content="WIP - A Svelte UI Component Library" />
</svelte:head>

<div class="w-full h-full relative overflow-auto">
	<main class=" relative w-full h-full flex-grow flex flex-col justify-center items-center">
		<figure class="blur-3xl absolute inset-0 flex justify-center items-center overflow-hidden">
			<KIcon noColorCorrection size="20rem">
				<KuiLogo />
			</KIcon>
		</figure>
		{#if new Date().getTime() < new Date('2023-04-17').getTime()}
			<WipBanner class="absolute -top-32">
				<h3 class="text-2xl">Under construction</h3>
				<h4>check back after April 17th</h4>
			</WipBanner>
		{/if}
		<div class="z-10">
			<h1 class="text-8xl">Kilo UI</h1>
			<h2 class="text-xl">A Svelte UI Component Library</h2>
			<div class="buttons mt-2 flex items-center gap-2">
				<KBtn
					color="green"
					on:click={() => goto('/components')}
					on:hover={() => preloadData('/components')}
					text="Components"
				/>
				<KBtn
					color="blue"
					ghost
					on:click={() => goto('/docs')}
					on:hover={() => preloadData('/docs')}
					text="Documentation"
				/>
			</div>
		</div>
	</main>
	<footer>
		<div class="flex items-end">
			<a target="_blank" href="https://github.com/kiloOhm/kilo-ui-svelte/blob/main/LICENSE.md"
				>MIT License</a
			>
		</div>
		<KDivider vertical />
		<div class="flex items-end gap-1">
			<span>Made with</span>
			<KIcon size="lg">
				<IonCoffee />
			</KIcon>
			<span>by</span>
			<a href="https://github.com/kiloOhm">Lukas Wicke</a>
		</div>
	</footer>
</div>

<style lang="scss">
	main {
		text-shadow: 2px 4px 10px rgba(0, 0, 0, 0.2);
		> .buttons > :global(*) {
			box-shadow: 2px 4px 10px 0px rgba(0, 0, 0, 0.2);
		}
	}
	footer {
		@apply w-full flex justify-center items-stretch gap-4 p-2;
		background-color: var(--k-colors-background-1);
		border-top: 1px solid var(--k-colors-border-0);
	}
</style>
