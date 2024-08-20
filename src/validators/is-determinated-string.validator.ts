/* eslint-disable @typescript-eslint/no-unused-vars */
import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsDeterminedString(allowedValues: string[], validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            name: 'IsDeterminedString',
            target: object.constructor,
            propertyName,
            options: validationOptions,
            validator: {
                validate(value: any, _args: ValidationArguments) {
                    if (!allowedValues.includes(value)) {
                        return false;
                    }
                    return true;
                },
                defaultMessage(args: ValidationArguments) {
                    return `${args.property} must be one of: ${allowedValues.join(', ')}`;
                },
            },
        });
    };
}
