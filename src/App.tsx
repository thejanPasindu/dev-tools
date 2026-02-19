import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { ThemeProvider } from './components/ui/theme-provider';
import { Layout } from './components/layout/Layout';
import {
  FileJson,
  FileText,
  StickyNote,
  Binary,
  Link as LinkIcon,
  Clock,
  ShieldCheck,
  Fingerprint,
  KeyRound,
  Database,
  Ruler,
  Palette,
  Columns,
  Search,
  Type,
  ArrowRight,
  Terminal,
  Code,
  Globe,
  FileCode,
  Users,
  FileImageIcon,
  Image as ImageIcon,
  QrCode,
  Calendar,
  Monitor,
  FileEdit,
  Loader2,
  FileSpreadsheet
} from 'lucide-react';
import { cn } from './lib/utils';

// Lazy load pages
const JsonFormatter = lazy(() => import('./pages/JsonFormatter'));
const Notepad = lazy(() => import('./pages/Notepad'));
const Notes = lazy(() => import('./pages/Notes'));
const Base64Converter = lazy(() => import('./pages/Base64Converter'));
const UrlEncoder = lazy(() => import('./pages/UrlEncoder'));
const UnixTimestamp = lazy(() => import('./pages/UnixTimestamp'));
const JwtDebugger = lazy(() => import('./pages/JwtDebugger'));
const UuidGenerator = lazy(() => import('./pages/UuidGenerator'));
const HashGenerator = lazy(() => import('./pages/HashGenerator'));
const SqlFormatter = lazy(() => import('./pages/SqlFormatter'));
const CssUnitConverter = lazy(() => import('./pages/CssUnitConverter'));
const ColorPicker = lazy(() => import('./pages/ColorPicker'));
const DiffViewer = lazy(() => import('./pages/DiffViewer'));
const RegexTester = lazy(() => import('./pages/RegexTester'));
const TextAnalyzer = lazy(() => import('./pages/TextAnalyzer'));
const CurlToCode = lazy(() => import('./pages/CurlToCode'));
const HtmlEntityConverter = lazy(() => import('./pages/HtmlEntityConverter'));
const HttpStatusCodes = lazy(() => import('./pages/HttpStatusCodes'));
const JsonToTypeScript = lazy(() => import('./pages/JsonToTypeScript'));
const DummyDataGenerator = lazy(() => import('./pages/DummyDataGenerator'));
const YamlJsonConverter = lazy(() => import('./pages/YamlJsonConverter'));
const SvgCompressor = lazy(() => import('./pages/SvgCompressor'));
const ImageOptimizer = lazy(() => import('./pages/ImageOptimizer'));
const QrCodeGenerator = lazy(() => import('./pages/QrCodeGenerator'));
const CronExpression = lazy(() => import('./pages/CronExpression'));
const MarkdownLive = lazy(() => import('./pages/MarkdownLive'));
const ChangelogGenerator = lazy(() => import('./pages/ChangelogGenerator'));
const PasswordGenerator = lazy(() => import('./pages/PasswordGenerator'));
const CsvJsonConverter = lazy(() => import('./pages/CsvJsonConverter'));

// Loading component
const PageLoader = () => (
  <div className="h-full w-full flex items-center justify-center p-12">
    <Loader2 className="w-8 h-8 animate-spin text-primary opacity-50" />
  </div>
);

