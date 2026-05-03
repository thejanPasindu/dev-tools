import React from 'react';
import { Box, Text } from 'ink';

interface Props {
    value: string;
    label?: string;
    maxLines?: number;
    error?: string | null;
}

export function OutputBox({ value, label, maxLines = 18, error }: Props) {
    const lines = value.split('\n').slice(0, maxLines);
    const truncated = value.split('\n').length > maxLines;

    return (
        <Box flexDirection="column">
            {label && <Text dimColor>{label}</Text>}
            <Box
                borderStyle="single"
                borderColor={error ? 'red' : 'green'}
                flexDirection="column"
                paddingX={1}
                minHeight={6}
            >
                {error ? (
                    <Text color="red">{error}</Text>
                ) : value ? (
                    <>
                        {lines.map((line, i) => <Text key={i}>{line}</Text>)}
                        {truncated && <Text dimColor>… ({value.split('\n').length} lines total)</Text>}
                    </>
                ) : (
                    <Text dimColor>Output will appear here</Text>
                )}
            </Box>
        </Box>
    );
}
