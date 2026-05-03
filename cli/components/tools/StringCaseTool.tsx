import React, { useState } from 'react';
import { Box, Text } from 'ink';
import TextInput from 'ink-text-input';
import { convertCase, CaseResult } from '../../lib/logic/string-case.js';

const CASE_LABELS: Array<{ key: keyof CaseResult; label: string }> = [
    { key: 'camel', label: 'camelCase' },
    { key: 'pascal', label: 'PascalCase' },
    { key: 'snake', label: 'snake_case' },
    { key: 'kebab', label: 'kebab-case' },
    { key: 'screaming', label: 'SCREAMING_SNAKE' },
    { key: 'title', label: 'Title Case' },
    { key: 'upper', label: 'UPPER CASE' },
    { key: 'lower', label: 'lower case' },
    { key: 'dot', label: 'dot.case' },
    { key: 'path', label: 'path/case' },
];

export function StringCaseTool() {
    const [input, setInput] = useState('');
    const result = convertCase(input);

    return (
        <Box flexDirection="column" gap={1}>
            <Text dimColor>Type to convert · results update live · Esc back</Text>
            <Box gap={2} alignItems="center">
                <Text>Input: </Text>
                <Box borderStyle="single" borderColor="cyan" paddingX={1} flexGrow={1}>
                    <TextInput value={input} onChange={setInput} placeholder="e.g. hello world or helloWorld…" />
                </Box>
            </Box>
            <Box flexDirection="column" borderStyle="single" borderColor="green" paddingX={1}>
                {CASE_LABELS.map(({ key, label }) => (
                    <Box key={key} gap={1}>
                        <Text bold color="cyan">{label.padEnd(18)}</Text>
                        <Text>{result[key] || <Text dimColor>—</Text>}</Text>
                    </Box>
                ))}
            </Box>
        </Box>
    );
}
