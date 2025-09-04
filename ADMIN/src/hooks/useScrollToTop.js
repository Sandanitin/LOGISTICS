import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Function to handle scroll to top
    const scrollToTop = () => {
      try {
        // Try standard method first
        window.scrollTo(0, 0);
        
        // Try different scroll properties for different browsers
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        
        // Force a reflow/repaint
        const scrollY = window.scrollY;
        if (scrollY > 0) {
          document.body.style.overflow = 'hidden';
          window.scrollTo(0, scrollY - 1);
          document.body.style.overflow = '';
        }
      } catch (error) {
        console.warn('Scroll to top failed:', error);
      }
    };

    // Scroll immediately
    scrollToTop();
    
    // Try again after a short delay
    const timer1 = setTimeout(scrollToTop, 50);
    const timer2 = setTimeout(scrollToTop, 200);
    
    // Cleanup
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [pathname]);
};
