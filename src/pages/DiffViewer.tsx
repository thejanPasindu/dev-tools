import { useState } from 'react';
import { DiffEditor } from '@monaco-editor/react';
import {
    Columns,
    Trash2,
    Copy,
    Check,
    Split
} from 'lucide-react';

export default function DiffViewer() {
    const [original, setOriginal] = useState('');
    const [modified, setModified] = useState('');
    const [copied, setCopied] = useState(false);

    const clear = () => {
        setOriginal('');
        setModified('');
    };

    const copyModified = async () => {
        if (!modified) return;
        await navigator.clipboard.writeText(modified);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="h-full flex flex-col bg-background overflow-hidden">
            {/* Toolbar */}
            <div className="flex items-center justify-between p-4 border-b bg-card">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Columns className="text-primary" size={20} />
                        <h2 className="font-bold text-lg hidden sm:block">Diff Viewer</h2>
                    </div>
                    <div className="text-xs text-muted-foreground bg-secondary/50 px-3 py-1 rounded-full flex items-center gap-2">
                        <Split size={14} /> Side-by-Side Comparison
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={copyModified}
                        className="flex items-center gap-2 px-4 py-1.5 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors shadow-sm text-sm"
                        disabled={!modified}
                    >
                        {copied ? <Check size={16} /> : <Copy size={16} />}
                        {copied ? 'Copied' : 'Copy Modified'}
                    </button>

                    <div className="h-6 w-px bg-border mx-1" />

                    <button
                        onClick={clear}
                        className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                        title="Clear all"
                    >
                        <Trash2 size={20} />
                    </button>
                </div>
            </div>

            {/* Editor Labels */}
            <div className="grid grid-cols-2 bg-secondary/10 border-b text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                <div className="p-2 px-4 border-r">Original</div>
                <div className="p-2 px-4">Modified</div>
            </div>

            {/* Diff Editor */}
            <div className="flex-1 min-h-0 relative">
                <DiffEditor
                    height="100%"
                    original={original}
                    modified={modified}
                    onMount={(editor) => {
                        const originalEditor = editor.getOriginalEditor();
                        const modifiedEditor = editor.getModifiedEditor();

                        originalEditor.onDidChangeModelContent(() => {
                            setOriginal(originalEditor.getValue());
                        });

                        modifiedEditor.onDidChangeModelContent(() => {
                            setModified(modifiedEditor.getValue());
                        });
                    }}
                    theme="vs-dark"
                    options={{
                        renderSideBySide: true,
                        minimap: { enabled: false },
                        fontSize: 14,
                        scrollBeyondLastLine: false,
                        automaticLayout: true,
                        wordWrap: 'on',
                        originalEditable: true,
                    }}
                />
            </div>
        </div>
    );
}
