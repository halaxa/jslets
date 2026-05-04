const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

const SRC = path.join(__dirname, 'src');
const DIST = path.join(__dirname, 'dist');

if (!fs.existsSync(DIST)) fs.mkdirSync(DIST);

const folderName = `jslets`;

// --- zpracování ---
const files = fs.readdirSync(SRC).filter(f => f.endsWith('.js'));

const links = [];

async function build() {
    for (const file of files) {
        const name = path.basename(file, '.js');

        const raw = fs.readFileSync(path.join(SRC, file), 'utf8');
        const match = raw.match(/\/\/\s*(.*)/);
        const description = match ? match[1].trim() : '';

        console.log(`Writing: ${path.join('src', file)}: ${path.join('dist', file)}`);
        const result = await esbuild.build({
            entryPoints: [path.join(SRC, file)],
            write: false,
            bundle: true,
            minify: true,
            format: 'iife',
        });

        const code = result.outputFiles[0].text;
        const wrapped = `javascript:${code}`;

        fs.writeFileSync(path.join(DIST, file), wrapped);

        const title = name.replace(/_/g, ' ');
        links.push({ title, href: wrapped.trim(), description });
    }
}

build().then(() => {
    // --- bookmarks.html ---
    function esc(s) {
        return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
    }

    let html = `<!DOCTYPE NETSCAPE-Bookmark-file-1>
<!-- This is an automatically generated file.
     It will be read and overwritten.
     DO NOT EDIT! -->
<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">
<TITLE>Bookmarks</TITLE>
<H1>Bookmarks</H1>
<DL><p>
  <DT><H3>${folderName}</H3>
  <DL><p>
`;

    for (const l of links) {
        html += `    <DT><A HREF="${esc(l.href)}">${esc(l.title)}</A>\n`;
    }

    html += `  </DL><p>
</DL><p>
`;

    console.log(`Writing: bookmarks.html`);
    fs.writeFileSync(path.join(__dirname, `bookmarks.html`), html);

    // --- update README.md ---
    console.log(`Writing: README.md`);
    const readmePath = path.join(__dirname, 'README.md');
    let readme = fs.readFileSync(readmePath, 'utf8');

    let list = '\n';
    for (const l of links) {
        list += '### '+l.title+'\n'+l.description+'\n\n```javascript\n'+l.href+'\n```\n\n';
    }
    list += '\n';

    const marker = '## Available bookmarklets';
    const startIdx = readme.indexOf(marker);
    const nextSectionIndex = readme.indexOf('\n## ', startIdx + marker.length);
    
    if (startIdx !== -1 && nextSectionIndex !== -1) {
        readme = readme.substring(0, startIdx + marker.length) + 
                 list +
                 readme.substring(nextSectionIndex + 1);
    }

    fs.writeFileSync(readmePath, readme);

    console.log(`Done`);
});
