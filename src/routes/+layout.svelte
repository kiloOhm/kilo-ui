<script lang="ts">
	import { KThemeProvider, KBtn, KIcon, setThemeOverrides } from '$lib';
	import KDrawerProvider from '../components/KDrawerProvider.svelte';
	import '../app.css';
	import IonMdList from '~icons/ion/md-list';
	import { fade } from 'svelte/transition';
	import { setContext } from 'svelte';
	import { afterNavigate, goto, preloadData } from '$app/navigation';
	import KuiLogo from '../components/themed-kui-logo.svelte';
	import IonLogoGithub from '~icons/ion/logo-github';
	import type { LayoutServerData } from './$types';
	import KPageTransitionProvider from '../components/KPageTransitionProvider.svelte';
	export let data: LayoutServerData;

	afterNavigate(() => {
		const hash = window.location.hash;
		if (hash) {
			const el = document.getElementById(decodeURIComponent(hash.slice(1)));
			if (el) {
				el.scrollIntoView();
				el.focus();
			}
		}
	});

	let collapsible = false;
	setContext('header-set-hamburger', (show: boolean) => (collapsible = show));
	const hamburgerClickSubscribers: (() => void)[] = [];
	setContext('header-on-hamburger-click', (fn: () => void) => hamburgerClickSubscribers.push(fn));
	$: path = data.pathname.split('/')[1];
	let overlay: HTMLDivElement;
	$: overlay
		?.animate(
			[
				{
					opacity: 1
				},
				{
					opacity: 0
				}
			],
			{
				duration: 200,
				easing: 'ease-in-out',
				fill: 'forwards'
			}
		)
		.commitStyles();
</script>

<div class="root">
	<KThemeProvider>
		<KDrawerProvider>
			<div class="flex flex-col h-full">
				<header class="relative flex justify-center items-center p-2">
					{#if collapsible}
						<div
							transition:fade={{ duration: 200 }}
							class="absolute left-2 top-1/2 -translate-y-1/2"
						>
							<KBtn
								size="sm"
								priority="tertiary"
								shape="circle"
								ariaLabel="open menu"
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
						on:mouseenter={() => preloadData('/')}
					>
						<KIcon noColorCorrection size="3xl">
							<KuiLogo />
						</KIcon>
					</div>
					<div class="absolute right-2 top-1/2 -translate-y-1/2">
						<!-- svelte-ignore missing-declaration - see vite.config -->
						<a
							href="https://github.com/kiloOhm/kilo-ui-svelte"
							target="_blank"
							style="color: var(--k-colors-text-2);"
							class="flex items-center gap-1"
						>
							<KIcon size="sm">
								<IonLogoGithub />
							</KIcon>
							v{APP_VERSION}
						</a>
					</div>
				</header>
				<main class="flex-grow overflow-hidden">
					<KPageTransitionProvider {path}>
						<slot />
					</KPageTransitionProvider>
				</main>
			</div>
		</KDrawerProvider>
	</KThemeProvider>
</div>

<div bind:this={overlay} class="k-overlay">
	<div class="blur-container">
		<KIcon noColorCorrection size="9xl">
			<KuiLogo />
		</KIcon>
	</div>
	<div class="logo-container">
		<KIcon noColorCorrection size="9xl">
			<KuiLogo />
		</KIcon>
	</div>
</div>

<style lang="scss">
	:global(html) {
		height: stretch;
		height: -webkit-fill-available;
	}
	:global(body) {
		min-height: 100vh;
		min-height: stretch;
		min-height: -webkit-fill-available;
		margin: 0;
		padding: 0;
	}
	.root {
		@apply overflow-hidden;
	}
	header {
		background-color: var(--k-colors-background-1);
		border-bottom: 1px solid var(--k-colors-border-0);
	}
	.k-overlay {
		position: fixed;
		pointer-events: none;
		inset: 0;
		backdrop-filter: blur(10px) brightness(0.3);
		z-index: 1000;
		display: grid;
		place-items: center;
		> * {
			position: absolute;
		}
		> .blur-container {
			pointer-events: none;
			scale: 1.1;
			filter: blur(40px) brightness(1.5);
			animation: 3s linear infinite bobbing;
		}
	}
	@keyframes bobbing {
		0% {
			transform: translateY(0);
		}
		25% {
			transform: translateY(-1rem);
		}
		75% {
			transform: translateY(1rem);
		}
		100% {
			transform: translateY(0);
		}
	}
</style>
