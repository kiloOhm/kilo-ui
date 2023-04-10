<script lang="ts">
	//Events
	/**
	 * @event {null} clear
	 * @event {FocusEvent} focus
	 * @event {FocusEvent} blur
	 */
	import { randomString } from '$lib/util';
	import { Colors, Sizes, type Color, type Size } from '../types.d';
	import KBtn from './KBtn.svelte';
	import IonPlus from '~icons/ion/plus';
	import IonMinus from '~icons/ion/minus';
	import IonEye from '~icons/ion/eye';
	import IonEyeOff from '~icons/ion/eye-off';
	import IonClose from '~icons/ion/close';
	import IonCopyOutline from '~icons/ion/copy-outline';
	import IonCheckmark from '~icons/ion/checkmark';
	import { KIcon } from '.';
	import { createEventDispatcher } from 'svelte';
	import { KUIError } from '$lib/util/console';
	import { focusTrap as _focusTrap } from '..';
	const uid = randomString(8);

	export let value = '';
	export let placeholder = '';
	/**
	 * @type {'text' | 'password' | 'email' | 'number'}
	 */
	export let type: 'text' | 'password' | 'email' | 'number' = 'text';
	export let textarea = false;
	/**
	 * @type {'vertical' | 'horizontal' | 'both' | 'none'}
	 */
	export let autosize: 'vertical' | 'horizontal' | 'both' | 'none' = 'none';
	export let minRows = 3;
	/**
	 * @type {number | null}
	 */
	export let maxRows: number | null = 5;
	export let disabled = false;
	export let readonly = false;
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
	export let color: Color | string = 'blue';
	/**
	 * @type {'pill' | 'sharp' | undefined}
	 */
	export let shape: 'pill' | 'sharp' | undefined = undefined;
	/**
	 * @type {string | undefined | null}
	 */
	export let autocomplete: string | undefined | null = 'off';
	/**
	 * @type {string | undefined | null}
	 */
	export let autocapitalize: string | undefined | null = 'off';
	export let min: number | null = null;
	export let max: number | null = null;
	export let step: number = 1;
	export let showPassword: boolean = false;
	export let clearable: boolean = false;
	export let copyable: boolean = false;
	export let focusTrap: boolean = false;

	/**
	 * @type {() => void}
	 */
	export function focus() {
		if (inputRef) inputRef.focus();
		if (textareaRef) textareaRef.focus();
	}

	/**
	 * @type {() => void}
	 */
	export function blur() {
		if (inputRef) inputRef.blur();
		if (textareaRef) textareaRef.blur();
	}

	$: if ((maxRows ?? 1) < 1) throw new KUIError('maxRows must be greater than 0');

	const dispatch = createEventDispatcher();

	$: validSize = Sizes.includes(size as Size);
	$: validColor = !color || Colors.includes(color as Color);

	$: (() => {
		if (min !== null && type === 'number' && Number(value) < min) {
			value = String(min);
		}
		if (max !== null) {
			if (type === 'number' && Number(value) > max) {
				value = String(max);
			}
			if (type === 'text' && value.length > max) {
				value = value.slice(0, max);
			}
		}
	})();

	let focussed = false;

	let inputRef: HTMLInputElement;
	let textareaRef: HTMLTextAreaElement;

	function handleInput(e: Event) {
		value = (e.target as HTMLInputElement).value;
		if (maxRows) {
			const rows = (e.target as HTMLTextAreaElement).value.split('\n').length;
			if (rows > maxRows) {
				value = (e.target as HTMLTextAreaElement).value.split('\n').slice(0, maxRows).join('\n');
			}
		}
		autoSize();
	}

	function autoSize() {
		if (autosize !== 'none') {
			if (autosize === 'both' || autosize === 'horizontal') {
				if (inputRef) {
					let reset = false;
					if (!inputRef.value) {
						inputRef.value = inputRef.placeholder;
						reset = true;
					}
					inputRef.style.width = '0';
					const width = inputRef.scrollWidth;
					inputRef.style.width = `${width}px`;
					if (reset) inputRef.value = '';
				} else if (textareaRef) {
					textareaRef.style.width = '0';
					const width = textareaRef.scrollWidth;
					textareaRef.style.width = `${width}px`;
				}
			}
			if (autosize === 'both' || autosize === 'vertical') {
				if (inputRef) {
					inputRef.style.height = 'auto';
					const height = inputRef.scrollHeight;
					inputRef.style.height = `${height}px`;
				} else if (textareaRef) {
					textareaRef.style.height = 'auto';
					const height = textareaRef.scrollHeight;
					textareaRef.style.height = `${height}px`;
				}
			}
		}
	}

	$: if (inputRef || textareaRef) {
		autoSize();
	}

	function increment() {
		if (type === 'number' && inputRef) {
			const val = Number(inputRef.value);
			if (!max || val < max) {
				inputRef.value = String(val + step);
				value = inputRef.value;
			}
		}
	}
	function decrement() {
		if (type === 'number' && inputRef) {
			const val = Number(inputRef.value);
			if (!min || val > min) {
				inputRef.value = String(val - step);
				value = inputRef.value;
			}
		}
	}

	function _showPassword() {
		showPassword = true;
	}
	function hidePassword() {
		showPassword = false;
	}

	function clear() {
		dispatch('clear');
		value = '';
	}

	let copied = false;
	function copy() {
		if (navigator.clipboard) {
			navigator.clipboard.writeText(value).then(() => {
				copied = true;
				setTimeout(() => {
					copied = false;
				}, 2000);
			});
		}
	}

	function _focus(e: FocusEvent) {
		focussed = true;
		dispatch('focus', e);
	}
	function _blur(e: FocusEvent) {
		if (focusTrap) {
			focus();
			return;
		}
		focussed = false;
		dispatch('blur', e);
	}
	let restClass: string, restProps: any;
	$: (() => {
		const { class: _class, ...props } = $$restProps;
		restClass = _class;
		restProps = props;
	})();
