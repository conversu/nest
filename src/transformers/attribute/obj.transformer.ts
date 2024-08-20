import { Transform, TransformFnParams } from 'class-transformer';

export function TransformObject<T>(keys: string[]) {
    return Transform(({ value }: TransformFnParams) => {
        const newObj = {};
        for (const key of keys) {
            Object.assign(newObj, {
                key: value[key as keyof T],
            });
        }

        return newObj;
    });
}