const toolGroups = [
  {
    title: 'General',
    items: [
      { to: '/json', icon: FileJson, label: 'JSON Formatter', desc: 'Prettify and format JSON data with error detection.' },
      { to: '/notepad', icon: FileText, label: 'Notepad', desc: 'A loose-leaf scratchpad for quick notes and text.' },
      { to: '/notes', icon: StickyNote, label: 'Notes', desc: 'A powerful notes app with categorizing and search.' },
    ]
  },
  {
    title: 'Envelop/Convert',
    items: [
      { to: '/base64', icon: Binary, label: 'Base64', desc: 'Encode and decode strings/files to/from Base64.' },
      { to: '/url', icon: LinkIcon, label: 'URL Encoder', desc: 'Encode and decode strings for safe URL usage.' },
      { to: '/timestamp', icon: Clock, label: 'Timestamp', desc: 'Convert between Unix timestamps and human-readable dates.' },
    ]
  },
  {
    title: 'Security',
    items: [
      { to: '/jwt', icon: ShieldCheck, label: 'JWT Debugger', desc: 'Inspect and decode JSON Web Tokens instantly.' },
      { to: '/uuid', icon: Fingerprint, label: 'UUID Gen', desc: 'Generate unique identifiers (v4) in bulk.' },
      { to: '/hash', icon: KeyRound, label: 'Hash Gen', desc: 'Generate secure MD5, SHA-1, SHA-256, and SHA-512 hashes.' },
    ]
  },
  {
    title: 'Network & API',
    items: [
      { to: '/curl', icon: Terminal, label: 'Curl to Code', desc: 'Convert curl commands to JS, Python, Go, or PHP code.' },
      { to: '/html-entities', icon: Code, label: 'HTML Entities', desc: 'Encode and decode HTML entities safely.' },
      { to: '/http-status', icon: Globe, label: 'HTTP Status', desc: 'Searchable database of HTTP status codes and meanings.' },
    ]
  },
  {
    title: 'Data & Types',
    items: [
      { to: '/json-to-ts', icon: FileCode, label: 'JSON to TS', desc: 'Generate TypeScript interfaces from JSON objects.' },
      { to: '/dummy-data', icon: Users, label: 'Dummy Data', desc: 'Generate mock data for users, companies, and more.' },
      { to: '/csv-json', icon: FileSpreadsheet, label: 'CSV ↔ JSON', desc: 'Convert between CSV data and JSON arrays.' },
      { to: '/yaml-json', icon: FileJson, label: 'YAML ↔ JSON', desc: 'Bi-directional conversion between YAML and JSON.' },
    ]
  },
  {
    title: 'Web Dev',
    items: [
      { to: '/sql', icon: Database, label: 'SQL Formatter', desc: 'Format SQL queries for better readability across dialects.' },
      { to: '/units', icon: Ruler, label: 'Unit Converter', desc: 'Convert between px, rem, em, and percentages.' },
      { to: '/color', icon: Palette, label: 'Color Picker', desc: 'A visual tool for color selection and format conversion.' },
    ]
  },
  {
    title: 'Analysis',
    items: [
      { to: '/diff', icon: Columns, label: 'Diff Viewer', desc: 'Professional side-by-side text comparison.' },
      { to: '/regex', icon: Search, label: 'RegEx Tester', desc: 'Interactive playground for testing regular expressions.' },
      { to: '/analyzer', icon: Type, label: 'Text Analyzer', desc: 'Dashboard for comprehensive text statistics and analysis.' },
    ]
  },
  {
    title: 'Optimization',
    items: [
      { to: '/svg-compress', icon: FileImageIcon, label: 'SVG Compress', desc: 'Minify and optimize SVG files for web use.' },
      { to: '/image-optimize', icon: ImageIcon, label: 'Image Optimizer', desc: 'Compress JPG, PNG, and WebP images locally.' },
      { to: '/qrcode', icon: QrCode, label: 'QR Generator', desc: 'Create and customize QR codes with PNG export.' },
    ]
  },
  {
    title: 'Productivity',
    items: [
      { to: '/cron', icon: Calendar, label: 'Cron Builder', desc: 'Build and parse cron expressions into human text.' },
      { to: '/markdown', icon: Monitor, label: 'Markdown Live', desc: 'Real-time Markdown editor with live GitHub-style preview.' },
      { to: '/changelog', icon: FileEdit, label: 'Changelog Gen', desc: 'Generate standardized release notes and changelogs.' },
      { to: '/password', icon: ShieldCheck, label: 'Password Gen', desc: 'Secure, local password generator with entropy stats.' },
    ]
  },
];

