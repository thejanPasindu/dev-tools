import { parse as parseTOML, stringify as stringifyTOML } from 'smol-toml';

export function tomlToJson(input: string): string {
    const parsed = parseTOML(input.trim());
    return JSON.stringify(parsed, null, 2);
}

export function jsonToToml(input: string): string {
    const parsed = JSON.parse(input.trim()) as Record<string, unknown>;
    return stringifyTOML(parsed);
}
