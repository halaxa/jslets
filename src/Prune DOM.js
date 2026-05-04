// Deletes DOM block elements which contain no text nor other elements inside them. Useful to compact viewport space for example after DNS ad blocking.
while ((() => {
    let i = 0;
    Array.from(document.querySelectorAll('div,p'))
        .filter(el => !el.textContent.trim() && el.children.length === 0)
        .forEach(el => {
            el.remove();
            i++
        });
    return i;
})());
