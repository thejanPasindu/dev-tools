import React, { useState } from 'react';
import { Box } from 'ink';
import { HomeScreen } from './HomeScreen.js';
import { ToolScreen } from './ToolScreen.js';
import { CliTool } from '../lib/tools.js';

export function App() {
    const [activeTool, setActiveTool] = useState<CliTool | null>(null);

    if (activeTool) {
        return (
            <Box>
                <ToolScreen tool={activeTool} onBack={() => setActiveTool(null)} />
            </Box>
        );
    }

    return (
        <Box>
            <HomeScreen onSelect={setActiveTool} />
        </Box>
    );
}
