<script lang="ts">
	import IonQuote from '~icons/ion/quote';
	import { KCard, KIcon } from '.';
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
					<IonQuote />
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
