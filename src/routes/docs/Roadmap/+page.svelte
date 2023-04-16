<script lang="ts">
	import type { RoadMapItem } from '../../../components/KRoadmap';
	import KRoadmap from '../../../components/KRoadmap.svelte';
	import IonAccessibility from '~icons/ion/accessibility';
	import IonIosSearch from '~icons/ion/ios-search';
	import IonIosColorPalette from '~icons/ion/ios-color-palette';
	import IonIosBox from '~icons/ion/ios-box';
	import IonChatbubble from '~icons/ion/chatbubble';
	import IonIosNotifications from '~icons/ion/ios-notifications';
	import IonCalendar from '~icons/ion/calendar';

	const items: Record<string, RoadMapItem[]> = {
		'Q2 2023': [
			{
				title: 'Document Blockquote Component',
				icon: IonIosBox
			},
			{
				title: 'Standalone Roadmap Component',
				icon: IonIosBox
			},
			{
				title: 'A11y',
				description: 'Check all components for WAI ARIA compliance',
				icon: IonAccessibility
			}
		],
		'Q3 2023': [
			{
				title: 'Search function for docs',
				icon: IonIosSearch
			},
			{
				title: 'Drawer Component',
				icon: IonIosBox
			},
			{
				title: 'Modal Component',
				icon: IonIosBox
			},
			{
				title: 'Dialog Utility',
				description:
					'A utility to trigger confirmation, submission, and generic dialogs from anywhere in the app',
				icon: IonChatbubble
			},
			{
				title: 'Toast Utility',
				description: 'A utility to trigger toasts from anywhere in the app',
				icon: IonIosNotifications
			}
		],
		'Q4 2023': [
			{
				title: 'Color Picker Component',
				icon: IonIosColorPalette
			},
			{
				title: 'Theme Editor',
				description: 'A tool to edit the theme of your app in real time',
				icon: IonIosColorPalette
			},
			{
				title: 'Theme Switcher',
				description: 'A tool to switch between themes in real time',
				icon: IonIosColorPalette
			},
			{
				title: 'Date/Time Picker Component',
				icon: IonCalendar
			}
		]
	};
</script>

<svelte:head>
	<title>KUI Roadmap</title>
	<meta name="description" content="KUI Roadmap" />
</svelte:head>

<main class="p-4 flex flex-col gap-4">
	<h1 class="text-2xl font-bold">Roadmap</h1>
	<KRoadmap hideUpvotes {items} />
</main>
