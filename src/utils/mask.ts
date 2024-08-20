import { formatPhone } from "./format";



export function maskPhone(value: string) {
    if (value) {
        let phone = formatPhone(value);
        phone = phone.includes('-')
            ? phone
            : `${phone.slice(0, phone.length - 4)}-${phone.slice(phone.length - 4, phone.length)}`;
        const [part1, part2] = phone.split('-');
        let result = part1.slice(0, 12);
        result += '**-**';
        result += part2.slice(2, 4);

        return result;
    }

    return value;
}

export function maskCpf(value: string) {
    if (!!value && value.length === 11) {
        return `${value.slice(0, 3)}.***.***-${value.slice(value.length - 2, value.length)}`;
    }

    return value;
}

export function maskCnpj(value: string) {
    if (!!value && value.length === 14) {
        return `${value.slice(0, 2)}.***.**${value.slice(7, 8)}/${value.slice(8, 12)}-${value.slice(value.length - 2, value.length)}`;
    }

    return value;
}

export function maskCep(value: string) {
    if (!!value && value.length === 8) {
        return `${value.slice(0, 2)}***-${value.slice(value.length - 3, value.length)}`;
    }

    return value;
}
