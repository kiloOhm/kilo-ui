import type { SvelteAction } from '../util/types';

export const outclick: SvelteAction = (
	node: Node,
	callback: (event: MouseEvent | TouchEvent) => void
) => {
	const handleClick = (event: MouseEvent | TouchEvent) => {
		const normal = event instanceof TouchEvent ? event.touches[0] : event;
		if (!normal?.target) return;
		if (!node.contains(normal.target as Node)) {
			callback(event);
		}
	};
	document.addEventListener('click', handleClick, true);
	return {
		destroy() {
			document.removeEventListener('click', handleClick, true);
		}
	};
};
