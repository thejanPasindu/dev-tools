import React, { useState, useEffect } from 'react';
import { Box, Text, useInput } from 'ink';
import TextInput from 'ink-text-input';
import { fromUnix, fromIso, nowTimestamp, TimestampResult } from '../../lib/logic/timestamp.js';

export function TimestampTool() {
    const [input, setInput] = useState('');
    const [result, setResult] = useState<TimestampResult | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [now, setNow] = useState<TimestampResult>(nowTimestamp());

    // Live clock tick
    useEffect(() => {
        const t = setInterval(() => setNow(nowTimestamp()), 1000);
        return () => clearInterval(t);
    }, []);

    const parse = (val: string) => {
        if (!val.trim()) { setResult(null); setError(null); return; }
        try {
            const n = Number(val.trim());
            const r = isNaN(n) ? fromIso(val.trim()) : fromUnix(n);
            setResult(r);
            setError(null);
        } catch (e: unknown) {
            setError((e as Error).message);
            setResult(null);
        }
    };

    useInput((_inp, _key) => { /* navigation handled by App */ });

    const rows = result ? [
        { label: 'Unix', value: String(result.unix) },
        { label: 'ISO 8601', value: result.iso },
        { label: 'UTC', value: result.utc },
        { label: 'Local', value: result.local },
        { label: 'Relative', value: result.relative },
    ] : [];

    return (
        <Box flexDirection="column" gap={1}>
            <Box borderStyle="single" borderColor="gray" paddingX={1}>
                <Text dimColor>Now: </Text>
                <Text color="cyan">{now.unix}</Text>
                <Text dimColor>  {now.iso}</Text>
            </Box>
            <Text dimColor>Enter a Unix timestamp or ISO date to convert · Esc back</Text>
            <Box gap={2} alignItems="center">
                <Text>Input: </Text>
                <Box borderStyle="single" borderColor="cyan" paddingX={1} flexGrow={1}>
                    <TextInput
                        value={input}
                        onChange={v => { setInput(v); parse(v); }}
                        placeholder="1700000000  or  2024-01-01T00:00:00Z"
                    />
                </Box>
            </Box>
            {error && <Text color="red">{error}</Text>}
            {rows.length > 0 && (
                <Box flexDirection="column" borderStyle="single" borderColor="green" paddingX={1}>
                    {rows.map(row => (
                        <Box key={row.label} gap={1}>
                            <Text bold color="cyan">{row.label.padEnd(10)}</Text>
                            <Text>{row.value}</Text>
                        </Box>
                    ))}
                </Box>
            )}
        </Box>
    );
}
