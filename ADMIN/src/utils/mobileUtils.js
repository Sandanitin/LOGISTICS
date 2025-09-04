// Mobile-specific utilities

// Set viewport height to handle mobile viewport units better
export function setViewportHeight() {
  const setVh = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };

  // Set initial value
  setVh();

  // Add event listeners
  window.addEventListener('resize', setVh);
  window.addEventListener('orientationchange', setVh);

  // Return cleanup function
  return () => {
    window.removeEventListener('resize', setVh);
    window.removeEventListener('orientationchange', setVh);
  };
}

// Prevent double-tap zoom on mobile devices
export function preventDoubleTapZoom() {
  let lastTouchEnd = 0;
  const handleTouchEnd = (event) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }
    lastTouchEnd = now;
  };

  document.addEventListener('touchend', handleTouchEnd, { passive: false });

  // Return cleanup function
  return () => {
    document.removeEventListener('touchend', handleTouchEnd, { passive: false });
  };
}

// Check if the device is mobile
export function isMobile() {
  if (typeof window === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

// Add a class to the HTML element if the device is mobile
if (typeof window !== 'undefined' && isMobile()) {
  document.documentElement.classList.add('is-mobile');
}
