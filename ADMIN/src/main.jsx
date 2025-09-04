import { StrictMode, lazy, Suspense, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { mark, measure } from './utils/performance';
import { initFontLoading, loadNonCriticalCSS } from './utils/fontLoader';
import { setViewportHeight, preventDoubleTapZoom, isMobile } from './utils/mobileUtils';
import LoadingSpinner from './components/common/LoadingSpinner';
import './index.css';
import './styles/mobile.css';

// Lazy load heavy components
const App = lazy(() => import('./App'));
const MobileLayout = lazy(() => import('./components/MobileLayout'));

// Mark the start of the application
mark('app-start');

// Initialize performance monitoring and optimizations
const initApp = () => {
  // Initialize mobile optimizations
  setViewportHeight();
  preventDoubleTapZoom();
  
  // Initialize font loading and critical CSS
  initFontLoading();
  
  // Load non-critical CSS after initial render
  if (document.readyState === 'complete') {
    loadNonCriticalCSS();
  } else {
    window.addEventListener('load', loadNonCriticalCSS, { once: true });
  }

  // Mark app as initialized
  mark('app-initialized');
};

// Initialize the application
initApp();

// Create root
const root = createRoot(document.getElementById('root'));

// Render the app
root.render(
  <StrictMode>
    <BrowserRouter>
      <Suspense 
        fallback={
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            width: '100%',
          }}>
            <LoadingSpinner size="large" />
          </div>
        }
      >
        {isMobile() ? <MobileLayout /> : <App />}
        {process.env.NODE_ENV === 'production' && <SpeedInsights debug={false} />}
      </Suspense>
    </BrowserRouter>
  </StrictMode>
);

// Log performance metrics in development
if (process.env.NODE_ENV === 'development') {
  console.log('Development mode - performance monitoring active');
  // Only measure if we're in production
  if (process.env.NODE_ENV === 'production') {
    mark('app-rendered');
    measure('app-boot', 'app-start', 'app-rendered');
  }
}
