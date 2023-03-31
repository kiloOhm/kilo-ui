<script>
	import { KCard } from '$lib';
</script>

<div class="flex flex-col gap-2">
	<KCard state="neutral">
		<header slot="header">
			<h3>Neutral</h3>
		</header>
		<p>Shall I compare thee to a summer's day?</p>
	</KCard>
	<KCard state="info">
		<header slot="header">
			<h3>Info</h3>
		</header>
		<p>Thou art more lovely and more temperate:</p>
	</KCard>
	<KCard state="success">
		<header slot="header">
			<h3>Success</h3>
		</header>
		<p>Rough winds do shake the darling buds of May,</p>
	</KCard>
	<KCard state="warning">
		<header slot="header">
			<h3>Warning</h3>
		</header>
		<p>And summer's lease hath all too short a date;</p>
	</KCard>
	<KCard state="error">
		<header slot="header">
			<h3>Error</h3>
		</header>
		<p>Sometime too hot the eye of heaven shines,</p>
	</KCard>
</div>
