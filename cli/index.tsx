#!/usr/bin/env node
import React from 'react';
import { render } from 'ink';
import { Command } from 'commander';
import { App } from './components/App.js';
import { formatJson, minifyJson } from './lib/logic/json.js';
import { encodeBase64, decodeBase64 } from './lib/logic/base64.js';
import { encodeUrl, decodeUrl } from './lib/logic/url.js';
import { hashText } from './lib/logic/hash.js';
import { convertCase } from './lib/logic/string-case.js';
import { convertBase } from './lib/logic/number-base.js';
import { fromUnix, fromIso, nowTimestamp } from './lib/logic/timestamp.js';
import { yamlToJson, jsonToYaml } from './lib/logic/yaml-json.js';
import { tomlToJson, jsonToToml } from './lib/logic/toml-json.js';
import { csvToJson, jsonToCsv } from './lib/logic/csv-json.js';
import { formatSql } from './lib/logic/sql.js';
import { encodeHtml, decodeHtml } from './lib/logic/html-entities.js';
import { analyzeText } from './lib/logic/text-analyzer.js';
import { decodeJwt } from './lib/logic/jwt.js';
import { v4 as uuidv4 } from 'uuid';

async function readStdin(): Promise<string> {
    if (process.stdin.isTTY) return '';
    const chunks: Buffer[] = [];
    for await (const chunk of process.stdin) chunks.push(chunk as Buffer);
    return Buffer.concat(chunks).toString('utf8').trim();
}

function output(result: unknown) {
    if (typeof result === 'string') process.stdout.write(result + '\n');
    else process.stdout.write(JSON.stringify(result, null, 2) + '\n');
}

const program = new Command();

program
    .name('devtools')
    .description('DevTools TUI — 50 developer utilities in your terminal')
    .version('1.6.0')
    .action(() => {
        // No subcommand → launch interactive TUI
        render(<App />);
    });

program
    .command('json-format [input]')
    .description('Format JSON (reads stdin if no input given)')
    .option('-m, --minify', 'Minify instead of format')
    .action(async (input: string | undefined, opts: { minify?: boolean }) => {
        const text = input ?? await readStdin();
        output(opts.minify ? minifyJson(text) : formatJson(text));
    });

program
    .command('base64 [input]')
    .description('Encode/decode Base64')
    .option('-d, --decode', 'Decode instead of encode')
    .action(async (input: string | undefined, opts: { decode?: boolean }) => {
        const text = input ?? await readStdin();
        output(opts.decode ? decodeBase64(text) : encodeBase64(text));
    });

program
    .command('url [input]')
    .description('URL encode/decode')
    .option('-d, --decode', 'Decode instead of encode')
    .action(async (input: string | undefined, opts: { decode?: boolean }) => {
        const text = input ?? await readStdin();
        output(opts.decode ? decodeUrl(text) : encodeUrl(text));
    });

program
    .command('hash [input]')
    .description('Generate hashes (MD5, SHA-1, SHA-256, SHA-512)')
    .option('-a, --algo <algo>', 'Output only one hash: md5, sha1, sha256, sha512')
    .action(async (input: string | undefined, opts: { algo?: string }) => {
        const text = input ?? await readStdin();
        const hashes = hashText(text);
        if (opts.algo) {
            const key = opts.algo.toLowerCase().replace('-', '') as keyof typeof hashes;
            output(hashes[key] ?? 'Unknown algorithm');
        } else {
            output(hashes);
        }
    });

program
    .command('string-case [input]')
    .description('Convert string to all cases')
    .option('-t, --to <case>', 'Output only one case: camel, pascal, snake, kebab, screaming, title, upper, lower, dot, path')
    .action(async (input: string | undefined, opts: { to?: string }) => {
        const text = input ?? await readStdin();
        const result = convertCase(text);
        if (opts.to) {
            const key = opts.to as keyof typeof result;
            output(result[key] ?? 'Unknown case');
        } else {
            output(result);
        }
    });

program
    .command('number-base <number>')
    .description('Convert number between bases')
    .option('-f, --from <base>', 'Source base: 2, 8, 10, 16', '10')
    .action((num: string, opts: { from: string }) => {
        const base = parseInt(opts.from) as 2 | 8 | 10 | 16;
        output(convertBase(num, base));
    });

program
    .command('timestamp [value]')
    .description('Convert timestamp (no arg = now)')
    .action(async (value: string | undefined) => {
        const text = value ?? await readStdin();
        if (!text) { output(nowTimestamp()); return; }
        const n = Number(text);
        output(isNaN(n) ? fromIso(text) : fromUnix(n));
    });

program
    .command('yaml-json [input]')
    .description('Convert YAML to JSON (or JSON to YAML with --reverse)')
    .option('-r, --reverse', 'Convert JSON → YAML instead')
    .action(async (input: string | undefined, opts: { reverse?: boolean }) => {
        const text = input ?? await readStdin();
        output(opts.reverse ? jsonToYaml(text) : yamlToJson(text));
    });

program
    .command('toml-json [input]')
    .description('Convert TOML to JSON (or JSON to TOML with --reverse)')
    .option('-r, --reverse', 'Convert JSON → TOML instead')
    .action(async (input: string | undefined, opts: { reverse?: boolean }) => {
        const text = input ?? await readStdin();
        output(opts.reverse ? jsonToToml(text) : tomlToJson(text));
    });

program
    .command('csv-json [input]')
    .description('Convert CSV to JSON (or JSON to CSV with --reverse)')
    .option('-r, --reverse', 'Convert JSON → CSV instead')
    .action(async (input: string | undefined, opts: { reverse?: boolean }) => {
        const text = input ?? await readStdin();
        output(opts.reverse ? jsonToCsv(text) : csvToJson(text));
    });

program
    .command('sql [input]')
    .description('Format SQL query')
    .option('-d, --dialect <dialect>', 'SQL dialect: sql, mysql, postgresql, sqlite, bigquery', 'sql')
    .action(async (input: string | undefined, opts: { dialect: string }) => {
        const text = input ?? await readStdin();
        output(formatSql(text, opts.dialect as 'sql'));
    });

program
    .command('html-entities [input]')
    .description('Encode/decode HTML entities')
    .option('-d, --decode', 'Decode instead of encode')
    .action(async (input: string | undefined, opts: { decode?: boolean }) => {
        const text = input ?? await readStdin();
        output(opts.decode ? decodeHtml(text) : encodeHtml(text));
    });

program
    .command('analyze [input]')
    .description('Analyze text statistics')
    .action(async (input: string | undefined) => {
        const text = input ?? await readStdin();
        output(analyzeText(text));
    });

program
    .command('jwt [token]')
    .description('Decode a JWT token')
    .action(async (token: string | undefined) => {
        const text = token ?? await readStdin();
        output(decodeJwt(text));
    });

program
    .command('uuid')
    .description('Generate UUIDs')
    .option('-n, --count <n>', 'Number of UUIDs to generate', '1')
    .action((opts: { count: string }) => {
        const n = Math.min(Math.max(parseInt(opts.count) || 1, 1), 100);
        const ids = Array.from({ length: n }, () => uuidv4());
        output(n === 1 ? ids[0] : ids.join('\n'));
    });

program.parse(process.argv);
