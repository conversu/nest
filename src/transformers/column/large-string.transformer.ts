
import { AES } from '@conversu/commons';


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
                result = AES.encrypt(this.secret, result)?.toString() ?? 'transformation_error';
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
                result = AES.decrypt(this.secret, result) as string;
            }
            return result;
        } catch (err) {
            return null;
        }
    }
}

