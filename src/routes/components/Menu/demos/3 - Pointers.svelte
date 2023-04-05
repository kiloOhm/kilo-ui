<script lang="ts">
	import { KMenu, type MenuItemMixed } from '$lib';
	const items: MenuItemMixed[] = [
		{
			type: 'item',
			key: 'both'
		},
		{
			type: 'item',
			key: 'edge'
		},
		{
			type: 'item',
			key: 'background'
		}
	];
	let active: string[] = [];
</script>

<div class="p-2 flex flex-col gap-2 items-center">
	<KMenu
		{items}
		bind:active
		edgePointer={active[0] !== 'background'}
		backgroundPointer={active[0] !== 'edge'}
	/>
</div>
