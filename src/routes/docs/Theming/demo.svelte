<script lang="ts">
	import { KThemeProvider } from '$lib';
</script>

<KThemeProvider
	overrides={{
		colors: {
			background: ['#FFFFFF', '#DDDDDD', '#BBBBBB'],
			text: ['#000000', '#222222', '#444444']
		}
	}}
>
	<div id="app">
		<slot />
	</div>
</KThemeProvider>
