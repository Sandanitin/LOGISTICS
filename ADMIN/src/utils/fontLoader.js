/**
 * Font Loading and Critical CSS Optimization Utility
 */

// Font configuration
const FONTS = {
  'Inter': {
    weights: [400, 500, 600, 700],
    display: 'swap',
    preload: false, // Disable preload for now since we don't have local fonts
    googleFont: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
  },
};

// Load fonts with Font Face Observer
export const loadFonts = async () => {
  if (typeof document === 'undefined') return;

  try {
    // If using Google Fonts, just add the stylesheet
    if (FONTS.Inter.googleFont) {
      const link = document.createElement('link');
      link.href = FONTS.Inter.googleFont;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
      return;
    }

    // Fallback to local fonts if configured
    const fontPromises = [];
    
    Object.entries(FONTS).forEach(([family, config]) => {
      const { weights, display = 'swap' } = config;
      
      weights.forEach(weight => {
        const fontFace = new FontFace(
          family,
          `local('${family}'), local('${family}-${weight}'), url(/fonts/${family.toLowerCase()}-${weight}.woff2) format('woff2')`,
          { weight: weight.toString(), style: 'normal', display }
        );
        
        document.fonts.add(fontFace);
        fontPromises.push(fontFace.load().catch(console.error));
      });
    });

    await Promise.all(fontPromises);
    
  } catch (error) {
    console.error('Failed to load fonts:', error);
  }
};

// Inline critical CSS
export const inlineCriticalCSS = () => {
  if (typeof document === 'undefined') return;
  
  const criticalCSS = `
    /* Critical CSS for above-the-fold content */
    :root {
      --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    }
    
    body {
      font-family: var(--font-sans);
      line-height: 1.5;
      -webkit-font-smoothing: antialiased;
      margin: 0;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
    
    /* FOUT prevention */
    .fonts-loading body {
      visibility: hidden;
    }
    
    .fonts-loaded body {
      visibility: visible;
      animation: fadeIn 0.3s ease-in-out;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `;
  
  const style = document.createElement('style');
  style.id = 'critical-css';
  style.textContent = criticalCSS;
  
  // Add to head
  document.head.appendChild(style);
};

// Initialize font loading and critical CSS
export const initFontLoading = () => {
  if (typeof document === 'undefined') return;
  
  // Check if fonts are already loaded
  const fontsLoaded = typeof localStorage !== 'undefined' && localStorage.getItem('fonts-loaded') === 'true';
  
  if (fontsLoaded) {
    document.documentElement.classList.add('fonts-loaded');
  } else {
    document.documentElement.classList.add('fonts-loading');
    loadFonts().then(() => {
      document.documentElement.classList.remove('fonts-loading');
      document.documentElement.classList.add('fonts-loaded');
    });
  }
  
  // Inline critical CSS
  inlineCriticalCSS();
};

// Load non-critical CSS
export const loadNonCriticalCSS = () => {
  if (typeof document === 'undefined') return;
  
  const nonCriticalCSS = [
    // Add other non-critical CSS files here
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
};

export default {
  loadFonts,
  inlineCriticalCSS,
  initFontLoading,
  loadNonCriticalCSS,
};
