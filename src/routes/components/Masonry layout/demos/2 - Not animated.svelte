<script lang="ts">
	import { KBtn, KIcon, KMasonryLayout } from '$lib';
	import IonDiceOutline from '~icons/ion/dice-outline';

	function randomRectangles(options: {
		amount: number;
		minWidth: number;
		maxWidth: number;
		minHeight: number;
		maxHeight: number;
	}) {
		const { amount, minWidth, maxWidth, minHeight, maxHeight } = options;
		const rectangles = [];
		for (let i = 0; i < amount; i++) {
			const width = Math.floor(Math.random() * (maxWidth - minWidth + 1)) + minWidth;
			const height = Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight;
			const color = `hsl(${Math.floor(Math.random() * 360)}, 100%, 50%)`;
			rectangles.push({ width, height, color });
		}
		return rectangles;
	}
	let rectangles: {
		width: number;
		height: number;
		color: string;
	}[] = [];
	function generateRectangles() {
		const newRects = randomRectangles({
			amount: 30,
			minWidth: 100,
			maxWidth: 200,
			minHeight: 100,
			maxHeight: 200
		});
		rectangles = newRects;
	}
	generateRectangles();
	let cacheBuster = 0;
</script>

<div class="flex flex-col items-center gap-4">
	<KBtn
		priority="second"
		shape="circle"
		ariaLabel="Generate new rectangles"
		on:click={() => {
			generateRectangles();
			cacheBuster++;
		}}
	>
		<KIcon size="xl">
			<IonDiceOutline />
		</KIcon></KBtn
	>
	<div class="h-80 w-full overflow-auto">
		{#key cacheBuster}
			<KMasonryLayout minColumns={3} animated={false}>
				{#each rectangles as { height, color }, i}
					<div class="relative" style={`height: ${height}px; background-color: ${color};`}>
						<span class="absolute left-0 top-0 bg-black rounded-lg p-2 m-1">
							{i + 1}
						</span>
					</div>
				{/each}
			</KMasonryLayout>
		{/key}
	</div>
</div>
