/* eslint-disable @typescript-eslint/no-unused-vars */
import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import { cpf as cpfValidator } from 'cpf-cnpj-validator';

export function IsCpf(validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            name: 'IsCpf',
            target: object.constructor,
            propertyName,
            options: validationOptions,
            validator: {
                validate(value: string, _args: ValidationArguments) {
                    return cpfValidator.isValid(value);
                },
                defaultMessage(_args: ValidationArguments) {
                    return `Invalid CPF. Must have 11 numeric characters.`;
                },
            },
        });
    };
}
