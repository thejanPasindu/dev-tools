import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';
import { MultilineInput } from '../MultilineInput.js';
import { OutputBox } from '../OutputBox.js';
import { encodeHtml, decodeHtml } from '../../lib/logic/html-entities.js';

export function HtmlEntitiesTool() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [mode, setMode] = useState<'encode' | 'decode'>('encode');

    const run = () => {
        if (!input.trim()) return;
        setOutput(mode === 'encode' ? encodeHtml(input) : decodeHtml(input));
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
            <Text dimColor>Enter to run · s switch · Esc back</Text>
            <MultilineInput value={input} onChange={setInput} isActive={true}
                placeholder={mode === 'encode' ? 'Paste HTML to encode entities…' : 'Paste HTML to decode entities…'} label="Input" />
            <OutputBox value={output} label="Output" />
        </Box>
    );
}
