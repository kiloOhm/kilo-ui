<script lang="ts">
	import type { DeepPartial } from '$lib/util/types';
	import { getContext, setContext } from 'svelte';
	import { getThemeVars, type Theme } from '../util';
	export let overrides: DeepPartial<Theme> | undefined = undefined;
	const overridden = getContext('--k-theme-overridden');
	if (!overridden) {
		setContext('--k-theme-overridden', true);
	} else {
	}
	let vars = getThemeVars(overrides);
	$: html = `
  <style id="k-theme"> 
    :root {
			${vars.join('\n')};
	    font-family: var(--k-font-family);
		  background: var(--k-colors-background-1);
		  color: var(--k-colors-text-0);
			-webkit-tap-highlight-color: transparent;
		}
		* {
			outline-width: 1px;
			outline-style: solid;
			outline-color: transparent;
			transition-timing-function: var(--k-transition-function);
			transition-duration: calc(var(--k-transition-duration) * 1ms);
			transition-property: outline-color text-decoration-color;
		}
		*:focus-visible {
			outline-color: var(--k-colors-focus);
		}
		a {
			color: var(--k-colors-blue);
			text-decoration: underline;
			text-decoration-color: transparent;
		}
		a:hover {
			text-decoration-color: currentcolor;
		}
  </style>`;
</script>

<svelte:head>
	{#if !overridden}
		{@html html}
	{/if}
</svelte:head>

<slot />
