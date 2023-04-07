<script lang="ts">
	import type { Placement } from '@floating-ui/dom';
	import { setContext } from 'svelte';
	import { KInput, KPopover, type MenuItemMixed, KMenu, KBtn, KIcon } from '.';
	import IonClose from '~icons/ion/close';
	import IonIosArrowUp from '~icons/ion/ios-arrow-up';

	export let placement: Placement = 'bottom';
	export let sameWidth = true;
	export let items: MenuItemMixed[];
	export let show = false;
	export let multiple = false;
	export let clearable = false;
	export let readonly = false;
	export let selected: string | string[] | null = null;
	export let inputValue: string = !multiple && selected !== null ? (selected as string) : '';
	export let allowNew = false;
	export let showCaret = true;

	let active: string[] | null = null;
	let newValues: string[] = [];

	$: (() => {
		if (!multiple && selected) {
			inputValue = selected as string;
		}
	})();

	$: selected = [...(active ?? []), ...newValues];

	let inputRef: InstanceType<typeof KInput> | null = null;

	setContext('k-combobox-ctx', {});

	let hoveringPopover = false;
	function enterPopover() {
		hoveringPopover = true;
	}
	function leavePopover() {
		hoveringPopover = false;
	}
	function blur(e: FocusEvent) {
		if (hoveringPopover) {
			inputRef?.focus();
			return;
		}
		show = false;
	}
	function select(key: string) {
		if (!multiple) {
			show = false;
		}
	}
	function clear() {
		selected = null;
		active = null;
		inputValue = '';
	}
	function click() {
		if (!show && !hoveringPopover) {
			show = true;
			inputRef?.focus();
		}
	}
</script>

<div class="k-combobox" on:click={click} on:keypress={click}>
	<KPopover {show} {placement} {sameWidth} arrow={false} trigger="manual">
		<KInput
			slot="trigger"
			bind:value={inputValue}
			bind:this={inputRef}
			on:blur={({ detail }) => blur(detail)}
			{readonly}
		>
			<div class="before" slot="before">
				{#if selected && multiple}
					{#each Array.isArray(selected) ? selected : [selected] as key}
						<span>
							{key}
						</span>
					{/each}
				{/if}
			</div>
			<div class="after" slot="after">
				{#if clearable && selected?.length}
					<KBtn priority="tertiary" shape="pill" size="3xs" on:click={clear}>
						<KIcon size="xs">
							<IonClose />
						</KIcon>
					</KBtn>
				{/if}
				{#if showCaret}
					<div class="caret" style:transform={`rotate(${show ? 180 : 0}deg)`}>
						<KIcon size="sm">
							<IonIosArrowUp />
						</KIcon>
					</div>
				{/if}
			</div>
		</KInput>
		<div
			class="menu-wrapper"
			on:mouseenter={enterPopover}
			on:mouseleave={leavePopover}
			on:touchstart={enterPopover}
			on:touchend={leavePopover}
			on:touchcancel={leavePopover}
		>
			<KMenu {items} bind:active on:select={({ detail }) => select(detail)} {multiple} nullable />
		</div>
	</KPopover>
</div>

<style lang="scss">
	.k-combobox {
		width: max-content;
		.menu-wrapper {
			padding: 0.5rem;
		}
		.before {
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 0.25em;
		}
		.after {
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
</style>
