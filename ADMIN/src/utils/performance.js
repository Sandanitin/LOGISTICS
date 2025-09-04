// Performance monitoring and optimization utilities

export const mark = (name) => {
  if (window.performance?.mark) {
    performance.mark(`mark_${name}_start`);
  }
  return performance.now();
};

export const measure = (name, startMark, endMark) => {
  if (window.performance?.measure) {
    performance.measure(name, `mark_${startMark}_start`, `mark_${endMark}_end`);
    performance.clearMarks(`mark_${startMark}_start`);
    performance.clearMarks(`mark_${endMark}_end`);
    performance.clearMeasures(name);
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

export default {
  mark,
  measure,
  observeLongTasks,
  logMetrics,
  debounce,
  throttle,
  measureTTI,
  reportWebVitals
};
