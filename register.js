if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('./sw1.js')
      .then(reg => reg)
      .catch(err => console.log(`Service Worker: Error: ${err}`))
  })
}
