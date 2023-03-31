<script>
	import { KBtn } from '$lib';
</script>

<div class="flex flex-wrap gap-2">
	<KBtn ghost>
		<span>Neutral</span>
	</KBtn>
	<KBtn ghost state="info">
		<span>Info</span>
	</KBtn>
	<KBtn ghost state="success">
		<span>Succes</span>
	</KBtn>
	<KBtn ghost state="warning">
		<span>Warning</span>
	</KBtn>
	<KBtn ghost state="error">
		<span>Error</span>
	</KBtn>
	<!-- secondary -->
	<KBtn ghost priority="secondary">
		<span>Neutral secondary</span>
	</KBtn>
	<KBtn ghost priority="secondary" state="info">
		<span>Info secondary</span>
	</KBtn>
	<KBtn ghost priority="secondary" state="success">
		<span>Succes secondary</span>
	</KBtn>
	<KBtn ghost priority="secondary" state="warning">
		<span>Warning secondary</span>
	</KBtn>
	<KBtn ghost priority="secondary" state="error">
		<span>Error secondary</span>
	</KBtn>
	<!-- tertiary -->
	<KBtn ghost priority="tertiary">
		<span>Neutral tertiary</span>
	</KBtn>
	<KBtn ghost priority="tertiary" state="info">
		<span>Info tertiary</span>
	</KBtn>
	<KBtn ghost priority="tertiary" state="success">
		<span>Succes tertiary</span>
	</KBtn>
	<KBtn ghost priority="tertiary" state="warning">
		<span>Warning tertiary</span>
	</KBtn>
	<KBtn ghost priority="tertiary" state="error">
		<span>Error tertiary</span>
	</KBtn>
</div>
