import { AES } from "@conversu/commons";


export class CryptographerTransformer {

    private secret: string;

    constructor(secret: string) {
        this.secret = secret;
    }

    public to(data: string | null): string | null {
        return AES.encrypt(this.secret, data);
    }

    public from(data: string | null): string | null {
        return AES.decrypt(this.secret, data);
    }
}

