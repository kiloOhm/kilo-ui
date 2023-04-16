<script lang="ts">
	import { KBlockquote, KIcon } from '$lib';
	import { onMount } from 'svelte';
	import IonLogoGithub from '~icons/ion/logo-github';

	export let username = 'kiloOhm';

	onMount(() => {
		fetch(`https://api.github.com/users/${username}`)
			.then((res) => res.json())
			.then((data) => {
				name = data.name;
				avatar_url = data.avatar_url;
			});
	});

	let name = '';
	let avatar_url = '';
	$: profileUrl = 'https://github.com/' + username;
	function openInNewTab(url: string) {
		const win = window.open(url, '_blank');
		win?.focus();
	}
</script>

<KBlockquote {name} avatarURL={avatar_url}>
	<slot />
	<div
		on:click={() => openInNewTab(profileUrl)}
		on:keypress={() => openInNewTab(profileUrl)}
		class="cite"
		slot="cite"
	>
		<KIcon size="xs">
			<IonLogoGithub />
		</KIcon>
		<span>{username}</span>
	</div>
</KBlockquote>

<style lang="scss">
	.cite {
		display: flex;
		align-items: center;
		font-size: 0.8em;
		gap: 0.25em;
		color: var(--k-colors-text-2);
		cursor: pointer;
	}
</style>
