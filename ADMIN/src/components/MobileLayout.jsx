import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const MobileLayout = ({ children }) => {
  const location = useLocation();

  /
  // Prevent zoom on mobile devices but allow scrolling
  useEffect(() => {
    const handleTouchMove = (e) => {
      // Only prevent default for multi-touch (pinch zoom)
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };

    
    
    // Add passive: true for better scrolling performance
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    
    return () => {
      document.removeEventListener('touchmove', handleTouchMove);
     
    };
  }, []);

  return (
    <div 
      style={{
      
        touchAction: 'pan-y', // Allow vertical panning
        maxWidth: '100vw',
        overflowX: 'hidden',
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        height: '100%',
        overflowY: 'auto', // Ensure vertical scrolling is enabled
        WebkitBackfaceVisibility: 'hidden', // Fix for iOS rendering
      }}
    >
      {children}
    </div>
  );
};

export default MobileLayout;
