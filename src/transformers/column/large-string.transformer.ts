
import CryptoJS from 'crypto-js';


export class LargeStringTransformer {

    private encrypt: boolean;
    private secret: string;

    constructor(secret: string, encrypt: boolean) {
        this.secret = secret;
        this.encrypt = encrypt;
    }

    public to(data: string | null): Buffer | null {
        if (!data) {
            return null;
        }

        try {
            let result = data;

            if (this.encrypt) {
                result = CryptoJS.AES.encrypt(result, this.secret).toString();
            }

            return Buffer.from(result, 'utf-8');
        } catch (err) {
            return null;
        }
    }

    public from(data: Buffer | null): string | null {
        if (!data) {
            return null;
        }

        let result = data.toString('utf-8');
        try {
            if (this.encrypt) {
                result = CryptoJS.AES.decrypt(result, this.secret).toString(CryptoJS.enc.Utf8) as string;
            }
            return result;
        } catch (err) {
            return null;
        }
    }
}

