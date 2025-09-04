import { Suspense, lazy, useEffect, useState } from 'react';
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoadingSpinner from "./components/common/LoadingSpinner";
import { useScrollToTop } from './hooks/useScrollToTop';

// Lazy load route components
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Contact = lazy(() => import('./pages/Contact'));

// Loading component for Suspense fallback
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <LoadingSpinner size="large" />
  </div>
);

const App = () => {
  // Use the custom scroll to top hook
  useScrollToTop();
  
  // Mobile detection state
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      const userAgent = typeof window.navigator === 'undefined' ? '' : navigator.userAgent;
      const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
      setIsMobile(mobile);
    };

    // Initial check
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Add/remove mobile class to body
  useEffect(() => {
    if (isMobile) {
      document.body.classList.add('mobile-device');
    } else {
      document.body.classList.remove('mobile-device');
    }
    
    return () => {
      document.body.classList.remove('mobile-device');
    };
  }, [isMobile]);

  return (
    <div className="app-container">
      <Toaster 
        position={isMobile ? "top-center" : "top-right"} 
        toastOptions={{
          duration: 4000,
          style: {
            fontSize: isMobile ? '14px' : '16px',
            padding: isMobile ? '12px 16px' : '16px 24px',
            margin: isMobile ? '8px' : '0',
            maxWidth: isMobile ? '90%' : '420px',
          },
        }}
      />
      <Navbar />
      <main className="flex-grow">
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
