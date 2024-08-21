import { aes } from "@conversu/commons";


export class CryptographerTransformer {

    private secret: string;

    constructor(secret: string) {
        this.secret = secret;
    }

    public to(data: string | null): string | null {
        return aes.encrypt(this.secret, data);
    }

    public from(data: string | null): string | null {
        return aes.decrypt(this.secret, data);
    }
}

