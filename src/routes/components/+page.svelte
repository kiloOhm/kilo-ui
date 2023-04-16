<script>
	import KCode from '$lib/components/KCode.svelte';
	import WipBanner from '../../components/WIPBanner.svelte';
</script>

<svelte:head>
	<title>KUI Components</title>
	<meta name="description" content="Kilo UI Components Overview" />
</svelte:head>

<WipBanner class="mt-4">
	<h3 class="text-lg">A11y is WIP</h3>
	<p>Components have not yet been audited for ARIA Compliance</p>
</WipBanner>
<main class="m-4 flex flex-col gap-2">
	<h1 class="text-2xl">Components</h1>
	<div>
		<h2 class="text-lg">Usage</h2>
		<KCode code={`import { KBtn } from 'kilo-ui';`} />
	</div>
</main>
