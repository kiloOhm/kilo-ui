<script>
	import { KCollapse, KIcon } from '$lib';
	import IonCaretForward from '~icons/ion/caret-forward';
	let show = false;
</script>

<div class="flex flex-col gap-4">
	<KCollapse {show}>
		<div
			slot="header"
			on:click={() => (show = !show)}
			on:keypress={() => (show = !show)}
			class="flex items-center gap-2 cursor-pointer border rounded-md p-2"
		>
			<div class="flex transition-transform" style:transform={`rotate(${show ? 90 : 0}deg)`}>
				<KIcon size="xs">
					<IonCaretForward />
				</KIcon>
			</div>
			<h3 class="text-lg">This is a collapse</h3>
		</div>
		<p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem unde dicta doloribus iusto
			dignissimos perspiciatis tenetur rem suscipit, soluta iste quo, velit fuga non voluptate
			cupiditate. Dicta id doloribus voluptatibus quos quod cupiditate recusandae quasi, repellat
			praesentium! Pariatur commodi voluptate similique saepe blanditiis ratione dignissimos quis,
			exercitationem perferendis, maxime impedit repudiandae architecto, cum numquam labore porro ut
			provident beatae! Nesciunt in excepturi necessitatibus aperiam.
		</p>
	</KCollapse>
</div>
