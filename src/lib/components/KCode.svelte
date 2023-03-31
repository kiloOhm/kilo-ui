<script lang="ts">
	import { KCard } from '.';
	import Prism from 'prismjs';
	import 'prismjs/themes/prism-tomorrow.min.css';
	export let code: string;
	export let language: string = 'javascript';
	$: html = Prism.highlight('\r' + code, Prism.languages[language], language);
	$: console.log(html);
</script>

<KCard bordered={false}>
	<pre slot="footer">
		<code class="language-css">
			{@html html}
		</code>
	</pre>
</KCard>

<style lang="scss">
	pre {
		> code {
			white-space: pre-wrap;
			tab-size: 2;
		}
	}
</style>
