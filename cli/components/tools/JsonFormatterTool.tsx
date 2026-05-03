import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';
import { MultilineInput } from '../MultilineInput.js';
import { OutputBox } from '../OutputBox.js';
import { formatJson, minifyJson } from '../../lib/logic/json.js';

type Panel = 'input' | 'query';

export function JsonFormatterTool() {
    const [input, setInput] = useState('');
    const [query, setQuery] = useState('');
    const [output, setOutput] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [panel, setPanel] = useState<Panel>('input');

    const run = (minify = false) => {
        if (!input.trim()) return;
        try {
            setOutput(minify ? minifyJson(input) : formatJson(input));
            setError(null);
        } catch (e: unknown) {
            setError((e as Error).message);
            setOutput('');
        }
    };

    useInput((inp, key) => {
        if (key.tab) {
            setPanel(p => p === 'input' ? 'query' : 'input');
        } else if (inp === 'f' && panel === 'input') {
            run(false);
        } else if (inp === 'm' && panel === 'input') {
            run(true);
        }
    });

    return (
        <Box flexDirection="column" gap={1}>
            <Text dimColor>Tab switch panel · f Format · m Minify · Esc back</Text>
            <MultilineInput
                value={input}
                onChange={setInput}
                isActive={panel === 'input'}
                placeholder='Paste JSON here… then press f to format or m to minify'
                label="Input (Tab to focus)"
            />
            <OutputBox value={output} error={error} label="Output" />
        </Box>
    );
}
