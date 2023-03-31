<script>
	import { KBtn } from '$lib';
</script>

<div class="flex flex-wrap gap-2">
	<KBtn disabled state="info">
		<span>Info</span>
	</KBtn>
	<KBtn disabled priority="secondary" state="success">
		<span>Success secondary</span>
	</KBtn>
	<KBtn disabled priority="tertiary" state="error">
		<span>Error tertiary</span>
	</KBtn>
</div>
