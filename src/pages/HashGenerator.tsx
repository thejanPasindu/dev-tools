import { useState, useEffect } from 'react';
import CryptoJS from 'crypto-js';
import { KeyRound, Copy, Check, Trash2 } from 'lucide-react';

export default function HashGenerator() {
    const [input, setInput] = useState('');
    const [hashes, setHashes] = useState({
        md5: '',
        sha1: '',
        sha256: '',
        sha512: ''
    });
    const [copiedKey, setCopiedKey] = useState<string | null>(null);

    useEffect(() => {
        if (!input) {
            setHashes({ md5: '', sha1: '', sha256: '', sha512: '' });
            return;
        }

        setHashes({
            md5: CryptoJS.MD5(input).toString(),
            sha1: CryptoJS.SHA1(input).toString(),
            sha256: CryptoJS.SHA256(input).toString(),
            sha512: CryptoJS.SHA512(input).toString()
        });
    }, [input]);

    const copyToClipboard = async (text: string, key: string) => {
        if (!text) return;
        await navigator.clipboard.writeText(text);
        setCopiedKey(key);
        setTimeout(() => setCopiedKey(null), 2000);
    };

    const clear = () => setInput('');

    const hashItems = [
        { label: 'MD5', value: hashes.md5, key: 'md5' },
        { label: 'SHA-1', value: hashes.sha1, key: 'sha1' },
        { label: 'SHA-256', value: hashes.sha256, key: 'sha256' },
        { label: 'SHA-512', value: hashes.sha512, key: 'sha512' }
    ];

    return (
        <div className="h-full flex flex-col bg-background p-6 overflow-auto">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    <KeyRound className="text-primary" /> Hash Generator
                </h2>
                <button
                    onClick={clear}
                    className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                    title="Clear all"
                >
                    <Trash2 size={20} />
                </button>
            </div>

            <div className="space-y-8 flex-1">
                {/* Input Area */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Input Text</label>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type or paste text to hash..."
                        className="w-full p-4 rounded-lg border bg-card resize-none font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary min-h-[120px]"
                    />
                </div>

                {/* Results Area */}
                <div className="grid grid-cols-1 gap-4">
                    {hashItems.map((item) => (
                        <div key={item.key} className="space-y-1.5">
                            <div className="flex items-center justify-between px-1">
                                <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{item.label}</label>
                                <button
                                    onClick={() => copyToClipboard(item.value, item.key)}
                                    className="text-[10px] text-primary hover:underline flex items-center gap-1.5 disabled:opacity-30"
                                    disabled={!item.value}
                                >
                                    {copiedKey === item.key ? <Check size={12} /> : <Copy size={12} />}
                                    {copiedKey === item.key ? 'Copied' : 'Copy'}
                                </button>
                            </div>
                            <div className="p-3 rounded-lg border bg-secondary/20 font-mono text-xs break-all min-h-[40px] flex items-center">
                                {item.value || <span className="text-muted-foreground/30 italic text-[10px]">No input provided</span>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
