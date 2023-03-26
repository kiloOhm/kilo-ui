<!-- TODO -->
<!-- 
	- [x] ripple effect
	- [ ] types (submit, reset, anchor)
	- [x] button group 
-->

<script lang="ts">
	import type { Level, Priority, Size } from '$lib/types';
	import { createEventDispatcher } from 'svelte';

	export let priority: Priority = 'primary';
	export let size: Size = 'medium';
	export let level: Level = 'neutral';
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
	let rippleRef: HTMLDivElement;
	function playRipple(e: MouseEvent | KeyboardEvent) {
		if (!ripple || disabled) return;
		const pos =
			e instanceof MouseEvent
				? {
						x: e.offsetX,
						y: e.offsetY
				  }
				: {
						x: buttonRef.offsetWidth / 2,
						y: buttonRef.offsetHeight / 2
				  };
		const transitionDuration =
			getComputedStyle(rippleRef).getPropertyValue('--k-transition-duration');
		const transitionFunction =
			getComputedStyle(rippleRef).getPropertyValue('--k-transition-function');
		rippleRef.style.left = `${pos.x}px`;
		rippleRef.style.top = `${pos.y}px`;
		rippleRef.animate(
			[
				{
					scale: 0,
					opacity: 0.2
				},
				{
					scale: 2.5
				}
			],
			{
				duration: parseInt(transitionDuration) * 2.5,
				easing: transitionFunction
			}
		);
	}
</script>

<button
	class="k-btn"
	bind:this={buttonRef}
	data-priority={priority}
	data-size={size}
	data-level={level}
	data-shape={shape}
	class:ghost
	{disabled}
	on:click={click}
>
	<div class="content-container">
		<slot />
	</div>
	<div class="ripple-container" on:mousedown={playRipple}>
		<div bind:this={rippleRef} class="ripple" />
	</div>
</button>

