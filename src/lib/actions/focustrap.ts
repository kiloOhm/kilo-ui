import type { SvelteAction } from '../util/types';
import * as _focusTrap from 'focus-trap';

export const focusTrap: SvelteAction = (node: Node, active = true) => {
	const trap = _focusTrap.createFocusTrap(node as HTMLElement, {
		allowOutsideClick: true
	});
	function _() {
		if (active) {
			trap.activate();
		} else {
			trap?.deactivate();
		}
	}
	_();
	return {
		update(newActive: boolean) {
			active = newActive;
			_();
		},
		destroy() {
			trap?.deactivate();
		}
	};
};
