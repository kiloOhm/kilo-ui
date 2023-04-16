<script lang="ts">
	/**
	 * @event {{ key: string }} select
	 * @event {{ key: string }} deselect
	 * @event {null} clear - clears all values
	 */
	import type { Placement } from '@floating-ui/dom';
	import { setContext } from 'svelte';
	import { KInput, KPopover, type MenuItemMixed, KMenu, KBtn, KIcon } from '.';
	import { extractIfSingle } from '$lib/util/arrays';
	import { keypress, outclick, type Color, type Size } from '..';
	import KChip from './KChip.svelte';
	import Fuse from 'fuse.js';
	import { createEventDispatcher } from 'svelte';
	import KThemeProvider from './KThemeProvider.svelte';
	const dispatch = createEventDispatcher();

	/**
	 * @type {'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end' | 'left-start' | 'left-end' | 'right-start' | 'right-end'}
	 */
	export let placement: Placement = 'bottom';
	export let sameWidth = true;
	/**
	 * @type {({type: 'item', key: string, label?: string} | {type: 'divider', label?: string})[]}
	 */
	export let items: MenuItemMixed[];
	export let show = false;
	export let multiple = false;
	export let clearable = false;
	/**
	 * @type {string | string[] | null}
	 */
	export let selected: string | string[] | null = null;
	/**
	 * defaults to `selected` if `multiple` is false
	 * @type {string}
	 * @default ''
	 */
	export let inputValue: string = !multiple && selected !== null ? (selected as string) : '';
	export let placeholder: string = 'Select a value';
	export let searchable = false;
	export let allowNew = false;
	export let showCaret = true;
	/**
	 * @type {string | null}
	 */
	export let label: string | null = null;
	/**
	 * @type {string | null}
	 */
	export let message: string | null = null;
	/**
	 * @type {'3xs' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl' | '9xl' | string}
	 */
	export let size: Size | string = 'md';
	/**
	 * @type {'blue' | 'purple' | 'green' | 'yellow' | 'red' | string}
	 */
	export let color: Color | string | undefined = 'blue';
	/**
	 * @type {'pill' | 'sharp' | undefined}
	 */
	export let shape: 'pill' | 'sharp' | undefined = undefined;

	$: readonly = !searchable && !allowNew;
	let active: string[] | null = null;
	let newValues: string[] = [];
	function moveNewValues() {
		const _new = active?.find?.((x) => x === '__new__');
		if (_new) {
			newValues = [...newValues, inputValue];
			active = active?.filter((x) => x !== '__new__') ?? null;
		}
	}
	$: (() => {
		if (active?.length) {
			moveNewValues();
		}
	})();
	let _placeholder = placeholder;

	$: (() => {
		if (!multiple) {
			if (selected) {
				if (show) {
					_placeholder = selected as string;
					inputValue = '';
				} else {
					inputValue = selected as string;
					_placeholder = placeholder;
				}
			}
		}
	})();

	$: fuse = !searchable ? null : new Fuse(items, { keys: ['key', 'label'] });

	let searchResults: MenuItemMixed[] = [];
	$: (() => {
		if (!show || !inputValue || !fuse) {
			searchResults = items;
		} else {
			searchResults = fuse.search(inputValue).map((x) => x.item);
		}
		if (allowNew && inputValue) {
			searchResults = [{ type: 'item', key: '__new__', label: inputValue }, ...searchResults];
		}
	})();
	$: selected = extractIfSingle([...(active ?? []), ...newValues]) ?? null;

	$: chips = multiple
		? (selected ? (Array.isArray(selected) ? selected : [selected]) : null)?.map?.((x) => {
				const item = items.find((y) => (y as any).key === x);
				return {
					key: x,
					label: item?.label ?? x
				};
		  })
		: null;

	$: console.log(chips);
	let inputRef: InstanceType<typeof KInput> | null = null;
	let menuWrapperRef: HTMLElement | null = null;
	let menuRef: InstanceType<typeof KMenu> | null = null;

	setContext('k-combobox-ctx', {});

	function select(key: string) {
		if (!multiple) {
			show = false;
		}
		dispatch('select', key);
	}
	function deselect(key: string) {
		active = active?.filter((x) => x !== key) ?? null;
		newValues = newValues.filter((x) => x !== key);
		dispatch('deselect', key);
	}
	function clear() {
		selected = null;
		active = null;
		inputValue = '';
		dispatch('clear');
	}

	function toggle() {
		show = !show;
		if (show) {
			inputRef?.focus();
		}
	}

	function _outclick(e: MouseEvent | TouchEvent) {
		const normal = e instanceof TouchEvent ? e.touches[0] : e;
		const target = normal.target as HTMLElement;
		if (menuWrapperRef?.contains(target)) {
			return;
		}
		show = false;
	}
	let restClass: string, restProps: any;
	$: (() => {
		const { class: _class, ...props } = $$restProps;
		restClass = _class;
		restProps = props;
	})();
