/**
 * Performance monitoring and measurement utilities
 */

// Performance metrics storage
const metrics = {
  navigationStart: performance.now(),
  marks: {},
  measures: {},
};

/**
 * Marks a specific point in time for performance measurement
 * @param {string} name - Name of the mark
 */
export const mark = (name) => {
  if (typeof performance !== 'undefined' && performance.mark) {
    performance.mark(name);
    metrics.marks[name] = performance.now();
  }
};

/**
 * Measures the duration between two marks
 * @param {string} name - Name of the measure
 * @param {string} startMark - Name of the starting mark
 * @param {string} endMark - Name of the ending mark
 */
export const measure = (name, startMark, endMark) => {
  if (typeof performance !== 'undefined' && performance.measure) {
    try {
      performance.measure(name, startMark, endMark);
      const measures = performance.getEntriesByName(name, 'measure');
      const lastMeasure = measures[measures.length - 1];
      metrics.measures[name] = lastMeasure.duration;
      return lastMeasure.duration;
    } catch (e) {
      console.warn(`Failed to measure ${name}:`, e);
      return 0;
    }
  }
  return 0;
};

/**
 * Gets the time since navigation start
 * @returns {number} Time in milliseconds
 */
export const timeSinceNavigationStart = () => {
  return performance.now() - metrics.navigationStart;
};

/**
 * Logs all performance marks and measures
 */
export const logMetrics = () => {
  if (process.env.NODE_ENV !== 'production') {
    console.group('Performance Metrics');
    
    // Log marks
    console.group('Marks');
    Object.entries(metrics.marks).forEach(([name, time]) => {
      console.log(`${name}: ${(time - metrics.navigationStart).toFixed(2)}ms`);
    });
    console.groupEnd();
    
    // Log measures
    console.group('Measures');
    Object.entries(metrics.measures).forEach(([name, duration]) => {
      console.log(`${name}: ${duration.toFixed(2)}ms`);
    });
    console.groupEnd();
    
    // Log navigation timing
    if ('performance' in window && performance.getEntriesByType) {
      const navigation = performance.getEntriesByType('navigation')[0];
      if (navigation) {
        console.group('Navigation Timing');
        console.log(`Page load: ${navigation.loadEventEnd - navigation.startTime}ms`);
        console.log(`DOM Content Loaded: ${navigation.domContentLoadedEventEnd - navigation.startTime}ms`);
        console.log(`TTFB: ${navigation.responseStart - navigation.requestStart}ms`);
        console.groupEnd();
      }
    }
    
    console.groupEnd();
  }
};

/**
 * Measures the time taken to execute a function
 * @param {Function} fn - Function to measure
 * @param {string} name - Name of the measurement
 * @returns {*} The result of the function
 */
export const measureExecution = (fn, name = 'unnamed') => {
  const start = performance.now();
  const result = fn();
  const end = performance.now();
  
  if (process.env.NODE_ENV !== 'production') {
    console.log(`[Performance] ${name} took ${(end - start).toFixed(2)}ms`);
  }
  
  metrics.measures[name] = end - start;
  return result;
};

/**
 * Tracks long tasks using the Performance Observer API
 */
export const observeLongTasks = () => {
  if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.duration > 50) { // Log tasks longer than 50ms
          console.warn(`Long task detected: ${entry.duration.toFixed(2)}ms`, entry);
        }
      });
    });
    
    observer.observe({ entryTypes: ['longtask'] });
    return observer;
  }
  return null;
};

/**
 * Measures the time to interactive (TTI)
 * @returns {Promise<number>} Time to interactive in milliseconds
 */
export const measureTTI = () => {
  return new Promise((resolve) => {
    if ('PerformanceLongTaskTiming' in window) {
      const ttiPolyfill = () => {
        const tti = window.ttiPolyfill.getFirstConsistentlyInteractive();
        if (tti) {
          resolve(tti);
          return true;
        }
        return false;
      };
      
      if (!ttiPolyfill()) {
        const interval = setInterval(() => {
          if (ttiPolyfill()) {
            clearInterval(interval);
          }
        }, 100);
      }
    } else {
      // Fallback to DOMContentLoaded if TTI polyfill is not available
      if (document.readyState === 'complete') {
        resolve(performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart);
      } else {
        window.addEventListener('load', () => {
          resolve(performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart);
        });
      }
    }
  });
};

// Initialize performance monitoring
if (typeof window !== 'undefined') {
  // Mark the initial load
  mark('app-init');
  
  // Log metrics when the page is fully loaded
  if (document.readyState === 'complete') {
    mark('load');
    measure('app-boot', 'app-init', 'load');
    logMetrics();
  } else {
    window.addEventListener('load', () => {
      mark('load');
      measure('app-boot', 'app-init', 'load');
      logMetrics();
    });
  }
  
  // Log when the page is being unloaded
  window.addEventListener('beforeunload', () => {
    mark('unload');
    measure('session-duration', 'app-init', 'unload');
    logMetrics();
  });
}
