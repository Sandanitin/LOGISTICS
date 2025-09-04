import { useEffect } from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";

const App = () => {
  const location = useLocation();

  // Enhanced scroll restoration with touch support
  useEffect(() => {
    const handleScroll = () => {
      // Store scroll position before navigation
      sessionStorage.setItem(`scroll-${location.pathname}`, window.scrollY);
    };

    // Restore scroll position or scroll to top
    const scrollY = sessionStorage.getItem(`scroll-${location.pathname}`);
    if (scrollY) {
      window.scrollTo(0, parseInt(scrollY, 10));
    } else {
      // Smooth scroll to top on route change
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.pathname]);

  // Add touch-action CSS for better touch scrolling
  useEffect(() => {
    document.documentElement.style.touchAction = 'manipulation';
    document.body.style.overscrollBehaviorY = 'contain';
    
    return () => {
      document.documentElement.style.touchAction = '';
      document.body.style.overscrollBehaviorY = '';
    };
  }, []);

  return (
    <div className="app-container" style={{
      WebkitOverflowScrolling: 'touch',
      overflowX: 'hidden',
      width: '100%',
      height: '100%',
      position: 'relative'
    }}>
      <Toaster position="top-right" />
      <Navbar />
      <main className="min-h-screen w-full" style={{
        WebkitOverflowScrolling: 'touch',
        overflowX: 'hidden',
        width: '100%',
        flex: '1 0 auto'
      }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer style={{
        flexShrink: 0
      }} />
    </div>
  );
};

export default App;
