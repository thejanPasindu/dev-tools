import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';
import { MultilineInput } from '../MultilineInput.js';
import { OutputBox } from '../OutputBox.js';
import { tomlToJson, jsonToToml } from '../../lib/logic/toml-json.js';

export function TomlJsonTool() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [mode, setMode] = useState<'toml-to-json' | 'json-to-toml'>('toml-to-json');

    const run = () => {
        if (!input.trim()) return;
        try {
            setOutput(mode === 'toml-to-json' ? tomlToJson(input) : jsonToToml(input));
            setError(null);
        } catch (e: unknown) {
            setError((e as Error).message);
            setOutput('');
        }
    };

    useInput((inp, key) => {
        if (key.return) run();
        else if (inp === 's') setMode(m => m === 'toml-to-json' ? 'json-to-toml' : 'toml-to-json');
    });

    return (
        <Box flexDirection="column" gap={1}>
            <Box gap={2}>
                <Text>Mode: </Text>
                <Text color="cyan" bold>{mode === 'toml-to-json' ? 'TOML → JSON' : 'JSON → TOML'}</Text>
                <Text dimColor>(s to switch)</Text>
            </Box>
            <Text dimColor>Enter to convert · s switch direction · Esc back</Text>
            <MultilineInput value={input} onChange={setInput} isActive={true}
                placeholder={mode === 'toml-to-json' ? 'Paste TOML here…' : 'Paste JSON here…'} label="Input" />
            <OutputBox value={output} error={error} label="Output" />
        </Box>
    );
}
