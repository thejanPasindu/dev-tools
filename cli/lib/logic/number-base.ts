export interface BaseResult {
    decimal: string;
    binary: string;
    octal: string;
    hex: string;
}

export function convertBase(input: string, fromBase: 2 | 8 | 10 | 16): BaseResult {
    const decimal = parseInt(input.trim(), fromBase);
    if (isNaN(decimal)) throw new Error('Invalid number for the given base');
    return {
        decimal: decimal.toString(10),
        binary: decimal.toString(2),
        octal: decimal.toString(8),
        hex: decimal.toString(16).toUpperCase(),
    };
}
