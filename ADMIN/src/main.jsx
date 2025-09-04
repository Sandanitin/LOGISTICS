import { StrictMode, lazy, Suspense, startTransition } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { mark } from './utils/performance';
import { initFontLoading, loadNonCriticalCSS } from './utils/fontLoader';
import { setViewportHeight, preventDoubleTapZoom, isMobile } from './utils/mobileUtils';
import { initLayoutShiftDebugger } from './utils/layoutShiftDebugger';
import LoadingSpinner from './components/common/LoadingSpinner';
import './index.css';
import './styles/mobile.css';
import './styles/layout-shift-fix.css';

// Mark the start of the application
mark('app-start');

// Initialize layout shift debugging in development
if (process.env.NODE_ENV === 'development') {
  window.addEventListener('load', () => {
    setTimeout(initLayoutShiftDebugger, 1000);
  });
}

// Lazy load heavy components
const App = lazy(() => 
  Promise.all([
    import('./App'),
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
    // Add a class when fonts are loaded
    if (document.fonts) {
      document.fonts.ready.then(() => {
        document.documentElement.classList.add('fonts-loaded');
      });
    } else {
      document.documentElement.classList.add('fonts-loaded');
    }

    // Set initial viewport height and prevent zoom
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

    // Add a class when the page is fully interactive
    window.addEventListener('load', () => {
      document.documentElement.classList.add('page-loaded');
    });
  }

  // Measure initialization time
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
