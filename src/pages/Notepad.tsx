import Editor from '@monaco-editor/react';
import { Download, Trash2, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { useLocalStorage } from '../hooks/use-local-storage';

export default function Notepad() {
    const [content, setContent] = useLocalStorage<string>('notepad-content', '');
    const [copied, setCopied] = useState(false);

    const handleDownload = () => {
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'notepad.txt';
        a.click();
        URL.revokeObjectURL(url);
    };

    const copyToClipboard = async () => {
        await navigator.clipboard.writeText(content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const clearContent = () => {
        if (confirm('Are you sure you want to clear the notepad?')) {
            setContent('');
        }
    };

    return (
        <div className="h-full flex flex-col relative w-full overflow-hidden">
            {/* Toolbar */}
            <div className="flex items-center justify-between p-2 border-b bg-background z-10">
                <h2 className="text-sm font-semibold px-2">Notepad</h2>
                <div className="flex items-center gap-2">
                    <button
                        onClick={handleDownload}
                        className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                        title="Download as .txt"
                    >
                        <Download size={14} /> Download
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
                        onClick={clearContent}
                        className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-destructive transition-colors"
                        title="Clear"
                    >
                        <Trash2 size={14} />
                    </button>
                </div>
            </div>

            <div className="flex-1 w-full relative">
                <Editor
                    height="100%"
                    defaultLanguage="markdown" // Markdown supports basic text but with better viewing
                    value={content}
                    onChange={(val) => setContent(val || '')}
                    theme="vs-dark"
                    options={{
                        minimap: { enabled: false },
                        fontSize: 16,
                        lineNumbers: 'on',
                        wordWrap: 'on',
                        scrollBeyondLastLine: false,
                        automaticLayout: true,
                        padding: { top: 16, bottom: 16 },
                    }}
                />
            </div>
        </div>
    );
}
