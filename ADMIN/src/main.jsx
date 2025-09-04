import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { SpeedInsights } from '@vercel/speed-insights/react';
import App from './App';
import './index.css';

// Create root
const root = createRoot(document.getElementById('root'));

// Render the app
root.render(
  <StrictMode>
    <BrowserRouter>
      <App />
      {process.env.NODE_ENV === 'production' && <SpeedInsights debug={false} />}
    </BrowserRouter>
  </StrictMode>
);

// Log development mode
if (process.env.NODE_ENV === 'development') {
  console.log('Development mode');
}
