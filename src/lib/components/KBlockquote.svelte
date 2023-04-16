<script lang="ts">
	import { KCard, KIcon } from '.';
	import KThemeProvider from './KThemeProvider.svelte';
	export let cite = '';
	export let name = '';
	export let avatarURL = '';
	let restClass: string, restProps: any;
	$: (() => {
		const { class: _class, ...props } = $$restProps;
		restClass = _class;
		restProps = props;
	})();
</script>

<KThemeProvider />
<div class="k-blockquote {restClass ?? ''}" {...restProps}>
	<KCard>
		<blockquote {cite}>
			<slot />
		</blockquote>
		<div class="source">
			{#if $$slots.quotemark}
				<slot name="quotemark" />
			{:else}
				<KIcon color="blue" class="k-blockquote__quotemark" size="4xl">
					<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"
						><path
							d="M192 64c-40.646 0-72.483 11.229-94.627 33.373C75.229 119.517 64 151.354 64 192v256h160V192h-96c0-23.056 4.922-39.666 14.627-49.373C152.334 132.922 168.944 128 192 128"
							fill="currentColor"
						/><path
							d="M416 64c-40.646 0-72.483 11.229-94.627 33.373C299.229 119.517 288 151.354 288 192v256h160V192h-96c0-23.056 4.922-39.666 14.627-49.373C376.334 132.922 392.944 128 416 128"
							fill="currentColor"
						/></svg
					>
				</KIcon>
			{/if}
			<div class="author">
				<div class="text">
					<div class="name">
						<span>{name}</span>
					</div>
					{#if $$slots.cite}
						<slot name="cite" />
					{:else if cite}
						<cite>{cite}</cite>
					{/if}
				</div>
				<img src={avatarURL} alt={name} />
			</div>
		</div>
	</KCard>
</div>

<style lang="scss">
	.k-blockquote {
		position: relative;
		blockquote {
			position: relative;
			margin: 0;
		}
		.source {
			display: flex;
			align-items: stretch;
			justify-content: end;
			.author {
				display: flex;
				align-items: center;
				gap: 1em;
				img {
					width: 3em;
					height: 3em;
					border-radius: 50%;
				}
			}
		}
	}
</style>
