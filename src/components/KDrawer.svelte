<script lang="ts">
	import { KThemeProvider, type Direction } from '$lib';
	import { getContext } from 'svelte';
	export let show = false;
	export let direction: Direction = 'bottom';
	const setActiveDrawer = getContext('--k-set-active-drawer') as (
		drawer?: any,
		direction?: Direction,
		closeCallback?: () => void
	) => void;
	const subscribeBackgroundClick = getContext('--k-subscribe-background-click') as (
		callback: () => void
	) => () => void;
	const handleBackgroundClick = () => {
		show = false;
	};
	let contentWrapperRef: HTMLElement;
	$: (() => {
		if (show) {
			setTimeout(() => {
				setActiveDrawer(contentWrapperRef, direction, () => {
					show = false;
				});
			});
		} else {
			setActiveDrawer();
		}
	})();
	subscribeBackgroundClick(handleBackgroundClick);
</script>

<KThemeProvider />

<div class="k-drawer" data-direction={direction}>
	<div bind:this={contentWrapperRef} class="content-wrapper">
		<slot />
	</div>
</div>

<style lang="scss">
	.k-drawer {
		position: fixed;
		&[data-direction='top'] {
			transform: translateY(-100%);
			flex-direction: column;
			align-items: stretch;
		}
		&[data-direction='bottom'] {
			transform: translateY(100%);
			flex-direction: column-reverse;
			align-items: stretch;
		}
		&[data-direction='left'] {
			transform: translateX(-100%);
			flex-direction: row;
			justify-content: stretch;
		}
		&[data-direction='right'] {
			transform: translateX(100%);
			flex-direction: row-reverse;
			justify-content: stretch;
		}
	}
</style>
