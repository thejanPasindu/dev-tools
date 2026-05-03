import React, { useState, useEffect } from 'react';
import { Box, Text, useInput } from 'ink';
import TextInput from 'ink-text-input';
import { MultilineInput } from '../MultilineInput.js';
import { generateHmac, HmacAlgo } from '../../lib/logic/hmac.js';

const ALGOS: HmacAlgo[] = ['SHA256', 'SHA512', 'SHA1', 'MD5'];

export function HmacTool() {
    const [message, setMessage] = useState('');
    const [secret, setSecret] = useState('');
    const [algoIdx, setAlgoIdx] = useState(0);
    const [result, setResult] = useState('');
    const [focus, setFocus] = useState<'message' | 'secret'>('message');

    const algo = ALGOS[algoIdx];

    useEffect(() => {
        if (!message || !secret) { setResult(''); return; }
        try { setResult(generateHmac(message, secret, algo)); } catch { setResult(''); }
    }, [message, secret, algo]);

    useInput((inp, key) => {
        if (key.tab) setFocus(f => f === 'message' ? 'secret' : 'message');
        else if (key.leftArrow && focus !== 'message') setAlgoIdx(i => (i - 1 + ALGOS.length) % ALGOS.length);
        else if (key.rightArrow && focus !== 'message') setAlgoIdx(i => (i + 1) % ALGOS.length);
    });

    return (
        <Box flexDirection="column" gap={1}>
            <Box gap={1}>
                <Text>Algorithm: </Text>
                {ALGOS.map((a, i) => (
                    <Text key={a} color={i === algoIdx ? 'cyan' : 'gray'} bold={i === algoIdx}>
                        {a}{i < ALGOS.length - 1 ? ' · ' : ''}
                    </Text>
                ))}
                <Text dimColor> (←→ to change)</Text>
            </Box>
            <Text dimColor>Tab switch focus · result updates live · Esc back</Text>
            <MultilineInput value={message} onChange={setMessage} isActive={focus === 'message'}
                placeholder="Message to sign…" label="Message (Tab to focus)" maxLines={4} />
            <Box gap={2} alignItems="center">
                <Text>Secret: </Text>
                <Box borderStyle="single" borderColor={focus === 'secret' ? 'cyan' : 'gray'} paddingX={1} flexGrow={1}>
                    <TextInput value={secret} onChange={setSecret} placeholder="Secret key…" focus={focus === 'secret'} />
                </Box>
            </Box>
            {result && (
                <Box flexDirection="column" borderStyle="single" borderColor="green" paddingX={1}>
                    <Box gap={1}>
                        <Text bold color="cyan">HMAC-{algo}</Text>
                    </Box>
                    <Text>{result}</Text>
                </Box>
            )}
        </Box>
    );
}
