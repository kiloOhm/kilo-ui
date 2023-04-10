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
</script>

<div class="flex flex-col gap-2">
	<KMenu {items} tabs edgePosition="end" edgePointer backgroundPointer={false} />
	<KMenu {items} tabs edgePosition="end" />
</div>
