import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
    FileJson,
    FileText,
    StickyNote,
    ChevronLeft,
    ChevronRight,
    LayoutDashboard,
    Binary,
    Link,
    Clock,
    ShieldCheck,
    Fingerprint,
    KeyRound,
    Database,
    Ruler,
    Palette,
    Columns,
    Search,
    Type
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { ModeToggle } from '../ui/mode-toggle';

export function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);

    const toggleSidebar = () => setCollapsed(!collapsed);

    const groups = [
        {
            title: 'General',
            items: [
                { to: '/', icon: LayoutDashboard, label: 'Dashboard', exact: true },
                { to: '/json', icon: FileJson, label: 'JSON Formatter' },
                { to: '/notepad', icon: FileText, label: 'Notepad' },
                { to: '/notes', icon: StickyNote, label: 'Notes' },
            ]
        },
        {
            title: 'Envelop/Convert',
            items: [
                { to: '/base64', icon: Binary, label: 'Base64' },
                { to: '/url', icon: Link, label: 'URL Encoder' },
                { to: '/timestamp', icon: Clock, label: 'Timestamp' },
            ]
        },
        {
            title: 'Security',
            items: [
                { to: '/jwt', icon: ShieldCheck, label: 'JWT Debugger' },
                { to: '/uuid', icon: Fingerprint, label: 'UUID Gen' },
                { to: '/hash', icon: KeyRound, label: 'Hash Gen' },
            ]
        },
        {
            title: 'Web Dev',
            items: [
                { to: '/sql', icon: Database, label: 'SQL Formatter' },
                { to: '/units', icon: Ruler, label: 'Unit Converter' },
                { to: '/color', icon: Palette, label: 'Color Picker' },
            ]
        },
        {
            title: 'Analysis',
            items: [
                { to: '/diff', icon: Columns, label: 'Diff Viewer' },
                { to: '/regex', icon: Search, label: 'RegEx Tester' },
                { to: '/analyzer', icon: Type, label: 'Text Analyzer' },
            ]
        },
    ];

    return (
        <aside
            className={cn(
                "flex flex-col h-screen border-r bg-background text-foreground transition-all duration-300 ease-in-out z-20",
                collapsed ? "w-16" : "w-64"
            )}
        >
            <div className="flex items-center justify-between p-4 h-16 border-b">
                {!collapsed && <span className="font-bold text-lg truncate">DevTools</span>}
                <button
                    onClick={toggleSidebar}
                    className="p-1 rounded hover:bg-secondary transition-colors ml-auto"
                >
                    {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                </button>
            </div>

            <nav className="flex-1 overflow-y-auto py-4 flex flex-col gap-6 px-2">
                {groups.map((group) => (
                    <div key={group.title} className="flex flex-col gap-1">
                        {!collapsed && (
                            <h3 className="px-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">
                                {group.title}
                            </h3>
                        )}
                        {group.items.map((item) => (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                className={({ isActive }) => cn(
                                    "flex items-center gap-3 px-3 py-2 rounded-md transition-colors hover:bg-secondary/80",
                                    isActive ? "bg-secondary text-secondary-foreground font-medium" : "text-muted-foreground",
                                    collapsed ? "justify-center px-2" : ""
                                )}
                                title={collapsed ? item.label : undefined}
                            >
                                <item.icon size={18} />
                                {!collapsed && <span className="truncate text-sm">{item.label}</span>}
                            </NavLink>
                        ))}
                    </div>
                ))}
            </nav>

            <div className={cn("p-4 border-t flex items-center gap-3", collapsed ? "justify-center" : "")}>
                <ModeToggle />
                {!collapsed && <span className="text-sm font-medium">Theme</span>}
            </div>
        </aside>
    );
}
