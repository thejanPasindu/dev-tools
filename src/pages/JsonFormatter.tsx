import { useRef, useState } from 'react';
import Editor, { OnMount } from '@monaco-editor/react';
import { Braces, Minimize2, Copy, Check, Trash2 } from 'lucide-react';
// Removed unused 'cn' import

export default function JsonFormatter() {
    const [editorValue, setEditorValue] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);
    const editorRef = useRef<any>(null);

    const handleEditorDidMount: OnMount = (editor) => {
        editorRef.current = editor;
    };

    const formatJson = () => {
        try {
            if (!editorValue.trim()) return;
            const parsed = JSON.parse(editorValue);
            const formatted = JSON.stringify(parsed, null, 2);
            setEditorValue(formatted);
            setError(null);
        } catch (e: any) {
            setError(e.message);
        }
    };

    const minifyJson = () => {
        try {
            if (!editorValue.trim()) return;
            const parsed = JSON.parse(editorValue);
            const minified = JSON.stringify(parsed);
            setEditorValue(minified);
            setError(null);
        } catch (e: any) {
            setError(e.message);
        }
    };

    const copyToClipboard = async () => {
        await navigator.clipboard.writeText(editorValue);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const clearEditor = () => {
        setEditorValue('');
        setError(null);
    };

    return (
        <div className="h-full flex flex-col relative w-full overflow-hidden">
            {/* Toolbar - Floating or Top Fixed */}
            <div className="flex items-center justify-between p-2 border-b bg-background z-10">
                <div className="flex items-center gap-2">
                    <h2 className="text-sm font-semibold px-2">JSON Formatter</h2>
                </div>
                <div className="flex items-center gap-2">
                    {error && (
                        <span className="text-destructive text-xs mr-4 font-mono truncate max-w-[300px]" title={error}>
                            Error: {error}
                        </span>
                    )}

                    <button
                        onClick={formatJson}
                        className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
                    >
                        <Braces size={14} /> Format
                    </button>
                    <button
                        onClick={minifyJson}
                        className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-secondary text-secondary-foreground rounded hover:bg-secondary/80 transition-colors"
                    >
                        <Minimize2 size={14} /> Minify
                    </button>
                    <div className="w-px h-4 bg-border mx-1" />
                    <button
                        onClick={copyToClipboard}
                        className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                        title="Copy"
                    >
                        {copied ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                    <button
                        onClick={clearEditor}
                        className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-destructive transition-colors"
                        title="Clear"
                    >
                        <Trash2 size={14} />
                    </button>
                </div>
            </div>

            {/* Editor Area */}
            <div className="flex-1 w-full relative group">
                <Editor
                    height="100%"
                    defaultLanguage="json"
                    value={editorValue}
                    onChange={(value) => {
                        setEditorValue(value || '');
                        if (error) setError(null); // Clear error on edit
                    }}
                    onMount={handleEditorDidMount}
                    theme="vs-dark" // We can toggle this dynamically if we want perfect theme match
                    options={{
                        minimap: { enabled: false },
                        fontSize: 14,
                        lineNumbers: 'on',
                        scrollBeyondLastLine: false,
                        automaticLayout: true,
                        tabSize: 2,
                        formatOnPaste: true,
                        wordWrap: 'on'
                    }}
                />
            </div>
        </div>
    );
}
