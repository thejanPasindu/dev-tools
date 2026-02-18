import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Fingerprint, Copy, Check, Hash, RefreshCcw, LayoutList } from 'lucide-react';
import { cn } from '../lib/utils';

export default function UuidGenerator() {
    const [uuids, setUuids] = useState<string[]>([]);
    const [count, setCount] = useState(1);
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
    const [allCopied, setAllCopied] = useState(false);

    const generateUuids = () => {
        const newUuids = Array.from({ length: Math.min(Math.max(count, 1), 100) }, () => uuidv4());
        setUuids(newUuids);
    };

    const copyToClipboard = async (text: string, index: number | 'all') => {
        await navigator.clipboard.writeText(text);
        if (index === 'all') {
            setAllCopied(true);
            setTimeout(() => setAllCopied(false), 2000);
        } else {
            setCopiedIndex(index);
            setTimeout(() => setCopiedIndex(null), 2000);
        }
    };

    return (
        <div className="h-full flex flex-col bg-background p-6 overflow-auto">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Fingerprint className="text-primary" /> UUID Generator
                </h2>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 border rounded-md px-3 py-1 bg-card">
                        <LayoutList size={16} className="text-muted-foreground" />
                        <input
                            type="number"
                            min="1"
                            max="100"
                            value={count}
                            onChange={(e) => setCount(parseInt(e.target.value) || 1)}
                            className="w-12 bg-transparent focus:outline-none text-sm font-medium"
                        />
                    </div>
                    <button
                        onClick={generateUuids}
                        className="flex items-center gap-2 px-6 py-1.5 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors shadow-sm text-sm"
                    >
                        <RefreshCcw size={16} /> Generate
                    </button>
                </div>
            </div>

            <div className="flex-1 min-h-0 flex flex-col space-y-4">
                {uuids.length > 0 ? (
                    <>
                        <div className="flex items-center justify-between px-2">
                            <p className="text-sm font-medium text-muted-foreground">{uuids.length} UUID v4 Generated</p>
                            <button
                                onClick={() => copyToClipboard(uuids.join('\n'), 'all')}
                                className="text-xs text-primary hover:underline flex items-center gap-1.5"
                            >
                                {allCopied ? <Check size={12} /> : <Copy size={12} />}
                                {allCopied ? 'All Copied' : 'Copy All'}
                            </button>
                        </div>
                        <div className="flex-1 overflow-auto rounded-xl border bg-card/50">
                            <div className="flex flex-col">
                                {uuids.map((uuid, idx) => (
                                    <div
                                        key={uuid}
                                        className={cn(
                                            "flex items-center justify-between p-4 border-b last:border-0 hover:bg-secondary/40 transition-colors group",
                                            idx % 2 === 0 ? "bg-secondary/10" : "bg-card"
                                        )}
                                    >
                                        <span className="font-mono text-sm tracking-tight">{uuid}</span>
                                        <button
                                            onClick={() => copyToClipboard(uuid, idx)}
                                            className="p-1.5 rounded-md opacity-0 group-hover:opacity-100 hover:bg-secondary transition-all text-muted-foreground hover:text-foreground"
                                        >
                                            {copiedIndex === idx ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed rounded-xl border-muted text-muted-foreground space-y-4">
                        <div className="p-6 bg-secondary/50 rounded-full">
                            <Hash size={48} className="opacity-20" />
                        </div>
                        <div className="text-center">
                            <h3 className="font-medium text-lg">No UUIDs Generated</h3>
                            <p className="text-sm">Adjust the count and click generate to start.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
