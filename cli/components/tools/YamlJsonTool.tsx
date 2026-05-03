import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';
import { MultilineInput } from '../MultilineInput.js';
import { OutputBox } from '../OutputBox.js';
import { yamlToJson, jsonToYaml } from '../../lib/logic/yaml-json.js';

export function YamlJsonTool() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [mode, setMode] = useState<'yaml-to-json' | 'json-to-yaml'>('yaml-to-json');

    const run = () => {
        if (!input.trim()) return;
        try {
            setOutput(mode === 'yaml-to-json' ? yamlToJson(input) : jsonToYaml(input));
            setError(null);
        } catch (e: unknown) {
            setError((e as Error).message);
            setOutput('');
        }
    };

    useInput((inp, key) => {
        if (key.return) run();
        else if (inp === 's') setMode(m => m === 'yaml-to-json' ? 'json-to-yaml' : 'yaml-to-json');
    });

    const modeLabel = mode === 'yaml-to-json' ? 'YAML → JSON' : 'JSON → YAML';

    return (
        <Box flexDirection="column" gap={1}>
            <Box gap={2}>
                <Text>Mode: </Text>
                <Text color="cyan" bold>{modeLabel}</Text>
                <Text dimColor>(s to switch)</Text>
            </Box>
            <Text dimColor>Enter to convert · s switch direction · Esc back</Text>
            <MultilineInput
                value={input}
                onChange={setInput}
                isActive={true}
                placeholder={mode === 'yaml-to-json' ? 'Paste YAML here…' : 'Paste JSON here…'}
                label="Input"
            />
            <OutputBox value={output} error={error} label="Output" />
        </Box>
    );
}
