<script lang="ts">
	import type { Direction } from '../lib/types';
	import { setContext } from 'svelte';
	import { KThemeProvider } from '../lib/components';
	let active = false;
	let drawerContainerRef: HTMLElement;
	let originalDirection: Direction = 'bottom';
	let originalCloseCallback: (() => void) | null = null;
	let originalParent: Element | null = null;
	let activeDrawer: Element | null = null;
	let providerRef: HTMLElement;
	const transitions = {
		bottom: {
			in: 'translateY(0)',
			out: 'translateY(100%)'
		},
		top: {
			in: 'translateY(0)',
			out: 'translateY(-100%)'
		},
		left: {
			in: 'translateX(0)',
			out: 'translateX(-100%)'
		},
		right: {
			in: 'translateX(0)',
			out: 'translateX(100%)'
		}
	};
	setContext(
		'--k-set-active-drawer',
		(drawer?: any, direction?: Direction, closeCallback?: () => void) => {
			const transitionDuration =
				typeof window !== 'undefined' &&
				providerRef &&
				parseInt(getComputedStyle(providerRef).getPropertyValue('--k-transition-duration'));
			const transitionFunction =
				typeof window !== 'undefined' &&
				providerRef &&
				getComputedStyle(providerRef).getPropertyValue('--k-transition-function');
			if (!drawer) {
				if (activeDrawer) {
					try {
						activeDrawer
							.animate(
								[
									{
										transform: transitions[originalDirection].in
									},
									{
										transform: transitions[originalDirection].out
									}
								],
								{
									duration: transitionDuration || 0,
									easing: transitionFunction || 'ease',
									fill: 'forwards'
								}
							)
							.commitStyles();
					} catch (e) {
						console.error(e);
					}
					try {
						originalCloseCallback?.();
						originalParent?.appendChild(activeDrawer);
						activeDrawer = null;
					} catch (e) {
						console.error(e);
					}
				}
				active = false;
			} else {
				active = true;
				originalParent = drawer.parentNode;
				activeDrawer = drawer;
				originalDirection = direction || 'bottom';
				originalCloseCallback = closeCallback || null;
				if (!activeDrawer) return;
				drawerContainerRef.appendChild(activeDrawer);
				try {
					activeDrawer
						.animate(
							[
								{
									transform: transitions[originalDirection].out
								},
								{
									transform: transitions[originalDirection].in
								}
							],
							{
								duration: transitionDuration || 0,
								easing: transitionFunction || 'ease',
								fill: 'forwards'
							}
						)
						.commitStyles();
				} catch {}
			}
		}
	);
	const subscribers: (() => void)[] = [];
	setContext('--k-subscribe-background-0-click', (callback: () => void) => {
		subscribers.push(callback);
		return () => {
			const index = subscribers.indexOf(callback);
			if (index !== -1) {
				subscribers.splice(index, 1);
			}
		};
	});
	const handleBackgroundClick = (e: MouseEvent | TouchEvent | KeyboardEvent) => {
		e.stopPropagation();
		e.preventDefault();
		subscribers.forEach((callback) => callback());
	};
</script>

<KThemeProvider />

<div
	bind:this={providerRef}
	class="k-drawer-provider"
	data-direction={originalDirection}
	class:active
>
	<div class="background-wrapper">
		<slot />
	</div>
	{#if active}
		<div class="cover" on:click={handleBackgroundClick} on:keypress={handleBackgroundClick} />
	{/if}
	<div class="drawer-container" bind:this={drawerContainerRef}>
		<slot name="drawer" />
	</div>
</div>

<style lang="scss">
	.k-drawer-provider {
		overflow: hidden;
		position: absolute;
		inset: 0;
		perspective: 100px;
		background-color: var(--k-colors-background-0);
		> .background-wrapper {
			overflow: auto;
			position: absolute;
			inset: 0;
			transition-property: transform, filter;
			background-color: var(--k-colors-background-1);
		}
		> .cover {
			cursor: pointer;
			position: absolute;
			inset: 0;
			opacity: 0;
		}
		> .drawer-container {
			position: absolute;
			inset: 0;
			pointer-events: none;
			display: flex;
			> :global(*) {
				pointer-events: auto;
			}
		}
		&.active {
			> .background-wrapper {
				filter: blur(var(--k-drawer-provider-blur));
			}
			&[data-direction='bottom'] {
				> .background-wrapper {
					transform: translateZ(calc(var(--k-drawer-provider-depth) * -10px))
						rotateX(calc(var(--k-drawer-provider-tilt) * 1deg))
						translateX(calc(var(--k-drawer-provider-shift) * -1px));
				}
			}
			&[data-direction='top'] {
				> .background-wrapper {
					transform: translateZ(calc(var(--k-drawer-provider-depth) * -10px))
						rotateX(calc(var(--k-drawer-provider-tilt) * -1deg))
						translateY(calc(var(--k-drawer-provider-shift) * 1px));
				}
			}
			&[data-direction='left'] {
				> .background-wrapper {
					transform: translateZ(calc(var(--k-drawer-provider-depth) * -10px))
						rotateY(calc(var(--k-drawer-provider-tilt) * -1deg))
						translateX(calc(var(--k-drawer-provider-shift) * 1px));
				}
			}
			&[data-direction='right'] {
				> .background-wrapper {
					transform: translateZ(calc(var(--k-drawer-provider-depth) * -10px))
						rotateY(calc(var(--k-drawer-provider-tilt) * 1deg))
						translateX(calc(var(--k-drawer-provider-shift) * -1px));
				}
			}
		}
	}
</style>
