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
			type: 'divider'
		},
		{
			type: 'item',
			key: 'Option 3'
		},
		{
			type: 'item',
			key: 'Option 4'
		}
	];
</script>

<div class="flex flex-col gap-2">
	<KMenu {items} />
	<KMenu {items} tabs />
</div>
