<script lang="ts">
	//Events
	/**
	 * @event {MouseEvent} click
	 * @event {null} hover - fires when the mouse enters the button, useful for preloading
	 * @event {MouseEvent | TouchEvent | KeyboardEvent} down - fires on MouseDown, TouchStart and Keydown
	 * @event {MouseEvent | TouchEvent | KeyboardEvent} up - fires on MouseUp, MouseLeave, TouchEnd and Keyup
	 */
	import { type Color, type Size, Sizes, Colors } from '..';
	import { createEventDispatcher } from 'svelte';
	import KThemeProvider from './KThemeProvider.svelte';
	import { debounce } from 'lodash-es';
	import type { ButtonPriority } from './KBtn';

	/**
	 * @type {'primary' | 'secondary' | 'tertiary'}
	 */
	export let priority: ButtonPriority = 'primary';
	/**
	 * @type {'3xs' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl' | '9xl' | string}
	 */
	export let size: Size | string = 'md';
	/**
	 * @type {'blue' | 'purple' | 'green' | 'yellow' | 'red' | string}
	 */
	export let color: Color | string = 'var(--k-colors-text-0)';
	/**
	 * @type {string | undefined}
	 */
	export let textColor: string | undefined = undefined;
	export let ghost = false;
	/**
	 * @type {'pill' | 'circle' | 'sharp' | undefined}
	 */
	export let shape: 'pill' | 'circle' | 'sharp' | undefined = undefined;
	export let disabled = false;
	export let ripple = true;
	/**
	 * if you want only text inside the default slot, use this, as it will also set the aria-label
	 * @type {string | undefined}
	 */
	export let text: string | undefined = undefined;
	/**
	 * @type {string | undefined}
	 */
	export let submit: boolean | undefined = undefined;
	/**
	 * if defined, button will act like a link
	 * @type {string | undefined}
	 */
	export let href: string | undefined = undefined;
	/**
	 * for use with href
	 * @type {string | undefined}
	 */
	export let target: string | undefined = undefined;

	let buttonRef: HTMLButtonElement;

	const dispatch = createEventDispatcher();
	function click(e: MouseEvent) {
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
	function down(e: MouseEvent | KeyboardEvent | TouchEvent) {
		setRippleState(e, true);
		dispatch('down', e);
	}
	function up(e: MouseEvent | KeyboardEvent | TouchEvent) {
		setRippleState(e, false);
		dispatch('up', e);
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
	$: _color = Colors.includes(color as Color)
		? priority === 'primary' && !ghost
			? `var(--k-colors-${color}-darken-4)`
			: `var(--k-colors-${color})`
		: color;
	let restAriaLabel: string, restClass: string, restProps: any;
	$: (() => {
		const { class: _class, ariaLabel, ...props } = $$restProps;
		restClass = _class;
		restProps = props;
		restAriaLabel = ariaLabel;
	})();
</script>

<KThemeProvider />
<button
	class="k-btn {restClass ?? ''}"
	{...restProps}
	type={submit ? 'submit' : 'button'}
	role={href ? 'link' : undefined}
	bind:this={buttonRef}
	data-priority={priority}
	data-shape={shape}
	aria-label={restAriaLabel ?? text}
	style:--size={`var(--k-size-${validSize ? size : 'X'}, ${size})`}
	style:--color={_color}
	style:--text-color={textColor ??
		(color !== 'var(--k-colors-text-0)'
			? 'var(--k-colors-text-0)'
			: 'var(--k-colors-background-0)')}
	class:ripple
	class:ghost
	{disabled}
	on:click={click}
	on:mousedown={down}
	on:keydown={down}
	on:mouseup={up}
	on:keyup={up}
	on:mouseenter={() => hover()}
	on:mouseleave={up}
	on:touchstart|passive={(e) => {
		hover();
		down(e);
	}}
	on:touchend|passive={up}
	on:touchcancel|passive={up}
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
		background: transparent;
		border: none;
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
			opacity: var(--k-button-disabled-alpha);
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
				border-color: var(--k-colors-blue);
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
						border-color: var(--k-colors-border-1);
					}
				}
				color: var(--color);
			}
		}
		&:not(.ghost) {
			&[data-priority='primary'] {
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
	.aria-label-helper {
		display: none;
	}
</style>
