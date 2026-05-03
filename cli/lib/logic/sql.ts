import { format } from 'sql-formatter';

export type SqlDialect = 'sql' | 'mysql' | 'postgresql' | 'sqlite' | 'bigquery';

export function formatSql(input: string, dialect: SqlDialect = 'sql'): string {
    return format(input, { language: dialect, tabWidth: 2, keywordCase: 'upper' });
}
