/**
 * Performance Monitoring Utility
 * Provides methods for measuring and monitoring application performance.
 */

// Check if the Performance API is available
const isPerformanceAvailable = () => {
  return (
    typeof window !== 'undefined' &&
    'performance' in window &&
    typeof window.performance.mark === 'function' &&
    typeof window.performance.measure === 'function'
  );
};

/**
 * Creates a performance mark
 * @param {string} name - The name of the mark
 */
export const mark = (name) => {
  if (!isPerformanceAvailable()) return;
  
  try {
    performance.mark(`mark_${name}_start`);
  } catch (e) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`Failed to create mark: ${name}`, e);
    }
  }
};

/**
 * Measures the duration between two marks
 * @param {string} name - The name of the measure
 * @param {string} startMark - The name of the starting mark
 * @param {string} endMark - The name of the ending mark
 */
export const measure = (name, startMark, endMark) => {
  if (!isPerformanceAvailable()) return;
  
  try {
    const startMarkName = `mark_${startMark}_start`;
    const endMarkName = `mark_${endMark}_start`;
    
    // Check if marks exist before measuring
    const marks = performance.getEntriesByType('mark');
    const hasStartMark = marks.some(mark => mark.name === startMarkName);
    const hasEndMark = marks.some(mark => mark.name === endMarkName);
    
    if (hasStartMark && hasEndMark) {
      performance.measure(name, startMarkName, endMarkName);
      
      // Clean up marks to avoid buffer overflow
      performance.clearMarks(startMarkName);
      performance.clearMarks(endMarkName);
      performance.clearMeasures(name);
    } else if (process.env.NODE_ENV === 'development') {
      console.warn(`Could not measure ${name}: marks not found`);
    }
  } catch (e) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`Failed to measure ${name}`, e);
    }
  }
};

// Monitor long tasks (tasks that take > 50ms)
export const observeLongTasks = () => {
  if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        console.log('[Long Task]', entry);
      }
    });
    observer.observe({ entryTypes: ['longtask'] });
    return observer;
  }
  return null;
};

// Log performance metrics
export const logMetrics = () => {
  if (window.performance) {
    // Log navigation timing
    const timing = window.performance.timing;
    if (timing) {
      console.log('Navigation Timing:', {
        dns: timing.domainLookupEnd - timing.domainLookupStart,
        tcp: timing.connectEnd - timing.connectStart,
        ttfb: timing.responseStart - timing.requestStart,
        download: timing.responseEnd - timing.responseStart,
        domLoaded: timing.domComplete - timing.domLoading,
        total: timing.loadEventEnd - timing.navigationStart,
      });
    }

    // Log web vitals
    if (window.performance.getEntriesByType) {
      const resources = performance.getEntriesByType('resource');
      console.log('Resources loaded:', resources.length);
      
      // Log largest contentful paint
      const paintEntries = performance.getEntriesByType('paint');
      paintEntries.forEach(entry => {
        console.log(`[${entry.name}] ${Math.round(entry.startTime)}ms`);
      });
    }
  }
};

// Debounce function for performance-critical operations
export const debounce = (func, wait, immediate = false) => {
  let timeout;
  return function() {
    const context = this;
    const args = arguments;
    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

// Throttle function for scroll/resize events
export const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Measure time to interactive
export const measureTTI = () => {
  return new Promise((resolve) => {
    const ttiThreshold = 50; // ms of quiet time required to be considered TTI
    const minTime = 5000; // Minimum time before we can consider TTI
    const maxTime = 10000; // Maximum time to wait for TTI
    
    let lastLongTask = performance.now();
    let ttiTimeout;
    
    const checkTTI = () => {
      const now = performance.now();
      const timeSinceLongTask = now - lastLongTask;
      
      if (timeSinceLongTask >= ttiThreshold && now >= minTime) {
        // We've found TTI
        clearTimeout(ttiTimeout);
        resolve(Math.round(now));
      } else {
        // Keep checking
        requestAnimationFrame(checkTTI);
      }
    };
    
    // Set up long task observer
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        lastLongTask = Math.max(lastLongTask, entry.startTime + entry.duration);
      }
    });
    
    observer.observe({ entryTypes: ['longtask'] });
    
    // Start checking for TTI
    requestAnimationFrame(checkTTI);
    
    // Set a maximum time to resolve
    ttiTimeout = setTimeout(() => {
      resolve(Math.round(performance.now()));
    }, maxTime);
  });
};

// Log web vitals
export const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

// Initialize all performance monitoring
export const initPerformanceMonitoring = () => {
  if (process.env.NODE_ENV === 'production') {
    observeLongTasks();
    observeLayoutShifts();
    observeLCP((entry) => {
      console.log('LCP:', entry);
    });
  }
};

export default {
  mark,
  measure,
  observeLongTasks,
  logMetrics,
  debounce,
  throttle,
  measureTTI,
  reportWebVitals,
  initPerformanceMonitoring
};
