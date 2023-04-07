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
		// check for low contrast between text and background colors
		for (let i = 0; i < theme.colors.background.length; i++) {
			for (let j = 0; j < theme.colors.text.length; j++) {
				const contrast = Color(theme.colors.background[i]).contrast(Color(theme.colors.text[j]));
				if (contrast < 4.5) {
					console.warn(
						`Low contrast between background color ${theme.colors.background[i]} and text color ${theme.colors.text[j]}: ${contrast}`
					);
				}
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
		'3xs': '0.25rem',
		'2xs': '0.5rem',
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
		blue: '#6CCFF6',
		purple: '#9368B7',
		green: '#57CC99',
		yellow: '#FFD23F',
		red: '#FF5A5F',
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
			width: '2px',
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
			width: '2px'
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
			width: '2px',
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
			width: '2px',
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
	popover: {
		padding: '.5em 1em',
		border: {
			radius: '.5em'
		},
		arrow: {
			size: '1em'
		}
	},
	collapse: {
		header: {
			padding: '.5em 1em',
			border: {
				radius: '.5em',
				width: '1px'
			}
		}
	},
	accordion: {
		gap: '2px'
	},
	input: {
		padding: '.5em 1em',
		border: {
			radius: '.5em'
		},
		outline: {
			width: '2px'
		},
		disabled: {
			alpha: 0.4
		},
		slots: {
			gap: '.125em'
		}
	},
	transition: {
		function: 'cubic-bezier(0.4, 0, 0.2, 1)',
		duration: 200
	}
};
export type Theme = typeof defaultTheme;
