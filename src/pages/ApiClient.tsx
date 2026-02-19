import { useState, useCallback } from 'react';
import { Play, Send, Plus, Trash2, Clock, Binary, FileJson } from 'lucide-react';
import { ToolLayout } from '../components/layout/ToolLayout';
import { usePersistentState } from '../hooks/usePersistentState';
import Editor from '@monaco-editor/react';
import { cn } from '../lib/utils';

interface Header {
    id: string;
    key: string;
    value: string;
    enabled: boolean;
}

export default function ApiClient() {
    const [url, setUrl] = usePersistentState<string>('api_url', 'https://jsonplaceholder.typicode.com/todos/1');
    const [method, setMethod] = usePersistentState<string>('api_method', 'GET');
    const [headers, setHeaders] = usePersistentState<Header[]>('api_headers', [
        { id: '1', key: 'Content-Type', value: 'application/json', enabled: true }
    ]);
    const [body, setBody] = usePersistentState<string>('api_body', '');
    const [response, setResponse] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [stats, setStats] = useState<{ status: number; time: number; size: string } | null>(null);

    const addHeader = () => {
        setHeaders([...headers, { id: Math.random().toString(36).substr(2, 9), key: '', value: '', enabled: true }]);
    };

    const removeHeader = (id: string) => {
        setHeaders(headers.filter(h => h.id !== id));
    };

    const updateHeader = (id: string, updates: Partial<Header>) => {
        setHeaders(headers.map(h => h.id === id ? { ...h, ...updates } : h));
    };

    const sendRequest = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        setResponse(null);
        setStats(null);

        const startTime = performance.now();

        try {
            const requestHeaders: Record<string, string> = {};
            headers.forEach(h => {
                if (h.enabled && h.key) requestHeaders[h.key] = h.value;
            });

            const options: RequestInit = {
                method,
                headers: requestHeaders,
            };

            if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(method) && body) {
                options.body = body;
            }

            const res = await fetch(url, options);
            const data = await res.text();
            const endTime = performance.now();

            setStats({
                status: res.status,
                time: Math.round(endTime - startTime),
                size: (new Blob([data]).size / 1024).toFixed(2) + ' KB'
            });

            try {
                setResponse(JSON.parse(data));
            } catch {
                setResponse(data);
            }
        } catch (e: any) {
            setError(e.message);
        } finally {
            setIsLoading(false);
        }
    }, [url, method, headers, body]);

    return (
        <ToolLayout
            title="API Client"
            onClear={() => {
                setResponse(null);
                setError(null);
                setStats(null);
            }}
            error={error}
            actions={
                <button
                    onClick={sendRequest}
                    disabled={isLoading || !url}
                    className="flex items-center gap-2 px-4 py-1.5 text-xs font-bold bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-all shadow-lg shadow-primary/20"
                >
                    {isLoading ? <Clock className="animate-spin" size={14} /> : <Send size={14} />}
                    {isLoading ? 'Sending...' : 'Send Request'}
                </button>
            }
        >
            <div className="h-full flex flex-col">
                <div className="p-4 border-b bg-card space-y-4">
                    <div className="flex gap-2">
                        <select
                            value={method}
                            onChange={(e) => setMethod(e.target.value)}
                            className="bg-secondary border-none rounded-lg px-3 py-2 text-sm font-bold focus:ring-2 ring-primary/20 outline-none"
                        >
                            {['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'].map(m => (
                                <option key={m} value={m}>{m}</option>
                            ))}
                        </select>
                        <input
                            type="text"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="https://api.example.com/v1/resource"
                            className="flex-1 bg-secondary border-none rounded-lg px-4 py-2 text-sm focus:ring-2 ring-primary/20 outline-none"
                        />
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Headers</h3>
                            <button onClick={addHeader} className="p-1 hover:bg-secondary rounded text-primary transition-colors">
                                <Plus size={16} />
                            </button>
                        </div>
                        <div className="space-y-2">
                            {headers.map((header) => (
                                <div key={header.id} className="flex gap-2 items-center">
                                    <input
                                        type="checkbox"
                                        checked={header.enabled}
                                        onChange={(e) => updateHeader(header.id, { enabled: e.target.checked })}
                                        className="rounded border-secondary bg-secondary text-primary focus:ring-0"
                                    />
                                    <input
                                        type="text"
                                        value={header.key}
                                        onChange={(e) => updateHeader(header.id, { key: e.target.value })}
                                        placeholder="Key"
                                        className="flex-1 bg-secondary border-none rounded-lg px-3 py-1.5 text-xs outline-none"
                                    />
                                    <input
                                        type="text"
                                        value={header.value}
                                        onChange={(e) => updateHeader(header.id, { value: e.target.value })}
                                        placeholder="Value"
                                        className="flex-1 bg-secondary border-none rounded-lg px-3 py-1.5 text-xs outline-none"
                                    />
                                    <button onClick={() => removeHeader(header.id)} className="p-1.5 text-muted-foreground hover:text-destructive transition-colors">
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {['POST', 'PUT', 'PATCH', 'DELETE'].includes(method) && (
                        <div className="space-y-2">
                            <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Request Body</h3>
                            <div className="h-40 rounded-lg overflow-hidden border">
                                <Editor
                                    height="100%"
                                    defaultLanguage="json"
                                    value={body}
                                    onChange={(value) => setBody(value || '')}
                                    theme="vs-dark"
                                    options={{
                                        minimap: { enabled: false },
                                        fontSize: 12,
                                        lineNumbers: 'off',
                                        scrollBeyondLastLine: false,
                                        automaticLayout: true,
                                    }}
                                />
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex-1 bg-background relative overflow-hidden flex flex-col">
                    <div className="flex items-center justify-between p-3 border-b bg-card/50">
                        <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Response</h3>
                        {stats && (
                            <div className="flex gap-4 text-[10px] font-mono">
                                <span className={cn(
                                    "px-2 py-0.5 rounded",
                                    stats.status >= 200 && stats.status < 300 ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
                                )}>
                                    STATUS: {stats.status}
                                </span>
                                <span className="text-muted-foreground">TIME: {stats.time}ms</span>
                                <span className="text-muted-foreground">SIZE: {stats.size}</span>
                            </div>
                        )}
                    </div>
                    <div className="flex-1">
                        <Editor
                            height="100%"
                            defaultLanguage="json"
                            value={response ? (typeof response === 'string' ? response : JSON.stringify(response, null, 2)) : ''}
                            theme="vs-dark"
                            options={{
                                readOnly: true,
                                minimap: { enabled: false },
                                fontSize: 13,
                                lineNumbers: 'on',
                                automaticLayout: true,
                                wordWrap: 'on'
                            }}
                        />
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
}
