<script>
	import { KIcon, KInput } from '$lib';
	import IonHappy from '~icons/ion/happy';
	import IonSad from '~icons/ion/sad';
</script>

<div class="flex flex-col gap-2 items-start">
	<KInput autosize="horizontal" placeholder="horizontal">
		<KIcon slot="before">
			<IonHappy />
		</KIcon>
		<KIcon slot="after">
			<IonSad />
		</KIcon>
	</KInput>
	<KInput autosize="both" placeholder="both" minRows={1} textarea>
		<KIcon slot="before">
			<IonHappy />
		</KIcon>
		<KIcon slot="after">
			<IonSad />
		</KIcon>
	</KInput>
</div>
