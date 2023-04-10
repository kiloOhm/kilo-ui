export type DeepPartial<T> = Partial<{ [P in keyof T]: DeepPartial<T[P]> }>;

export interface SvelteAction {
	(node: HTMLElement, params?: any): {
		update?: (params?: any) => void;
		destroy?: () => void;
	} | void;
}

export type Key =
	| 'Enter'
	| 'Space'
	| 'Escape'
	| 'ArrowUp'
	| 'ArrowDown'
	| 'ArrowLeft'
	| 'ArrowRight'
	| 'Home'
	| 'End'
	| 'PageUp'
	| 'PageDown'
	| 'Tab';
