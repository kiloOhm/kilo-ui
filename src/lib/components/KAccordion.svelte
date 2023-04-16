<script lang="ts">
	import { KUIError } from '$lib/util/console';
	import { setContext } from 'svelte';
	import KThemeProvider from './KThemeProvider.svelte';

	/**
	 * @type {number[] | null}
	 */
	export let active: number[] | null = [];
	export let minActive: number = 1;
	export let maxActive: number = 1;
	$: (() => {
		if (minActive > maxActive) {
			throw new KUIError('minActive must be less than or equal to maxActive');
		}
	})();
	let subscribers: ((active: boolean) => void)[] = [];
	function ctx(callback: (active: boolean) => void): { cleanup(): void; toggle(i: number): void } {
		subscribers = [...subscribers, callback];
		callback(false);
		return {
			cleanup() {
				subscribers = subscribers.filter((subscriber) => subscriber !== callback);
			},
			toggle() {
				const i = subscribers.indexOf(callback);
				if (active === null) {
					active = [i];
				} else if (active.includes(i)) {
					if (active.length <= minActive) return;
					active = active.filter((j) => j !== i);
					if (active.length === 0) active = null;
				} else {
					if (active.length >= maxActive) {
						active = active.slice(1);
					}
					active = [...active, i];
				}
			}
		};
	}
	setContext('k-accordion-ctx', ctx);
	$: (() => {
		if (minActive) {
			active = subscribers?.slice(0, minActive).map((_, i) => i);
		}
	})();
	$: (() => {
		subscribers.forEach((subscriber, i) =>
			subscriber?.(active === null ? false : active.includes(i))
		);
	})();
	let restClass: string, restProps: any;
	$: (() => {
		const { class: _class, ...props } = $$restProps;
		restClass = _class;
		restProps = props;
	})();
</script>

<KThemeProvider>
	<div class="k-accordion {restClass ?? ''}" {...restProps}>
		<slot />
	</div>
</KThemeProvider>

<style lang="scss">
	.k-accordion {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		gap: var(--k-accordion-gap);
		> :global(.k-collapse) {
			&:first-child {
				border-bottom-left-radius: 0 !important;
				border-bottom-right-radius: 0 !important;
			}
			&:last-child {
				border-top-left-radius: 0 !important;
				border-top-right-radius: 0 !important;
			}
			&:not(:first-child):not(:last-child) {
				border-radius: 0 !important;
			}
		}
	}
</style>
