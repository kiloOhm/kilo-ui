<script>
	import { KPopover, KBtn } from '$lib';
</script>

<div class="overflow-auto max-h-32">
	<div class="pt-12 pb-32">
		<KPopover show flip trigger="manual">
			<KBtn slot="trigger">Scroll me</KBtn>
			<span>Popover content</span>
		</KPopover>
	</div>
</div>
