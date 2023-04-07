<script>
	import { KInput } from '$lib';
</script>

<div class="flex flex-col gap-2">
	<KInput value="0" label="min 0, max 10, step 2" type="number" min={0} max={10} step={2} />
	<KInput placeholder="input" label="max 10" max={10} />
</div>
