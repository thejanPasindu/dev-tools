import { useRef, useState } from 'react';
import Editor, { OnMount } from '@monaco-editor/react';
import { Braces, Minimize2 } from 'lucide-react';
import { ToolLayout } from '../components/layout/ToolLayout';
import { usePersistentState } from '../hooks/usePersistentState';

export default function JsonFormatter() {
    const [editorValue, setEditorValue] = usePersistentState<string>('json_value', '');
    const [error, setError] = useState<string | null>(null);
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

    return (
        <ToolLayout
            title="JSON Formatter"
            onCopy={() => navigator.clipboard.writeText(editorValue)}
            onClear={() => {
                setEditorValue('');
                setError(null);
            }}
            error={error}
            actions={
                <div className="flex gap-2">
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
                </div>
            }
        >
            <div className="h-full w-full relative group">
                <Editor
                    height="100%"
                    defaultLanguage="json"
                    value={editorValue}
                    onChange={(value) => {
                        setEditorValue(value || '');
                        if (error) setError(null);
                    }}
                    onMount={handleEditorDidMount}
                    theme="vs-dark"
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
        </ToolLayout>
    );
}
