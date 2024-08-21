

export function encode(value: string): string {
    return String(Buffer.from(value).toString('base64') as string);
}

export function decode(value: string) {
    return Buffer.from(value, 'base64').toString('utf-8');
}

