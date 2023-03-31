<script lang="ts">
	import { goto } from '$app/navigation';
	import { KBtn, KCard, KIcon } from '$lib';
	import { getContext } from 'svelte';
	import KuiLogo from '../components/themed-kui-logo.svelte';
	import NotoConstruction from '~icons/noto/construction';
	const setHamburger = getContext('header-set-hamburger') as (show: boolean) => void;
	$: setHamburger(false);
</script>

<svelte:head>
	<title>Kilo-UI</title>
</svelte:head>

<div class="w-full h-full relative">
	<figure class="blur-3xl absolute inset-0 flex justify-center items-center">
		<KIcon noColorCorrection size="20rem">
			<KuiLogo />
		</KIcon>
	</figure>
	<main class="absolute inset-0 flex flex-col justify-center items-center">
		<h1 class="text-9xl">Kilo UI</h1>
		<h2 class="text-2xl">A Svelte UI Component Library</h2>
		<div class="WIP my-4">
			<KCard state="warning">
				<div slot="header" class="p-4 flex items-center justify-center gap-4">
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
			<KBtn state="success" on:click={() => goto('/components')}>Components</KBtn>
			<KBtn state="info" ghost on:click={() => goto('/docs')}>Documentation</KBtn>
		</div>
	</main>
</div>

<style lang="scss">
	main {
		text-shadow: 2px 4px 10px rgba(0, 0, 0, 0.2);
		> .buttons > :global(*) {
			box-shadow: 2px 4px 10px 0px rgba(0, 0, 0, 0.2);
		}
	}
</style>
