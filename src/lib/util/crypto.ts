function dec2hex(dec: number) {
	return dec.toString(16).padStart(2, '0');
}

export function randomString(len: number) {
	const arr = new Uint8Array((len || 40) / 2);
	crypto.getRandomValues(arr);
	return Array.from(arr, dec2hex).join('');
}
