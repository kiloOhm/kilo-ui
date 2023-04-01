<script>
	import { KSwitch } from '$lib';
</script>

<div class="flex flex-wrap gap-2">
	<KSwitch checkedColor="primary" checked>
		<span slot="label">Primary</span>
	</KSwitch>
	<KSwitch checkedColor="secondary" checked>
		<span slot="label">Secondary</span>
	</KSwitch>
	<KSwitch checkedColor="success" checked>
		<span slot="label">Success</span>
	</KSwitch>
	<KSwitch checkedColor="warning" checked>
		<span slot="label">Warning</span>
	</KSwitch>
	<KSwitch checkedColor="error" checked>
		<span slot="label">Error</span>
	</KSwitch>
</div>
