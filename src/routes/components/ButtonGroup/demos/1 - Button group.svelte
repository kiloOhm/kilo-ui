<script>
	import { KBtn, KBtnGroup } from '$lib';
</script>

<div class="flex flex-wrap items-center gap-2">
	<KBtnGroup>
		<KBtn color="green" text="Shall I" />
		<KBtn color="yellow" text="compare thee" />
		<KBtn color="red" text="to a summer's day?" />
	</KBtnGroup>
	<KBtnGroup vertical>
		<KBtn color="#0057B7" textColor="white" text="Stand with" />
		<KBtn color="#FFDD00" textColor="black" text="Ukraine" />
	</KBtnGroup>
	<KBtnGroup>
		<KBtn shape="pill" ghost color="purple" text="Thou art" />
		<KBtn ghost color="purple" text="more lovely" />
		<KBtn shape="sharp" ghost color="purple" text="and more temperate:" />
	</KBtnGroup>
</div>
