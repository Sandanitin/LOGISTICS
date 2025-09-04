import { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoadingSpinner from "./components/common/LoadingSpinner";
import { isMobile } from './utils/deviceUtils';

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
  const location = useLocation();
  const mobile = isMobile();

  // Add mobile class to body if on mobile
  useEffect(() => {
    if (mobile) {
      document.body.classList.add('mobile-device');
      return () => {
        document.body.classList.remove('mobile-device');
      };
    }
  }, [mobile]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="app-container">
      <Toaster 
        position={mobile ? "top-center" : "top-right"} 
        toastOptions={{
          duration: 4000,
          style: {
            fontSize: mobile ? '14px' : '16px',
            padding: mobile ? '12px 16px' : '16px 24px',
            margin: mobile ? '8px' : '0',
            maxWidth: mobile ? '90%' : '420px',
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
