<script>
	import { KIcon, KInput } from '$lib';
	import IonHappy from '~icons/ion/happy';
	import IonSad from '~icons/ion/sad';
</script>

<div class="flex flex-col gap-2">
	<KInput textarea placeholder="This is a textarea" />
	<KInput textarea placeholder="This is a clear textarea with before and after slots" clearable>
		<KIcon slot="before">
			<IonHappy />
		</KIcon>
		<KIcon slot="after">
			<IonSad />
		</KIcon>
	</KInput>
	<KInput textarea copyable readonly value="This is a copyable textarea" />
	<KInput textarea max={14} value="No char wasted" />
</div>
