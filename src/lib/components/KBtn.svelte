<!-- TODO -->
<!-- 
	- [ ] types (submit, reset, anchor)
-->

<script lang="ts">
	import { type State, type Priority, type Size, Sizes } from '..';
	import { createEventDispatcher } from 'svelte';
	import KThemeProvider from './KThemeProvider.svelte';
	import { debounce, defer } from 'lodash-es';

	export let priority: Priority = 'primary';
	export let size: Size | string = 'md';
	export let state: State = 'neutral';
	export let ghost = false;
	export let shape: 'pill' | 'circle' | 'sharp' | undefined = undefined;
	export let disabled = false;
	export let ripple = true;

	let buttonRef: HTMLButtonElement;

	const dispatch = createEventDispatcher();
	function click() {
		if (!disabled) {
			dispatch('click');
		}
	}
	let rippleShapeRef: HTMLDivElement;
	const setRippleState = debounce(
		(e: MouseEvent | KeyboardEvent | TouchEvent, state: boolean) => {
			if (disabled) return;
			const buttonBBox = buttonRef?.getBoundingClientRect();
			if (!buttonBBox) return;
			const pos =
				e instanceof MouseEvent
					? {
							x: e.clientX - buttonBBox.left,
							y: e.clientY - buttonBBox.top
					  }
					: e instanceof TouchEvent
					? {
							x: e.touches[0].clientX - buttonBBox.left,
							y: e.touches[0].clientY - buttonBBox.top
					  }
					: {
							x: buttonRef.offsetWidth / 2,
							y: buttonRef.offsetHeight / 2
					  };
			rippleShapeRef.style.left = `${pos.x}px`;
			rippleShapeRef.style.top = `${pos.y}px`;
			if (state) {
				rippleShapeRef.style.scale = '2.5';
				const rippleAlpha =
					getComputedStyle(rippleShapeRef).getPropertyValue('--k-button-ripple-alpha');
				rippleShapeRef.style.opacity = rippleAlpha;
			} else {
				rippleShapeRef.style.opacity = '0';
				rippleShapeRef.style.scale = '0';
			}
		},
		300,
		{ leading: true, trailing: true }
	);
	$: validSize = Sizes.includes(size as Size);
</script>

<KThemeProvider />

<button
	class="k-btn"
	bind:this={buttonRef}
	data-priority={priority}
	data-state={state}
	data-shape={shape}
	style:--size={`var(--k-size-${validSize ? size : 'X'}, ${size})`}
	style:--color={`var(--k-colors-${state}, --k-colors-neutral)`}
	class:ripple
	class:ghost
	{disabled}
	on:click={click}
	on:mousedown={(e) => setRippleState(e, true)}
	on:mouseup={(e) => setRippleState(e, false)}
	on:mouseleave={(e) => setRippleState(e, false)}
	on:touchstart={(e) => setRippleState(e, true)}
	on:touchend={(e) => setRippleState(e, false)}
	on:touchcancel={(e) => setRippleState(e, false)}
>
	<div class="background" />
	<div class="content-container">
		<slot />
	</div>
	<div class="ripple-container">
		<div bind:this={rippleShapeRef} class="ripple-shape" />
	</div>
</button>

<style lang="scss">
	.k-btn {
		position: relative;
		overflow: hidden;
		font-size: var(--size);
		margin: 0;
		padding: var(--k-button-padding);
		border-radius: var(--k-button-border-radius);
		transition-property: filter, background-color, border-color, outline-color, transform;
		> .background {
			position: absolute;
			inset: 0;
			border-radius: var(--k-button-border-radius);
			background-color: var(--k-colors-text-1);
		}
		&[data-shape='pill'] {
			border-radius: 9999px;
			> .background {
				border-radius: 9999px;
			}
		}
		&[data-shape='sharp'] {
			border-radius: 0;
			> .background {
				border-radius: 0;
			}
		}
		&[data-shape='circle'] {
			border-radius: 9999px;
			aspect-ratio: 1/1;
			> .background {
				border-radius: 9999px;
			}
		}
		&:disabled {
			cursor: not-allowed;
			filter: brightness(var(--k-button-disabled-brightness));
		}
		&:hover:not(:disabled) {
			cursor: pointer;
			> .background {
				filter: brightness(var(--k-button-hover-brightness));
			}
			transform: scale(var(--k-button-hover-scale));
		}
		&:active:not(:disabled) {
			> .background {
				filter: brightness(var(--k-button-active-brightness));
			}
			transform: scale(var(--k-button-active-scale));
		}
		&.ghost {
			> .background {
				border-width: var(--k-button-border-width);
				border-style: var(--k-button-border-style);
				color: var(--k-colors-text-1);
				border-color: var(--k-colors-neutral);
				background-color: transparent;
			}
			&[data-priority='primary'] {
				color: var(--color);
				> .background {
					border-color: var(--color);
				}
				> .ripple-container > .ripple-shape {
					background-color: var(--color);
				}
			}
			&[data-priority='secondary'] {
				> .background {
					border-color: var(--k-colors-border-1);
				}
				color: var(--color);
			}
			&[data-priority='tertiary'] {
				> .background {
					background-color: transparent;
					border-color: transparent;
				}
				&:hover {
					> .background {
						border-color: var(--color);
					}
				}
				color: var(--color);
				> .ripple-container > .ripple-shape {
					background-color: var(--color);
				}
			}
		}
		&:not(.ghost) {
			&[data-priority='primary'] {
				color: var(--k-colors-background-0);
				> .background {
					background-color: var(--color);
				}
			}
			&[data-priority='secondary'] {
				> .background {
					background-color: var(--k-colors-background-2);
				}
				color: var(--color);
			}
			&[data-priority='tertiary'] {
				> .background {
					background-color: transparent;
				}
				&:hover:not(:disabled) {
					> .background {
						background-color: var(--k-colors-background-2);
					}
				}
				color: var(--color);
			}
		}
		&.ripple > .ripple-container {
			position: absolute;
			inset: 0;
			> .ripple-shape {
				background-color: var(--k-button-ripple-color);
				--t-dur-expand: calc(
					var(--k-transition-duration) * var(--k-button-ripple-duration-expand) * 1ms
				);
				--t-dur-fade: calc(
					var(--k-transition-duration) * var(--k-button-ripple-duration-fade) * 1ms
				);
				transition: scale var(--t-dur-expand), opacity var(--t-dur-fade);
				pointer-events: none;
				position: absolute;
				border-radius: 9999px;
				opacity: 0;
				width: 100%;
				aspect-ratio: 1;
				transform-origin: center;
				translate: -50% -50%;
				scale: 0;
			}
		}
		> .content-container {
			position: relative;
			display: flex;
			align-items: center;
			justify-content: center;
			z-index: 1;
		}
	}
</style>
