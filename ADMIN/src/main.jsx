import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { SpeedInsights } from '@vercel/speed-insights/react';
import App from './App';
import './index.css';
import './styles/mobile.css';
import MobileLayout from './components/MobileLayout';
import { register as registerServiceWorker } from './utils/registerServiceWorker';
import { setViewportHeight, preventDoubleTapZoom, isMobile } from './utils/mobileUtils';

// Initialize mobile optimizations
const initMobileOptimizations = () => {
  // Set up viewport height handling
  setViewportHeight();
  
  // Prevent double-tap zoom on mobile
  preventDoubleTapZoom();
  
  // Add mobile class to body if on mobile
  if (isMobile()) {
    document.body.classList.add('mobile-device');
  }
};

// Initialize the app
const initApp = () => {
  // Initialize mobile optimizations
  initMobileOptimizations();
  
  // Register service worker in production
  if (process.env.NODE_ENV === 'production') {
    registerServiceWorker();
  }
  
  // Render the app
  const root = createRoot(document.getElementById('root'));
  
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <MobileLayout>
          <App />
          <SpeedInsights />
        </MobileLayout>
      </BrowserRouter>
    </React.StrictMode>
  );
};

// Start the app
initApp();

// Log performance metrics
if ('performance' in window) {
  window.addEventListener('load', () => {
    const [entry] = performance.getEntriesByType('navigation');
    if (entry) {
      console.log('Page load time:', (entry.loadEventEnd - entry.startTime).toFixed(2), 'ms');
    }
  });
}
