import React, { useState } from 'react';
import { Box, Text } from 'ink';
import { MultilineInput } from '../MultilineInput.js';
import { analyzeText } from '../../lib/logic/text-analyzer.js';

export function TextAnalyzerTool() {
    const [input, setInput] = useState('');
    const stats = input.trim() ? analyzeText(input) : null;

    const readTime = stats
        ? stats.readingTimeSec < 60
            ? `${stats.readingTimeSec}s`
            : `${Math.ceil(stats.readingTimeSec / 60)}m`
        : '—';

    return (
        <Box flexDirection="column" gap={1}>
            <Text dimColor>Stats update live as you type · Esc back</Text>
            <MultilineInput value={input} onChange={setInput} isActive={true}
                placeholder="Paste text to analyze…" label="Input" maxLines={10} />
            {stats && (
                <Box flexDirection="column" borderStyle="single" borderColor="green" paddingX={1}>
                    <Box gap={4}>
                        <Box flexDirection="column">
                            <Box gap={1}><Text bold color="cyan">{'Characters'.padEnd(18)}</Text><Text>{stats.chars}</Text></Box>
                            <Box gap={1}><Text bold color="cyan">{'Chars (no spaces)'.padEnd(18)}</Text><Text>{stats.charsNoSpaces}</Text></Box>
                            <Box gap={1}><Text bold color="cyan">{'Words'.padEnd(18)}</Text><Text>{stats.words}</Text></Box>
                            <Box gap={1}><Text bold color="cyan">{'Sentences'.padEnd(18)}</Text><Text>{stats.sentences}</Text></Box>
                            <Box gap={1}><Text bold color="cyan">{'Lines'.padEnd(18)}</Text><Text>{stats.lines}</Text></Box>
                            <Box gap={1}><Text bold color="cyan">{'Paragraphs'.padEnd(18)}</Text><Text>{stats.paragraphs}</Text></Box>
                            <Box gap={1}><Text bold color="cyan">{'Reading time'.padEnd(18)}</Text><Text>{readTime}</Text></Box>
                        </Box>
                        {stats.topWords.length > 0 && (
                            <Box flexDirection="column" marginLeft={4}>
                                <Text bold color="yellow">Top words</Text>
                                {stats.topWords.slice(0, 8).map(w => (
                                    <Box key={w.word} gap={1}>
                                        <Text>{w.word.padEnd(16)}</Text>
                                        <Text dimColor>{w.count}×</Text>
                                    </Box>
                                ))}
                            </Box>
                        )}
                    </Box>
                </Box>
            )}
        </Box>
    );
}
