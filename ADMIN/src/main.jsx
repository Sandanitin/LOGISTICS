import { StrictMode, lazy, Suspense, useEffect, startTransition } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { mark, measure } from './utils/performance';
import { initFontLoading, loadNonCriticalCSS } from './utils/fontLoader';
import { setViewportHeight, preventDoubleTapZoom, isMobile } from './utils/mobileUtils';
import LoadingSpinner from './components/common/LoadingSpinner';
import './index.css';
import './styles/mobile.css';

// Mark the start of the application
mark('app-start');

// Lazy load heavy components with prefetching
const App = lazy(() => 
  Promise.all([
    import('./App'),
    // Only preload existing CSS files
    import('./index.css')
  ]).then(([moduleExports]) => moduleExports)
);

const MobileLayout = lazy(() => import('./components/MobileLayout'));

// Initialize performance monitoring and optimizations
const initApp = () => {
  // Mark the start of initialization
  mark('app_init');

  // Initialize mobile optimizations
  if (typeof window !== 'undefined') {
    setViewportHeight();
    preventDoubleTapZoom();
    
    // Initialize font loading and critical CSS
    initFontLoading();
    
    // Load non-critical CSS after initial render
    const loadNonCritical = () => {
      requestIdleCallback(() => {
        loadNonCriticalCSS();
      });
    };

    if (document.readyState === 'complete') {
      loadNonCritical();
    } else {
      window.addEventListener('load', loadNonCritical, { once: true });
    }
  }

  // Measure initialization time using a single mark (time since page load)
  if (typeof window !== 'undefined' && window.performance) {
    performance.measure('app_initialization', 'navigationStart');
  }
};

// Initialize the application
initApp();

// Create root with concurrent features
const container = document.getElementById('root');
const root = createRoot(container, { identifierPrefix: 'logistics-admin-' });

// Render the app with concurrent rendering
startTransition(() => {
  root.render(
    <StrictMode>
      <BrowserRouter>
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-screen">
            <LoadingSpinner size="large" />
          </div>
        }>
          {isMobile() ? <MobileLayout /> : <App />}
          {process.env.NODE_ENV === 'production' && <SpeedInsights debug={false} />}
        </Suspense>
      </BrowserRouter>
    </StrictMode>
  );
});

// Log performance metrics in development
if (process.env.NODE_ENV === 'development') {
  console.log('Development mode - performance monitoring active');
  // Only measure if we're in production
  if (process.env.NODE_ENV === 'production') {
    mark('app-rendered');
    measure('app-boot', 'app-start', 'app-rendered');
  }
}
