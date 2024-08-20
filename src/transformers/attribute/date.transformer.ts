import { Transform, TransformFnParams } from 'class-transformer';
import { format } from 'date-fns';

export function TransformDate(pattern: string) {
    return Transform(({ value }: TransformFnParams) => {
        if (typeof value === 'number' || typeof value === 'object') {
            return format(value as number | Date, pattern);
        }

        return value;
    });
}
