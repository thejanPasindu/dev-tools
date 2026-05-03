import React from 'react';
import { Box, Text, useInput } from 'ink';

interface Props {
    value: string;
    onChange: (v: string) => void;
    isActive: boolean;
    placeholder?: string;
    maxLines?: number;
    label?: string;
}

export function MultilineInput({ value, onChange, isActive, placeholder = 'Paste or type here…', maxLines = 18, label }: Props) {
    useInput((input, key) => {
        if (!isActive) return;
        if (key.backspace || key.delete) {
            onChange(value.slice(0, -1));
        } else if (key.return) {
            onChange(value + '\n');
        } else if (key.ctrl && input === 'a') {
            onChange('');
        } else if (input && !key.ctrl && !key.meta && !key.escape && !key.tab) {
            onChange(value + input);
        }
    }, { isActive });

    const lines = value.split('\n');
    const visibleLines = lines.slice(-maxLines);
    const isEmpty = value === '';

    return (
        <Box flexDirection="column">
            {label && <Text dimColor>{label}</Text>}
            <Box
                borderStyle="single"
                borderColor={isActive ? 'cyan' : 'gray'}
                flexDirection="column"
                paddingX={1}
                minHeight={6}
            >
                {isEmpty ? (
                    <Text dimColor>{placeholder}</Text>
                ) : (
                    visibleLines.map((line, i) => (
                        <Text key={i}>
                            {line}
                            {isActive && i === visibleLines.length - 1 ? <Text color="cyan">█</Text> : ''}
                        </Text>
                    ))
                )}
                {!isEmpty && isActive && visibleLines[visibleLines.length - 1] === '' && (
                    <Text color="cyan">█</Text>
                )}
            </Box>
            <Text dimColor> {value.length} chars · Ctrl+A clear</Text>
        </Box>
    );
}
