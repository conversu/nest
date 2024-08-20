import CryptoJS from 'crypto-js';


export class LargeJsonTransformer<T> {

    private encrypt: boolean;
    private secret: string;

    constructor(secret: string, encrypt: boolean) {
        this.encrypt = encrypt;
        this.secret = secret;
    }

    public to(data: Object | string): Buffer {
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

            return Buffer.from(result, 'utf-8');
        } catch (err) {
            return Buffer.from('transformation_error');
        }
    }

    public from<T>(data: Buffer): T | null | string {

        const content = data.toString('utf-8');

        if (content === 'transformation_error') {
            return null;
        }

        try {
            let result = content;
            if (this.encrypt) {

                result = CryptoJS.AES.decrypt(content, this.secret).toString(CryptoJS.enc.Utf8) as string;

            }

            return result ? (JSON.parse(result) as T) : null;
        } catch (err) {

            return content;
        }
    }
}

