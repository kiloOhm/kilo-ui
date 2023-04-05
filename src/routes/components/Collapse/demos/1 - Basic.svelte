<script>
	import { KCollapse, KSwitch } from '$lib';
	let show = true;
</script>

<KSwitch bind:checked={show}>Show</KSwitch>
<KCollapse {show}>
	<p>
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem unde dicta doloribus iusto
		dignissimos perspiciatis tenetur rem suscipit, soluta iste quo, velit fuga non voluptate
		cupiditate. Dicta id doloribus voluptatibus quos quod cupiditate recusandae quasi, repellat
		praesentium! Pariatur commodi voluptate similique saepe blanditiis ratione dignissimos quis,
		exercitationem perferendis, maxime impedit repudiandae architecto, cum numquam labore porro ut
		provident beatae! Nesciunt in excepturi necessitatibus aperiam.
	</p>
</KCollapse>
