<script lang="ts">
	import { KCard, KMasonryLayout, KMenu } from '$lib';
	import KDivider from '$lib/components/KDivider.svelte';
	import KTable from '$lib/components/KTable.svelte';
	import GithubQuote from '../components/GithubQuote.svelte';
	import WipBanner from '../components/WIPBanner.svelte';
	import type { SveldJson } from '../util/types';

	export let sveld: SveldJson | null = null;
	$: props = sveld?.props.filter((p) => p.kind === 'let');
	$: functions = sveld?.props.filter((p) => p.kind === 'function');
	$: dispatchedEvents = sveld?.events.filter((e) => e.type === 'dispatched');
	$: forwardedEvents = sveld?.events.filter((e) => e.type === 'forwarded');
	$: slots = sveld?.slots;
	const tabs = ['Demos', 'API', 'A11y'] as const;
	let active: string[] | null = ['Demos'];
	$: activeTab = active?.[0];
</script>

<div class="m-4">
	<header class="flex gap-2 items-center mb-4">
		<h1 class="text-2xl">
			<slot name="header" />
		</h1>
	</header>

	<section class="mb-4" aria-label="comment">
		{#if $$slots.comment}
			<GithubQuote>
				<slot name="comment" />
			</GithubQuote>
		{/if}
	</section>

	<main>
		<header class="w-full mb-4">
			<KMenu
				tabs
				backgroundPointer={false}
				edgePointer
				edgePosition="end"
				items={tabs.map((t) => ({ type: 'item', key: t }))}
				bind:active
				on:change={(e) => (activeTab = e.detail)}
			/>
			<KDivider />
		</header>
		{#if activeTab === 'Demos'}
			<section aria-label="Demos" class="pb-10">
				<KMasonryLayout minColumnWidth={400} animated={false}>
					<slot />
				</KMasonryLayout>
			</section>
		{:else if activeTab === 'API'}
			<section class="flex flex-col gap-4" aria-label="API">
				{#if sveld}
					{#if props?.length}
						<KTable size="sm" caption="Props">
							<thead>
								<tr>
									<th>Name</th>
									<th>Type</th>
									<th>Default</th>
									<th>Description</th>
								</tr>
							</thead>
							<tbody>
								{#each props as prop}
									<tr>
										<td>{prop.name}</td>
										<td>{prop.type}</td>
										<td>{prop.value ?? ''}</td>
										<td>{prop.description ?? ''}</td>
									</tr>
								{/each}
							</tbody>
						</KTable>
					{/if}
					{#if functions?.length}
						<KTable size="sm" caption="Functions">
							<thead>
								<tr>
									<th>Name</th>
									<th>Type</th>
									<th>Description</th>
								</tr>
							</thead>
							<tbody>
								{#each functions as func}
									<tr>
										<td>{func.name}</td>
										<td>{func.type}</td>
										<td>{func.description ?? ''}</td>
									</tr>
								{/each}
							</tbody>
						</KTable>
					{/if}
					{#if dispatchedEvents?.length}
						<KTable size="sm" caption="Dispatched Events">
							<thead>
								<tr>
									<th>Name</th>
									<th>Type</th>
									<th>Description</th>
								</tr>
							</thead>
							<tbody>
								{#each dispatchedEvents as event}
									<tr>
										<td>{event.name}</td>
										<td>{event.detail}</td>
										<td>{event.description ?? ''}</td>
									</tr>
								{/each}
							</tbody>
						</KTable>
					{/if}
					{#if forwardedEvents?.length}
						<KTable size="sm" caption="Forwarded Events">
							<thead>
								<tr>
									<th>Name</th>
									<th>Description</th>
								</tr>
							</thead>
							<tbody>
								{#each forwardedEvents as event}
									<tr>
										<td>{event.name}</td>
										<td>{event.description ?? ''}</td>
									</tr>
								{/each}
							</tbody>
						</KTable>
					{/if}
					{#if slots?.length}
						<KTable size="sm" caption="Slots">
							<thead>
								<tr>
									<th>Name</th>
									<th>Description</th>
								</tr>
							</thead>
							<tbody>
								{#each slots as slot}
									<tr>
										<td>{slot.default ? 'default' : slot.name}</td>
										<td>{slot.description ?? ''}</td>
									</tr>
								{/each}
							</tbody>
						</KTable>
					{/if}
				{/if}
			</section>
		{:else if activeTab === 'A11y'}
			<section aria-label="A11y">
				<WipBanner>WIP</WipBanner>
			</section>
		{/if}
	</main>
</div>
