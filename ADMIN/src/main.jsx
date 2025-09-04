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
import { mark, measure, observeLongTasks, logMetrics, reportWebVitals } from './utils/performance';

// Mark the start of the application
mark('app-start');

// Initialize performance monitoring
const initPerformance = () => {
  // Start observing long tasks
  observeLongTasks();
  
  // Report web vitals
  if (process.env.NODE_ENV === 'production') {
    reportWebVitals((metric) => {
      console.log(metric);
    });
  }
};

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

// Initialize the application
const initApp = async () => {
  try {
    // Initialize performance monitoring
    initPerformance();
    
    // Initialize mobile optimizations
    initMobileOptimizations();
    
    // Register service worker in production
    if (process.env.NODE_ENV === 'production') {
      try {
        await registerServiceWorker();
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
    
    // Mark app as loaded
    mark('app-loaded');
    measure('app-boot', 'app-start', 'app-loaded');
    
  } catch (error) {
    console.error('Failed to initialize application:', error);
  }
};

// Start the application
initApp().catch(console.error);

// Log performance metrics in development
if (process.env.NODE_ENV !== 'production') {
  window.addEventListener('load', () => {
    logMetrics();
  });
}
