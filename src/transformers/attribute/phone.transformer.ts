import { formatPhone } from '@conversu/commons/src/format';
import { maskPhone } from '@conversu/commons/src/mask';
import { Transform, TransformFnParams } from 'class-transformer';



export function TransformPhone(type: 'FORMAT' | 'MASK') {
    return Transform(({ value }: TransformFnParams) => {
        if (!value) {
            return null;
        }

        if (type === 'MASK') {
            return maskPhone(value);
        }

        return formatPhone(value);
    });
}
