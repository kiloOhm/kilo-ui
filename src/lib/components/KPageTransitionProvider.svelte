<script lang="ts">
	import { beforeNavigate } from '$app/navigation';
	import { randomString } from '$lib/util';
	import { getContext, onDestroy, setContext } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import type { Transition } from './KPageTransitionProvider';

	export let path: string;
	export let ruleFn:
		| ((
				from: string,
				to: string
		  ) =>
				| {
						in: Transition;
						out: Transition;
				  }
				| undefined)
		| undefined = undefined;
	export let defaultInTransition: Transition = {
		type: 'fade',
		duration: 200
	};
	export let defaultOutTransition: Transition = {
		type: 'fade',
		duration: 200
	};

	let from = '';
	let to = '';
	beforeNavigate(({ from: _from, to: _to }) => {
		from = _from?.url.pathname ?? '';
		to = _to?.url.pathname ?? '';
	});
	function _in(e: Element) {
		const rule = ruleFn?.(from, to);
		let transition = defaultInTransition;
		if (rule) {
			transition = rule.in;
		}
		switch (transition.type) {
			case 'fade':
				return fade(e, { duration: transition.duration });
			case 'fly':
				let x, y;
				switch (transition.direction) {
					case 'left':
						x = transition.amount;
						break;
					case 'right':
						x = -transition.amount;
						break;
					case 'up':
						y = transition.amount;
						break;
					case 'down':
						y = -transition.amount;
						break;
				}
				return fly(e, { duration: transition.duration, x, y });
		}
	}
	function _out(e: Element) {
		const rule = ruleFn?.(from, to);
		let transition = defaultOutTransition;
		if (rule) {
			transition = rule.out;
		}
		switch (transition.type) {
			case 'fade':
				return fade(e, { duration: transition.duration });
			case 'fly':
				let x, y;
				switch (transition.direction) {
					case 'left':
						x = -transition.amount;
						break;
					case 'right':
						x = transition.amount;
						break;
					case 'up':
						y = -transition.amount;
						break;
					case 'down':
						y = transition.amount;
						break;
				}
				return fly(e, { duration: transition.duration, x, y });
		}
	}
</script>

<div class="page-container">
	{#key path}
		<div in:_in out:_out class="transition-wrapper">
			<slot />
		</div>
	{/key}
</div>

<style lang="scss">
	.page-container {
		position: relative;
		width: 100%;
		height: 100%;
		overflow: auto;
		> .transition-wrapper {
			position: absolute;
			inset: 0;
			display: block;
			flex-grow: 1;
		}
	}
</style>
