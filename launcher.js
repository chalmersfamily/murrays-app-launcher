const search = document.querySelector('#search');
const sections = [...document.querySelectorAll('main section')];
search.addEventListener('input', () => {
  const words = search.value.trim().toLocaleLowerCase().split(/\s+/);
  for (const section of sections) {
    const tiles = [...section.querySelectorAll('.tile')];
    for (const tile of tiles) {
      const text = tile.textContent.toLocaleLowerCase();
      tile.hidden = !words.every(word => text.includes(word));
    }
    section.hidden = tiles.every(tile => tile.hidden);
  }
  document.querySelector('#empty').hidden = !sections.every(section => section.hidden);
});
if ('serviceWorker' in navigator) navigator.serviceWorker.register('./sw.js').catch(console.warn);

