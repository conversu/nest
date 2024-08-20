import { Transform, TransformFnParams } from 'class-transformer';

export interface ClassConstructor {
    new (...args: any[]): any;
}

export function TransformJson(serialize?: ClassConstructor | null, property?: string | null) {
    return Transform(({ value }: TransformFnParams) => {
        if (typeof value === 'string') {
            let result = JSON.parse(value);

            if (property) {
                result = result[property];
            }

            if (serialize) {
                return new serialize(result);
            }

            return result;
        }

        return value;
    });
}
