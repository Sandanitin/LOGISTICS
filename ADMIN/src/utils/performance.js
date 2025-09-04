// Performance measurement utilities

export function mark(name) {
  if (typeof window !== 'undefined' && window.performance && performance.mark) {
    try {
      performance.mark(`mark_${name}_start`);
      return true;
    } catch (e) {
      console.warn(`Failed to create mark '${name}':`, e);
    }
  }
  return false;
}

export function measure(name, startMark, endMark) {
  if (typeof window !== 'undefined' && window.performance && performance.measure) {
    try {
      const startMarkName = startMark ? `mark_${startMark}_start` : undefined;
      const endMarkName = endMark ? `mark_${endMark}_end` : undefined;
      
      // Check if marks exist before measuring
      if (startMarkName && !performance.getEntriesByName(startMarkName, 'mark').length) {
        console.warn(`Start mark '${startMark}' not found for measure '${name}'`);
        return;
      }
      
      if (endMarkName && !performance.getEntriesByName(endMarkName, 'mark').length) {
        console.warn(`End mark '${endMark}' not found for measure '${name}'`);
        return;
      }
      
      performance.measure(`measure_${name}`, startMarkName, endMarkName);
    } catch (e) {
      console.warn(`Failed to measure '${name}':`, e);
    }
  }
}

// Add a performance mark when the script loads
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    mark('page_fully_loaded');
  });
}
