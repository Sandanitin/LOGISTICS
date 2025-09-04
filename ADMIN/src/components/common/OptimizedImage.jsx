import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const OptimizedImage = ({
  src,
  srcSet,
  sizes,
  alt = '',
  width,
  height,
  className = '',
  loading = 'lazy',
  decoding = 'async',
  style = {},
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    if (!src || !('IntersectionObserver' in window)) {
      loadImage();
      return;
    }

    if (imgRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              loadImage();
              observerRef.current?.disconnect();
            }
          });
        },
        {
          root: null,
          rootMargin: '200px',
          threshold: 0.01,
        }
      );

      observerRef.current.observe(imgRef.current);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [src]);

  const loadImage = () => {
    if (!src) return;

    const img = new Image();
    img.src = src;
    
    if (srcSet) {
      img.srcset = srcSet;
    }
    
    if (sizes) {
      img.sizes = sizes;
    }

    img.onload = () => {
      setIsLoaded(true);
    };

    img.onerror = () => {
      setHasError(true);
    };
  };

  // Generate WebP and AVIF sources if not provided
  const getSourceSet = (format) => {
    if (!srcSet) return '';
    return srcSet
      .split(',')
      .map((src) => src.trim().replace(/\.(jpg|jpeg|png)/i, `.${format} ${format}`))
      .join(',');
  };

  const webpSrcSet = getSourceSet('webp');
  const avifSrcSet = getSourceSet('avif');

  // If there's an error or no source, return null or a placeholder
  if (hasError) {
    return <div className={`${className} image-error`} style={style} {...props} />;
  }

  // If image is not loaded yet, show a placeholder with the same aspect ratio
  if (!isLoaded) {
    return (
      <div 
        ref={imgRef}
        className={`${className} image-loading`} 
        style={{
          ...style,
          width: width || '100%',
          aspectRatio: width && height ? `${width}/${height}` : '16/9',
          backgroundColor: '#f0f0f0',
        }}
        {...props}
      />
    );
  }

  return (
    <picture>
      {/* AVIF format (smallest file size, best quality) */}
      {avifSrcSet && (
        <source 
          type="image/avif" 
          srcSet={avifSrcSet}
          sizes={sizes}
        />
      )}
      
      {/* WebP format (good balance of quality and size) */}
      {webpSrcSet && (
        <source 
          type="image/webp" 
          srcSet={webpSrcSet}
          sizes={sizes}
        />
      )}
      
      {/* Fallback to original image */}
      <img
        ref={imgRef}
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        width={width}
        height={height}
        className={`${className} ${isLoaded ? 'image-loaded' : ''}`}
        loading={loading}
        decoding={decoding}
        style={{
          ...style,
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out',
        }}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        {...props}
      />
    </picture>
  );
};

OptimizedImage.propTypes = {
  src: PropTypes.string.isRequired,
  srcSet: PropTypes.string,
  sizes: PropTypes.string,
  alt: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
  loading: PropTypes.oneOf(['lazy', 'eager']),
  decoding: PropTypes.oneOf(['async', 'sync', 'auto']),
  style: PropTypes.object,
};

export default React.memo(OptimizedImage);
