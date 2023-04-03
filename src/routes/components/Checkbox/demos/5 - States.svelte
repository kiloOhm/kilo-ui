<script>
	import { KBtn, KCheckbox, KIcon } from '$lib';
	import IonIosRefreshEmpty from '~icons/ion/ios-refresh-empty';
	let states = [false, null, true];
	function refresh() {
		states = [false, null, true];
	}
</script>

<div class="flex flex-col items-center">
	<KBtn priority="tertiary" shape="circle" size="xs" on:click={() => refresh()}>
		<KIcon size="xl">
			<IonIosRefreshEmpty />
		</KIcon>
	</KBtn>
	<div class="flex flex-wrap gap-2">
		<KCheckbox checked={states[0]}>
			<span slot="label">Unchecked</span>
		</KCheckbox>
		<KCheckbox checked={states[1]}>
			<span slot="label">Indeterminate</span>
		</KCheckbox>
		<KCheckbox checked={states[2]}>
			<span slot="label">Checked</span>
		</KCheckbox>
	</div>
</div>
