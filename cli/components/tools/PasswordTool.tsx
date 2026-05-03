import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';
import TextInput from 'ink-text-input';
import { generatePassword, passwordEntropy, PasswordOptions } from '../../lib/logic/password.js';

export function PasswordTool() {
    const [length, setLength] = useState('16');
    const [opts, setOpts] = useState<PasswordOptions>({
        length: 16, uppercase: true, lowercase: true, numbers: true, symbols: false,
    });
    const [passwords, setPasswords] = useState<string[]>([]);
    const [count, setCount] = useState('5');

    const toggle = (key: keyof Omit<PasswordOptions, 'length'>) =>
        setOpts(o => ({ ...o, [key]: !o[key] }));

    const generate = () => {
        const n = Math.min(Math.max(parseInt(count) || 1, 1), 20);
        const l = Math.min(Math.max(parseInt(length) || 16, 4), 128);
        const finalOpts = { ...opts, length: l };
        setPasswords(Array.from({ length: n }, () => generatePassword(finalOpts)));
    };

    useInput((inp, key) => {
        if (inp === 'g' || key.return) generate();
        else if (inp === 'u') toggle('uppercase');
        else if (inp === 'l') toggle('lowercase');
        else if (inp === 'n') toggle('numbers');
        else if (inp === 's') toggle('symbols');
    });

    const charLabel = (on: boolean, ch: string) => (
        <Text color={on ? 'green' : 'gray'}>[{on ? '✓' : ' '}] {ch}</Text>
    );

    return (
        <Box flexDirection="column" gap={1}>
            <Box gap={3}>
                {charLabel(opts.uppercase, 'U uppercase')}
                {charLabel(opts.lowercase, 'l lowercase')}
                {charLabel(opts.numbers, 'n numbers')}
                {charLabel(opts.symbols, 's symbols')}
            </Box>
            <Box gap={2} alignItems="center">
                <Text>Length: </Text>
                <Box borderStyle="single" borderColor="cyan" paddingX={1} width={6}>
                    <TextInput value={length} onChange={setLength} />
                </Box>
                <Text>Count: </Text>
                <Box borderStyle="single" borderColor="cyan" paddingX={1} width={4}>
                    <TextInput value={count} onChange={setCount} />
                </Box>
                <Text dimColor>  g / Enter to generate</Text>
            </Box>
            <Text dimColor>u/l/n/s toggle charset · Esc back</Text>
            {passwords.length > 0 && (
                <Box flexDirection="column" borderStyle="single" borderColor="green" paddingX={1}>
                    {passwords.map((p, i) => (
                        <Box key={i} gap={2}>
                            <Text color="cyan">{p}</Text>
                            <Text dimColor>{passwordEntropy(p)} bits</Text>
                        </Box>
                    ))}
                </Box>
            )}
        </Box>
    );
}