</script>

<KThemeProvider />
<div
	class="k-combobox {restClass ?? ''}"
	{...restProps}
	use:outclick={_outclick}
	style:--cursor={searchable || allowNew ? undefined : 'pointer'}
>
	<KPopover {show} {placement} {sameWidth} arrow={false} trigger="manual">
		<!-- svelte-ignore a11y-click-events-have-key-events - using custom keypress action -->
		<div class="input-wrapper" slot="trigger" on:click={toggle} use:keypress={{ Enter: toggle }}>
			<KInput
				focusTrap={show}
				bind:value={inputValue}
				bind:this={inputRef}
				placeholder={_placeholder}
				{readonly}
				autosize="horizontal"
				{label}
				{message}
				{color}
				{size}
				{shape}
			>
				<div class="before" slot="before">
					{#if chips}
						{#each chips as i}
							<KChip text={i.label} size="xs" ghost on:close={() => deselect(i.key)} />
						{/each}
					{/if}
				</div>
			</KInput>
			<div class="after">
				{#if clearable && selected?.length}
					<KBtn priority="tertiary" shape="pill" size="3xs" on:click={clear}>
						<KIcon size="xs">
							<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"
								><path
									fill="currentColor"
									d="m289.94 256l95-95A24 24 0 0 0 351 127l-95 95l-95-95a24 24 0 0 0-34 34l95 95l-95 95a24 24 0 1 0 34 34l95-95l95 95a24 24 0 0 0 34-34Z"
								/></svg
							>
						</KIcon>
					</KBtn>
				{/if}
				{#if showCaret}
					<div class="caret" style:transform={`rotate(${show ? 180 : 0}deg)`}>
						<KIcon size="sm">
							<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"
								><path
									d="M256 217.9L383 345c9.4 9.4 24.6 9.4 33.9 0 9.4-9.4 9.3-24.6 0-34L273 167c-9.1-9.1-23.7-9.3-33.1-.7L95 310.9c-4.7 4.7-7 10.9-7 17s2.3 12.3 7 17c9.4 9.4 24.6 9.4 33.9 0l127.1-127z"
									fill="currentColor"
								/></svg
							>
						</KIcon>
					</div>
				{/if}
			</div>
		</div>
		<div class="menu-wrapper" bind:this={menuWrapperRef}>
			<KMenu
				bind:this={menuRef}
				items={searchResults}
				bind:active
				on:select={({ detail }) => select(detail)}
				multiple
				nullable
				maxSelected={multiple ? undefined : 1}
				{color}
				{size}
				{shape}
			/>
		</div>
	</KPopover>
</div>

<style lang="scss">
	.menu-wrapper {
		padding: 0.25rem;
		cursor: pointer;
	}
	.k-combobox {
		min-width: none;
		// width: max-content;
		cursor: var(--cursor);
		:global(.k-popover) {
			width: 100%;
		}
		:global(.k-input) {
			flex-grow: 1;
		}
		.before {
			display: flex;
			align-items: center;
			flex-wrap: wrap;
			gap: 0.25em;
		}
		.input-wrapper {
			width: 100%;
			position: relative;
			display: flex;
			.after {
				position: absolute;
				right: 0.5em;
				top: 0;
				bottom: 0;
				display: flex;
				align-items: center;
				justify-content: center;
				gap: 0.25em;
				.caret {
					display: flex;
					align-items: center;
					justify-content: center;
				}
			}
		}
	}
	:global(input),
	:global(textarea) {
		cursor: var(--cursor);
	}
</style>
