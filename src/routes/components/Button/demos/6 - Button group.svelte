<script>
	import { KBtn, KBtnGroup } from '$lib';
</script>

<div class="flex flex-wrap items-center gap-2">
	<KBtnGroup>
		<KBtn color="success">
			<span>Shall I</span>
		</KBtn>
		<KBtn color="warning">
			<span>compare thee</span>
		</KBtn>
		<KBtn color="error">
			<span>to a summer's day?</span>
		</KBtn>
	</KBtnGroup>
	<KBtnGroup vertical>
		<KBtn color="#0057B7" textColor="white">
			<span>Stand with</span>
		</KBtn>
		<KBtn color="#FFDD00" textColor="black">
			<span>Ukraine</span>
		</KBtn>
	</KBtnGroup>
	<KBtnGroup>
		<KBtn shape="pill" ghost color="secondary">
			<span>Thou art</span>
		</KBtn>
		<KBtn ghost color="secondary">
			<span>more lovely</span>
		</KBtn>
		<KBtn shape="sharp" ghost color="secondary">
			<span>and more temperate:</span>
		</KBtn>
	</KBtnGroup>
</div>
