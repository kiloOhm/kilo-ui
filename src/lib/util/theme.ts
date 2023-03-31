import type { Size } from '$lib/types';
import { memoize, merge } from 'lodash-es';
import type { DeepPartial } from './types';

export const getThemeVars = memoize((overrides?: DeepPartial<Theme>) => {
	const theme = defaultTheme;
	if (overrides) {
		merge(theme, overrides);
	}
	function objToCSSVarsRecursively(obj: any, prefix = '--k-'): string[] {
		return Object.entries(obj).reduce((acc, [key, value]) => {
			if (typeof value === 'object') {
				return [...acc, ...objToCSSVarsRecursively(value, `${prefix}${key}-`)];
			} else if (typeof value === 'string' || typeof value === 'number') {
				return [...acc, `${prefix}${key}: ${value};`];
			} else {
				return acc;
			}
		}, [] as string[]);
	}
	return objToCSSVarsRecursively(theme);
});

export const defaultTheme = {
	size: {
		xs: '0.75rem',
		sm: '0.875rem',
		md: '1rem',
		lg: '1.125rem',
		xl: '1.25rem',
		'2xl': '1.5rem',
		'3xl': '1.875rem',
		'4xl': '2.25rem',
		'5xl': '3rem',
		'6xl': '3.75rem',
		'7xl': '4.5rem',
		'8xl': '6rem',
		'9xl': '8rem'
	} as Record<Size, string>,
	colors: {
		background: ['#030303', '#151515', '#272727'],
		text: ['#EDEDED', '#A9A9A9', '#666666'],
		focus: '#EDEDED',
		neutral: '#EDEDED',
		info: '#14A9DB',
		success: '#06D6A0',
		warning: '#FFD166',
		error: '#EF476F',
		border: ['#393939', '#4B4B4B', '#5D5D5D']
	},
	font: {
		family: '"Arial", sans-serif'
	},
	icon: {
		color: '#EDF1F2',
		size: '1.5em'
	},
	button: {
		padding: '.5em 1em',
		border: {
			radius: '.5em',
			width: '1px',
			style: 'solid'
		},
		ripple: {
			alpha: 0.4,
			duration: {
				expand: 2.5,
				fade: 2
			},
			color: '#EDF1F2'
		},
		hover: {
			brightness: 0.8,
			scale: 0.97
		},
		active: {
			brightness: 0.8,
			scale: 0.94
		},
		disabled: {
			brightness: 0.6
		}
	},
	card: {
		header: {
			padding: '1em'
		},
		main: {
			padding: '1em'
		},
		footer: {
			padding: '1em'
		},
		border: {
			radius: '.5em',
			width: '1px'
		}
	},
	'masonry-layout': {
		transition: {
			duration: 2.5
		}
	},
	switch: {
		size: '1.25em',
		border: {
			width: '.125em',
			radius: '.25em'
		},
		padding: '.25em .5em',
		thumb: {
			color: '#EDF1F2',
			padding: '.125em'
		}
	},
	drawer: {
		provider: {
			depth: 0.3,
			tilt: 0.1,
			shift: 30,
			blur: '5px'
		}
	},
	menu: {
		divider: {
			color: '#505759'
		},
		item: {
			border: {
				radius: '.5em'
			}
		}
	},
	transition: {
		function: 'cubic-bezier(0.4, 0, 0.2, 1)',
		duration: 200
	}
};
export type Theme = typeof defaultTheme;
