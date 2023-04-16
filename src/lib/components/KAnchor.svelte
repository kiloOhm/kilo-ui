<script lang="ts">
	//Slots
	/**
	 * @slot icon - Inside the button
	 */
	import KIcon from './KIcon.svelte';
	import KBtn from './KBtn.svelte';
	import { KThemeProvider } from '.';
	export let hash: string = '';
	$: href = '#' + encodeURIComponent(hash);
	function copy() {
		const loc = location.href?.split('#')[0];
		return navigator.clipboard?.writeText(loc + href);
	}
	let restClass: string, restProps: any;
	$: (() => {
		const { class: _class, ...props } = $$restProps;
		restClass = _class;
		restProps = props;
	})();
</script>

<KThemeProvider />
<div class="k-anchor {restClass ?? ''}" {...restProps} id={hash} tabindex="-1">
	<KBtn priority="tertiary" ariaLabel="copy link" size="xs" shape="circle" on:click={() => copy()}>
		{#if $$slots.icon}
			<slot name="icon" />
		{:else}
			<KIcon>
				<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"
					><path
						fill="none"
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="36"
						d="M208 352h-64a96 96 0 0 1 0-192h64m96 0h64a96 96 0 0 1 0 192h-64m-140.71-96h187.42"
					/></svg
				>
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
