import { useState, useEffect } from 'react';
import { ShieldCheck, AlertCircle, Copy, Check, Trash2 } from 'lucide-react';

export default function JwtDebugger() {
    const [token, setToken] = useState('');
    const [header, setHeader] = useState<any>(null);
    const [payload, setPayload] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    const decodeJwt = (jwt: string) => {
        if (!jwt.trim()) {
            setHeader(null);
            setPayload(null);
            setError(null);
            return;
        }

        try {
            const parts = jwt.split('.');
            if (parts.length !== 3) {
                throw new Error('Invalid JWT format: A JWT must have 3 parts separated by dots.');
            }

            const decodePart = (part: string) => {
                try {
                    const base64 = part.replace(/-/g, '+').replace(/_/g, '/');
                    const jsonPayload = decodeURIComponent(
                        atob(base64)
                            .split('')
                            .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                            .join('')
                    );
                    return JSON.parse(jsonPayload);
                } catch (e) {
                    throw new Error('Failed to decode part: base64/JSON error');
                }
            };

            setHeader(decodePart(parts[0]));
            setPayload(decodePart(parts[1]));
            setError(null);
        } catch (e: any) {
            setHeader(null);
            setPayload(null);
            setError(e.message);
        }
    };

    useEffect(() => {
        decodeJwt(token);
    }, [token]);

    const copyToClipboard = async (text: string) => {
        if (!text) return;
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const clear = () => {
        setToken('');
        setError(null);
    };

    return (
        <div className="h-full flex flex-col bg-background p-6 overflow-auto">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    <ShieldCheck className="text-primary" /> JWT Debugger
                </h2>
                <button
                    onClick={clear}
                    className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                    title="Clear all"
                >
                    <Trash2 size={20} />
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-0">
                {/* Left Column: Encoded Token */}
                <div className="flex flex-col space-y-2 h-full">
                    <label className="text-sm font-medium text-muted-foreground uppercase tracking-wider flex justify-between">
                        Encoded
                        <span className="text-[10px] lowercase text-muted-foreground/60">Paste your token here</span>
                    </label>
                    <textarea
                        value={token}
                        onChange={(e) => setToken(e.target.value)}
                        placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                        className="flex-1 w-full p-4 rounded-lg border bg-card resize-none font-mono text-xs focus:outline-none focus:ring-2 focus:ring-primary break-all min-h-[300px]"
                    />
                    {error && (
                        <div className="flex items-center gap-2 p-3 rounded-md bg-destructive/10 text-destructive text-sm border border-destructive/20 mt-2">
                            <AlertCircle size={16} />
                            <span>{error}</span>
                        </div>
                    )}
                </div>

                {/* Right Column: Decoded Sections */}
                <div className="flex flex-col space-y-6 h-full overflow-hidden">
                    {/* Header */}
                    <div className="flex flex-col space-y-2">
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Header</label>
                            <button
                                onClick={() => copyToClipboard(JSON.stringify(header, null, 2))}
                                className="p-1 px-2 text-[10px] flex items-center gap-1.5 rounded bg-secondary hover:bg-secondary/80 transition-colors"
                                disabled={!header}
                            >
                                {copied ? <Check size={10} /> : <Copy size={10} />}
                                {copied ? 'Copied' : 'Copy'}
                            </button>
                        </div>
                        <pre className="p-4 rounded-lg border bg-secondary/20 font-mono text-xs overflow-auto max-h-[200px] min-h-[100px]">
                            {header ? JSON.stringify(header, null, 2) : <span className="text-muted-foreground/50">Header will appear here...</span>}
                        </pre>
                    </div>

                    {/* Payload */}
                    <div className="flex flex-col space-y-2 flex-1 min-h-0">
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Payload</label>
                            <button
                                onClick={() => copyToClipboard(JSON.stringify(payload, null, 2))}
                                className="p-1 px-2 text-[10px] flex items-center gap-1.5 rounded bg-secondary hover:bg-secondary/80 transition-colors"
                                disabled={!payload}
                            >
                                {copied ? <Check size={10} /> : <Copy size={10} />}
                                {copied ? 'Copied' : 'Copy'}
                            </button>
                        </div>
                        <pre className="flex-1 p-4 rounded-lg border bg-secondary/20 font-mono text-xs overflow-auto min-h-[200px]">
                            {payload ? JSON.stringify(payload, null, 2) : <span className="text-muted-foreground/50">Payload will appear here...</span>}
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    );
}
