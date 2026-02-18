# Developer Tools Web App

A powerful, modern suite of 27 browser-based tools for developers. Built with React, TypeScript, Vite, Tailwind CSS, and Monaco Editor. All processing is done 100% locally in your browser for maximum privacy and performance.

## 🛠️ Included Tools

### General & Core
*   **JSON Formatter**: Prettify, minify, and validate JSON data with error detection.
*   **Notepad**: A loose-leaf scratchpad for quick notes and text manipulation.
*   **Notes (MarkDown)**: Organized note-taking app with categories, search, and markdown support.

### Encoding & Conversion
*   **Base64**: Encode and decode strings or files to/from Base64.
*   **URL Encoder**: Encode and decode strings for safe URL usage.
*   **Unix Timestamp**: Convert between Unix timestamps and human-readable dates with live sync.
*   **HTML Entities**: Live encoding and decoding of HTML entities.
*   **YAML ↔ JSON**: Bi-directional conversion with syntax highlighting.

### Network & API
*   **Curl to Code**: Convert curl commands to fetch (JS), requests (Python), Go, or PHP code.
*   **HTTP Status Codes**: A searchable reference for status codes with MDN documentation links.

### Data & Security
*   **JWT Debugger**: Inspect and decode JSON Web Tokens instantly.
*   **UUID Generator**: Generate unique identifiers (v4) in bulk.
*   **Hash Generator**: Secure MD5, SHA-1, SHA-256, and SHA-512 hashing.
*   **JSON to TypeScript**: Generate TypeScript interfaces directly from JSON objects.
*   **Dummy Data Gen**: Generate mock data for users, products, companies, and more.

### Web Dev Specific
*   **SQL Formatter**: Format SQL queries for various dialects.
*   **CSS Unit Converter**: Convert between px, rem, em, and percentages.
*   **Color Picker**: Visual tool for color selection and format conversion (HEX, RGB, HSL).
*   **SVG Compressor**: Minify and optimize SVG files using SVGO.
*   **Image Optimizer**: Client-side compression for PNG, JPG, and WebP images.
*   **QR Generator**: Create customizable QR codes with PNG export.

### Writing & Analysis
*   **Diff Viewer**: Professional side-by-side text comparison.
*   **RegEx Tester**: Interactive playground for testing regular expressions.
*   **Text Analyzer**: Detailed statistics for character counts, word density, and estimated reading time.

### Dev Productivity
*   **Cron Builder**: Build and parse cron expressions into human-readable text.
*   **Markdown Live**: Real-time editor with live GitHub-style preview.
*   **Changelog Gen**: Generate standardized release notes in Markdown format.

## 🚀 Getting Started

### Prerequisites

*   **Node.js** (v18 or later recommended)
*   **pnpm** (preferred) or **npm**

### Installation

```bash
pnpm install
# or
npm install
```

### Running the Development Server

```bash
pnpm dev
# or
npm run dev
```

The app will be available at `http://localhost:5173`.

### Building for Production

```bash
pnpm build
# or
npm run build
```

The production-ready files will be in the `dist` directory.

## 🎨 Tech Stack

*   **Framework**: React 18
*   **Build Tool**: Vite
*   **Styling**: Tailwind CSS
*   **Icons**: Lucide React
*   **Editor**: Monaco Editor (@monaco-editor/react)
*   **Theming**: Dark/Light mode support via CSS variables.
