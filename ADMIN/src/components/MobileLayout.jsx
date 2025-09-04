import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const MobileLayout = ({ children }) => {
  const location = useLocation();

  // Reset scroll position on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Prevent zoom on mobile devices
  useEffect(() => {
    const handleTouchMove = (e) => {
      if (e.scale !== 1) {
        e.preventDefault();
      }
    };

    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    return () => {
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
    <div 
      style={{
        WebkitOverflowScrolling: 'touch',
        touchAction: 'manipulation',
        maxWidth: '100vw',
        overflowX: 'hidden',
        position: 'relative',
        minHeight: '100vh',
      }}
    >
      {children}
    </div>
  );
};

export default MobileLayout;
