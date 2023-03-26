<script>
	import { KCard, KBtn, KBtnGroup } from '$lib/components';
</script>

<h1>Buttons</h1>

<main class="flex flex-col gap-4">
	<KCard>
		<h2 class="text-lg leading-3" slot="header">Default</h2>
		<div class="flex flex-wrap gap-2">
			<KBtn>
				<span>Neutral</span>
			</KBtn>
			<KBtn level="info">
				<span>Info</span>
			</KBtn>
			<KBtn level="success">
				<span>Succes</span>
			</KBtn>
			<KBtn level="warning">
				<span>Warning</span>
			</KBtn>
			<KBtn level="error">
				<span>Error</span>
			</KBtn>
			<!-- secondary -->
			<KBtn priority="secondary">
				<span>Neutral secondary</span>
			</KBtn>
			<KBtn priority="secondary" level="info">
				<span>Info secondary</span>
			</KBtn>
			<KBtn priority="secondary" level="success">
				<span>Succes secondary</span>
			</KBtn>
			<KBtn priority="secondary" level="warning">
				<span>Warning secondary</span>
			</KBtn>
			<KBtn priority="secondary" level="error">
				<span>Error secondary</span>
			</KBtn>
			<!-- tertiary -->
			<KBtn priority="tertiary">
				<span>Neutral tertiary</span>
			</KBtn>
			<KBtn priority="tertiary" level="info">
				<span>Info tertiary</span>
			</KBtn>
			<KBtn priority="tertiary" level="success">
				<span>Succes tertiary</span>
			</KBtn>
			<KBtn priority="tertiary" level="warning">
				<span>Warning tertiary</span>
			</KBtn>
			<KBtn priority="tertiary" level="error">
				<span>Error tertiary</span>
			</KBtn>
		</div>
	</KCard>
	<KCard>
		<h2 class="text-lg leading-3" slot="header">Ghost</h2>
		<div class="flex flex-wrap gap-2">
			<KBtn ghost>
				<span>Neutral</span>
			</KBtn>
			<KBtn ghost level="info">
				<span>Info</span>
			</KBtn>
			<KBtn ghost level="success">
				<span>Succes</span>
			</KBtn>
			<KBtn ghost level="warning">
				<span>Warning</span>
			</KBtn>
			<KBtn ghost level="error">
				<span>Error</span>
			</KBtn>
			<!-- secondary -->
			<KBtn ghost priority="secondary">
				<span>Neutral secondary</span>
			</KBtn>
			<KBtn ghost priority="secondary" level="info">
				<span>Info secondary</span>
			</KBtn>
			<KBtn ghost priority="secondary" level="success">
				<span>Succes secondary</span>
			</KBtn>
			<KBtn ghost priority="secondary" level="warning">
				<span>Warning secondary</span>
			</KBtn>
			<KBtn ghost priority="secondary" level="error">
				<span>Error secondary</span>
			</KBtn>
			<!-- tertiary -->
			<KBtn ghost priority="tertiary">
				<span>Neutral tertiary</span>
			</KBtn>
			<KBtn ghost priority="tertiary" level="info">
				<span>Info tertiary</span>
			</KBtn>
			<KBtn ghost priority="tertiary" level="success">
				<span>Succes tertiary</span>
			</KBtn>
			<KBtn ghost priority="tertiary" level="warning">
				<span>Warning tertiary</span>
			</KBtn>
			<KBtn ghost priority="tertiary" level="error">
				<span>Error tertiary</span>
			</KBtn>
		</div>
	</KCard>
	<KCard>
		<h2 class="text-lg leading-3" slot="header">Disabled</h2>
		<div class="flex flex-wrap gap-2">
			<KBtn disabled level="info">
				<span>Info</span>
			</KBtn>
			<KBtn disabled priority="secondary" level="success">
				<span>Success secondary</span>
			</KBtn>
			<KBtn disabled priority="tertiary" level="error">
				<span>Error tertiary</span>
			</KBtn>
		</div>
	</KCard>
	<KCard>
		<h2 class="text-lg leading-3" slot="header">Sizes</h2>
		<div class="flex flex-wrap gap-2 items-center">
			<KBtn size="tiny">
				<span>Tiny</span>
			</KBtn>
			<KBtn size="small">
				<span>Small</span>
			</KBtn>
			<KBtn size="medium">
				<span>Medium</span>
			</KBtn>
			<KBtn size="large">
				<span>Large</span>
			</KBtn>
			<KBtn size="huge">
				<span>Huge</span>
			</KBtn>
		</div>
	</KCard>
	<KCard>
		<h2 class="text-lg leading-3" slot="header">Shape</h2>
		<div class="flex flex-wrap items-center gap-2">
			<KBtn shape="sharp">
				<span>sharp</span>
			</KBtn>
			<KBtn shape="pill">
				<span>Pill</span>
			</KBtn>
			<KBtn shape="circle" size="tiny">
				<span>Circle</span>
			</KBtn>
		</div>
	</KCard>
	<KCard>
		<h2 class="text-lg leading-3" slot="header">Button group</h2>
		<div class="flex flex-wrap items-center gap-2">
			<KBtnGroup>
				<KBtn level="success">
					<span>Shall I</span>
				</KBtn>
				<KBtn level="warning">
					<span>compare thee</span>
				</KBtn>
				<KBtn level="error">
					<span>to a summer's day?</span>
				</KBtn>
			</KBtnGroup>
			<KBtnGroup vertical>
				<KBtn level="info">
					<span>Stand with</span>
				</KBtn>
				<KBtn level="warning">
					<span>Ukraine</span>
				</KBtn>
			</KBtnGroup>
			<KBtnGroup>
				<KBtn shape="pill" ghost level="info">
					<span>Thou art</span>
				</KBtn>
				<KBtn ghost level="info">
					<span>more lovely</span>
				</KBtn>
				<KBtn shape="sharp" ghost level="info">
					<span>and more temperate:</span>
				</KBtn>
			</KBtnGroup>
		</div>
	</KCard>
</main>
