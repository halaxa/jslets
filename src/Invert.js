// Inverts the page colors with some sane defaults. Useful for dark mode. It's pure css invert - it also brightens UI which is dark.
let style = document.querySelector('html').style;
if (!style.backgroundColor) style.backgroundColor = '#fff';
let imgs = document.querySelectorAll('img');
let htmlFilter = 'invert(0.9) hue-rotate(180deg) contrast(0.9)';
let imgFilter = 'invert() saturate(1.2) hue-rotate(180deg) contrast(1.2) brightness(0.6)';
let trans = 'filter 0.3s ease-in-out';
if (style.transition != trans) {
    style.transition = trans;
    imgs.forEach(img => img.style.transition = trans);
}
if (style.filter == htmlFilter) {
    style.filter = '';
    imgs.forEach(img => img.style.filter = '');
} else {
    style.filter = htmlFilter;
    imgs.forEach(img => img.style.filter = imgFilter);
}
