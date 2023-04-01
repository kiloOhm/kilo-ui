<script lang="ts">
	import { KCard, KBtn, KIcon, KCode } from '$lib';
	import { fade } from 'svelte/transition';
	import IonCode from '~icons/ion/code';
	export let title = 'Demo';
	export let code = '';
	let showCode = false;
	import 'prism-svelte';
</script>

<KCard>
	<header slot="header" class="flex flex-wrap gap-4 justify-between items-center">
		<h2 class="text-lg">{title}</h2>
		<KBtn
			shape="circle"
			priority="third"
			size="xs"
			on:click={() => (showCode = !showCode)}
			ariaLabel="show code"
		>
			<KIcon size="lg">
				<IonCode />
			</KIcon>
		</KBtn>
	</header>
	<slot />
	<footer>
		{#if showCode}
			<div class="m-2 mt-4" transition:fade={{ duration: 200 }}>
				<KCode {code} language="svelte" />
			</div>
		{/if}
	</footer>
</KCard>
