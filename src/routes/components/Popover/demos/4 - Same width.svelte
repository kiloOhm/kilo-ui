<script>
	import { KPopover, KBtn } from '$lib';
</script>

<div class="pt-12 flex justify-between">
	<KPopover show trigger="manual" sameWidth>
		<KBtn slot="trigger">looooooong</KBtn>
		<span>smol</span>
	</KPopover>
</div>
