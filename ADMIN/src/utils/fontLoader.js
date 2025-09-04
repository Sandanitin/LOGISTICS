// Font loading utilities

export function initFontLoading() {
  if (typeof document === 'undefined') return;
  
  const html = document.documentElement;
  
  // Add font-display: optional to prevent layout shifts
  const style = document.createElement('style');
  style.textContent = `
    @font-face {
      font-family: 'YourFont';
      src: url('/path/to/your/font.woff2') format('woff2');
      font-display: optional;
    }
  `;
  document.head.appendChild(style);
  
  // Add class when fonts are loaded
  if (document.fonts) {
    document.fonts.ready.then(() => {
      html.classList.add('fonts-loaded');
    });
  }
}

export function loadNonCriticalCSS() {
  if (typeof document === 'undefined') return;
  
  const nonCriticalCSS = [];
  
  nonCriticalCSS.forEach(href => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.media = 'print';
    link.onload = () => { link.media = 'all'; };
    document.head.appendChild(link);
  });
}
