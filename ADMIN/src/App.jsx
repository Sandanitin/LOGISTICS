import { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoadingSpinner from './components/common/LoadingSpinner';
import { setViewportHeight, preventDoubleTapZoom, isMobile } from './utils/mobileUtils';
import './styles/mobile.css';

// Lazy load route components
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Contact = lazy(() => import('./pages/Contact'));

// Loading component for Suspense fallback
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <LoadingSpinner size="lg" />
  </div>
);

const App = () => {
  const location = useLocation();

  // Initialize mobile optimizations
  useEffect(() => {
    const cleanupViewport = setViewportHeight();
    const cleanupTapZoom = preventDoubleTapZoom();
    
    if (isMobile()) {
      document.body.classList.add('mobile-device');
    }

    return () => {
      cleanupViewport();
      cleanupTapZoom();
      document.body.classList.remove('mobile-device');
    };
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="app-container">
      <Toaster 
        position={isMobile() ? "top-center" : "top-right"} 
        toastOptions={{
          duration: 4000,
          style: {
            fontSize: isMobile() ? '14px' : '16px',
            padding: isMobile() ? '12px 16px' : '16px 24px',
            margin: isMobile() ? '8px' : '0',
            maxWidth: isMobile() ? '90%' : '420px',
          },
        }}
      />
      <Navbar />
      <main className="main-content">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default App;
