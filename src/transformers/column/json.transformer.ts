import CryptoJS from 'crypto-js';

export class ColumnJsonTransformer {
    private encrypt: boolean;
    private secret: string;

    constructor(secret: string, encrypt: boolean) {
        this.secret = secret;
        this.encrypt = encrypt;
    }

    public to(data: Object | string): string {
        try {
            let result = 'transformation_error';
            if (typeof data === 'string') {
                result = data;
            } else {
                result = JSON.stringify(data);
            }

            if (this.encrypt) {
                result = CryptoJS.AES.encrypt(result, this.secret).toString();
            }

            return result;
        } catch (err) {
            return 'transformation_error';
        }
    }

    public from<T>(data: string): T | null | string {
        if (data === 'transformation_error') {
            return null;
        }

        try {
            if (this.encrypt) {
                return JSON.parse(CryptoJS.AES.decrypt(data, this.secret).toString(CryptoJS.enc.Utf8)) as T;
            }
            return JSON.parse(data) as T;
        } catch (err) {
            return data;
        }
    }
}
