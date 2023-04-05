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
		}
	];
	let active: string[] | null = null;
</script>

<KMenu {items} nullable bind:active />
