# Deployment Guide

This application is a **Single Page Application (SPA)** built with React and Vite. It has been configured to generate a **single HTML file** with all assets (CSS, JavaScript) inlined.

## How to Build for Production

To generate the single static HTML file, run:

```bash
npm run build
```

## Output

The build process will create a `dist` directory containing:

- `index.html`: The complete application in a single file.

## Usage

You can use this file in several ways:

1.  **Open Directly**: Double-click the `index.html` file to open it in your browser. No server required.
2.  **Email/Share**: Send the file as an attachment.
3.  **Host Anywhere**: Upload to any static hosting provider or file share.

### Configuration Note

The project uses `vite-plugin-singlefile` in `vite.config.ts` to inline all assets. This makes the application completely portable.
