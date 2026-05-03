export interface TextStats {
    chars: number;
    charsNoSpaces: number;
    words: number;
    sentences: number;
    lines: number;
    paragraphs: number;
    readingTimeSec: number;
    topWords: Array<{ word: string; count: number }>;
}

export function analyzeText(input: string): TextStats {
    const chars = input.length;
    const charsNoSpaces = input.replace(/\s/g, '').length;
    const words = input.trim() === '' ? 0 : input.trim().split(/\s+/).length;
    const sentences = input.split(/[.!?]+/).filter(s => s.trim()).length;
    const lines = input.split('\n').length;
    const paragraphs = input.split(/\n\s*\n/).filter(p => p.trim()).length;
    const readingTimeSec = Math.ceil((words / 200) * 60);

    const wordFreq: Record<string, number> = {};
    const STOP_WORDS = new Set(['the','a','an','and','or','but','in','on','at','to','for','of','with','is','are','was','were','it','this','that','they','we','you','i','he','she']);
    input.toLowerCase().match(/\b[a-z]{3,}\b/g)?.forEach(w => {
        if (!STOP_WORDS.has(w)) wordFreq[w] = (wordFreq[w] ?? 0) + 1;
    });
    const topWords = Object.entries(wordFreq)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(([word, count]) => ({ word, count }));

    return { chars, charsNoSpaces, words, sentences, lines, paragraphs, readingTimeSec, topWords };
}
