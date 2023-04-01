<script lang="ts">
	import { type Color, type Size, Sizes, Colors, randomString } from '..';
	import { createEventDispatcher } from 'svelte';
	import KThemeProvider from './KThemeProvider.svelte';
	import { debounce } from 'lodash-es';
	import type { ButtonPriority } from './KBtn';

	export let priority: ButtonPriority = 'first';
	export let size: Size | string = 'md';
	export let color: Color | string | undefined = undefined;
	export let textColor: string | undefined = undefined;
	export let ghost = false;
	export let shape: 'pill' | 'circle' | 'sharp' | undefined = undefined;
	export let disabled = false;
	export let ripple = true;
	export let text: string | undefined = undefined;
	export let ariaLabel: string | undefined = undefined;
	export let submit: boolean | undefined = undefined;
	export let href: string | undefined = undefined;
	export let target: string | undefined = undefined;

	let buttonRef: HTMLButtonElement;

	const dispatch = createEventDispatcher();
	function click() {
		if (!disabled) {
			dispatch('click');
			if (href) {
				window.open(href, target);
			}
		}
	}
	function hover() {
		dispatch('hover');
	}
	let rippleShapeRef: HTMLDivElement;
	const setRippleState = debounce(
		(e: MouseEvent | KeyboardEvent | TouchEvent, color: boolean) => {
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
			if (color) {
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
	$: validColor = !color || Colors.includes(color as Color);
</script>

<KThemeProvider />

<button
	class="k-btn"
	type={submit ? 'submit' : 'button'}
	role={href ? 'link' : undefined}
	bind:this={buttonRef}
	data-priority={priority}
	data-shape={shape}
	aria-label={ariaLabel ?? text}
	style:--size={`var(--k-size-${validSize ? size : 'X'}, ${size})`}
	style:--color={!validColor
		? color
		: `var(--k-colors-${color}${
				priority === 'first' && !ghost ? '-darken-4' : ''
		  }, var(--k-colors-text-0))`}
	style:--text-color={textColor ??
		(color ? 'var(--k-colors-text-0)' : 'var(--k-colors-background-0)')}
	class:ripple
	class:ghost
	{disabled}
	on:click={click}
	on:mousedown={(e) => setRippleState(e, true)}
	on:mouseup={(e) => setRippleState(e, false)}
	on:mouseenter={() => hover()}
	on:mouseleave={(e) => setRippleState(e, false)}
	on:touchstart|passive={(e) => {
		hover();
		setRippleState(e, true);
	}}
	on:touchend|passive={(e) => setRippleState(e, false)}
	on:touchcancel|passive={(e) => setRippleState(e, false)}
>
	<div class="background" />
	<div class="content-container">
		{#if $$slots.default}
			<slot />
		{:else if text}
			<span class="text">{text}</span>
		{/if}
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
		color: var(--text-color);
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
				border-color: var(--k-colors-primary);
				background-color: transparent;
			}
			&[data-priority='first'] {
				color: var(--color);
				> .background {
					border-color: var(--color);
				}
				> .ripple-container > .ripple-shape {
					background-color: var(--color);
				}
			}
			&[data-priority='second'] {
				> .background {
					border-color: var(--k-colors-border-1);
				}
				color: var(--color);
			}
			&[data-priority='third'] {
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
			&[data-priority='first'] {
				> .background {
					background-color: var(--color);
				}
			}
			&[data-priority='second'] {
				> .background {
					background-color: var(--k-colors-background-2);
				}
				color: var(--color);
			}
			&[data-priority='third'] {
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
	.aria-label-helper {
		display: none;
	}
</style>
