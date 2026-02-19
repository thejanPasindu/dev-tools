import React, { useState } from 'react';
import { Copy, Check, Trash2, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ToolLayoutProps {
    title: string;
    children: React.ReactNode;
    onCopy?: () => void;
    onClear?: () => void;
    actions?: React.ReactNode;
    error?: string | null;
}

export function ToolLayout({ title, children, onCopy, onClear, actions, error }: ToolLayoutProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        if (onCopy) {
            onCopy();
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="h-full flex flex-col relative w-full overflow-hidden">
            {/* Toolbar */}
            <div className="flex items-center justify-between p-2 border-b bg-background z-10 shrink-0">
                <div className="flex items-center gap-2">
                    <Link to="/" className="p-1.5 hover:bg-secondary rounded-lg transition-colors text-muted-foreground mr-1">
                        <ChevronLeft size={16} />
                    </Link>
                    <h2 className="text-sm font-semibold px-2">{title}</h2>
                </div>
                <div className="flex items-center gap-2">
                    {error && (
                        <span className="text-destructive text-xs mr-4 font-mono truncate max-w-[300px]" title={error}>
                            Error: {error}
                        </span>
                    )}

                    {actions}

                    {(onCopy || onClear) && <div className="w-px h-4 bg-border mx-1" />}

                    {onCopy && (
                        <button
                            onClick={handleCopy}
                            className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                            title="Copy to Clipboard"
                        >
                            {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                        </button>
                    )}
                    {onClear && (
                        <button
                            onClick={onClear}
                            className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-destructive transition-colors"
                            title="Clear Input"
                        >
                            <Trash2 size={14} />
                        </button>
                    )}
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 w-full relative overflow-auto">
                {children}
            </div>
        </div>
    );
}
