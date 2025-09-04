import React, { useState } from 'react';
import PropTypes from 'prop-types';

const FullBleedImage = ({ 
  src, 
  alt = '', 
  height = '100vh',
  overlayColor = 'rgba(0, 0, 0, 0.3)',
  children,
  className = ''
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div 
      className={`relative w-full overflow-hidden ${className}`}
      style={{
        height,
        margin: '0 calc(50% - 50vw)',
        width: '100vw',
        position: 'relative',
        left: '50%',
        right: '50%',
        transform: 'translateX(-50%)',
      }}
    >
      {/* Image */}
      <img
        src={src}
        alt={alt}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={() => setIsLoaded(true)}
        loading="lazy"
      />
      
      {/* Overlay */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundColor: overlayColor,
          transition: 'opacity 0.3s ease'
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 h-full w-full">
        {children}
      </div>
      
      {/* Loading state */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
      )}
    </div>
  );
};

FullBleedImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  overlayColor: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
};

export default FullBleedImage;
