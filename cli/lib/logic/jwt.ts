export interface JwtParts {
    header: Record<string, unknown>;
    payload: Record<string, unknown>;
    signature: string;
    isExpired: boolean;
}

export function decodeJwt(token: string): JwtParts {
    const parts = token.trim().split('.');
    if (parts.length !== 3) throw new Error('Invalid JWT: must have 3 parts');

    const decode = (str: string) => {
        const padded = str + '==='.slice((str.length + 3) % 4);
        return JSON.parse(Buffer.from(padded.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString('utf8'));
    };

    const header = decode(parts[0]) as Record<string, unknown>;
    const payload = decode(parts[1]) as Record<string, unknown>;
    const signature = parts[2];

    const isExpired = typeof payload['exp'] === 'number' && payload['exp'] < Math.floor(Date.now() / 1000);

    return { header, payload, signature, isExpired };
}
