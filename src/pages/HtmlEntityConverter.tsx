import { useState } from 'react';
import {
    Code,
    Copy,
    Check,
    Trash2,
    ArrowLeftRight,
    Hash
} from 'lucide-react';

export default function HtmlEntityConverter() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [isEncoding, setIsEncoding] = useState(true);
    const [copied, setCopied] = useState(false);

    const encode = (str: string) => {
        return str.replace(/[\u00A0-\u9999<>&]/g, (i) => {
            return '&#' + i.charCodeAt(0) + ';';
        });
    };

    const decode = (str: string) => {
        const txt = document.createElement('textarea');
        txt.innerHTML = str;
        return txt.value;
    };

    const swap = () => {
        setIsEncoding(!isEncoding);
        setInput(output);
        setOutput(input);
    };

    const copy = async () => {
        await navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const clear = () => {
        setInput('');
        setOutput('');
    };

    return (
        <div className="h-full flex flex-col bg-background p-6 overflow-auto">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Code className="text-primary" /> HTML Entity Converter
                </h2>
                <div className="flex items-center gap-2">
                    <button
                        onClick={swap}
                        className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-lg text-sm font-medium hover:bg-secondary/80 transition-colors"
                    >
                        <ArrowLeftRight size={16} />
                        {isEncoding ? 'Switch to Decode' : 'Switch to Encode'}
                    </button>
                    <button
                        onClick={clear}
                        className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                    >
                        <Trash2 size={20} />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto w-full flex-1">
                <div className="space-y-2 flex flex-col">
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest px-1">
                        {isEncoding ? 'Text to Encode' : 'Entities to Decode'}
                    </label>
                    <textarea
                        value={input}
                        onChange={(e) => {
                            const val = e.target.value;
                            setInput(val);
                            if (isEncoding) setOutput(encode(val));
                            else setOutput(decode(val));
                        }}
                        placeholder={isEncoding ? "Enter text like <script>..." : "Enter entities like &#60;script&#62;..."}
                        className="flex-1 w-full p-4 rounded-xl border bg-card font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary min-h-[300px] resize-none shadow-inner"
                    />
                </div>

                <div className="space-y-2 flex flex-col">
                    <div className="flex items-center justify-between px-1">
                        <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                            {isEncoding ? 'Encoded Entities' : 'Decoded Text'}
                        </label>
                        <button
                            onClick={copy}
                            className="text-xs text-primary hover:underline flex items-center gap-1.5"
                        >
                            {copied ? <Check size={14} /> : <Copy size={14} />}
                            {copied ? 'Copied' : 'Copy'}
                        </button>
                    </div>
                    <div className="flex-1 relative">
                        <textarea
                            readOnly
                            value={output}
                            className="w-full h-full p-4 rounded-xl border bg-secondary/10 font-mono text-sm focus:outline-none min-h-[300px] resize-none"
                        />
                        {!output && (
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-muted-foreground/30 italic">
                                Result will appear here...
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="mt-8 p-4 bg-primary/5 rounded-xl border border-primary/10 flex items-start gap-3">
                <Hash className="text-primary shrink-0 mt-0.5" size={18} />
                <div>
                    <h4 className="text-sm font-bold text-primary italic">Note on Conversion</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                        This tool converts special characters to their numeric HTML entities (encoding) or parses entities back into readable text (decoding).
                        Useful for escaping characters in source code or debugging web responses.
                    </p>
                </div>
            </div>
        </div>
    );
}
