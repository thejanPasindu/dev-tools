import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';
import TextInput from 'ink-text-input';
import { convertBase } from '../../lib/logic/number-base.js';

type Base = 2 | 8 | 10 | 16;
const BASES: { label: string; value: Base }[] = [
    { label: 'Decimal (10)', value: 10 },
    { label: 'Binary (2)', value: 2 },
    { label: 'Octal (8)', value: 8 },
    { label: 'Hex (16)', value: 16 },
];

export function NumberBaseTool() {
    const [input, setInput] = useState('');
    const [fromBase, setFromBase] = useState<Base>(10);
    const [baseIdx, setBaseIdx] = useState(0);
    const [error, setError] = useState<string | null>(null);

    const tryConvert = (val: string, base: Base) => {
        if (!val.trim()) { setError(null); return null; }
        try {
            const r = convertBase(val.trim(), base);
            setError(null);
            return r;
        } catch (e: unknown) {
            setError((e as Error).message);
            return null;
        }
    };

    const result = tryConvert(input, fromBase);

    useInput((_inp, key) => {
        if (key.leftArrow || key.upArrow) {
            const idx = (baseIdx - 1 + BASES.length) % BASES.length;
            setBaseIdx(idx);
            setFromBase(BASES[idx].value);
        } else if (key.rightArrow || key.downArrow) {
            const idx = (baseIdx + 1) % BASES.length;
            setBaseIdx(idx);
            setFromBase(BASES[idx].value);
        }
    });

    return (
        <Box flexDirection="column" gap={1}>
            <Text dimColor>←→ change input base · Esc back</Text>
            <Box gap={1}>
                <Text>From base: </Text>
                {BASES.map((b, i) => (
                    <Text key={b.value} color={i === baseIdx ? 'cyan' : 'gray'} bold={i === baseIdx}>
                        {b.label}{i < BASES.length - 1 ? ' · ' : ''}
                    </Text>
                ))}
            </Box>
            <Box gap={2} alignItems="center">
                <Text>Input: </Text>
                <Box borderStyle="single" borderColor="cyan" paddingX={1} flexGrow={1}>
                    <TextInput value={input} onChange={v => { setInput(v); tryConvert(v, fromBase); }} placeholder="Enter number…" />
                </Box>
            </Box>
            {error && <Text color="red">{error}</Text>}
            {result && (
                <Box flexDirection="column" borderStyle="single" borderColor="green" paddingX={1}>
                    <Box gap={1}><Text bold color="cyan">{'Decimal'.padEnd(10)}</Text><Text>{result.decimal}</Text></Box>
                    <Box gap={1}><Text bold color="cyan">{'Binary'.padEnd(10)}</Text><Text>{result.binary}</Text></Box>
                    <Box gap={1}><Text bold color="cyan">{'Octal'.padEnd(10)}</Text><Text>{result.octal}</Text></Box>
                    <Box gap={1}><Text bold color="cyan">{'Hex'.padEnd(10)}</Text><Text>{result.hex}</Text></Box>
                </Box>
            )}
        </Box>
    );
}
