import { useState, useCallback, useEffect } from 'react';
import { Shield, RefreshCw } from 'lucide-react';
import { ToolLayout } from '../components/layout/ToolLayout';
import { usePersistentState } from '../hooks/usePersistentState';

export default function PasswordGenerator() {
    const [length, setLength] = usePersistentState<number>('pw_length', 16);
    const [options, setOptions] = usePersistentState('pw_options', {
        uppercase: true,
        lowercase: true,
        numbers: true,
        symbols: true,
    });
    const [password, setPassword] = useState('');

    const generatePassword = useCallback(() => {
        const charset: string[] = [];
        if (options.uppercase) charset.push('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
        if (options.lowercase) charset.push('abcdefghijklmnopqrstuvwxyz');
        if (options.numbers) charset.push('0123456789');
        if (options.symbols) charset.push('!@#$%^&*()_+~`|}{[]:;?><,./-=');

        if (charset.length === 0) {
            setPassword('');
            return;
        }

        const fullCharset = charset.join('');
        let newPassword = '';
        const array = new Uint32Array(length);
        window.crypto.getRandomValues(array);

        for (let i = 0; i < length; i++) {
            newPassword += fullCharset[array[i] % fullCharset.length];
        }

        setPassword(newPassword);
    }, [length, options]);

    useEffect(() => {
        generatePassword();
    }, [generatePassword]);

    const getStrength = () => {
        const entropy = length * Math.log2(
            (options.uppercase ? 26 : 0) +
            (options.lowercase ? 26 : 0) +
            (options.numbers ? 10 : 0) +
            (options.symbols ? 30 : 0)
        );
        if (entropy > 128) return { label: 'Extremely Strong', color: 'text-green-500' };
        if (entropy > 64) return { label: 'Strong', color: 'text-blue-500' };
        if (entropy > 32) return { label: 'Medium', color: 'text-yellow-500' };
        return { label: 'Weak', color: 'text-red-500' };
    };

    const strength = getStrength();

    return (
        <ToolLayout
            title="Password Generator"
            onCopy={() => navigator.clipboard.writeText(password)}
            actions={
                <button
                    onClick={generatePassword}
                    className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
                >
                    <RefreshCw size={14} /> Regenerate
                </button>
            }
        >
            <div className="max-w-2xl mx-auto p-6 space-y-8">
                <div className="bg-secondary/30 border rounded-xl p-6 flex flex-col items-center justify-center space-y-4">
                    <div className="text-3xl font-mono break-all text-center select-all">{password || 'Select options'}</div>
                    <div className={`text-xs font-bold uppercase tracking-widest ${strength.color}`}>
                        {strength.label}
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <label className="font-medium">Password Length</label>
                            <span className="text-muted-foreground">{length} characters</span>
                        </div>
                        <input
                            type="range"
                            min="8"
                            max="128"
                            value={length}
                            onChange={(e) => setLength(parseInt(e.target.value))}
                            className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {Object.entries(options).map(([key, value]) => (
                            <label key={key} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-secondary/20 cursor-pointer transition-colors">
                                <input
                                    type="checkbox"
                                    checked={value}
                                    onChange={() => setOptions({ ...options, [key]: !value })}
                                    className="w-4 h-4 accent-primary"
                                />
                                <span className="text-sm capitalize">{key}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="bg-primary/5 border border-primary/10 rounded-xl p-4 flex gap-4 items-start">
                    <Shield className="text-primary shrink-0" size={20} />
                    <div className="space-y-1">
                        <h4 className="text-sm font-semibold">Security Note</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            This tool uses the browser's native Cryptographically Secure Pseudo-Random Number Generator (CSPRNG).
                            Passwords are generated locally on your machine and never sent over the network.
                        </p>
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
}
