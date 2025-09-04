import { useEffect } from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import { setViewportHeight, preventDoubleTapZoom, isMobile } from './utils/mobileUtils';
import './styles/mobile.css';

const App = () => {
  const location = useLocation();

  // Initialize mobile optimizations
  useEffect(() => {
    // Set up viewport height handling
    const cleanupViewport = setViewportHeight();
    
    // Prevent double-tap zoom on mobile
    const cleanupTapZoom = preventDoubleTapZoom();
    
    // Add mobile class to body if on mobile
    if (isMobile()) {
      document.body.classList.add('mobile-device');
    }

    // Cleanup function
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
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
