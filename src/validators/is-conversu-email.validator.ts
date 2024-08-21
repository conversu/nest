/* eslint-disable @typescript-eslint/no-unused-vars */
import { registerDecorator, ValidationOptions, ValidationArguments, isEmail } from 'class-validator';

export function IsConversuEmail(validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            name: 'IsConversuEmail',
            target: object.constructor,
            propertyName,
            options: validationOptions,
            validator: {
                validate(value: string, _args: ValidationArguments) {
                    return isEmail(value) && value.toLowerCase().endsWith('conversu.com.br');
                },
                defaultMessage(_args: ValidationArguments) {
                    return `Must be an institutional email.`;
                },
            },
        });
    };
}
