<script lang="ts">
	import { randomString } from '$lib/util';
	import { useFloatingUi } from '$lib/util/floating-ui';
	import type { Placement } from '@floating-ui/dom';
	import { onDestroy } from 'svelte';
	import { KThemeProvider } from '.';

	export let placement: Placement = 'top';
	export let trigger: 'hover' | 'manual' = 'hover';
	export let enterDelay: number = 200;
	export let leaveDelay: number = 200;
	export let show = false;

	const uid = randomString(8);
	let triggerRef: HTMLElement;
	let contentRef: HTMLElement;
	let arrowRef: HTMLElement;

	let cleanup: (() => void) | undefined;
	onDestroy(() => cleanup?.());
	$: (() => {
		if (!triggerRef || !contentRef || cleanup) return;
		cleanup = useFloatingUi(triggerRef, contentRef, arrowRef, placement, (visible: boolean) => {
			if (visible) _show();
			else _hide();
		});
	})();

	$: (() => {
		if (!contentRef) return;
		contentRef.style.opacity = show ? '1' : '0';
	})();

	function _show() {
		if (trigger !== 'manual') return;
		show = true;
	}
	function _hide() {
		if (trigger !== 'manual') return;
		show = false;
	}

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
</script>

<KThemeProvider />

<div class="k-popover">
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
	>
		<slot />
		<div class="arrow" bind:this={arrowRef} />
	</div>
</div>

<style lang="scss">
	.k-popover {
		width: max-content;
		> .trigger {
			display: block;
		}
		> .content {
			width: max-content;
			position: absolute;
			left: 0;
			top: 0;
			z-index: 2;
			background-color: var(--k-colors-background-2);
			padding: var(--k-popover-padding);
			border-radius: var(--k-popover-border-radius);
			> .arrow {
				position: absolute;
				width: 8px;
				height: 8px;
				background-color: var(--k-colors-background-2);
				transform: rotate(45deg);
				z-index: 1;
			}
		}
	}
</style>
