import { simpleHash } from './crypto';

const warned: string[] = [];
export function warnOnce(message: string) {
	const hash = simpleHash(message);
	if (warned.includes(hash)) return;
	console.warn('[Kilo-UI] ' + message);
}

export class KUIError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'KUIError';
	}
}
