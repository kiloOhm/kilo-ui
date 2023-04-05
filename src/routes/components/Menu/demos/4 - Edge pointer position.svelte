<script lang="ts">
	import { KMenu, type MenuItemMixed } from '$lib';
	const items: MenuItemMixed[] = [
		{
			type: 'item',
			key: 'start'
		},
		{
			type: 'item',
			key: 'end'
		}
	];
	let active: ('start' | 'end')[] = ['end'];
</script>

<div class="p-2 flex flex-col gap-2 items-center">
	<KMenu {items} bind:active edgePointer backgroundPointer={false} edgePosition={active[0]} />
	<KMenu {items} tabs bind:active edgePointer backgroundPointer={false} edgePosition={active[0]} />
</div>
