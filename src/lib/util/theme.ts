import type { Size } from '$lib/types';
import { memoize, merge } from 'lodash-es';
import type { DeepPartial } from './types';
import Color from 'color';

export const getThemeVars = memoize((overrides?: DeepPartial<Theme>) => {
	const theme = defaultTheme;
	if (overrides) {
		merge(theme, overrides);
	}
	if (import.meta.env.DEV) {
		// check for low contrast
		for (const [key, value] of Object.entries(theme.colors)) {
			const name = key as keyof typeof theme.colors;
			if (name === 'text' || name === 'focus') {
				continue;
			}
			let colors: Color[];
			try {
				if (Array.isArray(value)) {
					colors = value.map((v) => Color(v));
				} else {
					colors = [Color(value as string)];
				}
			} catch {
				continue;
			}
			for (const [i, color] of colors.entries()) {
				const contrasts = [color.contrast(Color(theme.colors.text[0]))];
				contrasts.map((c, j) => {
					if (c < 4.5)
						console.log(`Low contrast between ${name}-${i} and text-${j}: ${c.toFixed(2)};`);
				});
			}
		}
	}
	function objToCSSVarsRecursively(obj: any, prefix = '--k-'): string[] {
		return Object.entries(obj).reduce((acc, [key, value]) => {
			if (typeof value === 'object') {
				return [...acc, ...objToCSSVarsRecursively(value, `${prefix}${key}-`)];
			} else if (typeof value === 'string' || typeof value === 'number') {
				const variants = new Map<string, string>();
				variants.set(`${prefix}${key}`, `${value}`);
				try {
					if (typeof value === 'number') throw 'not a color';
					const color = Color(value);
					variants.set(`${prefix}${key}`, `${color.rgb().string()}`);
					//lighten
					variants.set(`${prefix}${key}-lighten-2`, `${color.lighten(0.2).rgb().string()}`);
					variants.set(`${prefix}${key}-lighten-4`, `${color.lighten(0.4).rgb().string()}`);
					variants.set(`${prefix}${key}-lighten-6`, `${color.lighten(0.6).rgb().string()}`);
					//darken
					variants.set(`${prefix}${key}-darken-2`, `${color.darken(0.2).rgb().string()}`);
					variants.set(`${prefix}${key}-darken-4`, `${color.darken(0.4).rgb().string()}`);
					variants.set(`${prefix}${key}-darken-6`, `${color.darken(0.6).rgb().string()}`);
					//alpha
					variants.set(`${prefix}${key}-alpha-2`, `${color.alpha(0.2).rgb().string()}`);
					variants.set(`${prefix}${key}-alpha-4`, `${color.alpha(0.4).rgb().string()}`);
					variants.set(`${prefix}${key}-alpha-6`, `${color.alpha(0.6).rgb().string()}`);
					variants.set(`${prefix}${key}-alpha-8`, `${color.alpha(0.8).rgb().string()}`);
				} catch {
					//not a color
				}
				const _variants = [...variants.entries()].map(([key, value]) => `${key}: ${value};`);
				return [...acc, ..._variants];
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
		blue: '#14A9DB',
		purple: '#9E05D6',
		green: '#06D6A0',
		yellow: '#D69E05',
		red: '#D6053D',
		border: ['#393939', '#4B4B4B', '#5D5D5D']
	},
	font: {
		family: '"Arial", sans-serif'
	},
	icon: {
		color: '#EDEDED',
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
			alpha: 0.2,
			duration: {
				expand: 2.5,
				fade: 1
			},
			color: '#EDEDED'
		},
		hover: {
			brightness: 0.8,
			scale: 0.97
		},
		active: {
			brightness: 0.6,
			scale: 0.94
		},
		disabled: {
			alpha: 0.4
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
			color: '#EDEDED',
			padding: '.125em'
		},
		disabled: {
			alpha: 0.4
		}
	},
	checkbox: {
		size: '1.25em',
		border: {
			width: '1px',
			radius: '.25em'
		},
		mark: {
			color: '#EDEDED',
			scale: '.6em'
		},
		disabled: {
			alpha: 0.4
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
	table: {
		border: {
			width: '1px',
			radius: '1em'
		},
		caption: {
			padding: '.5em 1em'
		},
		header: {
			padding: '1em'
		},
		body: {
			padding: '.5em 1em'
		},
		footer: {
			padding: '1em'
		}
	},
	transition: {
		function: 'cubic-bezier(0.4, 0, 0.2, 1)',
		duration: 200
	}
};
export type Theme = typeof defaultTheme;
