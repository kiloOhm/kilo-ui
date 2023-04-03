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

export const Colors = ['blue', 'purple', 'green', 'yellow', 'red'] as const;
export type Color = (typeof Colors)[number];

export const Directions = ['top', 'right', 'bottom', 'left'] as const;
export type Direction = (typeof Directions)[number];
