<script lang="ts">
	import { KThemeProvider, KBtn, KIcon, KPageTransitionProvider } from '$lib';
	import KDrawerProvider from '$lib/components/KDrawerProvider.svelte';
	import '../app.css';
	import IonMdList from '~icons/ion/md-list';
	import { fade } from 'svelte/transition';
	import { setContext } from 'svelte';
	import { goto } from '$app/navigation';
	import KuiLogo from '../components/themed-kui-logo.svelte';
	import type { Transition } from '$lib/components/KPageTransitionProvider';
	import type { LayoutServerData } from './$types';
	export let data: LayoutServerData;

	let collapsible = false;
	setContext('header-set-hamburger', (show: boolean) => (collapsible = show));
	const hamburgerClickSubscribers: (() => void)[] = [];
	setContext('header-on-hamburger-click', (fn: () => void) => hamburgerClickSubscribers.push(fn));
	const duration = 200;
	$: amountX = (typeof window === 'undefined' ? 0 : window.innerWidth) / 3;
	$: amountY = (typeof window === 'undefined' ? 0 : window.innerHeight) / 3;
	function ruleFn(
		from: string,
		to: string
	):
		| {
				in: Transition;
				out: Transition;
		  }
		| undefined {
		switch (from) {
			case '/':
			case '':
				switch (to) {
					case '/components':
						return {
							in: { type: 'fly', direction: 'up', amount: amountY, duration },
							out: { type: 'fly', direction: 'up', amount: amountY, duration }
						};
				}
				break;
			case '/components':
				switch (to) {
					case '/':
					case '':
						return {
							in: { type: 'fly', direction: 'down', amount: amountY, duration },
							out: { type: 'fly', direction: 'down', amount: amountY, duration }
						};
				}
				break;
		}
		return undefined;
	}
	$: path = data.pathname.split('/')[1];
</script>

<KThemeProvider>
	<KDrawerProvider>
		<div class="flex flex-col w-screen h-screen">
			<header class="relative flex justify-center items-center p-2">
				{#if collapsible}
					<div transition:fade={{ duration: 200 }} class="absolute left-2 top-1/2 -translate-y-1/2">
						<KBtn
							size="sm"
							priority="third"
							shape="circle"
							on:click={() => hamburgerClickSubscribers.map((fn) => fn?.())}
						>
							<IonMdList />
						</KBtn>
					</div>
				{/if}
				<div
					class="flex gap-2 items-baseline cursor-pointer"
					on:click={() => goto('/')}
					on:keypress={() => goto('/')}
				>
					<KIcon noColorCorrection size="3xl">
						<KuiLogo />
					</KIcon>
				</div>
				<div class="absolute right-2 top-1/2 -translate-y-1/2">
					<!-- svelte-ignore missing-declaration - see vite.config -->
					<span style="color: var(--k-colors-text-2)">v{APP_VERSION}</span>
				</div>
			</header>
			<KPageTransitionProvider {ruleFn} {path}>
				<slot />
			</KPageTransitionProvider>
		</div>
	</KDrawerProvider>
</KThemeProvider>

<style>
	:global(body) {
		margin: 0;
		padding: 1rem;
	}
	header {
		background-color: var(--k-colors-background-2);
		border-bottom: 1px solid var(--k-colors-border-0);
	}
</style>
