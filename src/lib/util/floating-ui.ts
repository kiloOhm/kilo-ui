import {
	computePosition,
	type Placement,
	autoUpdate,
	flip,
	shift,
	offset,
	arrow as _arrow,
	hide,
	inline
} from '@floating-ui/dom';

export type FloatingUiOptions = {
	placement?: Placement;
	sameWidth?: boolean;
	flip?: boolean;
	shift?: boolean;
	offset?: number;
};

export function useFloatingUi(
	reference: HTMLElement,
	floating: HTMLElement,
	arrow: HTMLElement,
	onVisibilityChange?: (visible: boolean) => void,
	options?: FloatingUiOptions
) {
	document.body.appendChild(floating);
	floating.style.position = 'fixed';
	let visible = true;
	function updatePosition() {
		let middleware = [_arrow({ element: arrow }), hide(), inline()];
		if (options?.offset) {
			middleware = [offset({ mainAxis: options.offset }), ...middleware];
		}
		if (options?.shift) {
			middleware = [shift({ altBoundary: true }), ...middleware];
		}
		if (options?.flip) {
			middleware = [flip({ altBoundary: true }), ...middleware];
		}
		computePosition(reference, floating, {
			placement: options?.placement ?? 'top',
			middleware,
			strategy: 'fixed'
		}).then(({ x, y, placement, middlewareData }) => {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			//@ts-ignore - middlewareData is not typed
			const { referenceHidden } = middlewareData.hide;
			if (referenceHidden !== !visible) {
				visible = !referenceHidden;
				onVisibilityChange?.(visible);
			}
			floating.style.transform = `translate(${x}px, ${y}px)`;
			floating.style.width = options?.sameWidth
				? `${reference.getBoundingClientRect().width}px`
				: '';
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			//@ts-ignore - middlewareData is not typed
			const { x: arrowX, y: arrowY } = middlewareData.arrow;
			arrow.style.transform = `translate(${arrowX}px, ${arrowY}px)`;
			const staticSide = {
				top: 'bottom',
				right: 'left',
				bottom: 'top',
				left: 'right'
			}[placement.split('-')[0]];

			Object.assign(arrow.style, {
				left: arrowX != null ? `${arrowX}px` : '',
				top: arrowY != null ? `${arrowY}px` : '',
				right: '',
				bottom: '',
				[staticSide as any]: '-4px'
			});
		});
	}
	const auCleanup = autoUpdate(reference, floating, updatePosition, {
		animationFrame: true,
		ancestorResize: true,
		elementResize: true,
		ancestorScroll: true
	});
	return () => {
		auCleanup();
		floating.remove();
	};
}
