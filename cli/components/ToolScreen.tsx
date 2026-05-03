import React from 'react';
import { Box, Text, useInput } from 'ink';
import { CliTool } from '../lib/tools.js';
import { JsonFormatterTool } from './tools/JsonFormatterTool.js';
import { Base64Tool } from './tools/Base64Tool.js';
import { UrlEncoderTool } from './tools/UrlEncoderTool.js';
import { HashTool } from './tools/HashTool.js';
import { UuidTool } from './tools/UuidTool.js';
import { StringCaseTool } from './tools/StringCaseTool.js';
import { NumberBaseTool } from './tools/NumberBaseTool.js';
import { TimestampTool } from './tools/TimestampTool.js';
import { YamlJsonTool } from './tools/YamlJsonTool.js';
import { TomlJsonTool } from './tools/TomlJsonTool.js';
import { CsvJsonTool } from './tools/CsvJsonTool.js';
import { SqlFormatterTool } from './tools/SqlFormatterTool.js';
import { HtmlEntitiesTool } from './tools/HtmlEntitiesTool.js';
import { TextAnalyzerTool } from './tools/TextAnalyzerTool.js';
import { JwtTool } from './tools/JwtTool.js';
import { HmacTool } from './tools/HmacTool.js';
import { PasswordTool } from './tools/PasswordTool.js';

interface Props {
    tool: CliTool;
    onBack: () => void;
}

function ToolContent({ id }: { id: string }) {
    switch (id) {
        case 'json': return <JsonFormatterTool />;
        case 'base64': return <Base64Tool />;
        case 'url': return <UrlEncoderTool />;
        case 'hash': return <HashTool />;
        case 'uuid': return <UuidTool />;
        case 'string-case': return <StringCaseTool />;
        case 'number-base': return <NumberBaseTool />;
        case 'timestamp': return <TimestampTool />;
        case 'yaml-json': return <YamlJsonTool />;
        case 'toml-json': return <TomlJsonTool />;
        case 'csv-json': return <CsvJsonTool />;
        case 'sql': return <SqlFormatterTool />;
        case 'html-entities': return <HtmlEntitiesTool />;
        case 'analyzer': return <TextAnalyzerTool />;
        case 'jwt': return <JwtTool />;
        case 'hmac': return <HmacTool />;
        case 'password': return <PasswordTool />;
        default: return <Text color="red">Tool not implemented yet</Text>;
    }
}

export function ToolScreen({ tool, onBack }: Props) {
    useInput((_inp, key) => {
        if (key.escape) onBack();
    });

    return (
        <Box flexDirection="column" paddingX={1}>
            {/* Header */}
            <Box gap={1} marginBottom={1}>
                <Text dimColor>DevTools TUI</Text>
                <Text dimColor>›</Text>
                <Text bold color="cyan">{tool.label}</Text>
                <Text dimColor>  — {tool.desc}</Text>
            </Box>

            {/* Tool content */}
            <ToolContent id={tool.id} />

            {/* Footer */}
            <Box marginTop={1} borderStyle="single" borderColor="gray" paddingX={1}>
                <Text dimColor>Esc go back to menu</Text>
            </Box>
        </Box>
    );
}
