<script>
	import { KBtn } from '$lib';
</script>

<div class="flex flex-wrap gap-2">
	<KBtn disabled color="secondary">
		<span>Secondary</span>
	</KBtn>
	<KBtn disabled priority="second" color="success">
		<span>Success second</span>
	</KBtn>
	<KBtn disabled priority="third" color="error">
		<span>Error third</span>
	</KBtn>
</div>
