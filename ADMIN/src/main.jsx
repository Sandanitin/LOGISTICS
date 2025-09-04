import { StrictMode, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { SpeedInsights } from '@vercel/speed-insights/react';
import LoadingSpinner from './components/common/LoadingSpinner';
import './index.css';

// Lazy load heavy components
const App = lazy(() => import('./App'));
const MobileLayout = lazy(() => import('./components/MobileLayout'));

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
        <App />
        {process.env.NODE_ENV === 'production' && <SpeedInsights debug={false} />}
      </Suspense>
    </BrowserRouter>
  </StrictMode>
);

// Log development mode
if (process.env.NODE_ENV === 'development') {
  console.log('Development mode');
}
