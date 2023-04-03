<script lang="ts">
	export let show = true;
	let ref: HTMLElement;
	let offscreenRef: HTMLElement;
	$: height = show ? `${offscreenRef.clientHeight}px` : 0;
	$: opacity = show ? 1 : 0;
	$: (() => {
		void ref?.style.height;
		show;
	})();
</script>

<div bind:this={ref} style:height style:opacity class="k-collapse">
	<div class="content-container">
		<slot />
	</div>
</div>

<div class="offscreen">
	<div bind:this={offscreenRef}>
		<slot />
	</div>
</div>

<style lang="scss">
	.k-collapse {
		overflow: hidden;
		position: relative;
		transition-property: opacity, height;
		> .content-container {
			position: absolute;
			left: 0;
			right: 0;
			bottom: 0;
		}
	}
	.offscreen {
		position: fixed;
		top: -9999px;
		left: -9999px;
	}
</style>
