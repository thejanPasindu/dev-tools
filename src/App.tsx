import { lazy, Suspense, useState, useMemo } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { ThemeProvider } from './components/ui/theme-provider';
import { Layout } from './components/layout/Layout';
import { toolGroups } from './lib/tools';
import { Loader2, ArrowRight, Search } from 'lucide-react';
import { cn } from './lib/utils';

// Lazy load pages
const JsonFormatter = lazy(() => import('./pages/JsonFormatter'));
const Notepad = lazy(() => import('./pages/Notepad'));
const Notes = lazy(() => import('./pages/Notes'));
const Base64Converter = lazy(() => import('./pages/Base64Converter'));
const ImageToBase64 = lazy(() => import('./pages/ImageToBase64'));
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
const BarcodeGenerator = lazy(() => import('./pages/BarcodeGenerator'));
const CronExpression = lazy(() => import('./pages/CronExpression'));
const MarkdownLive = lazy(() => import('./pages/MarkdownLive'));
const ChangelogGenerator = lazy(() => import('./pages/ChangelogGenerator'));
const PasswordGenerator = lazy(() => import('./pages/PasswordGenerator'));
const CsvJsonConverter = lazy(() => import('./pages/CsvJsonConverter'));
const ApiClient = lazy(() => import('./pages/ApiClient'));
const XmlFormatter = lazy(() => import('./pages/XmlFormatter'));
const RsaKeyGenerator = lazy(() => import('./pages/RsaKeyGenerator'));
const HmacGenerator = lazy(() => import('./pages/HmacGenerator'));
const BoxShadowGenerator = lazy(() => import('./pages/BoxShadowGenerator'));
const LayoutPlayground = lazy(() => import('./pages/LayoutPlayground'));

// Loading component
const PageLoader = () => (
  <div className="h-full w-full flex items-center justify-center p-12">
    <Loader2 className="w-8 h-8 animate-spin text-primary opacity-50" />
  </div>
);

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredGroups = useMemo(() => {
    if (!searchQuery.trim()) return toolGroups;
    
    const query = searchQuery.toLowerCase();
    return toolGroups.map(group => ({
      ...group,
      items: group.items.filter(item => 
        item.label.toLowerCase().includes(query) || 
        item.desc.toLowerCase().includes(query)
      )
    })).filter(group => group.items.length > 0);
  }, [searchQuery]);

  return (
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

    {/* Search Input */}
    <div className="max-w-2xl mx-auto relative animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-150">
      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={20} />
        <input
          type="text"
          placeholder="Search tools..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-4 rounded-2xl bg-card border border-border/50 focus:border-primary/50 focus:ring-4 focus:ring-primary/10 outline-none transition-all text-lg placeholder:text-muted-foreground shadow-sm"
        />
      </div>
    </div>

    {/* Categories Grid */}
    <div className="space-y-16">
      {filteredGroups.length === 0 ? (
        <div className="py-20 text-center text-muted-foreground animate-in fade-in">
           <Search className="mx-auto mb-4 opacity-20" size={48} />
           <p className="text-lg">No tools found for "{searchQuery}"</p>
        </div>
      ) : (
      filteredGroups.map((group, groupIdx) => (
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
      ))
      )}
    </div>

    {/* Footer */}
    <div className="py-12 text-center text-muted-foreground text-[10px] uppercase tracking-[0.2em] border-t border-border/50">
      DevTools Dashboard &bull; {new Date().getFullYear()} &bull; Professional Edition
    </div>
  </div>
  );
};

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
              <Route path="/image-base64" element={<ImageToBase64 />} />
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
              <Route path="/barcode" element={<BarcodeGenerator />} />
              <Route path="/cron" element={<CronExpression />} />
              <Route path="/markdown" element={<MarkdownLive />} />
              <Route path="/changelog" element={<ChangelogGenerator />} />
              <Route path="/password" element={<PasswordGenerator />} />
              <Route path="/csv-json" element={<CsvJsonConverter />} />
              <Route path="/api-client" element={<ApiClient />} />
              <Route path="/xml" element={<XmlFormatter />} />
              <Route path="/rsa" element={<RsaKeyGenerator />} />
              <Route path="/hmac" element={<HmacGenerator />} />
              <Route path="/shadow" element={<BoxShadowGenerator />} />
              <Route path="/layout" element={<LayoutPlayground />} />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
