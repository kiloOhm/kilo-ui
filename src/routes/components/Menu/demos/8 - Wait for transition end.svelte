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
	let delayed: string[] = ['Option 1'];
</script>

<div class="flex items-center gap-4">
	<KMenu {items} on:transitionend={({ detail }) => (delayed = detail)} />
	<span class="border-[1px] border-white p-2 rounded-md">
		delayed value: {delayed}
	</span>
</div>
