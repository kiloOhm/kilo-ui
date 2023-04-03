<script lang="ts">
	import { KCard, KBtn, KIcon, KCode, KAnchor } from '$lib';
	import { fade } from 'svelte/transition';
	import IonCode from '~icons/ion/code';
	export let title = 'Demo';
	export let code = '';
	let showCode = false;
	import 'prism-svelte';
	import KCollapse from '$lib/components/KCollapse.svelte';
</script>

<KCard>
	<header slot="header" class="flex flex-wrap gap-4 justify-between items-center">
		<KAnchor hash={title} />
		<KBtn
			shape="circle"
			priority="tertiary"
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
	<footer class="pt-4">
		<KCollapse show={showCode}>
			<KCode {code} language="svelte" />
		</KCollapse>
	</footer>
</KCard>
