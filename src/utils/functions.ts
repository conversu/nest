import { v4 as uuidv4 } from 'uuid';

export function generateUUID(identifier: string, isSuffix?: boolean) {
    if (!!isSuffix && isSuffix) {
        return `${uuidv4()}-${identifier.toLowerCase()}`;
    }

    return `${identifier.toLowerCase()}-${uuidv4()}`;
}

export function escapeRegExp(str: string) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function isBase64(str: string): boolean {
	const base64Regex =
		/^(?:[A-Za-z\d+/]{4})*(?:[A-Za-z\d+/]{2}==|[A-Za-z\d+/]{3}=)?$/;
	return base64Regex.test(str);
}

export function estimateContentSize(value?: string | null): number | null {
	if (!value) {
		return null;
	}

	let decodedData: Buffer;

	try {
		// Try decoding as Base64
		decodedData = Buffer.from(value, 'base64');
	} catch (error) {
		// If decoding fails, assume it's not Base64 and proceed with parsing
		decodedData = Buffer.from(value);
	}

	// Get the byte size
	const byteSize: number = decodedData.length;

	return byteSize ?? 0;
}

export function hasUniqueKeys(obj: object) {
	const keysSet = new Set(Object.keys(obj));
	return keysSet.size === Object.keys(obj).length;
}

export function hasDuplicates(arr: string[]) {
	const valueSet = new Set(arr);
	return valueSet.size !== arr.length;
}

export function findDuplicates(arr: string[]) {
	const seen = new Set();
	const duplicates = new Set();

	for (const value of arr) {
		if (seen.has(value)) {
			duplicates.add(value);
		} else {
			seen.add(value);
		}
	}

	return Array.from(duplicates);
}

export function extractTypeValues<T extends string>(type: any): T[] {
	if (type && type.name === 'String') {
		return Object.values(type);
	}
	throw new Error(`Invalid type provided: ${type}`);
}


export function getMimeType(value: string) {
	if (value.includes('base64')) {
		const [type, _base64str] = value.split(';');

		return type.split(':')[1];
	}

	return 'text/plain';
}

export function getBytes(value: string): Buffer | null {
	if (value.includes('base64')) {
		// data:image/png;base64

		const [_type, base64str] = value.split(';');

		try {
			return Buffer.from(base64str, 'base64');
		} catch (err) {
			return null;
		}
	}

	return Buffer.from(value, 'utf-8');
}