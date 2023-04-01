<script>
	import { KCard } from '$lib';
</script>

<div class="flex flex-col gap-2">
	<KCard color="primary">
		<header slot="header">
			<h3>Primary</h3>
		</header>
		<p>Shall I compare thee to a summer's day?</p>
	</KCard>
	<KCard color="secondary">
		<header slot="header">
			<h3>Secondary</h3>
		</header>
		<p>Thou art more lovely and more temperate:</p>
	</KCard>
	<KCard color="success">
		<header slot="header">
			<h3>Success</h3>
		</header>
		<p>Rough winds do shake the darling buds of May,</p>
	</KCard>
	<KCard color="warning">
		<header slot="header">
			<h3>Warning</h3>
		</header>
		<p>And summer's lease hath all too short a date;</p>
	</KCard>
	<KCard color="error">
		<header slot="header">
			<h3>Error</h3>
		</header>
		<p>Sometime too hot the eye of heaven shines,</p>
	</KCard>
</div>
