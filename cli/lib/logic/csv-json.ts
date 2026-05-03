export function csvToJson(input: string): string {
    const lines = input.trim().split('\n');
    if (lines.length < 2) throw new Error('CSV must have at least a header row and one data row');
    const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
    const rows = lines.slice(1).map(line => {
        const values = line.split(',').map(v => v.trim().replace(/^"|"$/g, ''));
        return Object.fromEntries(headers.map((h, i) => [h, values[i] ?? '']));
    });
    return JSON.stringify(rows, null, 2);
}

export function jsonToCsv(input: string): string {
    const arr = JSON.parse(input.trim()) as Record<string, unknown>[];
    if (!Array.isArray(arr) || arr.length === 0) throw new Error('Input must be a non-empty JSON array');
    const headers = Object.keys(arr[0]);
    const escape = (v: unknown) => {
        const s = String(v ?? '');
        return s.includes(',') || s.includes('"') || s.includes('\n') ? `"${s.replace(/"/g, '""')}"` : s;
    };
    const rows = [headers.join(','), ...arr.map(row => headers.map(h => escape(row[h])).join(','))];
    return rows.join('\n');
}
