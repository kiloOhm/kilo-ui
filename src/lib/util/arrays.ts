export function extractIfSingle<T>(input: T | T[]): T | T[] | undefined {
	if (Array.isArray(input)) {
		if (input.length === 0) {
			return undefined;
		}
		return input.length === 1 ? input[0] : input;
	}
}
