export function formatJson(input: string, indent = 2): string {
    const parsed = JSON.parse(input.trim());
    return JSON.stringify(parsed, null, indent);
}

export function minifyJson(input: string): string {
    return JSON.stringify(JSON.parse(input.trim()));
}

export function jqQuery(input: string, expr: string): string {
    const parsed = JSON.parse(input.trim());
    const result = evalExpr(parsed, expr.trim());
    return JSON.stringify(result, null, 2);
}

function evalExpr(data: unknown, expr: string): unknown {
    const parts = expr.split('|').map(p => p.trim());
    let current: unknown = data;
    for (const part of parts) {
        current = evalPart(current, part);
    }
    return current;
}

function evalPart(data: unknown, expr: string): unknown {
    if (expr === '' || expr === '.') return data;
    const path = expr.startsWith('.') ? expr.slice(1) : expr;
    if (!path) return data;
    let current: unknown = data;
    const tokens = path.match(/[^.\[]+|\[\d+\]|\[\]/g) ?? [];
    for (const token of tokens) {
        if (token === '[]') {
            if (!Array.isArray(current)) throw new Error(`Expected array`);
            return current;
        }
        const arrIdx = token.match(/^\[(\d+)\]$/);
        if (arrIdx) {
            if (!Array.isArray(current)) throw new Error(`Expected array at index`);
            current = (current as unknown[])[parseInt(arrIdx[1])];
        } else {
            if (current === null || typeof current !== 'object' || Array.isArray(current))
                throw new Error(`Cannot access key "${token}"`);
            current = (current as Record<string, unknown>)[token];
        }
    }
    return current;
}
