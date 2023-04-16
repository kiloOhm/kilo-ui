<script lang="ts">
	import { randomString } from '$lib/util';
	import { useFloatingUi } from '$lib/util/floating-ui';
	import type { Placement } from '@floating-ui/dom';
	import { getContext, onDestroy } from 'svelte';
	import { KThemeProvider } from '.';

	/**
	 * @type {'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end' | 'left-start' | 'left-end' | 'right-start' | 'right-end'}
	 */
	export let placement: Placement = 'top';
	/**
	 * @type {'hover' | 'manual'}
	 */
	export let trigger: 'hover' | 'manual' = 'hover';
	export let enterDelay: number = 200;
	export let leaveDelay: number = 200;
	export let show = false;
	export let sameWidth = false;
	export let flip = false;
	export let shift = false;
	export let arrow = true;
	export let offset = 8;

	const uid = randomString(8);
	let triggerRef: HTMLElement;
	let contentRef: HTMLElement;
	let arrowRef: HTMLElement;

	const comboboxCtx = getContext('k-combobox-ctx');

	let cleanup: (() => void) | undefined;
	onDestroy(() => {
		show = false;
		cleanup?.();
	});
	let triggerHidden = false;
	function setTriggerHidden(hidden: boolean) {
		triggerHidden = hidden;
	}
	$: (() => {
		if (!triggerRef || !contentRef || cleanup) return;
		cleanup = useFloatingUi(
			triggerRef,
			contentRef,
			arrowRef,
			(visible: boolean) => {
				if (!visible) {
					setTriggerHidden(true);
				} else {
					setTriggerHidden(false);
				}
			},
			{
				placement,
				sameWidth,
				flip,
				shift,
				offset
			}
		);
	})();

	$: (() => {
		if (!contentRef) return;
		contentRef.style.opacity = show && !triggerHidden ? '1' : '0';
		contentRef.style.pointerEvents = show ? 'auto' : 'none';
	})();

	let enterTimeout: NodeJS.Timeout;
	function enter() {
		if (trigger !== 'hover') return;
		if (enterTimeout) {
			clearTimeout(enterTimeout);
		}
		enterTimeout = setTimeout(() => (show = true), enterDelay);
	}
	let leaveTimeout: NodeJS.Timeout;
	function leave() {
		if (trigger !== 'hover') return;
		if (leaveTimeout) {
			clearTimeout(leaveTimeout);
		}
		if (enterTimeout) {
			clearTimeout(enterTimeout);
		}
		leaveTimeout = setTimeout(() => (show = false), leaveDelay);
	}
	let restClass: string, restProps: any;
	$: (() => {
		const { class: _class, ...props } = $$restProps;
		restClass = _class;
		restProps = props;
	})();
</script>

<KThemeProvider>
	<div class="k-popover {restClass ?? ''}" {...restProps}>
		<div
			class="trigger"
			on:mouseenter={enter}
			on:touchstart={enter}
			on:focus={enter}
			on:mouseleave={leave}
			on:touchend={leave}
			on:blur={leave}
			aria-describedby={`k-popover_${uid}_content`}
			bind:this={triggerRef}
		>
			<slot name="trigger" />
		</div>
		<div
			on:mouseenter={enter}
			on:touchstart={enter}
			on:focus={enter}
			on:mouseleave={leave}
			on:touchend={leave}
			on:blur={leave}
			class="content"
			id={`k-popover_${uid}_content`}
			role="tooltip"
			bind:this={contentRef}
			style:padding={comboboxCtx ? '0' : undefined}
		>
			<slot />
			<div class="arrow" style:display={arrow ? 'block' : 'none'} bind:this={arrowRef} />
		</div>
	</div>
</KThemeProvider>

<style lang="scss">
	.k-popover {
		width: max-content;
		> .trigger {
			display: block;
		}
	}
	// No nesting, because content will be portalled to body
	.content {
		width: max-content;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 101;
		background-color: var(--k-colors-background-2);
		padding: var(--k-popover-padding);
		border-radius: var(--k-popover-border-radius);
		> .arrow {
			position: fixed;
			width: 8px;
			height: 8px;
			background-color: var(--k-colors-background-2);
			transform: rotate(45deg);
			z-index: 100;
		}
	}
</style>
