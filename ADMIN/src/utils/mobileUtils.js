// Set the --vh custom property to handle mobile viewport height correctly
export const setViewportHeight = () => {
  const setVH = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };

  // Set initial value
  setVH();

  // Update on resize and orientation change
  window.addEventListener('resize', setVH);
  window.addEventListener('orientationchange', setVH);

  // Cleanup function
  return () => {
    window.removeEventListener('resize', setVH);
    window.removeEventListener('orientationchange', setVH);
  };
};

// Prevent zoom on double-tap
export const preventDoubleTapZoom = () => {
  let lastTouchEnd = 0;
  
  const preventZoom = (e) => {
    const now = Date.now();
    if (e.touches.length > 1) {
      e.preventDefault();
    } else if (now - lastTouchEnd <= 300) {
      e.preventDefault();
    }
    lastTouchEnd = now;
  };

  document.addEventListener('touchstart', preventZoom);
  document.addEventListener('touchend', () => {
    lastTouchEnd = Date.now();
  }, true);

  // Cleanup function
  return () => {
    document.removeEventListener('touchstart', preventZoom);
    document.removeEventListener('touchend', () => {});
  };
};

// Add passive event listener for better scrolling performance
export const addPassiveScrollListener = (element, callback) => {
  const supportsPassive = (() => {
    let supportsPassive = false;
    try {
      const opts = Object.defineProperty({}, 'passive', {
        get: () => (supportsPassive = true),
      });
      window.addEventListener('testPassive', null, opts);
      window.removeEventListener('testPassive', null, opts);
    } catch (e) {}
    return supportsPassive;
  })();

  element.addEventListener('scroll', callback, supportsPassive ? { passive: true } : false);

  // Return cleanup function
  return () => {
    element.removeEventListener('scroll', callback, supportsPassive ? { passive: true } : false);
  };
};

// Check if device is mobile
export const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

// Format numbers for better mobile display
export const formatNumber = (num) => {
  if (!num) return '0';
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

// Debounce function for better performance
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};
