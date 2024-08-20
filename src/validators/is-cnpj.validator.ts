/* eslint-disable @typescript-eslint/no-unused-vars */
import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import { cnpj as cnpjValidator } from 'cpf-cnpj-validator';

export function IsCnpj(validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            name: 'IsCnpj',
            target: object.constructor,
            propertyName,
            options: validationOptions,
            validator: {
                validate(value: string, _args: ValidationArguments) {
                    return cnpjValidator.isValid(value);
                },
                defaultMessage(_args: ValidationArguments) {
                    return `Invalid CNPJ. Must have 14 numeric characters.`;
                },
            },
        });
    };
}