export interface TimestampResult {
    unix: number;
    iso: string;
    utc: string;
    local: string;
    relative: string;
}

export function fromUnix(ts: number): TimestampResult {
    const d = new Date(ts * 1000);
    const now = Date.now();
    const diff = Math.round((now - ts * 1000) / 1000);
    const relative = diff < 60 ? `${diff}s ago`
        : diff < 3600 ? `${Math.round(diff / 60)}m ago`
        : diff < 86400 ? `${Math.round(diff / 3600)}h ago`
        : `${Math.round(diff / 86400)}d ago`;
    return {
        unix: ts,
        iso: d.toISOString(),
        utc: d.toUTCString(),
        local: d.toLocaleString(),
        relative,
    };
}

export function fromIso(iso: string): TimestampResult {
    const d = new Date(iso);
    if (isNaN(d.getTime())) throw new Error('Invalid date string');
    return fromUnix(Math.floor(d.getTime() / 1000));
}

export function nowTimestamp(): TimestampResult {
    return fromUnix(Math.floor(Date.now() / 1000));
}
