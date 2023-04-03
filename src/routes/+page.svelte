<script lang="ts">
	import { goto } from '$app/navigation';
	import { KBtn, KCard, KIcon } from '$lib';
	import { getContext } from 'svelte';
	import KuiLogo from '../components/themed-kui-logo.svelte';
	import NotoConstruction from '~icons/noto/construction';
	import IonCoffee from '~icons/ion/coffee';
	const setHamburger = getContext('header-set-hamburger') as (show: boolean) => void;
	$: setHamburger(false);
</script>

<svelte:head>
	<title>Kilo-UI</title>
	<meta name="description" content="WIP - A Svelte UI Component Library" />
</svelte:head>

<div class="w-full h-full relative">
	<figure class="blur-3xl absolute inset-0 flex justify-center items-center overflow-hidden">
		<KIcon noColorCorrection size="20rem">
			<KuiLogo />
		</KIcon>
	</figure>
	<main class="absolute inset-0 flex flex-col justify-center items-center">
		<h1 class="text-8xl">Kilo UI</h1>
		<h2 class="text-xl">A Svelte UI Component Library</h2>
		<div class="WIP my-4">
			<KCard color="yellow">
				<div slot="header" class="p-2 flex items-center justify-center gap-4">
					<KIcon size="xl">
						<NotoConstruction />
					</KIcon>
					<h3 class="text-2xl">Under construction</h3>
					<KIcon size="xl">
						<NotoConstruction />
					</KIcon>
				</div>
			</KCard>
		</div>
		<div class="buttons mt-2 flex items-center gap-2">
			<KBtn color="green" on:click={() => goto('/components')} text="Components" />
			<KBtn color="blue" ghost on:click={() => goto('/docs')} text="Documentation" />
		</div>
	</main>
	<footer>
		<a target="_blank" href="https://github.com/kiloOhm/kilo-ui-svelte/blob/main/LICENSE.md"
			>MIT License</a
		>
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
		@apply absolute bottom-0 left-0 right-0 flex justify-center items-center gap-4 p-2;
		background-color: var(--k-colors-background-2);
		border-top: 1px solid var(--k-colors-border-0);
	}
</style>
