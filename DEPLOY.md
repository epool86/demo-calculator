# Deployment Guide

This application is a **Single Page Application (SPA)** built with React and Vite. It is designed to be hosted on any static file server.

## How to Build for Production

To generate the static HTML, CSS, and JavaScript files, run:

```bash
npm run build
```

## Output

The build process will create a `dist` directory containing:

- `index.html`: The main entry point.
- `assets/`: Directory containing compiled CSS and JavaScript files.

## Hosting

You can upload the contents of the `dist` directory to any static hosting provider, such as:

- **GitHub Pages**
- **Netlify**
- **Vercel**
- **Cloudflare Pages**
- **Amazon S3**
- **Apache / Nginx** (static mode)

### Configuration Note

The project is configured with `base: './'` in `vite.config.ts`. This means it uses **relative paths** for assets. 
- You can deploy it to the root of a domain (e.g., `example.com`).
- You can deploy it to a subdirectory (e.g., `example.com/calculator`).
- You can even open the `index.html` file directly in a browser (though some features might require a local server due to CORS policies).
