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
import { measure, mark, observeLongTasks, logMetrics } from './utils/performance';

// Mark the start of the application
mark('app-start');

// Initialize mobile optimizations
const initMobileOptimizations = () => {
  mark('mobile-optimizations-start');
  
  // Set up viewport height handling
  setViewportHeight();
  
  // Prevent double-tap zoom on mobile
  preventDoubleTapZoom();
  
  // Add mobile class to body if on mobile
  if (isMobile()) {
    document.body.classList.add('mobile-device');
  }
  
  mark('mobile-optimizations-end');
  measure('mobile-optimizations', 'mobile-optimizations-start', 'mobile-optimizations-end');
};

// Initialize performance monitoring
const initPerformanceMonitoring = () => {
  // Start observing long tasks
  observeLongTasks();
  
  // Log performance metrics periodically in development
  if (process.env.NODE_ENV !== 'production') {
    // Initial metrics after load
    window.addEventListener('load', () => {
      mark('app-loaded');
      measure('app-boot', 'app-start', 'app-loaded');
      logMetrics();
    });
    
    // Log metrics before unload
    window.addEventListener('beforeunload', () => {
      mark('app-unload');
      measure('app-session', 'app-start', 'app-unload');
      logMetrics();
    });
  }
};

// Initialize the application
const initApp = async () => {
  mark('app-init-start');
  
  try {
    // Initialize mobile optimizations
    initMobileOptimizations();
    
    // Initialize performance monitoring
    initPerformanceMonitoring();
    
    // Register service worker in production
    if (process.env.NODE_ENV === 'production') {
      try {
        await registerServiceWorker();
        mark('service-worker-registered');
      } catch (error) {
        console.error('Service worker registration failed:', error);
      }
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
    
    mark('app-rendered');
    measure('app-initial-render', 'app-init-start', 'app-rendered');
    
  } catch (error) {
    console.error('Failed to initialize application:', error);
    // You might want to render an error boundary here
  }
};

// Start the application
initApp().catch(console.error);

// Log performance metrics for debugging
if (process.env.NODE_ENV !== 'production') {
  // Log when the app is idle
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(
      () => {
        mark('app-idle');
        logMetrics();
      },
      { timeout: 2000 }
    );
  }
}
