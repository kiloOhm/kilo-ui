<script lang="ts">
	import type { Provider } from "$lib/types";
  export let providers: Provider[] = [];
</script>

<svelte:head>
  { #each providers as provider}
    {#if provider.head}
      {@html provider.head()}
    {/if}
  {/each}
</svelte:head>

<div class="k-provider">
  { #each providers as provider}
    {#if provider.body}
      {@html provider.body()}
    {/if}
  {/each}
  <slot />
</div>