export function formatCnpj(value: string) {
    if (!!value && value.length === 14) {
        return `${value.slice(0, 2)}.${value.slice(2, 5)}.${value.slice(5, 8)}/${value.slice(8, 12)}-${value.slice(value.length - 2, value.length)}`;
    }

    return value;
}

export function formatCpf(value: string) {
    if (!!value && value.length === 11) {
        return `${value.slice(0, 3)}.${value.slice(3, 6)}.${value.slice(6, 9)}-${value.slice(value.length - 2, value.length)}`;
    }

    return value;
}

export function formatCep(value: string) {
    if (!!value && value.length === 8) {
        return `${value.slice(0, 5)}-${value.slice(value.length - 3, value.length)}`;
    }

    return value;
}

export function formatPlate(value: string) {
    if (value) {
        return `${value.substring(0, 3)}-${value.substring(3, value.length)}`;
    }
    return value;
}

export function formatPhone(value: string) {
    if (!!value && value.length === 13) {
        return `+${value.substring(0, 2)} (${value.substring(2, 4)}) ${value.substring(4, 9)}-${value.substring(9, value.length)}`;
    }
    return value;
}
