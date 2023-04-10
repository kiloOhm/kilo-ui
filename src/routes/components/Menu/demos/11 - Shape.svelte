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
	<h4 class="text-lg">Only applies to bg pointer</h4>
	<div>
		<span>normal</span>
		<KMenu {items} tabs />
	</div>
	<div>
		<span>pill</span>
		<KMenu {items} tabs shape="pill" />
	</div>
	<div>
		<span>sharp</span>
		<KMenu {items} tabs shape="sharp" />
	</div>
</div>
