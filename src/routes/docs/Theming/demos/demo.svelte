<script lang="ts">
	import { KThemeProvider } from '$lib';
	import KBtn from '$lib/components/KBtn.svelte';
</script>

<KThemeProvider
	overrides={{
		colors: {
			blue: '#f086ec'
		}
	}}
>
	<div class="p-4">
		<KBtn color="blue">This button is pink instead of blue</KBtn>
	</div>
</KThemeProvider>
