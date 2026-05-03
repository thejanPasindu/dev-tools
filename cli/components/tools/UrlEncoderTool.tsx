import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';
import { MultilineInput } from '../MultilineInput.js';
import { OutputBox } from '../OutputBox.js';
import { encodeUrl, decodeUrl } from '../../lib/logic/url.js';

export function UrlEncoderTool() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [mode, setMode] = useState<'encode' | 'decode'>('encode');

    const run = () => {
        if (!input.trim()) return;
        try {
            setOutput(mode === 'encode' ? encodeUrl(input) : decodeUrl(input));
            setError(null);
        } catch (e: unknown) {
            setError((e as Error).message);
            setOutput('');
        }
    };

    useInput((inp, key) => {
        if (key.return) run();
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
            <Text dimColor>Enter to run · s to switch · Esc back</Text>
            <MultilineInput
                value={input}
                onChange={setInput}
                isActive={true}
                placeholder={mode === 'encode' ? 'Paste text to URL-encode…' : 'Paste URL-encoded string to decode…'}
                label="Input"
            />
            <OutputBox value={output} error={error} label="Output" />
        </Box>
    );
}
