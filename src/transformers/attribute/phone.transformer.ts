import { Transform, TransformFnParams } from 'class-transformer';
import { maskPhone } from '../../utils/mask';
import { formatPhone } from '../../utils/format';


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
