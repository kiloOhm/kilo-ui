import {
	computePosition,
	type Placement,
	autoUpdate,
	flip,
	shift,
	offset,
	arrow as _arrow,
	type ReferenceElement,
	type FloatingElement,
	hide,
	inline
} from '@floating-ui/dom';

export function useFloatingUi(
	reference: ReferenceElement,
	floating: FloatingElement,
	arrow: HTMLElement,
	placement: Placement,
	onVisibilityChange?: (visible: boolean) => void
) {
	let visible = true;
	function updatePosition() {
		computePosition(reference, floating, {
			placement,
			middleware: [
				flip({ padding: 8, altBoundary: true }),
				shift({ padding: 8 }),
				offset({ mainAxis: 8 }),
				_arrow({ element: arrow }),
				hide(),
				inline()
			]
		}).then(({ x, y, placement, middlewareData }) => {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			//@ts-ignore - middlewareData is not typed
			const { referenceHidden } = middlewareData.hide;
			if (referenceHidden !== !visible) {
				visible = !referenceHidden;
				onVisibilityChange?.(visible);
			}
			floating.style.transform = `translate(${x}px, ${y}px)`;
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
	return autoUpdate(reference, floating, updatePosition, {
		animationFrame: true,
		ancestorResize: true,
		elementResize: true,
		ancestorScroll: true
	});
}
