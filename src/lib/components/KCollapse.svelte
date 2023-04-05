<script lang="ts">
	export let show = true;
	let ref: HTMLElement;
	let offscreenRef: HTMLElement;
	let width: string;
	let height: string;

	let observers: ResizeObserver[] = [];
	$: (() => {
		for (let observer of observers) {
			observer.disconnect();
		}
		observers = [];
		if (ref) {
			const observer = new ResizeObserver((entries) => {
				width = `${entries[0].contentRect.width}px`;
			});
			observer.observe(ref);
			observers.push(observer);
		}
		if (offscreenRef) {
			const observer = new ResizeObserver((entries) => {
				height = `${entries[0].contentRect.height}px`;
			});
			observer.observe(offscreenRef);
			observers.push(observer);
		}
	})();
	$: opacity = show ? 1 : 0;
</script>

<div class="k-collapse">
	<slot name="header" />
	<div bind:this={ref} style:height={show ? height : '0'} style:opacity class="collapse-container">
		<div class="content-container">
			<slot />
		</div>
	</div>
</div>

<div class="offscreen" style:width>
	<div bind:this={offscreenRef}>
		<slot />
	</div>
</div>

<style lang="scss">
	.k-collapse {
		> .collapse-container {
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
	}
	.offscreen {
		position: fixed;
		top: -9999px;
		left: -9999px;
	}
</style>
