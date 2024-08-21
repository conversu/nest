import { decrypt, encrypt } from "@conversu/commons/src/aes";


export class CryptographerTransformer {

    private secret: string;

    constructor(secret: string) {
        this.secret = secret;
    }

    public to(data: string | null): string | null {
        return encrypt(this.secret, data);
    }

    public from(data: string | null): string | null {
        return decrypt(this.secret, data);
    }
}

