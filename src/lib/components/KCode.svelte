<script lang="ts">
	import { KCard } from '.';
	import Prism from 'prismjs';
	import '../util/PrismTheme.css';
	import IonCopyOutline from '~icons/ion/copy-outline';
	import KBtn from './KBtn.svelte';
	import KIcon from './KIcon.svelte';
	export let code: string;
	export let language: string = 'javascript';
	export let wrap: boolean = false;
	export let tabSize: number = 2;
	export let showLanguage = true;
	export let showCopy = true;
	$: html = Prism.highlight(
		'\r' + code,
		Prism.languages[language.toLowerCase()],
		language.toLowerCase()
	);
	function copy() {
		return navigator.clipboard.writeText(code);
	}
</script>

<KCard>
	<div class="wrapper">
		{#if showLanguage || (navigator.clipboard && showCopy)}
			<header>
				{#if showLanguage}
					<span class="language-name">{language}</span>
				{/if}
				{#if navigator.clipboard && showCopy}
					<KBtn priority="tertiary" shape="circle" size="xs" on:click={() => copy()}>
						<KIcon>
							<IonCopyOutline />
						</KIcon>
					</KBtn>
				{/if}
			</header>
		{/if}
		<pre>
			<code
				style:white-space={wrap ? 'pre-wrap' : 'pre'}
				style:tab-size={tabSize}
				style:-moz-tab-size={tabSize}
				style:-o-tab-size={tabSize}
				class={`language-${language}`}>
				{@html html}
			</code>
		</pre>
	</div>
</KCard>

<style lang="scss">
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
</style>
