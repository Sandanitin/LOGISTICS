/**
 * Image optimization utility
 * Provides functions to handle responsive images and WebP conversion
 */

/**
 * Generates responsive image sources for picture element
 * @param {string} src - The image source
 * @param {Object} options - Options for image generation
 * @param {number[]} [options.widths=[320, 480, 768, 1024, 1280, 1600]] - Array of image widths to generate
 * @param {string} [options.sizes='(max-width: 1024px) 100vw, 1024px'] - Sizes attribute for the image
 * @param {string} [options.alt=''] - Alt text for the image
 * @param {string} [options.className=''] - CSS class for the image
 * @param {boolean} [options.lazy=true] - Whether to use lazy loading
 * @returns {Object} - Object containing srcSet, src, and other attributes
 */
export const getResponsiveImage = (src, {
  widths = [320, 480, 768, 1024, 1280, 1600],
  sizes = '(max-width: 1024px) 100vw, 1024px',
  alt = '',
  className = '',
  lazy = true,
} = {}) => {
  if (!src) return null;

  const isExternal = src.startsWith('http');
  const basePath = isExternal ? '' : '/';
  const fileName = src.split('/').pop();
  const [name, ext] = fileName.split('.');
  
  // Generate WebP sources
  const webpSrcSet = widths
    .map(width => `${basePath}images/${name}-${width}.webp ${width}w`)
    .join(', ');

  // Generate original format sources
  const imgSrcSet = widths
    .map(width => `${basePath}images/${name}-${width}.${ext} ${width}w`)
    .join(', ');

  return {
    src: `${basePath}images/${fileName}`,
    srcSet: imgSrcSet,
    webpSrcSet,
    sizes,
    alt,
    className,
    loading: lazy ? 'lazy' : 'eager',
    decoding: 'async',
  };
};

/**
 * Optimized Image component that handles responsive images and WebP
 */
export const OptimizedImage = ({
  src,
  alt = '',
  className = '',
  width,
  height,
  sizes = '(max-width: 1024px) 100vw, 1024px',
  lazy = true,
  ...props
}) => {
  if (!src) return null;

  const isExternal = src.startsWith('http');
  
  if (isExternal) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        width={width}
        height={height}
        loading={lazy ? 'lazy' : 'eager'}
        decoding="async"
        {...props}
      />
    );
  }

  const imageData = getResponsiveImage(src, { sizes, alt, className, lazy });
  
  return (
    <picture>
      <source
        type="image/webp"
        srcSet={imageData.webpSrcSet}
        sizes={sizes}
      />
      <source
        type={`image/${imageData.src.split('.').pop()}`}
        srcSet={imageData.srcSet}
        sizes={sizes}
      />
      <img
        src={imageData.src}
        alt={alt}
        className={className}
        width={width}
        height={height}
        loading={lazy ? 'lazy' : 'eager'}
        decoding="async"
        {...props}
      />
    </picture>
  );
};

/**
 * Preloads critical images
 * @param {string[]} imageUrls - Array of image URLs to preload
 */
export const preloadImages = (imageUrls) => {
  if (typeof window === 'undefined') return;
  
  imageUrls.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = url;
    link.fetchPriority = 'high';
    document.head.appendChild(link);
  });
};

/**
 * Lazy loads images when they enter the viewport
 * @param {string} selector - CSS selector for images to lazy load
 */
export const lazyLoadImages = (selector = 'img[loading="lazy"]') => {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

  const lazyImages = document.querySelectorAll(selector);
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
        }
        if (img.dataset.srcset) {
          img.srcset = img.dataset.srcset;
        }
        img.removeAttribute('data-src');
        img.removeAttribute('data-srcset');
        observer.unobserve(img);
      }
    });
  }, {
    rootMargin: '200px 0px',
    threshold: 0.01
  });

  lazyImages.forEach(img => imageObserver.observe(img));

  return () => {
    lazyImages.forEach(img => imageObserver.unobserve(img));
  };
};
