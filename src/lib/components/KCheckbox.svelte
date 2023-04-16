<script lang="ts">
	import { Colors, KIcon, Sizes, type Color, type Size } from '..';
	import KThemeProvider from './KThemeProvider.svelte';
	const uid = crypto.randomUUID();
	/**
	 * @type {boolean | null}
	 */
	export let checked: boolean | null = false;
	export let disabled: boolean = false;
	/**
	 * @type {'pill' | 'circle' | 'sharp' | undefined}
	 */
	export let shape: 'round' | 'sharp' | undefined = undefined;
	/**
	 * @type {'3xs' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl' | '9xl' | string}
	 */
	export let size: Size | string = 'md';
	/**
	 * @type {'blue' | 'purple' | 'green' | 'yellow' | 'red' | string}
	 */
	export let color: Color | string = 'var(--k-colors-green-darken-4)';
	$: validSize = Sizes.includes(size as Size);
	$: _color = Colors.includes(color as Color) ? `var(--k-colors-${color}-darken-4)` : color;
	let restClass: string, restProps: any;
	$: (() => {
		const { class: _class, ...props } = $$restProps;
		restClass = _class;
		restProps = props;
	})();
</script>

<KThemeProvider />
<div
	class="k-checkbox {restClass ?? ''}"
	{...restProps}
	style:--size={`var(--k-size-${validSize ? size : 'X'}, ${size})`}
	style:--border-radius={shape === 'round'
		? '9999px'
		: shape === 'sharp'
		? '0'
		: 'var(--k-checkbox-border-radius)'}
	style:--color={_color}
	data-checked={checked?.toString() ?? 'indeterminate'}
	class:disabled
	on:click={() => (checked = !checked)}
	on:keyup={(e) => {
		if (e.key === 'Enter') {
			checked = !checked;
		}
	}}
>
	{#if $$slots.label}
		<label
			for={uid}
			on:click={() => (checked = !checked)}
			on:keyup={(e) => {
				if (e.key === 'Enter') {
					checked = !checked;
				}
			}}
		>
			<slot name="label" />
		</label>
	{/if}
	<input {disabled} type="checkbox" class="k-switch__input" id={uid} bind:checked />
	<div class="track">
		<div class="mark">
			<div class="checked">
				{#if $$slots['mark-checked']}
					<slot name="mark-checked" />
				{:else}
					<KIcon size="var(--k-checkbox-mark-scale)">
						<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"
							><path
								fill="none"
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="32"
								d="M416 128L192 384l-96-96"
							/></svg
						>
					</KIcon>
				{/if}
			</div>
			<div class="indeterminate">
				{#if $$slots['mark-indeterminate']}
					<slot name="mark-indeterminate" />
				{:else}
					<KIcon size="var(--k-checkbox-mark-scale)">
						<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"
							><path
								d="M417.4 224H94.6C77.7 224 64 238.3 64 256s13.7 32 30.6 32h322.8c16.9 0 30.6-14.3 30.6-32s-13.7-32-30.6-32z"
								fill="currentColor"
							/></svg
						>
					</KIcon>
				{/if}
			</div>
			<div class="unchecked">
				{#if $$slots['mark-unchecked']}
					<slot name="mark-unchecked" />
				{/if}
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.k-checkbox {
		> input {
			display: none;
		}
		font-size: var(--size);
		display: inline-flex;
		align-items: center;
		cursor: pointer;
		user-select: none;
		> label {
			margin-right: 0.5rem;
			cursor: pointer;
		}
		> .track {
			position: relative;
			background-color: var(--track-color);
			width: var(--k-checkbox-size);
			aspect-ratio: 1/1;
			border-width: var(--k-checkbox-border-width);
			border-style: solid;
			border-color: var(--track-color);
			border-radius: var(--border-radius);
			> .mark {
				> * {
					position: absolute;
					inset: 0;
					display: flex;
					align-items: center;
					justify-content: center;
				}
				> .checked,
				.indeterminate,
				.unchecked {
					opacity: 0;
				}
			}
		}
		&[data-checked='true'],
		&[data-checked='indeterminate'] {
			> .track {
				background-color: var(--color);
			}
		}
		&[data-checked='true'] > .track > .mark > .checked {
			opacity: 1;
		}
		&[data-checked='indeterminate'] > .track > .mark > .indeterminate {
			opacity: 1;
		}
		&[data-checked='false'] > .track > .mark > .unchecked {
			opacity: 1;
		}
		&.disabled {
			cursor: not-allowed;
			opacity: var(--k-checkbox-disabled-alpha);
			> label {
				cursor: not-allowed;
			}
		}
	}
</style>
