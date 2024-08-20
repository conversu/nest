/* eslint-disable @typescript-eslint/no-unused-vars */
import { Transform, TransformFnParams } from 'class-transformer';

export function TransformEmail(_type: 'MASK') {
    return Transform(({ value }: TransformFnParams) => {
        const [username, domain] = value.split('@');

        const cut = Math.floor(username.length / 4);

        let email = value.slice(0, cut);
        email += '*'.repeat(cut * 2);
        email += username.slice(-cut);
        email += `@${domain}`;

        return email;
    });
}
