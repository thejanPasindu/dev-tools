import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';
import { v4 as uuidv4 } from 'uuid';
import TextInput from 'ink-text-input';

export function UuidTool() {
    const [count, setCount] = useState('5');
    const [uuids, setUuids] = useState<string[]>([]);
    const [focused, setFocused] = useState<'count' | 'result'>('count');

    const generate = () => {
        const n = Math.min(Math.max(parseInt(count) || 1, 1), 100);
        setUuids(Array.from({ length: n }, () => uuidv4()));
        setFocused('result');
    };

    useInput((inp, key) => {
        if (key.return && focused === 'count') generate();
        else if (inp === 'g') generate();
        else if (inp === 'r') { setUuids([]); setFocused('count'); }
    });

    return (
        <Box flexDirection="column" gap={1}>
            <Text dimColor>Enter quantity and press Enter to generate · g generate again · r reset · Esc back</Text>
            <Box gap={2} alignItems="center">
                <Text>Count (1-100): </Text>
                <Box borderStyle="single" borderColor={focused === 'count' ? 'cyan' : 'gray'} paddingX={1}>
                    <TextInput
                        value={count}
                        onChange={setCount}
                        onSubmit={generate}
                        focus={focused === 'count'}
                    />
                </Box>
            </Box>
            {uuids.length > 0 && (
                <Box flexDirection="column" borderStyle="single" borderColor="green" paddingX={1}>
                    {uuids.map((id, i) => (
                        <Text key={i} color="cyan">{id}</Text>
                    ))}
                </Box>
            )}
        </Box>
    );
}
