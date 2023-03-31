<script>
	import { KBtn } from '$lib';
</script>

<div class="flex flex-wrap gap-2">
	<KBtn>
		<span>Neutral</span>
	</KBtn>
	<KBtn state="info">
		<span>Info</span>
	</KBtn>
	<KBtn state="success">
		<span>Succes</span>
	</KBtn>
	<KBtn state="warning">
		<span>Warning</span>
	</KBtn>
	<KBtn state="error">
		<span>Error</span>
	</KBtn>
	<!-- secondary -->
	<KBtn priority="secondary">
		<span>Neutral secondary</span>
	</KBtn>
	<KBtn priority="secondary" state="info">
		<span>Info secondary</span>
	</KBtn>
	<KBtn priority="secondary" state="success">
		<span>Succes secondary</span>
	</KBtn>
	<KBtn priority="secondary" state="warning">
		<span>Warning secondary</span>
	</KBtn>
	<KBtn priority="secondary" state="error">
		<span>Error secondary</span>
	</KBtn>
	<!-- tertiary -->
	<KBtn priority="tertiary">
		<span>Neutral tertiary</span>
	</KBtn>
	<KBtn priority="tertiary" state="info">
		<span>Info tertiary</span>
	</KBtn>
	<KBtn priority="tertiary" state="success">
		<span>Succes tertiary</span>
	</KBtn>
	<KBtn priority="tertiary" state="warning">
		<span>Warning tertiary</span>
	</KBtn>
	<KBtn priority="tertiary" state="error">
		<span>Error tertiary</span>
	</KBtn>
</div>
