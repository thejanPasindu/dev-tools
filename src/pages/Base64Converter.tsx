import { useState } from 'react';
import { Copy, Check, Trash2, ArrowLeftRight } from 'lucide-react';

export default function Base64Converter() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    const encode = () => {
        try {
            if (!input.trim()) return;
            // Use TextEncoder to handle Unicode properly
            const uint8Array = new TextEncoder().encode(input);
            const base64 = btoa(String.fromCharCode(...uint8Array));
            setOutput(base64);
            setError(null);
        } catch (e: any) {
            setError('Encoding failed: ' + e.message);
        }
    };

    const decode = () => {
        try {
            if (!input.trim()) return;
            const binString = atob(input);
            const uint8Array = Uint8Array.from(binString, (m) => m.codePointAt(0)!);
            const decoded = new TextDecoder().decode(uint8Array);
            setOutput(decoded);
            setError(null);
        } catch (e: any) {
            setError('Decoding failed: Invalid Base64 string');
        }
    };

    const copyToClipboard = async () => {
        if (!output) return;
        await navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const clear = () => {
        setInput('');
        setOutput('');
        setError(null);
    };

    const swap = () => {
        setInput(output);
        setOutput(input);
        setError(null);
    };

    return (
        <div className="h-full flex flex-col bg-background p-6 overflow-auto">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Base64 Converter</h2>
                <div className="flex items-center gap-2">
                    <button
                        onClick={clear}
                        className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                        title="Clear all"
                    >
                        <Trash2 size={20} />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr,auto,1fr] gap-4 items-center flex-1 min-h-0">
                <div className="flex flex-col h-full space-y-2">
                    <label className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Input</label>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Paste text or Base64 here..."
                        className="flex-1 w-full p-4 rounded-lg border bg-card resize-none font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary min-h-[200px]"
                    />
                </div>

                <div className="flex lg:flex-col gap-2 justify-center py-4 lg:py-0">
                    <button
                        onClick={encode}
                        className="px-6 py-2 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors shadow-sm"
                    >
                        Encode
                    </button>
                    <button
                        onClick={swap}
                        className="p-2 rounded-full border hover:bg-secondary transition-colors"
                        title="Swap input and output"
                    >
                        <ArrowLeftRight size={20} />
                    </button>
                    <button
                        onClick={decode}
                        className="px-6 py-2 bg-secondary text-secondary-foreground rounded-md font-medium hover:bg-secondary/80 transition-colors border"
                    >
                        Decode
                    </button>
                </div>

                <div className="flex flex-col h-full space-y-2">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Output</label>
                        <button
                            onClick={copyToClipboard}
                            className="p-1 px-2 text-xs flex items-center gap-1.5 rounded bg-secondary hover:bg-secondary/80 transition-colors"
                            disabled={!output}
                        >
                            {copied ? <Check size={12} /> : <Copy size={12} />}
                            {copied ? 'Copied' : 'Copy'}
                        </button>
                    </div>
                    <div className="relative flex-1">
                        <textarea
                            readOnly
                            value={output}
                            placeholder="Result will appear here..."
                            className="w-full h-full p-4 rounded-lg border bg-secondary/30 resize-none font-mono text-sm focus:outline-none min-h-[200px]"
                        />
                        {error && (
                            <div className="absolute inset-0 bg-destructive/10 backdrop-blur-[1px] rounded-lg flex items-center justify-center p-4 text-center">
                                <p className="text-destructive font-semibold">{error}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
