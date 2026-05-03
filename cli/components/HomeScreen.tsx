import React, { useState } from 'react';
import { Box, Text, useInput, useApp } from 'ink';
import { CLI_TOOLS, CATEGORIES, CliTool } from '../lib/tools.js';

interface Props {
    onSelect: (tool: CliTool) => void;
}

export function HomeScreen({ onSelect }: Props) {
    const { exit } = useApp();
    const availableTools = CLI_TOOLS.filter(t => t.available);
    const [selectedIdx, setSelectedIdx] = useState(0);

    // Build a flat list with category headers
    const entries: Array<{ type: 'header'; category: string } | { type: 'tool'; tool: CliTool; idx: number }> = [];
    let toolIdx = 0;
    for (const cat of CATEGORIES) {
        const tools = availableTools.filter(t => t.category === cat);
        if (tools.length === 0) continue;
        entries.push({ type: 'header', category: cat });
        for (const tool of tools) {
            entries.push({ type: 'tool', tool, idx: toolIdx });
            toolIdx++;
        }
    }

    const totalTools = availableTools.length;

    useInput((input, key) => {
        if (key.upArrow) {
            setSelectedIdx(i => Math.max(0, i - 1));
        } else if (key.downArrow) {
            setSelectedIdx(i => Math.min(totalTools - 1, i + 1));
        } else if (key.return) {
            const tool = availableTools[selectedIdx];
            if (tool) onSelect(tool);
        } else if (input === 'q' || (key.ctrl && input === 'c')) {
            exit();
        }
    });

    return (
        <Box flexDirection="column" paddingX={1}>
            {/* Header */}
            <Box marginBottom={1} paddingY={0}>
                <Text bold color="cyan"> DevTools TUI </Text>
                <Text dimColor> — {availableTools.length} tools available · ↑↓ Navigate · Enter Select · q Quit</Text>
            </Box>

            {/* Tool list */}
            {entries.map((entry, i) => {
                if (entry.type === 'header') {
                    return (
                        <Box key={`header-${entry.category}`} marginTop={1}>
                            <Text bold color="yellow"> {entry.category.toUpperCase()} </Text>
                        </Box>
                    );
                }

                const isSelected = entry.idx === selectedIdx;
                return (
                    <Box key={entry.tool.id} paddingLeft={2}>
                        <Text
                            color={isSelected ? 'black' : undefined}
                            backgroundColor={isSelected ? 'cyan' : undefined}
                        >
                            {isSelected ? '▸ ' : '  '}
                            <Text bold={isSelected}>{entry.tool.label.padEnd(24)}</Text>
                            <Text dimColor={!isSelected}>{entry.tool.desc}</Text>
                        </Text>
                    </Box>
                );
            })}

            <Box marginTop={1} borderStyle="single" borderColor="gray" paddingX={1}>
                <Text dimColor>↑↓ Navigate  Enter Select  q Quit  |  Visual tools: use the desktop/web app</Text>
            </Box>
        </Box>
    );
}
