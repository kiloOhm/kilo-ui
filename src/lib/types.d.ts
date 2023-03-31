export const Priorities = ['primary', 'secondary', 'tertiary'] as const;
export type Priority = (typeof Priorities)[number];

export const Sizes = [
	'xs',
	'sm',
	'md',
	'lg',
	'xl',
	'2xl',
	'3xl',
	'4xl',
	'5xl',
	'6xl',
	'7xl',
	'8xl',
	'9xl'
] as const;
export type Size = (typeof Sizes)[number];

export const States = ['neutral', 'info', 'success', 'warning', 'error'] as const;
export type State = (typeof States)[number];

export const Directions = ['top', 'right', 'bottom', 'left'] as const;
export type Direction = (typeof Directions)[number];
