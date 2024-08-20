import CryptoJS from 'crypto-js';

export function encrypt(secret: string, value: string | null): string | null {
    if (value) {
        return CryptoJS.AES.encrypt(value, secret).toString();
    }

    return null;
}

export function decrypt(secret: string, value: string | null) {
    if (value) {
        return CryptoJS.AES.decrypt(value, secret).toString(CryptoJS.enc.Utf8);
    }
    return null;
}

export function encode(value: string): string {
    return String(Buffer.from(value).toString('base64') as string);
}

export function decode(value: string) {
    return Buffer.from(value, 'base64').toString('utf-8');
}

