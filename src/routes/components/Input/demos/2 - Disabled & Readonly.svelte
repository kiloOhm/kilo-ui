<script>
	import { KInput } from '$lib';
</script>

<div class="flex flex-col gap-2">
	<KInput placeholder="disabled" disabled />
	<KInput placeholder="disabled" disabled message="this field is disabled" />
	<KInput value="readonly" readonly />
</div>
