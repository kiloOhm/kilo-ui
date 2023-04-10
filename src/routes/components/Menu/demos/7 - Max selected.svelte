<script lang="ts">
	import { KMenu, type MenuItemMixed } from '$lib';
	const items: MenuItemMixed[] = [
		{
			type: 'item',
			key: 'Option 1'
		},
		{
			type: 'item',
			key: 'Option 2'
		},
		{
			type: 'item',
			key: 'Option 3'
		}
	];
	let active: string[];
</script>

<KMenu {items} maxSelected={2} edgePointer backgroundPointer={false} bind:active multiple />
