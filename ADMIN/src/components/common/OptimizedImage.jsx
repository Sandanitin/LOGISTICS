import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const OptimizedImage = ({ 
  src, 
  alt, 
  width, 
  height, 
  className = '',
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width, height });

  // Handle image load
  const handleLoad = () => {
    if (imgRef.current) {
      setDimensions({
        width: imgRef.current.naturalWidth,
        height: imgRef.current.naturalHeight
      });
    }
    setIsLoaded(true);
  };

  // Calculate aspect ratio padding
  const aspectRatio = (dimensions.height / dimensions.width) * 100;
  const paddingBottom = `${aspectRatio}%`;

  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      style={{
        position: 'relative',
        paddingBottom: paddingBottom,
        height: 0,
        backgroundColor: isLoaded ? 'transparent' : '#f3f4f6'
      }}
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={handleLoad}
        width={dimensions.width}
        height={dimensions.height}
        {...props}
      />
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse"></div>
      )}
    </div>
  );
};

OptimizedImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  className: PropTypes.string
};

export default React.memo(OptimizedImage);