</script>

<div
	class="k-input {restClass ?? ''}"
	{...restProps}
	on:click
	on:keypress
	use:_focusTrap={focusTrap}
	style:--size={`var(--k-size-${validSize ? size : 'X'}, ${size})`}
	style:--color={!validColor
		? color
		: `var(--k-colors-${color}-darken-4, var(--k-colors-background-1)`}
	class:focussed={focussed || message}
	data-shape={shape}
	class:disabled
	data-autosize={autosize}
>
	{#if label}
		<label for={uid}>{label}</label>
	{/if}
	<div class="input-wrapper">
		{#if $$slots.before}
			<div class="before" style:align-items={textarea ? 'start' : 'center'}>
				<slot name="before" />
			</div>
		{/if}
		{#if textarea}
			<textarea
				bind:this={textareaRef}
				id={uid}
				{disabled}
				{readonly}
				{placeholder}
				{value}
				{autocomplete}
				{autocapitalize}
				rows={minRows}
				on:input={handleInput}
				on:focus={_focus}
				on:blur={_blur}
			/>
		{:else}
			<input
				bind:this={inputRef}
				id={uid}
				type={showPassword ? 'text' : type}
				{disabled}
				{readonly}
				{placeholder}
				{value}
				{autocomplete}
				{autocapitalize}
				on:input={handleInput}
				on:focus={_focus}
				on:blur={_blur}
			/>
		{/if}
		{#if $$slots.after || type === 'number' || type === 'password' || copyable || clearable || max !== null}
			<div class="after" style:align-items={textarea ? 'start' : 'center'}>
				{#if type === 'number'}
					<div class="num-controls">
						<KBtn
							ariaLabel={`add ${step}`}
							shape="pill"
							priority="tertiary"
							size="3xs"
							on:click={increment}
						>
							{#if $$slots.plus}
								<slot name="plus" />
							{:else}
								<KIcon size="xs">
									<IonPlus />
								</KIcon>
							{/if}
						</KBtn>
						<KBtn
							ariaLabel={`subtract ${step}`}
							shape="pill"
							priority="tertiary"
							size="3xs"
							on:click={decrement}
						>
							{#if $$slots.minus}
								<slot name="minus" />
							{:else}
								<KIcon size="xs">
									<IonMinus />
								</KIcon>
							{/if}
						</KBtn>
					</div>
				{:else if type === 'password'}
					<div class="password-controls">
						{#if showPassword}
							<KBtn
								ariaLabel="hide password"
								shape="pill"
								priority="tertiary"
								size="3xs"
								on:click={hidePassword}
							>
								{#if $$slots['pw-visible']}
									<slot name="pw-visible" />
								{:else}
									<KIcon size="xs">
										<IonEye />
									</KIcon>
								{/if}
							</KBtn>
						{:else}
							<KBtn
								ariaLabel="show password"
								shape="pill"
								priority="tertiary"
								size="3xs"
								on:click={_showPassword}
							>
								{#if $$slots['pw-hidden']}
									<slot name="pw-hidden" />
								{:else}
									<KIcon size="xs">
										<IonEyeOff />
									</KIcon>
								{/if}
							</KBtn>
						{/if}
					</div>
				{/if}
				{#if clearable && value}
					<div class="clear-controls">
						<KBtn
							ariaLabel="clear input"
							shape="pill"
							priority="tertiary"
							size="3xs"
							on:click={clear}
						>
							{#if $$slots.clear}
								<slot name="clear" />
							{:else}
								<KIcon size="xs">
									<IonClose />
								</KIcon>
							{/if}
						</KBtn>
					</div>
				{/if}
				{#if copyable && value && navigator?.clipboard}
					<div class="copy-controls">
						{#if !copied}
							<KBtn
								ariaLabel="copy to clipboard"
								shape="pill"
								priority="tertiary"
								size="3xs"
								on:click={copy}
							>
								{#if $$slots.copy}
									<slot name="copy" />
								{:else}
									<KIcon size="xs">
										<IonCopyOutline />
									</KIcon>
								{/if}
							</KBtn>
						{:else if $$slots.copy}
							<slot name="copied" />
						{:else}
							<KIcon size="xs">
								<IonCheckmark />
							</KIcon>
						{/if}
					</div>
				{/if}
				{#if type === 'text' && max}
					<span class="max">{value.length}/{max}</span>
				{/if}
				<slot name="after" />
			</div>
		{/if}
	</div>
	{#if message}
		<span class="msg">{message}</span>
	{/if}
</div>

<style lang="scss">
	.k-input {
		font-size: var(--size);
		&.focussed > .input-wrapper {
			outline-color: var(--color);
		}
		&[data-shape='pill'] > .input-wrapper {
			border-radius: 9999px;
		}
		&[data-shape='sharp'] > .input-wrapper {
			border-radius: 0;
		}
		&.disabled > .input-wrapper {
			opacity: var(--k-input-disabled-alpha);
			> input,
			> textarea {
				cursor: not-allowed;
			}
		}
		&[data-autosize='horizontal'],
		&[data-autosize='both'] {
			display: inline-block;
			> .input-wrapper {
				flex-grow: unset;
				display: inline-flex;
				> input,
				> textarea {
					white-space: nowrap;
				}
			}
		}
		> .input-wrapper {
			width: 100%;
			position: relative;
			display: flex;
			flex-wrap: wrap;
			align-items: stretch;
			gap: var(--k-input-slots-gap);
			border-radius: var(--k-input-border-radius);
			outline-width: var(--k-input-outline-width);
			background-color: var(--k-colors-background-2);
			overflow: hidden;
			outline-color: transparent;
			padding: var(--k-input-padding);
			> input,
			> textarea {
				transition: none;
				position: relative;
				flex-grow: 1;
				min-width: 1px;
				background: none;
				outline: none;
				/* Chrome, Safari, Edge, Opera */
				&::-webkit-outer-spin-button,
				&::-webkit-inner-spin-button {
					-webkit-appearance: none;
					margin: 0;
				}
				/* Firefox */
				&[type='number'] {
					-moz-appearance: textfield;
				}
				&::placeholder {
					/* Chrome, Firefox, Opera, Safari 10.1+ */
					color: var(--k-colors-text-2);
					opacity: 1; /* Firefox */
				}

				&:-ms-input-placeholder {
					/* Internet Explorer 10-11 */
					color: var(--k-colors-text-2);
				}

				&::-ms-input-placeholder {
					/* Microsoft Edge */
					color: var(--k-colors-text-2);
				}
			}
			> textarea {
				&::-webkit-resizer {
					display: none;
				}
				resize: none;
			}
			> .before,
			> .after {
				display: flex;
				gap: var(--k-input-slots-gap);
			}
			> .after {
				> .num-controls,
				> .password-controls,
				> .clear-controls,
				> .copy-controls,
				> .max {
					display: flex;
					align-items: center;
					gap: var(--k-input-slots-gap);
				}
				> .max {
					font-size: 0.8em;
					color: var(--k-colors-text-1);
				}
			}
		}
		> .msg {
			font-size: 0.8em;
			color: var(--color);
			margin-left: var(--k-input-border-radius);
		}
	}
</style>
