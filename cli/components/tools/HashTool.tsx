import React, { useState, useEffect } from 'react';
import { Box, Text } from 'ink';
import { MultilineInput } from '../MultilineInput.js';
import { hashText } from '../../lib/logic/hash.js';

export function HashTool() {
    const [input, setInput] = useState('');
    const [hashes, setHashes] = useState({ md5: '', sha1: '', sha256: '', sha512: '' });

    useEffect(() => {
        if (!input.trim()) {
            setHashes({ md5: '', sha1: '', sha256: '', sha512: '' });
            return;
        }
        setHashes(hashText(input));
    }, [input]);

    const rows = [
        { label: 'MD5', value: hashes.md5 },
        { label: 'SHA-1', value: hashes.sha1 },
        { label: 'SHA-256', value: hashes.sha256 },
        { label: 'SHA-512', value: hashes.sha512 },
    ];

    return (
        <Box flexDirection="column" gap={1}>
            <Text dimColor>Hashes update live as you type · Esc back</Text>
            <MultilineInput
                value={input}
                onChange={setInput}
                isActive={true}
                placeholder="Type or paste text to hash…"
                label="Input"
                maxLines={4}
            />
            <Box flexDirection="column" borderStyle="single" borderColor="green" paddingX={1}>
                {rows.map(row => (
                    <Box key={row.label} gap={1}>
                        <Text bold color="cyan">{row.label.padEnd(8)}</Text>
                        <Text>{row.value || <Text dimColor>—</Text>}</Text>
                    </Box>
                ))}
            </Box>
        </Box>
    );
}