const Dashboard = () => (
  <div className="min-h-full bg-background overflow-auto pb-20 text-center space-y-4 py-8 max-w-7xl mx-auto p-8 space-y-12">
    {/* Hero Section */}
    <div className="text-center space-y-4 py-8">
      <h1 className="text-5xl font-extrabold tracking-tight lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600 animate-in fade-in slide-in-from-bottom-4 duration-700">
        DevTools
      </h1>
      <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000">
        Professional development utilities. Fast, local, and beautiful.
        Now featuring <span className="text-primary font-bold">{toolGroups.reduce((acc, g) => acc + g.items.length, 0)}</span> essential tools.
      </p>
    </div>

    {/* Categories Grid */}
    <div className="space-y-16">
      {toolGroups.map((group, groupIdx) => (
        <div key={group.title} className={cn("space-y-6 animate-in fade-in duration-1000", `delay-${groupIdx * 50}`)}>
          <div className="flex items-center gap-4">
            <h2 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.3em] px-1 whitespace-nowrap">
              {group.title}
            </h2>
            <div className="h-px w-full bg-gradient-to-r from-border to-transparent" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {group.items.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="group relative bg-card hover:bg-secondary/40 border rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1"
              >
                <div className="flex flex-col h-full space-y-4 text-left">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 bg-primary/10 text-primary rounded-xl group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                      <item.icon size={22} />
                    </div>
                    <ArrowRight className="text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" size={16} />
                  </div>

                  <div className="space-y-1.5 text-left">
                    <h3 className="text-base font-bold group-hover:text-primary transition-colors duration-300">
                      {item.label}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <div className="absolute inset-0 rounded-2xl border-2 border-primary/0 group-hover:border-primary/5 transition-colors pointer-events-none" />
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>

    {/* Footer */}
    <div className="py-12 text-center text-muted-foreground text-[10px] uppercase tracking-[0.2em] border-t border-border/50">
      DevTools Dashboard &bull; {new Date().getFullYear()} &bull; Professional Edition
    </div>
  </div>
);

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/json" element={<JsonFormatter />} />
              <Route path="/notepad" element={<Notepad />} />
              <Route path="/notes" element={<Notes />} />
              <Route path="/base64" element={<Base64Converter />} />
              <Route path="/url" element={<UrlEncoder />} />
              <Route path="/timestamp" element={<UnixTimestamp />} />
              <Route path="/jwt" element={<JwtDebugger />} />
              <Route path="/uuid" element={<UuidGenerator />} />
              <Route path="/hash" element={<HashGenerator />} />
              <Route path="/sql" element={<SqlFormatter />} />
              <Route path="/units" element={<CssUnitConverter />} />
              <Route path="/color" element={<ColorPicker />} />
              <Route path="/diff" element={<DiffViewer />} />
              <Route path="/regex" element={<RegexTester />} />
              <Route path="/analyzer" element={<TextAnalyzer />} />

              {/* New Routes */}
              <Route path="/curl" element={<CurlToCode />} />
              <Route path="/html-entities" element={<HtmlEntityConverter />} />
              <Route path="/http-status" element={<HttpStatusCodes />} />
              <Route path="/json-to-ts" element={<JsonToTypeScript />} />
              <Route path="/dummy-data" element={<DummyDataGenerator />} />
              <Route path="/yaml-json" element={<YamlJsonConverter />} />
              <Route path="/svg-compress" element={<SvgCompressor />} />
              <Route path="/image-optimize" element={<ImageOptimizer />} />
              <Route path="/qrcode" element={<QrCodeGenerator />} />
              <Route path="/cron" element={<CronExpression />} />
              <Route path="/markdown" element={<MarkdownLive />} />
              <Route path="/changelog" element={<ChangelogGenerator />} />
              <Route path="/password" element={<PasswordGenerator />} />
              <Route path="/csv-json" element={<CsvJsonConverter />} />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