<style lang="scss">
	.k-btn {
		position: relative;
		box-sizing: border-box;
		border: none;
		font-size: unset;
		color: unset;
		margin: 0;
		background-color: var(--k-colors-text-1);
		&[data-size='tiny'] {
			padding: var(--k-padding-tiny) calc(var(--k-padding-tiny) * 2);
			font-size: var(--k-font-size-tiny);
			border-radius: var(--k-roundness-tiny);
			> .ripple-container {
				border-radius: var(--k-roundness-tiny);
			}
		}
		&[data-size='small'] {
			padding: var(--k-padding-small) calc(var(--k-padding-small) * 2);
			font-size: var(--k-font-size-small);
			border-radius: var(--k-roundness-small);
			> .ripple-container {
				border-radius: var(--k-roundness-small);
			}
		}
		&[data-size='medium'] {
			padding: var(--k-padding-medium) calc(var(--k-padding-medium) * 2);
			font-size: var(--k-font-size-medium);
			border-radius: var(--k-roundness-medium);
			> .ripple-container {
				border-radius: var(--k-roundness-medium);
			}
		}
		&[data-size='large'] {
			padding: var(--k-padding-large) calc(var(--k-padding-large) * 2);
			font-size: var(--k-font-size-large);
			border-radius: var(--k-roundness-large);
			> .ripple-container {
				border-radius: var(--k-roundness-large);
			}
		}
		&[data-size='huge'] {
			padding: var(--k-padding-huge) calc(var(--k-padding-huge) * 2);
			font-size: var(--k-font-size-huge);
			border-radius: var(--k-roundness-huge);
			> .ripple-container {
				border-radius: var(--k-roundness-huge);
			}
		}
		transition-timing-function: var(--k-transition-function);
		transition-duration: calc(var(--k-transition-duration) * 1ms);
		transition-property: filter, background-color, border-color, outline-color, transform;
		&[data-shape='pill'] {
			border-radius: 9999px;
			> .ripple-container {
				border-radius: 9999px;
			}
		}
		&[data-shape='sharp'] {
			border-radius: 0;
			> .ripple-container {
				border-radius: 0;
			}
		}
		&[data-shape='circle'] {
			border-radius: 9999px;
			aspect-ratio: 1/1;
			> .ripple-container {
				border-radius: 9999px;
			}
		}
		&:hover {
			cursor: pointer;
		}
		&:active {
			transform: scale(0.95);
		}
		&:disabled {
			cursor: not-allowed;
			filter: brightness(0.8);
		}
		outline-width: 1px;
		outline-style: solid;
		outline-color: transparent;
		&:focus-visible {
			outline-color: var(--k-colors-text-0);
		}
		&.ghost {
			border-width: 1px;
			border-style: solid;
			color: var(--k-colors-text-1);
			border-color: var(--k-colors-text-1);
			background-color: transparent;
			&[data-priority='primary'] {
				&[data-level='info'] {
					color: var(--k-colors-info);
					border-color: var(--k-colors-info);
					> .ripple-container > .ripple {
						background-color: var(--k-colors-info);
					}
				}
				&[data-level='success'] {
					color: var(--k-colors-success);
					border-color: var(--k-colors-success);
					> .ripple-container > .ripple {
						background-color: var(--k-colors-success);
					}
				}
				&[data-level='warning'] {
					color: var(--k-colors-warning);
					border-color: var(--k-colors-warning);
					> .ripple-container > .ripple {
						background-color: var(--k-colors-warning);
					}
				}
				&[data-level='error'] {
					color: var(--k-colors-error);
					border-color: var(--k-colors-error);
					> .ripple-container > .ripple {
						background-color: var(--k-colors-error);
					}
				}
			}
			&[data-priority='secondary'] {
				border: 1px solid var(--k-colors-border-1);
				&[data-level='info'] {
					color: var(--k-colors-info);
				}
				&[data-level='success'] {
					color: var(--k-colors-success);
				}
				&[data-level='warning'] {
					color: var(--k-colors-warning);
				}
				&[data-level='error'] {
					color: var(--k-colors-error);
				}
			}
			&[data-priority='tertiary'] {
				background-color: transparent;
				border-width: 1px;
				border-color: transparent;
				border-style: dashed;
				&:hover {
					border-color: var(--k-colors-text-1);
				}
				&[data-level='info'] {
					color: var(--k-colors-info);
					&:hover:not(:disabled) {
						border-color: var(--k-colors-info);
					}
					> .ripple-container > .ripple {
						background-color: var(--k-colors-info);
					}
				}
				&[data-level='success'] {
					color: var(--k-colors-success);
					&:hover:not(:disabled) {
						border-color: var(--k-colors-success);
					}
					> .ripple-container > .ripple {
						background-color: var(--k-colors-success);
					}
				}
				&[data-level='warning'] {
					color: var(--k-colors-warning);
					&:hover:not(:disabled) {
						border-color: var(--k-colors-warning);
					}
					> .ripple-container > .ripple {
						background-color: var(--k-colors-warning);
					}
				}
				&[data-level='error'] {
					color: var(--k-colors-error);
					&:hover:not(:disabled) {
						border-color: var(--k-colors-error);
					}
					> .ripple-container > .ripple {
						background-color: var(--k-colors-error);
					}
				}
			}
		}
		&:not(.ghost) {
			&[data-priority='primary'] {
				color: var(--k-colors-background-0);
				&:hover,
				&:focus,
				&:active {
					&:not(:disabled) {
						filter: brightness(1.2);
					}
				}
				&[data-level='info'] {
					background-color: var(--k-colors-info);
				}
				&[data-level='success'] {
					background-color: var(--k-colors-success);
				}
				&[data-level='warning'] {
					background-color: var(--k-colors-warning);
				}
				&[data-level='error'] {
					background-color: var(--k-colors-error);
				}
			}
			&[data-priority='secondary'] {
				background-color: var(--k-colors-background-2);
				&:hover,
				&:focus,
				&:active {
					&:not(:disabled) {
						filter: brightness(1.2);
					}
				}
				&[data-level='info'] {
					color: var(--k-colors-info);
				}
				&[data-level='success'] {
					color: var(--k-colors-success);
				}
				&[data-level='warning'] {
					color: var(--k-colors-warning);
				}
				&[data-level='error'] {
					color: var(--k-colors-error);
				}
			}
			&[data-priority='tertiary'] {
				background-color: transparent;
				&:hover:not(:disabled) {
					background-color: var(--k-colors-background-2);
				}
				&[data-level='info'] {
					color: var(--k-colors-info);
				}
				&[data-level='success'] {
					color: var(--k-colors-success);
				}
				&[data-level='warning'] {
					color: var(--k-colors-warning);
				}
				&[data-level='error'] {
					color: var(--k-colors-error);
				}
			}
		}
		&:not(:disabled) > .ripple-container {
			position: absolute;
			inset: 0;
			overflow: hidden;
			> .ripple {
				transition-timing-function: var(--k-transition-function);
				transition-duration: calc(var(--k-transition-duration) * 2.5ms);
				transition-property: scale, opacity;
				pointer-events: none;
				position: absolute;
				border-radius: 9999px;
				background-color: var(--k-colors-text-0);
				opacity: 0;
				width: 100%;
				aspect-ratio: 1;
				transform-origin: center;
				translate: -50% -50%;
				scale: 0;
			}
			&:active {
				> .ripple {
					scale: 2.5;
					opacity: 0.2;
				}
			}
		}
		> .content-container {
			pointer-events: none;
			position: relative;
			z-index: 1;
		}
	}
</style>
