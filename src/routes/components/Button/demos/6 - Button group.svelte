<script>
	import { KBtn, KBtnGroup } from '$lib';
</script>

<div class="flex flex-wrap items-center gap-2">
	<KBtnGroup>
		<KBtn color="success" text="Shall I" />
		<KBtn color="warning" text="compare thee" />
		<KBtn color="error" text="to a summer's day?" />
	</KBtnGroup>
	<KBtnGroup vertical>
		<KBtn color="#0057B7" textColor="white" text="Stand with" />
		<KBtn color="#FFDD00" textColor="black" text="Ukraine" />
	</KBtnGroup>
	<KBtnGroup>
		<KBtn shape="pill" ghost color="secondary" text="Thou art" />
		<KBtn ghost color="secondary" text="more lovely" />
		<KBtn shape="sharp" ghost color="secondary" text="and more temperate:" />
	</KBtnGroup>
</div>
