export type Priority = 'primary' | 'secondary' | 'tertiary';
export type Size = 'tiny' | 'small' | 'medium' | 'large' | 'huge';
export type Level = 'neutral' | 'info' | 'success' | 'warning' | 'error';

export type Provider = {
	head?: () => string;
	body?: () => string;
};
