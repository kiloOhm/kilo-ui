<script lang="ts">
	import { KCombobox, type MenuItemMixed } from '$lib';
	const items: MenuItemMixed[] = [
		{
			type: 'item',
			key: 'beatles_revolver_1966_yellow_submarine',
			label: 'Yellow Submarine'
		},
		{
			type: 'item',
			key: 'beatles_revolver_1966_eleanor_rigby',
			label: 'Eleanor Rigby'
		},
		{
			type: 'item',
			key: 'beatles_revolver_1966_i_want_to_tell_you',
			label: 'I Want To Tell You'
		},
		{
			type: 'item',
			key: 'beatles_revolver_1966_good_day_sunshine',
			label: 'Good Day Sunshine'
		}
	];
	let selected: string | string[] | null = null;
</script>

<div class="flex flex-col gap-2 w-full min-w-0">
	<KCombobox searchable allowNew {items} multiple bind:selected />
	<p>Selected: <code>{JSON.stringify(selected, null, 2)}</code></p>
</div>
