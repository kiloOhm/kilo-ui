import type { Key, SvelteAction } from '../util/types';

export const keypress: SvelteAction = (
	node: Node,
	callbacks: Record<Key, (event: KeyboardEvent) => void>
) => {
	const handleKeypress = (event: Event) => {
		if (!(event instanceof KeyboardEvent)) return;
		const { key } = event;
		if (callbacks[key as Key]) {
			callbacks[key as Key](event);
		}
	};
	node.addEventListener('keypress', handleKeypress, true);
	return {
		destroy() {
			node.removeEventListener('keypress', handleKeypress, true);
		}
	};
};
