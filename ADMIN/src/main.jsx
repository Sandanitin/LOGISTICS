import { StrictMode, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { mark, measure, observeLongTasks } from './utils/performance';
import { setViewportHeight, preventDoubleTapZoom, isMobile } from './utils/mobileUtils';
import LoadingSpinner from './components/common/LoadingSpinner';
import './index.css';
import './styles/mobile.css';

// Lazy load heavy components
const App = lazy(() => import('./App'));
const MobileLayout = lazy(() => import('./components/MobileLayout'));

// Mark the start of the application
mark('app-start');

// Initialize performance monitoring
const initPerformance = () => {
  if (process.env.NODE_ENV === 'production') {
    observeLongTasks();
  }
};

// Initialize mobile optimizations
const initMobileOptimizations = () => {
  setViewportHeight();
  preventDoubleTapZoom();
  
  if (isMobile()) {
    document.body.classList.add('mobile-device');
  }
};

// Initialize the application
const initApp = async () => {
  try {
    initPerformance();
    initMobileOptimizations();

    const root = createRoot(document.getElementById('root'));
    
    root.render(
      <StrictMode>
        <BrowserRouter>
          <Suspense fallback={
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
              width: '100%'
            }}>
              <LoadingSpinner size="large" />
            </div>
          }>
            <MobileLayout>
              <App />
              <SpeedInsights />
            </MobileLayout>
          </Suspense>
        </BrowserRouter>
      </StrictMode>
    );

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
    const { logMetrics } = import('./utils/performance');
    logMetrics();
  });
}
