<script>
	import { KInput, KIcon } from '$lib';
	import IonHappy from '~icons/ion/happy';
	import IonSad from '~icons/ion/sad';
	import IonMdTrash from '~icons/ion/md-trash';
	import IonClipboard from '~icons/ion/clipboard';
</script>

<div class="flex flex-col gap-2">
	<KInput placeholder="before & after">
		<span slot="before">before</span>
		<span slot="after">after</span>
	</KInput>
	<KInput placeholder="before & after">
		<KIcon slot="before">
			<IonHappy />
		</KIcon>
		<KIcon slot="after">
			<IonSad />
		</KIcon>
	</KInput>
	<KInput label="plus & minus" type="number">
		<KIcon size="xs" slot="plus">
			<IonHappy />
		</KIcon>
		<KIcon size="xs" slot="minus">
			<IonSad />
		</KIcon>
	</KInput>
	<form>
		<KInput label="pw-visible & pw-hidden" type="password" value="secretsauce">
			<KIcon size="xs" slot="pw-visible">
				<IonHappy />
			</KIcon>
			<KIcon size="xs" slot="pw-hidden">
				<IonSad />
			</KIcon>
		</KInput>
	</form>
	<KInput label="clearable" clearable value="bad words">
		<KIcon size="xs" slot="clear">
			<IonMdTrash />
		</KIcon>
	</KInput>
	<KInput label="copy & copied" copyable readonly value="some value">
		<KIcon size="xs" slot="copy">
			<IonClipboard />
		</KIcon>
		<KIcon size="xs" slot="copied">
			<IonHappy />
		</KIcon>
	</KInput>
</div>
