export interface CliTool {
    id: string;
    label: string;
    desc: string;
    category: string;
    available: boolean;
}

export const CLI_TOOLS: CliTool[] = [
    // General
    { id: 'json', label: 'JSON Formatter', desc: 'Format, minify, and query JSON', category: 'General', available: true },
    { id: 'xml', label: 'XML Formatter', desc: 'Format and minify XML', category: 'General', available: false },
    { id: 'string-case', label: 'String Case', desc: 'Convert between camelCase, snake_case, kebab-case…', category: 'General', available: true },

    // Encoding
    { id: 'base64', label: 'Base64', desc: 'Encode and decode Base64 strings', category: 'Encoding', available: true },
    { id: 'url', label: 'URL Encoder', desc: 'Encode and decode URL strings', category: 'Encoding', available: true },
    { id: 'timestamp', label: 'Timestamp', desc: 'Convert Unix timestamps to human-readable dates', category: 'Encoding', available: true },
    { id: 'number-base', label: 'Number Base', desc: 'Convert between Binary, Octal, Decimal, Hex', category: 'Encoding', available: true },

    // Security
    { id: 'jwt', label: 'JWT Debugger', desc: 'Decode and inspect JWT tokens', category: 'Security', available: true },
    { id: 'hash', label: 'Hash Generator', desc: 'Generate MD5, SHA-1, SHA-256, SHA-512 hashes', category: 'Security', available: true },
    { id: 'hmac', label: 'HMAC Generator', desc: 'Generate HMAC hashes', category: 'Security', available: true },
    { id: 'uuid', label: 'UUID Generator', desc: 'Generate UUIDs v4 in bulk', category: 'Security', available: true },
    { id: 'password', label: 'Password Generator', desc: 'Secure password generator with entropy stats', category: 'Security', available: true },
    { id: 'chmod', label: 'Chmod Calculator', desc: 'Unix file permission calculator', category: 'Security', available: false },
    { id: 'rsa', label: 'RSA Key Gen', desc: 'Generate RSA key pairs', category: 'Security', available: false },
    { id: 'cert', label: 'Cert Inspector', desc: 'Parse PEM certificates', category: 'Security', available: false },

    // Network & API
    { id: 'cidr', label: 'CIDR Calculator', desc: 'Calculate subnet details', category: 'Network', available: false },
    { id: 'curl', label: 'Curl to Code', desc: 'Convert curl to JS, Python, Go, PHP', category: 'Network', available: false },
    { id: 'html-entities', label: 'HTML Entities', desc: 'Encode and decode HTML entities', category: 'Network', available: true },
    { id: 'http-status', label: 'HTTP Status Codes', desc: 'HTTP status code reference', category: 'Network', available: false },

    // Data & Types
    { id: 'json-to-ts', label: 'JSON → TypeScript', desc: 'Generate TS interfaces from JSON', category: 'Data', available: false },
    { id: 'csv-json', label: 'CSV ↔ JSON', desc: 'Convert between CSV and JSON', category: 'Data', available: true },
    { id: 'yaml-json', label: 'YAML ↔ JSON', desc: 'Convert between YAML and JSON', category: 'Data', available: true },
    { id: 'toml-json', label: 'TOML ↔ JSON', desc: 'Convert between TOML and JSON', category: 'Data', available: true },
    { id: 'json-schema', label: 'Schema Validator', desc: 'Validate JSON against a schema', category: 'Data', available: false },

    // Web Dev
    { id: 'sql', label: 'SQL Formatter', desc: 'Format SQL queries', category: 'Web Dev', available: true },
    { id: 'wcag', label: 'Contrast Checker', desc: 'WCAG color contrast checker', category: 'Web Dev', available: false },
    { id: 'gradient', label: 'Gradient Gen', desc: 'CSS gradient generator (visual)', category: 'Web Dev', available: false },
    { id: 'color', label: 'Color Picker', desc: 'Color picker (visual)', category: 'Web Dev', available: false },
    { id: 'shadow', label: 'CSS Shadow', desc: 'Box shadow generator (visual)', category: 'Web Dev', available: false },
    { id: 'layout', label: 'Flex/Grid', desc: 'CSS layout playground (visual)', category: 'Web Dev', available: false },

    // Analysis
    { id: 'diff', label: 'Diff Viewer', desc: 'Compare two text blocks', category: 'Analysis', available: false },
    { id: 'regex', label: 'RegEx Tester', desc: 'Test regular expressions', category: 'Analysis', available: false },
    { id: 'analyzer', label: 'Text Analyzer', desc: 'Word count, reading time, frequency', category: 'Analysis', available: true },

    // Productivity
    { id: 'cron', label: 'Cron Builder', desc: 'Build and explain cron expressions', category: 'Productivity', available: false },
    { id: 'markdown', label: 'Markdown Live', desc: 'Markdown editor (visual)', category: 'Productivity', available: false },
    { id: 'changelog', label: 'Changelog Gen', desc: 'Generate changelogs', category: 'Productivity', available: false },
];

export const CATEGORIES = [...new Set(CLI_TOOLS.map(t => t.category))];

export function getToolById(id: string): CliTool | undefined {
    return CLI_TOOLS.find(t => t.id === id);
}
