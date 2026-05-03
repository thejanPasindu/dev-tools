function toWords(input: string): string[] {
    return input
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
        .replace(/[-_./\s]+/g, ' ')
        .trim()
        .toLowerCase()
        .split(' ')
        .filter(Boolean);
}

export interface CaseResult {
    camel: string;
    pascal: string;
    snake: string;
    kebab: string;
    screaming: string;
    title: string;
    upper: string;
    lower: string;
    dot: string;
    path: string;
}

export function convertCase(input: string): CaseResult {
    const words = toWords(input);
    if (!words.length) {
        return { camel: '', pascal: '', snake: '', kebab: '', screaming: '', title: '', upper: '', lower: '', dot: '', path: '' };
    }
    return {
        camel: words[0] + words.slice(1).map(w => w[0].toUpperCase() + w.slice(1)).join(''),
        pascal: words.map(w => w[0].toUpperCase() + w.slice(1)).join(''),
        snake: words.join('_'),
        kebab: words.join('-'),
        screaming: words.join('_').toUpperCase(),
        title: words.map(w => w[0].toUpperCase() + w.slice(1)).join(' '),
        upper: words.join(' ').toUpperCase(),
        lower: words.join(' '),
        dot: words.join('.'),
        path: words.join('/'),
    };
}
