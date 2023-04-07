<script>
	import { KInput } from '$lib';
</script>

<div class="flex flex-col gap-2">
	<KInput type="email" placeholder="foo@bar.com" label="email" />
	<KInput type="number" placeholder="123" label="number" />
	<form>
		<KInput type="password" placeholder="password" value="supersecret" label="password" />
	</form>
</div>
