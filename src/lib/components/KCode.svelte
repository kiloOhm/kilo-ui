<script lang="ts">
	import { KThemeProvider } from '.';
	import Prism from 'prismjs';
	import '../util/PrismTheme.css';
	import IonCopyOutline from '~icons/ion/copy-outline';
	import KBtn from './KBtn.svelte';
	import KIcon from './KIcon.svelte';
	export let code: string;
	/**
	 * for use with prismjs, make sure to import language first
	 */
	export let language: string = 'javascript';
	export let wrap: boolean = false;
	export let tabSize: number = 2;
	export let showLanguage = true;
	export let showCopy = true;
	export let bordered = true;
	$: html = Prism.highlight(
		'\r' + code,
		Prism.languages[language.toLowerCase()],
		language.toLowerCase()
	);
	function copy() {
		if (typeof navigator === 'undefined') return;
		return navigator.clipboard?.writeText(code);
	}
	let restClass: string, restProps: any;
	$: (() => {
		const { class: _class, ...props } = $$restProps;
		restClass = _class;
		restProps = props;
	})();
</script>

<KThemeProvider />

<div class="k-code {restClass ?? ''}" {...restProps} class:bordered>
	<div class="wrapper">
		{#if showLanguage || showCopy}
			<header>
				{#if showLanguage}
					<span class="language-name">{language}</span>
				{/if}
				{#if showCopy}
					<KBtn priority="tertiary" shape="circle" size="xs" on:click={() => copy()}>
						<KIcon>
							<IonCopyOutline />
						</KIcon>
					</KBtn>
				{/if}
			</header>
		{/if}
		<pre><code
				style:white-space={wrap ? 'pre-wrap' : 'pre'}
				style:tab-size={tabSize}
				style:-moz-tab-size={tabSize}
				style:-o-tab-size={tabSize}
				class={`language-${language}`}>
					{@html html}
			</code></pre>
	</div>
</div>

<style lang="scss">
	.k-code {
		padding: var(--k-card-main-padding);
		background-color: var(--k-colors-background-0);
		border-radius: var(--k-card-border-radius);
		&.bordered {
			border-width: var(--k-card-border-width);
			border-color: var(--k-colors-border-0);
		}
		.wrapper {
			position: relative;
			header {
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				display: flex;
				justify-content: space-between;
				align-items: center;
				gap: 1rem;
				.language-name {
					color: var(--k-colors-text-2);
				}
			}
			pre {
				overflow: auto;
				> code {
					display: block;
					padding: 0;
					margin: 0;
				}
			}
		}
	}
</style>
