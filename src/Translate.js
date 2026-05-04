// Translates any text the moment it's selected. Choose source:target languages when activating. Default: `en:cs`.
(() => {
    const ID = '__jit_translate_box', CK = 'jit_translate_pair';
    let box = document.getElementById(ID);
    if (box) {
        box.remove();
        ['mouseup', 'keyup', 'touchend'].forEach(e => document.removeEventListener(e, window.__jitTranslateRun, true));
        delete window.__jitTranslateRun;
        return
    }
    const getC = k => document.cookie.split('; ').find(x => x.startsWith(k + '='))?.split('=').slice(1).join('=');
    const def = decodeURIComponent(getC(CK) || 'en:cs');
    const pair = prompt('Zapnout překlad výběrem textu:', def);
    if (!pair) return;
    const m = pair.trim().match(/^([a-z]{2,5})\s*[:|>,-]\s*([a-z]{2,5})$/i);
    if (!m) return;
    document.cookie = CK + '=' + encodeURIComponent(pair.trim()) + ';path=/;max-age=31536000;SameSite=Lax';
    const FROM = m[1].toLowerCase(), TO = m[2].toLowerCase();
    box = document.createElement('div');
    box.id = ID;
    box.style = 'position:fixed;z-index:2147483647;display:none;max-width:360px;padding:8px 10px;background:#111;color:#fff;border-radius:8px;font:14px/1.35 system-ui,sans-serif;box-shadow:0 6px 24px #0008';
    document.body.appendChild(box);
    let last = '';

    async function tr(txt) {
        const u = 'https://api.mymemory.translated.net/get?q=' + encodeURIComponent(txt) + '&langpair=' + FROM + '|' + TO;
        const r = await fetch(u);
        if (!r.ok) throw 0;
        const j = await r.json();
        return j?.responseData?.translatedText || ''
    }

    function openWin(txt) {
        const url = 'https://translate.google.com/?sl=' + encodeURIComponent(FROM) + '&tl=' + encodeURIComponent(TO) + '&text=' + encodeURIComponent(txt) + '&op=translate';
        window.open(url, 'jit_translate', 'width=520,height=420,menubar=no,toolbar=no,location=yes,status=no,scrollbars=yes,resizable=yes')
    }

    window.__jitTranslateRun = () => setTimeout(async () => {
        const sel = getSelection();
        const txt = (sel && sel.toString() || '').trim();
        if (!txt || txt.length > 300) {
            box.style.display = 'none';
            last = '';
            return
        }
        if (txt === last) return;
        last = txt;
        let rect;
        try {
            rect = sel.getRangeAt(0).getBoundingClientRect()
        } catch {
            return
        }
        box.style.left = Math.max(8, Math.min(rect.left, innerWidth - 380)) + 'px';
        box.style.top = Math.max(8, Math.min(rect.bottom + 8, innerHeight - 100)) + 'px';
        box.style.display = 'block';
        box.textContent = txt + ' → …';
        try {
            const res = await tr(txt);
            if (!res) throw 0;
            box.textContent = txt + ' → ' + res
        } catch {
            box.style.display = 'none';
            openWin(txt)
        }
    }, 80);
    ['mouseup', 'keyup', 'touchend'].forEach(e => document.addEventListener(e, window.__jitTranslateRun, true))
})()
