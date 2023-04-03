<script>
	import { KCheckbox } from '$lib';
</script>

<div class="flex flex-wrap gap-2">
	<KCheckbox disabled checked>
		<span slot="label">Checked Disabled</span>
	</KCheckbox>
	<KCheckbox disabled>
		<span slot="label">Unchecked Disabled</span>
	</KCheckbox>
</div>
