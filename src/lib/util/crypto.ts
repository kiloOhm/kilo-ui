function dec2hex(dec: number) {
	return dec.toString(16).padStart(2, '0');
}

export function randomString(len: number) {
	const arr = new Uint8Array((len || 40) / 2);
	crypto.getRandomValues(arr);
	return Array.from(arr, dec2hex).join('');
}

export function simpleHash(str: string) {
	let hash = 0;
	for (let i = 0; i < str.length; i++) {
		const char = str.charCodeAt(i);
		hash = (hash << 5) - hash + char;
		hash &= hash; // Convert to 32bit integer
	}
	return new Uint32Array([hash])[0].toString(36);
}
