// Usage:
//   node export-dark-pdf.js <input.md|blob_or_raw_url> [output.pdf] [--mode full|safe]
// Examples:
//   node export-dark-pdf.js DOCUMENTAION.md
//   node export-dark-pdf.js https://github.com/.../DOCUMENTAION.md Kenshi.pdf --mode safe
//   node export-dark-pdf.js https://github.com/.../DOCUMENTAION.md Kenshi-full.pdf --mode full

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const marked = require('marked');
const hljs = require('highlight.js');
const fetch = global.fetch || require('node-fetch');

// CDN assets
const GITHUB_DARK_CSS = 'https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.1.0/github-markdown-dark.min.css';
const HIGHLIGHT_CSS = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/atom-one-dark.min.css';
const HIGHLIGHT_JS = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/highlight.min.js';

function blobToRaw(url) {
    try {
        const u = new URL(url);
        if (u.hostname === 'github.com' && u.pathname.includes('/blob/')) {
            return url.replace('https://github.com/', 'https://raw.githubusercontent.com/').replace('/blob/', '/');
        }
    } catch (e) { }
    return url;
}

async function loadMarkdown(source) {
    if (/^https?:\/\//i.test(source)) {
        const finalUrl = blobToRaw(source);
        const res = await fetch(finalUrl);
        if (!res.ok) throw new Error(`Failed to fetch ${finalUrl}: ${res.status} ${res.statusText}`);
        return await res.text();
    } else {
        const full = path.resolve(process.cwd(), source);
        if (!fs.existsSync(full)) throw new Error(`File not found: ${full}`);
        return fs.readFileSync(full, 'utf8');
    }
}

// server-side highlight (optional)
marked.setOptions({
    highlight: function (code, lang) {
        if (lang && hljs.getLanguage(lang)) {
            return hljs.highlight(code, { language: lang }).value;
        }
        return hljs.highlightAuto(code).value;
    },
    gfm: true,
    breaks: true,
});

function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (m) {
        return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[m];
    });
}

/**
 * Build HTML. mode: 'safe' -> 12mm inner padding, 'full' -> 0mm padding.
 */
function buildHtml(markdown, title = 'Document', mode = 'safe') {
    const content = marked.parse(markdown);
    const padding = (mode === 'full') ? '0' : '12mm';

    return `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>${escapeHtml(title)}</title>
  <link rel="stylesheet" href="${GITHUB_DARK_CSS}">
  <link rel="stylesheet" href="${HIGHLIGHT_CSS}">
  <style>
    /* Page & body */
    @page { size: A4; margin: 0; }
    html, body {
      width: 210mm;
      height: 297mm;
      margin: 0;
      padding: 0;
      background: #0d1117;
      color: #c9d1d9;
      -webkit-print-color-adjust: exact;
      box-sizing: border-box;
    }

    /* markdown container sized to exactly A4 with inner padding as chosen */
    .markdown-body {
      box-sizing: border-box;
      width: 210mm;
      min-height: 297mm;
      margin: 0;
      padding: ${padding}; /* safe breathing room or full-bleed */
      background: transparent;
    }

    /* code & content tweaks */
    pre { overflow: auto; white-space: pre-wrap; word-wrap: break-word; }
    table { page-break-inside: auto; }
    tr    { page-break-inside: avoid; page-break-after: auto; }
    img, table, pre { max-width: 100%; }
  </style>
</head>
<body>
  <main class="markdown-body">
    ${content}
  </main>

  <script src="${HIGHLIGHT_JS}"></script>
  <script>
    if (typeof hljs !== 'undefined' && hljs && typeof hljs.highlightAll === 'function') {
      hljs.highlightAll();
    }
  </script>
</body>
</html>`;
}

async function exportPdf(input, output, mode = 'safe') {
    const md = await loadMarkdown(input);
    const html = buildHtml(md, path.basename(input), mode);

    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();

    await page.setContent(html, { waitUntil: 'networkidle0' });
    await page.emulateMediaType('screen');

    await page.pdf({
        path: output,
        printBackground: true,
        preferCSSPageSize: true,
        margin: { top: '0mm', bottom: '0mm', left: '0mm', right: '0mm' }
    });

    await browser.close();
    console.log('Saved PDF to', output, `(mode=${mode})`);
}

// CLI: parse args and optional --mode / -m
(function main() {
    const rawArgs = process.argv.slice(2);
    if (rawArgs.length < 1) {
        console.error('Usage: node export-dark-pdf.js <input.md|blob_or_raw_url> [output.pdf] [--mode full|safe]');
        process.exit(2);
    }

    // extract mode flag if present
    let mode = 'safe';
    const modeIndex = rawArgs.findIndex(a => a === '--mode' || a === '-m');
    if (modeIndex !== -1) {
        const val = rawArgs[modeIndex + 1];
        if (val && (val === 'full' || val === 'safe')) {
            mode = val;
            rawArgs.splice(modeIndex, 2); // remove mode args
        } else {
            console.warn('Invalid or missing value for --mode. Using default "safe".');
            rawArgs.splice(modeIndex, 1);
        }
    }

    const input = rawArgs[0];
    const output = rawArgs[1] || (path.basename(input).replace(/\.[^.]+$/, '') + `-${mode}.pdf`);

    exportPdf(input, output, mode).catch(err => {
        console.error('Error:', err.message || err);
        process.exit(1);
    });
})();
