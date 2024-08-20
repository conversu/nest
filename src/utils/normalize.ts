import { escapeRegExp } from "./functions";

export function normalizeTextNumber(value?: string | null): string | null {
    if (!value) {
        return null;
    }

    const result = value.trim();
    return result.replace(' ', '').replace(/\D/g, '');
}

export function normalizeText(
    value: string | null | undefined,
    params: { toUpperCase: boolean; replaceSpace: boolean; replaceSpecialChars: string[] | null },
) {
    let result = value;
    if (value) {
        result = result.trim().replace('\n', '');

        result = result.replace(/\n/g, '');

        if (params.toUpperCase) {
            result = result.toUpperCase();
        }

        if (params.replaceSpace) {
            result = result.replace(/ /g, '_');
        }

        if (params.replaceSpecialChars) {
            for (const char of params.replaceSpecialChars) {
                if (value.includes(char)) {
                    const regex = new RegExp(escapeRegExp(char), 'g');
                    result = result.replace(regex, '');
                }
            }
        }
    }

    return result;
}