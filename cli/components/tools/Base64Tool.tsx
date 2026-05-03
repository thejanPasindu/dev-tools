import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';
import { MultilineInput } from '../MultilineInput.js';
import { OutputBox } from '../OutputBox.js';
import { encodeBase64, decodeBase64 } from '../../lib/logic/base64.js';

export function Base64Tool() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [mode, setMode] = useState<'encode' | 'decode'>('encode');

    const run = () => {
        if (!input.trim()) return;
        try {
            setOutput(mode === 'encode' ? encodeBase64(input) : decodeBase64(input));
            setError(null);
        } catch (e: unknown) {
            setError((e as Error).message);
            setOutput('');
        }
    };

    useInput((inp, key) => {
        if (key.return && !key.shift) run();
        else if (inp === 's') setMode(m => m === 'encode' ? 'decode' : 'encode');
    });

    return (
        <Box flexDirection="column" gap={1}>
            <Box gap={2}>
                <Text>Mode: </Text>
                <Text color={mode === 'encode' ? 'cyan' : 'gray'} bold={mode === 'encode'}>Encode</Text>
                <Text dimColor>/</Text>
                <Text color={mode === 'decode' ? 'cyan' : 'gray'} bold={mode === 'decode'}>Decode</Text>
                <Text dimColor> (s to switch)</Text>
            </Box>
            <Text dimColor>Enter to run · s to switch encode/decode · Esc back</Text>
            <MultilineInput
                value={input}
                onChange={setInput}
                isActive={true}
                placeholder={mode === 'encode' ? 'Paste text to encode…' : 'Paste Base64 to decode…'}
                label="Input"
            />
            <OutputBox value={output} error={error} label="Output" />
        </Box>
    );
}
