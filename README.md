# Developer Tools Web App

A powerful, modern suite of browser-based tools for developers. Built with React, TypeScript, Vite, tailwindcss, and Monaco Editor.

## 🛠️ Included Tools

*   **JSON Formatter**: Format, minify, and validate JSON.
*   **Notepad**: Persistent, full-screen text editor.
*   **Notes (MarkDown)**: Organized note-taking with markdown support and persistence.
*   **Base64 Converter**: Encode and decode text to/from Base64 (UTF-8 support).
*   **URL Encoder/Decoder**: Encode and decode strings for safe URL usage.
*   **Unix Timestamp Converter**: Convert between Unix timestamps and human-readable dates with a live "Now" display.

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
