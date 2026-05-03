const ENTITIES: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
};

const DECODE_ENTITIES: Record<string, string> = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&nbsp;': ' ',
    '&copy;': '©',
    '&reg;': '®',
    '&trade;': '™',
    '&mdash;': '—',
    '&ndash;': '–',
    '&laquo;': '«',
    '&raquo;': '»',
};

export function encodeHtml(input: string): string {
    return input.replace(/[&<>"']/g, ch => ENTITIES[ch] ?? ch);
}

export function decodeHtml(input: string): string {
    return input
        .replace(/&[a-z]+;/gi, entity => DECODE_ENTITIES[entity] ?? entity)
        .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(parseInt(code)));
}
