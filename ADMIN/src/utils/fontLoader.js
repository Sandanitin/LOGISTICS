// Font loading utilities

export function initFontLoading() {
  // Add a class to the HTML element when fonts are loaded
  const html = document.documentElement;
  
  // Check if fonts are already loaded
  if (document.fonts && document.fonts.status === 'loaded') {
    html.classList.add('fonts-loaded');
    return;
  }

  // Listen for font loading completion
  if (document.fonts) {
    document.fonts.ready.then(() => {
      html.classList.add('fonts-loaded');
    });
  } else {
    // Fallback for browsers that don't support FontFaceSet
    html.classList.add('fonts-loaded');
  }
}

export function loadNonCriticalCSS() {
  // This function can be used to load non-critical CSS files
  // after the initial page load to improve performance
  const nonCriticalCSS = [
    // Add paths to non-critical CSS files here
    // Example: '/path/to/non-critical.css'
  ];

  nonCriticalCSS.forEach(href => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.media = 'print';
    link.onload = () => {
      link.media = 'all';
    };
    document.head.appendChild(link);
  });
}
