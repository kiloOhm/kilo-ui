<script>
	import { KSwitch } from '$lib';
</script>

<div class="flex flex-wrap gap-2">
	<KSwitch disabled checked>
		<span slot="label">Checked Disabled</span>
	</KSwitch>
	<KSwitch disabled>
		<span slot="label">Unchecked Disabled</span>
	</KSwitch>
</div>
