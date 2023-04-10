<script lang="ts">
	import { KCombobox, type MenuItemMixed } from '$lib';
	const items: MenuItemMixed[] = [
		{
			type: 'item',
			key: 'item1'
		},
		{
			type: 'item',
			key: 'item2'
		},
		{
			type: 'item',
			key: 'item3'
		},
		{
			type: 'item',
			key: 'item4'
		}
	];
	let selected: string | string[] | null = null;
</script>

<div class="flex flex-col gap-2">
	<KCombobox {items} bind:selected />
	<p>Selected: <code>{JSON.stringify(selected, null, 2)}</code></p>
</div>
