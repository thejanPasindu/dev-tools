import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { toolGroups } from '../../lib/tools';
import { LayoutDashboard, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { cn } from '../../lib/utils';
import { ModeToggle } from '../ui/mode-toggle';

export function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);

    const toggleSidebar = () => setCollapsed(!collapsed);

    const dashboardItem = {
        title: 'General',
        items: [{ to: '/', icon: LayoutDashboard, label: 'Dashboard', exact: true }]
    };

    const groups = [dashboardItem, ...toolGroups];

    const openCommandPalette = () => {
        window.dispatchEvent(new Event('open-command-palette'));
    };

    return (
        <aside
            className={cn(
                "flex flex-col h-screen border-r bg-background text-foreground transition-all duration-300 ease-in-out z-20",
                collapsed ? "w-16" : "w-64"
            )}
        >
            <div className="flex items-center justify-between p-4 h-16 border-b shrink-0">
                {!collapsed && <span className="font-bold text-lg truncate">DevTools</span>}
                <button
                    onClick={toggleSidebar}
                    className="p-1 rounded hover:bg-secondary transition-colors ml-auto"
                >
                    {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                </button>
            </div>

            <nav className="flex-1 overflow-y-auto py-4 flex flex-col gap-6 px-2 scrollbar-none">
                <div className="px-2">
                    <button
                        onClick={openCommandPalette}
                        className={cn(
                            "w-full flex items-center gap-3 px-3 py-1.5 rounded-lg transition-all hover:bg-secondary/60 text-muted-foreground",
                            collapsed ? "justify-center px-1.5" : "justify-between"
                        )}
                        title={collapsed ? "Search tools" : undefined}
                    >
                        <div className="flex items-center gap-3">
                            <Search size={16} />
                            {!collapsed && <span className="text-[13px] font-medium">Search</span>}
                        </div>
                        {!collapsed && (
                            <div className="flex items-center gap-1.5 px-1.5 py-0.5 rounded border bg-background/50 text-[10px] font-mono opacity-80 backdrop-blur-sm">
                                <span>⌘</span>
                                <span>K</span>
                            </div>
                        )}
                    </button>
                </div>

                {groups.map((group) => (
                    <div key={group.title} className="flex flex-col gap-0.5">
                        {!collapsed && (
                            <h3 className="px-3 text-[9px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-1.5 opacity-60">
                                {group.title}
                            </h3>
                        )}
                        {group.items.map((item) => (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                className={({ isActive }) => cn(
                                    "flex items-center gap-3 px-3 py-1.5 rounded-lg transition-all hover:bg-secondary/60",
                                    isActive ? "bg-primary/10 text-primary font-bold shadow-sm" : "text-muted-foreground",
                                    collapsed ? "justify-center px-2" : ""
                                )}
                                title={collapsed ? item.label : undefined}
                            >
                                <item.icon size={16} />
                                {!collapsed && <span className="truncate text-[13px]">{item.label}</span>}
                            </NavLink>
                        ))}
                    </div>
                ))}
            </nav>

            <div className={cn("p-4 border-t flex items-center gap-3 shrink-0", collapsed ? "justify-center" : "")}>
                <ModeToggle />
                {!collapsed && <span className="text-[13px] font-medium">Theme</span>}
            </div>
        </aside>
    );
}
