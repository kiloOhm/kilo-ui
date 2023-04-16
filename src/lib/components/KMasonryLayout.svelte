<script lang="ts">
	import { throttle } from 'lodash-es';
	import { KThemeProvider } from '.';

	export let columnGap = 16;
	export let rowGap = 16;
	export let animated = true;
	export let minColumnWidth = 300;
	export let minColumns = 1;

	let wrapperRef: HTMLElement;
	let columns = 0;
	let columnWidth = 0;
	const recalcColumns = throttle(
		() => {
			if (!wrapperRef) return;
			const width = wrapperRef.offsetWidth;
			const numChildren = wrapperRef.children.length;
			columns = Math.max(
				minColumns,
				Math.min(Math.trunc(width / minColumnWidth) || 1, numChildren)
			);
			columnWidth = Math.trunc((width - (columns - 1) * columnGap) / columns);
			const columnHeights = new Array(columns).fill(0);
			for (let i = 0; i < numChildren; i++) {
				const child = wrapperRef.children[i] as HTMLElement;
				const column = columnHeights.indexOf(Math.min(...columnHeights));
				child.style.transform = `translateY(${columnHeights[column]}px) translateX(${
					column * columnWidth + column * columnGap
				}px)`;
				columnHeights[column] += child.offsetHeight + (i === numChildren - 1 ? 0 : rowGap);
			}
			const maxHeight = Math.max(...columnHeights);
			wrapperRef.style.height = `${maxHeight}px`;
		},
		16,
		{
			leading: true,
			trailing: true
		}
	);
	let resizeObserver: ResizeObserver;
	let mutationObserver: MutationObserver;
	$: (() => {
		if (!wrapperRef) return;
		if (resizeObserver) resizeObserver.disconnect();
		resizeObserver = new ResizeObserver(() => {
			setTimeout(() => {
				recalcColumns();
			});
		});
		resizeObserver.observe(wrapperRef);
		if (mutationObserver) mutationObserver.disconnect();
		mutationObserver = new MutationObserver(() => {
			recalcColumns();
		});
		mutationObserver.observe(wrapperRef, {
			childList: true,
			subtree: true,
			attributeFilter: ['style']
		});
		recalcColumns();
	})();
	let restClass: string, restProps: any;
	$: (() => {
		const { class: _class, ...props } = $$restProps;
		restClass = _class;
		restProps = props;
	})();
</script>

<KThemeProvider>
	<div
		{...restProps}
		class="k-masonry-layout {restClass ?? ''}"
		bind:this={wrapperRef}
		style:--column-width={columnWidth}
		class:animated
	>
		<slot />
	</div>
</KThemeProvider>

<style lang="scss">
	@use 'sass:math';
	div {
		position: relative;
		> :global(*) {
			will-change: transform;
			position: absolute;
			width: calc(var(--column-width) * 1px);
		}
		&.animated > :global(*) {
			transition-property: transform;
		}
		&:not(.animated) > :global(*) {
			transition-property: none;
		}
		--max-dur: calc(
			var(--k-transition-duration) * var(--k-masonry-layout-transition-duration) * 1ms
		);
		&:nth-child(5n + 0) {
			transition-duration: calc(var(--max-dur) * (math.random(100) / 100));
		}
		&:nth-child(5n + 1) {
			transition-delay: calc(var(--max-dur) * (math.random(100) / 100) / 4);
			transition-duration: calc(var(--max-dur) * (math.random(100) / 100));
		}
		&:nth-child(5n + 2) {
			transition-delay: calc(var(--max-dur) * (math.random(100) / 100) / 3);
			transition-duration: calc(var(--max-dur) * (math.random(100) / 100));
		}
		&:nth-child(5n + 2) {
			transition-delay: calc(var(--max-dur) * (math.random(100) / 100) / 2);
			transition-duration: calc(var(--max-dur) * (math.random(100) / 100));
		}
		&:nth-child(5n + 2) {
			transition-delay: calc(var(--max-dur) * (math.random(100) / 100));
			transition-duration: calc(var(--max-dur) * (math.random(100) / 100));
		}
	}
</style>
