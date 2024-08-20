import { decrypt } from "dotenv";
import { encrypt } from "../../utils/aes";



export class ColumnCryptographerTransformer {

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

