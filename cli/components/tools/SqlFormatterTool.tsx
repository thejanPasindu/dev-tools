import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';
import { MultilineInput } from '../MultilineInput.js';
import { OutputBox } from '../OutputBox.js';
import { formatSql, SqlDialect } from '../../lib/logic/sql.js';

const DIALECTS: SqlDialect[] = ['sql', 'mysql', 'postgresql', 'sqlite', 'bigquery'];

export function SqlFormatterTool() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [dialectIdx, setDialectIdx] = useState(0);

    const dialect = DIALECTS[dialectIdx];

    const run = () => {
        if (!input.trim()) return;
        try {
            setOutput(formatSql(input, dialect));
            setError(null);
        } catch (e: unknown) {
            setError((e as Error).message);
            setOutput('');
        }
    };

    useInput((inp, key) => {
        if (key.return) run();
        else if (key.leftArrow) setDialectIdx(i => (i - 1 + DIALECTS.length) % DIALECTS.length);
        else if (key.rightArrow) setDialectIdx(i => (i + 1) % DIALECTS.length);
    });

    return (
        <Box flexDirection="column" gap={1}>
            <Box gap={1}>
                <Text>Dialect: </Text>
                {DIALECTS.map((d, i) => (
                    <Text key={d} color={i === dialectIdx ? 'cyan' : 'gray'} bold={i === dialectIdx}>
                        {d}{i < DIALECTS.length - 1 ? ' · ' : ''}
                    </Text>
                ))}
                <Text dimColor> (←→ to change)</Text>
            </Box>
            <Text dimColor>Enter to format · ←→ dialect · Esc back</Text>
            <MultilineInput value={input} onChange={setInput} isActive={true}
                placeholder="Paste SQL here…" label="Input" />
            <OutputBox value={output} error={error} label="Output" />
        </Box>
    );
}
