import { MASK, FORMAT } from '@conversu/commons';
import { Transform, TransformFnParams } from 'class-transformer';



export function TransformPhone(type: 'FORMAT' | 'MASK') {
    return Transform(({ value }: TransformFnParams) => {
        if (!value) {
            return null;
        }

        if (type === 'MASK') {
            return MASK.Phone(value);
        }

        return FORMAT.Phone(value);
    });
}
