<script>
	import KCode from '$lib/components/KCode.svelte';
	import WipBanner from '../../components/WIPBanner.svelte';
</script>

<svelte:head>
	<title>KUI Components</title>
	<meta name="description" content="Kilo UI Components Overview" />
</svelte:head>

<WipBanner class="mt-4">
	<h3 class="text-xl">A11y is WIP</h3>
	<p>Components have not yet been audited for ARIA Compliance</p>
</WipBanner>
<main class="m-4 flex flex-col gap-4">
	<h1 class="text-2xl font-bold">Components</h1>
	<div class="flex flex-col gap-2">
		<h2 class="text-xl font-semibold">Usage</h2>
		<KCode code={`import { KBtn } from 'kilo-ui';`} />
	</div>
</main>
