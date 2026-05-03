export interface PasswordOptions {
    length: number;
    uppercase: boolean;
    lowercase: boolean;
    numbers: boolean;
    symbols: boolean;
}

const CHARS = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
};

export function generatePassword(opts: PasswordOptions): string {
    let charset = '';
    if (opts.uppercase) charset += CHARS.uppercase;
    if (opts.lowercase) charset += CHARS.lowercase;
    if (opts.numbers) charset += CHARS.numbers;
    if (opts.symbols) charset += CHARS.symbols;
    if (!charset) charset = CHARS.lowercase + CHARS.numbers;

    const arr = new Uint8Array(opts.length);
    crypto.getRandomValues(arr);
    return Array.from(arr).map(b => charset[b % charset.length]).join('');
}

export function passwordEntropy(password: string): number {
    const charsetSize =
        (/[A-Z]/.test(password) ? 26 : 0) +
        (/[a-z]/.test(password) ? 26 : 0) +
        (/[0-9]/.test(password) ? 10 : 0) +
        (/[^A-Za-z0-9]/.test(password) ? 32 : 0);
    return Math.floor(password.length * Math.log2(charsetSize || 1));
}
