import { useState } from 'react';
import { Palette, Copy, Check, RefreshCw, Layers } from 'lucide-react';

export default function ColorPicker() {
    const [color, setColor] = useState('#3b82f6');
    const [copied, setCopied] = useState<string | null>(null);

    const hexToRgb = (hex: string) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    };

    const hexToHsl = (hex: string) => {
        let { r, g, b } = hexToRgb(hex) || { r: 0, g: 0, b: 0 };
        r /= 255;
        g /= 255;
        b /= 255;
        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h = 0, s, l = (max + min) / 2;

        if (max === min) {
            h = s = 0; // achromatic
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }

        return {
            h: Math.round(h * 360),
            s: Math.round(s * 100),
            l: Math.round(l * 100)
        };
    };

    const rgb = hexToRgb(color);
    const hsl = hexToHsl(color);

    const formatRgb = rgb ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : '';
    const formatHsl = hsl ? `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` : '';

    const copyToClipboard = async (text: string, key: string) => {
        await navigator.clipboard.writeText(text);
        setCopied(key);
        setTimeout(() => setCopied(null), 2000);
    };

    const ColorBox = ({ label, value, keyName }: { label: string, value: string, keyName: string }) => (
        <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-between px-1">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{label}</label>
                <button
                    onClick={() => copyToClipboard(value, keyName)}
                    className="text-[10px] text-primary hover:underline flex items-center gap-1"
                >
                    {copied === keyName ? <Check size={10} /> : <Copy size={10} />}
                    {copied === keyName ? 'Copied' : 'Copy'}
                </button>
            </div>
            <div className="p-4 rounded-xl border bg-card font-mono text-sm flex items-center justify-between group">
                <span className="font-bold">{value}</span>
            </div>
        </div>
    );

    return (
        <div className="h-full flex flex-col bg-background p-6 overflow-auto">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Palette className="text-primary" /> Color Picker
                </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr,1.5fr] gap-12 max-w-5xl mx-auto w-full">
                {/* Visual Picker */}
                <div className="space-y-6">
                    <div className="relative aspect-square w-full rounded-3xl border shadow-2xl overflow-hidden group">
                        <div
                            className="absolute inset-0 transition-colors duration-200"
                            style={{ backgroundColor: color }}
                        />
                        <input
                            type="color"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10 pointer-events-none">
                            <RefreshCw className="text-white animate-spin-slow" size={48} />
                        </div>
                    </div>
                    <div className="flex items-center gap-4 bg-secondary/30 p-4 rounded-2xl border">
                        <input
                            type="text"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                            className="flex-1 bg-transparent font-mono font-bold text-xl uppercase focus:outline-none"
                        />
                        <Layers className="text-muted-foreground" size={20} />
                    </div>
                </div>

                {/* Values and Alternatives */}
                <div className="space-y-8 py-4">
                    <div className="space-y-4">
                        <ColorBox label="Hex Code" value={color.toUpperCase()} keyName="hex" />
                        <ColorBox label="RGB" value={formatRgb} keyName="rgb" />
                        <ColorBox label="HSL" value={formatHsl} keyName="hsl" />
                    </div>

                    <div className="space-y-4 pt-4 border-t">
                        <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Inspiration Palette</label>
                        <div className="grid grid-cols-5 gap-3">
                            {['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#06b6d4', '#ec4899', '#f97316', '#6366f1', '#14b8a6'].map((c) => (
                                <button
                                    key={c}
                                    onClick={() => setColor(c)}
                                    className="aspect-square rounded-lg border shadow-sm hover:scale-110 transition-transform duration-200"
                                    style={{ backgroundColor: c }}
                                    title={c}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
