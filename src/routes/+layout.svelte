<script>
	import { initTheme, KProvider } from '$lib';
	import '../app.css';
</script>

<KProvider providers={[initTheme()]}>
	<slot />
</KProvider>
