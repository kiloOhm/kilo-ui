import type { Provider, Size } from '$lib/types';

export function initTheme(overrides?: Partial<Theme>): Provider {
	let theme = defaultTheme;
	if (overrides) {
		theme = { ...theme, ...overrides };
	}
	function getCSSVariables(obj: any, prefix = '--k-'): string[] {
		return Object.entries(obj).reduce((acc, [key, value]) => {
			if (typeof value === 'object') {
				return [...acc, ...getCSSVariables(value, `${prefix}${key}-`)];
			} else if (typeof value === 'string' || typeof value === 'number') {
				return [...acc, `${prefix}${key}: ${value};`];
			} else {
				return acc;
			}
		}, [] as string[]);
	}
	const raw = [
		'<style class="k-theme"> :root {',
		'font-family: "Arial", sans-serif;',
		...getCSSVariables(theme),
		'background: var(--k-colors-background-0);',
		'color: var(--k-colors-text-0);',
		'}</style>'
	].join('');
	return {
		head: () => raw
	};
}

export function getThemeVar(name: keyof Theme, el?: Element) {
	return getComputedStyle(el ?? document.documentElement).getPropertyValue(`--k-theme-${name}`);
}

export const defaultTheme = {
	colors: {
		background: ['#191716', '#2C2B2A', '#3F3E3D'],
		text: ['#F7F7FF', '#949499', '#4F4E4D'],
		info: '#6A8EDC',
		success: '#86E6C1',
		warning: '#F3CD81',
		error: '#E5587B',
		border: ['#4F4E4D', '#5F5E5D', '#6F6E6D']
	},
	roundness: {
		tiny: '0.125rem',
		small: '0.25rem',
		medium: '0.5rem',
		large: '0.75rem',
		huge: '1rem'
	} as Record<Size, string>,
	'font-size': {
		tiny: '0.75rem',
		small: '0.875rem',
		medium: '1rem',
		large: '1.25rem',
		huge: '1.5rem'
	} as Record<Size, string>,
	padding: {
		tiny: '0.25rem',
		small: '0.375rem',
		medium: '0.5rem',
		large: '0.625rem',
		huge: '0.75rem'
	} as Record<Size, string>,
	transition: {
		function: 'cubic-bezier(0.4, 0, 0.2, 1)',
		duration: 200
	}
};
export type Theme = typeof defaultTheme;
