<script lang="ts">
	import type { RoadMapItem } from './KRoadmap';
	import { KCard, KDivider } from '$lib';
	import KBtn from '$lib/components/KBtn.svelte';
	import KIcon from '$lib/components/KIcon.svelte';
	import IonIosArrowUp from '~icons/ion/ios-arrow-up';

	export let items: RoadMapItem[] | Record<string, RoadMapItem[]>;
	export let hideUpvotes: boolean = false;

	let restClass: string, restProps: any;
	$: (() => {
		const { class: _class, ...props } = $$restProps;
		restClass = _class;
		restProps = props;
	})();
	let sections: { title?: string; items: RoadMapItem[] }[] = [];
	$: {
		if (Array.isArray(items)) {
			sections = [{ title: '', items }];
		} else {
			sections = Object.entries(items).map(([title, items]) => ({ title, items }));
		}
	}
</script>

<div class="k-roadmap {restClass ?? ''}" {...restProps}>
	{#each sections as section, i}
		{#if section.title || i != 0}
			<KDivider>
				{section.title}
			</KDivider>
		{/if}
		{#each section.items as item}
			<KCard>
				<div class="item">
					{#if !hideUpvotes}
						<div class="votes">
							<KBtn size="sm" ghost>
								<div class="vote-btn__inner">
									<KIcon>
										<IonIosArrowUp />
									</KIcon>
									{item.votes ?? 0}
								</div>
							</KBtn>
						</div>
					{/if}
					<div>
						<div class="title">
							<KIcon>
								<svelte:component this={item.icon} />
							</KIcon>
							<h3>
								{item.title}
							</h3>
						</div>
						{#if item.description}
							<div class="description">
								<p>
									{item.description}
								</p>
							</div>
						{/if}
					</div>
				</div>
			</KCard>
		{/each}
	{/each}
</div>

<style lang="scss">
	.k-roadmap {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		.item {
			display: flex;
			align-items: start;
			gap: 1em;
			.vote-btn__inner {
				display: flex;
				align-items: center;
				gap: 0.25em;
			}
			.title {
				display: flex;
				align-items: center;
				gap: 0.5em;
				h3 {
					font-size: 1.25rem;
				}
			}
		}
	}
</style>
