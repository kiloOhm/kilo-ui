<script lang="ts">
	import KIcon from './KIcon.svelte';
	import IonLinkOutline from '~icons/ion/link-outline';
	import KBtn from './KBtn.svelte';
	import { KThemeProvider } from '.';
	export let hash: string = '';
	$: href = '#' + encodeURIComponent(hash);
	function copy() {
		const loc = location.href?.split('#')[0];
		return navigator.clipboard?.writeText(loc + href);
	}
</script>

<KThemeProvider />

<div class="k-anchor" id={hash} tabindex="-1">
	<KBtn priority="tertiary" ariaLabel="copy link" size="xs" shape="circle" on:click={() => copy()}>
		{#if $$slots.icon}
			<slot name="icon" />
		{:else}
			<KIcon>
				<IonLinkOutline />
			</KIcon>
		{/if}
	</KBtn>
	<a {href}>
		{#if $$slots.default}
			<slot />
		{:else}
			<span>{hash}</span>
		{/if}
	</a>
</div>

<style lang="scss">
	.k-anchor {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding-right: 1rem;
		border-radius: 1em;
		> a {
			color: var(--k-colors-text-0);
			text-decoration: none;
			&:hover {
				color: var(--k-colors-text-0);
			}
		}
		&:focus {
			outline: 2px solid var(--k-colors-focus);
		}
	}
</style>
