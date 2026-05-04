# JSlets
My personal bookmarklets. When an extension is unnecessary.

## Installation
Install all by importing `bookmarks.html` into your browser. Folder with all the bookmarklets named `jslets` will be created. If updating to newer version, delete the previous `jslets` folder first. 

Or install individually by copy/pasting the ones below.

## Available bookmarklets
### Invert
Inverts the page colors with some sane defaults. Useful for dark mode. It's pure css invert - it also brightens UI which is dark.

```javascript
javascript:(()=>{var t=document.querySelector("html").style;t.backgroundColor||(t.backgroundColor="#fff");var l=document.querySelectorAll("img"),i="invert(0.9) hue-rotate(180deg) contrast(0.9)",o="invert() saturate(1.2) hue-rotate(180deg) contrast(1.2) brightness(0.6)",r="filter 0.3s ease-in-out";t.transition!=r&&(t.transition=r,l.forEach(e=>e.style.transition=r));t.filter==i?(t.filter="",l.forEach(e=>e.style.filter="")):(t.filter=i,l.forEach(e=>e.style.filter=o));})();
```

### Prune DOM
Deletes DOM block elements which contain no text nor other elements inside them. Useful to compact viewport space for example after DNS ad blocking.

```javascript
javascript:(()=>{for(;(()=>{let r=0;return Array.from(document.querySelectorAll("div,p")).filter(e=>!e.textContent.trim()&&e.children.length===0).forEach(e=>{e.remove(),r++}),r})(););})();
```

### Translate
Translates any text the moment it's selected. Choose source:target languages when activating. Default: `en:cs`.

```javascript
javascript:(()=>{(()=>{let c="__jit_translate_box",d="jit_translate_pair",e=document.getElementById(c);if(e){e.remove(),["mouseup","keyup","touchend"].forEach(n=>document.removeEventListener(n,window.__jitTranslateRun,!0)),delete window.__jitTranslateRun;return}let m=decodeURIComponent((n=>document.cookie.split("; ").find(t=>t.startsWith(n+"="))?.split("=").slice(1).join("="))(d)||"en:cs"),a=prompt("Zapnout p\u0159eklad v\xFDb\u011Brem textu:",m);if(!a)return;let s=a.trim().match(/^([a-z]{2,5})\s*[:|>,-]\s*([a-z]{2,5})$/i);if(!s)return;document.cookie=d+"="+encodeURIComponent(a.trim())+";path=/;max-age=31536000;SameSite=Lax";let l=s[1].toLowerCase(),p=s[2].toLowerCase();e=document.createElement("div"),e.id=c,e.style="position:fixed;z-index:2147483647;display:none;max-width:360px;padding:8px 10px;background:#111;color:#fff;border-radius:8px;font:14px/1.35 system-ui,sans-serif;box-shadow:0 6px 24px #0008",document.body.appendChild(e);let i="";async function u(n){let t="https://api.mymemory.translated.net/get?q="+encodeURIComponent(n)+"&langpair="+l+"|"+p,o=await fetch(t);if(!o.ok)throw 0;return(await o.json())?.responseData?.translatedText||""}function h(n){let t="https://translate.google.com/?sl="+encodeURIComponent(l)+"&tl="+encodeURIComponent(p)+"&text="+encodeURIComponent(n)+"&op=translate";window.open(t,"jit_translate","width=520,height=420,menubar=no,toolbar=no,location=yes,status=no,scrollbars=yes,resizable=yes")}window.__jitTranslateRun=()=>setTimeout(async()=>{let n=getSelection(),t=(n&&n.toString()||"").trim();if(!t||t.length>300){e.style.display="none",i="";return}if(t===i)return;i=t;let o;try{o=n.getRangeAt(0).getBoundingClientRect()}catch{return}e.style.left=Math.max(8,Math.min(o.left,innerWidth-380))+"px",e.style.top=Math.max(8,Math.min(o.bottom+8,innerHeight-100))+"px",e.style.display="block",e.textContent=t+" \u2192 \u2026";try{let r=await u(t);if(!r)throw 0;e.textContent=t+" \u2192 "+r}catch{e.style.display="none",h(t)}},80),["mouseup","keyup","touchend"].forEach(n=>document.addEventListener(n,window.__jitTranslateRun,!0))})();})();
```


## Development
- `src/` - full js src files for every bookmarklet
- `dist/` - compiled one-liners to be used as bookmarklets
- `bookmarks.html` - the compiled file of all bookmarklets in universal format to be imported by a browser

Run `npm install`, make your edits and then `node build.js`
