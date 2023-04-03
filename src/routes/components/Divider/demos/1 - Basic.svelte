<script>
	import { KDivider } from '$lib';
</script>

<div class="flex gap-2">
	<div>
		<p>Shall I compare thee to a summer's day?</p>
		<p>Thou art more lovely and more temperate:</p>
		<KDivider>horizontal</KDivider>
		<p>Rough winds do shake the darling buds of May,</p>
		<p>And summer's lease hath all too short a date;</p>
	</div>
	<KDivider vertical>vertical</KDivider>
	<div>
		<p>Sometime too hot the eye of heaven shines,</p>
		<p>And often is his gold complexion dimm'd;</p>
		<KDivider width="5px">
			<span style="white-space: nowrap;"> thicc horizontal </span>
		</KDivider>
		<p>And every fair from fair sometime declines,</p>
		<p>By chance, or nature's changing course untrimm'd;</p>
	</div>
</div>
