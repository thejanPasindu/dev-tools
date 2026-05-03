import React, { useState } from 'react';
import { Box, Text } from 'ink';
import { MultilineInput } from '../MultilineInput.js';
import { decodeJwt } from '../../lib/logic/jwt.js';

export function JwtTool() {
    const [input, setInput] = useState('');
    const [error, setError] = useState<string | null>(null);

    const result = (() => {
        if (!input.trim()) { setError(null); return null; }
        try {
            const r = decodeJwt(input.trim());
            setError(null);
            return r;
        } catch (e: unknown) {
            setError((e as Error).message);
            return null;
        }
    })();

    return (
        <Box flexDirection="column" gap={1}>
            <Text dimColor>Paste a JWT token to decode it · Esc back</Text>
            <MultilineInput value={input} onChange={setInput} isActive={true}
                placeholder="Paste JWT token here…" label="Token" maxLines={3} />
            {error && <Text color="red">{error}</Text>}
            {result && (
                <Box flexDirection="column" gap={1}>
                    <Box flexDirection="column" borderStyle="single" borderColor={result.isExpired ? 'red' : 'green'} paddingX={1}>
                        <Box gap={1}>
                            <Text bold color="cyan">Status    </Text>
                            <Text color={result.isExpired ? 'red' : 'green'}>
                                {result.isExpired ? '⚠ EXPIRED' : '✓ Valid'}
                            </Text>
                        </Box>
                        <Text bold color="yellow">Header</Text>
                        {Object.entries(result.header).map(([k, v]) => (
                            <Box key={k} gap={1}>
                                <Text bold color="cyan">{k.padEnd(12)}</Text>
                                <Text>{String(v)}</Text>
                            </Box>
                        ))}
                        <Text bold color="yellow">Payload</Text>
                        {Object.entries(result.payload).map(([k, v]) => {
                            const isDate = (k === 'exp' || k === 'iat' || k === 'nbf') && typeof v === 'number';
                            const display = isDate ? `${v}  (${new Date((v as number) * 1000).toISOString()})` : JSON.stringify(v);
                            return (
                                <Box key={k} gap={1}>
                                    <Text bold color="cyan">{k.padEnd(12)}</Text>
                                    <Text>{display}</Text>
                                </Box>
                            );
                        })}
                    </Box>
                </Box>
            )}
        </Box>
    );
}
