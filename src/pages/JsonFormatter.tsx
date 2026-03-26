import { useRef, useState, useCallback } from 'react';
import Editor, { OnMount } from '@monaco-editor/react';
import { Braces, Minimize2, Plus, X } from 'lucide-react';
import { ToolLayout } from '../components/layout/ToolLayout';
import { usePersistentState } from '../hooks/usePersistentState';

interface JsonTab {
    id: string;
    name: string;
    content: string;
}

function generateId() {
    return Math.random().toString(36).slice(2, 9);
}

function createTab(index: number): JsonTab {
    return { id: generateId(), name: `Tab ${index}`, content: '' };
}

export default function JsonFormatter() {
    const [tabs, setTabs] = usePersistentState<JsonTab[]>('json_tabs', [createTab(1)]);
    const [activeTabId, setActiveTabId] = usePersistentState<string>('json_active_tab', '');
    const [error, setError] = useState<string | null>(null);
    const [editingTabId, setEditingTabId] = useState<string | null>(null);
    const [editingName, setEditingName] = useState('');
    const editorRef = useRef<any>(null);

    // Ensure there's always at least one tab
    const safeTabs = tabs.length > 0 ? tabs : [createTab(1)];
    const activeTab = safeTabs.find(t => t.id === activeTabId) ?? safeTabs[0];

    const handleEditorDidMount: OnMount = (editor) => {
        editorRef.current = editor;
    };

    const updateActiveContent = useCallback((content: string) => {
        setTabs(safeTabs.map(t => t.id === activeTab.id ? { ...t, content } : t));
    }, [safeTabs, activeTab.id]);

    const formatJson = () => {
        try {
            if (!activeTab.content.trim()) return;
            const parsed = JSON.parse(activeTab.content);
            const formatted = JSON.stringify(parsed, null, 2);
            updateActiveContent(formatted);
            setError(null);
        } catch (e: any) {
            setError(e.message);
        }
    };

    const minifyJson = () => {
        try {
            if (!activeTab.content.trim()) return;
            const parsed = JSON.parse(activeTab.content);
            const minified = JSON.stringify(parsed);
            updateActiveContent(minified);
            setError(null);
        } catch (e: any) {
            setError(e.message);
        }
    };

    const addTab = () => {
        const newTab = createTab(safeTabs.length + 1);
        setTabs([...safeTabs, newTab]);
        setActiveTabId(newTab.id);
        setError(null);
    };

    const closeTab = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (safeTabs.length === 1) return; // keep at least one tab
        const remaining = safeTabs.filter(t => t.id !== id);
        setTabs(remaining);
        if (activeTab.id === id) {
            setActiveTabId(remaining[remaining.length - 1].id);
        }
        setError(null);
    };

    const switchTab = (id: string) => {
        setActiveTabId(id);
        setError(null);
    };

    const startRename = (tab: JsonTab, e: React.MouseEvent) => {
        e.stopPropagation();
        setEditingTabId(tab.id);
        setEditingName(tab.name);
    };

    const commitRename = () => {
        if (!editingTabId) return;
        const trimmed = editingName.trim();
        if (trimmed) {
            setTabs(safeTabs.map(t => t.id === editingTabId ? { ...t, name: trimmed } : t));
        }
        setEditingTabId(null);
    };

    return (
        <ToolLayout
            title="JSON Formatter"
            onCopy={() => navigator.clipboard.writeText(activeTab.content)}
            onClear={() => {
                updateActiveContent('');
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
            <div className="h-full w-full flex flex-col">
                {/* Tab bar */}
                <div className="flex items-center border-b bg-background shrink-0 overflow-x-auto">
                    {safeTabs.map(tab => (
                        <div
                            key={tab.id}
                            onClick={() => switchTab(tab.id)}
                            className={`group flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium cursor-pointer border-r shrink-0 max-w-[160px] transition-colors select-none ${
                                activeTab.id === tab.id
                                    ? 'bg-background text-foreground border-b-2 border-b-primary -mb-px'
                                    : 'bg-muted/40 text-muted-foreground hover:bg-muted hover:text-foreground'
                            }`}
                        >
                            {editingTabId === tab.id ? (
                                <input
                                    autoFocus
                                    className="bg-transparent outline-none w-20 text-xs font-medium"
                                    value={editingName}
                                    onChange={e => setEditingName(e.target.value)}
                                    onBlur={commitRename}
                                    onKeyDown={e => {
                                        if (e.key === 'Enter') commitRename();
                                        if (e.key === 'Escape') setEditingTabId(null);
                                        e.stopPropagation();
                                    }}
                                    onClick={e => e.stopPropagation()}
                                />
                            ) : (
                                <span
                                    className="truncate max-w-[100px]"
                                    onDoubleClick={e => startRename(tab, e)}
                                    title={`${tab.name} (double-click to rename)`}
                                >
                                    {tab.name}
                                </span>
                            )}
                            {safeTabs.length > 1 && (
                                <button
                                    onClick={e => closeTab(tab.id, e)}
                                    className="opacity-0 group-hover:opacity-100 hover:text-destructive transition-opacity ml-0.5 shrink-0"
                                    title="Close tab"
                                >
                                    <X size={11} />
                                </button>
                            )}
                        </div>
                    ))}

                    {/* New tab button */}
                    <button
                        onClick={addTab}
                        className="flex items-center justify-center px-2 py-1.5 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors shrink-0"
                        title="New tab"
                    >
                        <Plus size={14} />
                    </button>
                </div>

                {/* Editor */}
                <div className="flex-1 relative">
                    <Editor
                        key={activeTab.id}
                        height="100%"
                        defaultLanguage="json"
                        value={activeTab.content}
                        onChange={(value) => {
                            updateActiveContent(value || '');
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
            </div>
        </ToolLayout>
    );
}
