<script>
	import { KBtn, KBtnGroup } from '$lib';
</script>

<div class="flex flex-wrap items-center gap-2">
	<KBtnGroup>
		<KBtn state="success">
			<span>Shall I</span>
		</KBtn>
		<KBtn state="warning">
			<span>compare thee</span>
		</KBtn>
		<KBtn state="error">
			<span>to a summer's day?</span>
		</KBtn>
	</KBtnGroup>
	<KBtnGroup vertical>
		<KBtn state="info">
			<span>Stand with</span>
		</KBtn>
		<KBtn state="warning">
			<span>Ukraine</span>
		</KBtn>
	</KBtnGroup>
	<KBtnGroup>
		<KBtn shape="pill" ghost state="info">
			<span>Thou art</span>
		</KBtn>
		<KBtn ghost state="info">
			<span>more lovely</span>
		</KBtn>
		<KBtn shape="sharp" ghost state="info">
			<span>and more temperate:</span>
		</KBtn>
	</KBtnGroup>
</div>
