import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const OptimizedImage = ({
  src,
  alt = '',
  width,
  height,
  className = '',
  loading = 'lazy',
  quality = 80,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState('');
  const [isWebPSupported, setIsWebPSupported] = useState(false);
  const imgRef = useRef(null);
  const observerRef = useRef(null);

  // Check WebP support
  useEffect(() => {
    const checkWebPSupport = () => {
      const elem = document.createElement('canvas');
      return elem.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    };
    
    setIsWebPSupported(checkWebPSupport());
  }, []);

  // Convert to WebP if supported
  const getOptimizedSrc = (url) => {
    if (!url) return '';
    
    // If it's an external URL or already processed, return as is
    if (url.startsWith('http') || url.includes('data:')) {
      return url;
    }

    // For local images, use WebP if supported
    if (isWebPSupported) {
      // In a production environment, you would use an image CDN or server-side processing
      // For now, we'll just return the original URL
      return url;
    }
    
    return url;
  };

  // Lazy load implementation
  useEffect(() => {
    if (!imgRef.current) return;

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = new Image();
          const optimizedSrc = getOptimizedSrc(src);
          
          img.src = optimizedSrc;
          img.onload = () => {
            setImageSrc(optimizedSrc);
            setIsLoaded(true);
          };
          
          // Disconnect observer after loading
          if (observerRef.current) {
            observerRef.current.disconnect();
          }
        }
      });
    };

    // Only use IntersectionObserver for lazy loading
    if (loading === 'lazy' && typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      observerRef.current = new IntersectionObserver(handleIntersection, {
        rootMargin: '200px',
        threshold: 0.01,
      });
      observerRef.current.observe(imgRef.current);
    } else {
      // Load immediately if not using lazy loading or if IntersectionObserver is not supported
      setImageSrc(getOptimizedSrc(src));
      setIsLoaded(true);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [src, loading, isWebPSupported]);

  // Calculate aspect ratio padding
  const paddingBottom = height && width ? `${(height / width) * 100}%` : '0';

  return (
    <div 
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      style={{
        paddingBottom: paddingBottom,
        backgroundColor: isLoaded ? 'transparent' : '#f3f4f6',
      }}
    >
      {imageSrc && (
        <img
          src={imageSrc}
          alt={alt}
          width={width}
          height={height}
          loading={loading}
          decoding="async"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            contentVisibility: 'auto',
          }}
          {...props}
        />
      )}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
      )}
    </div>
  );
};

OptimizedImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  className: PropTypes.string,
  loading: PropTypes.oneOf(['lazy', 'eager']),
  quality: PropTypes.number,
};

export default React.memo(OptimizedImage);
