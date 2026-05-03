import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';
import { MultilineInput } from '../MultilineInput.js';
import { OutputBox } from '../OutputBox.js';
import { csvToJson, jsonToCsv } from '../../lib/logic/csv-json.js';

export function CsvJsonTool() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [mode, setMode] = useState<'csv-to-json' | 'json-to-csv'>('csv-to-json');

    const run = () => {
        if (!input.trim()) return;
        try {
            setOutput(mode === 'csv-to-json' ? csvToJson(input) : jsonToCsv(input));
            setError(null);
        } catch (e: unknown) {
            setError((e as Error).message);
            setOutput('');
        }
    };

    useInput((inp, key) => {
        if (key.return) run();
        else if (inp === 's') setMode(m => m === 'csv-to-json' ? 'json-to-csv' : 'csv-to-json');
    });

    return (
        <Box flexDirection="column" gap={1}>
            <Box gap={2}>
                <Text>Mode: </Text>
                <Text color="cyan" bold>{mode === 'csv-to-json' ? 'CSV → JSON' : 'JSON → CSV'}</Text>
                <Text dimColor>(s to switch)</Text>
            </Box>
            <Text dimColor>Enter to convert · s switch direction · Esc back</Text>
            <MultilineInput value={input} onChange={setInput} isActive={true}
                placeholder={mode === 'csv-to-json' ? 'Paste CSV here (header row required)…' : 'Paste JSON array here…'} label="Input" />
            <OutputBox value={output} error={error} label="Output" />
        </Box>
    );
}
