# JSlets
My personal bookmarklets

## Instalation
- Import `bookmarks.html` into your browser. Folder with all the bookmarklets named `jslets` will be created.
- If updating to newer version, delete the previous `jslets` folder first.

## Available bookmarklets
- **Invert**: Inverts the page colors with some sane defaults. Useful for dark mode. It's pure invert - it also brightens UI which is dark.
- **Prune DOM**: Deletes DOM block elements which contain no text nor other elements inside them. Useful to compact viewport space for example after DNS ad blocking.
- **Translate**: Translates any text the moment it's selected. Choose source:target languages when activating. Default: `en:cs`.

## Development
- `src/` - full js src files for every bookmarklet
- `dist/` - compiled one-liners to be used as bookmarklets
- `bookmarks.html` - the compiled file of all bookmarklets in universal format to be imported by a browser

Run `npm install`, make your edits and then `node build.js`
