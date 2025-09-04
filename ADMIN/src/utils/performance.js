// Performance measurement utilities

export function mark(name) {
  if (window.performance && performance.mark) {
    performance.mark(`mark_${name}_start`);
  }
}

export function measure(name, startMark, endMark) {
  if (window.performance && performance.measure) {
    try {
      performance.measure(
        `measure_${name}`,
        `mark_${startMark}_start`,
        endMark ? `mark_${endMark}_end` : undefined
      );
    } catch (e) {
      console.warn(`Failed to measure ${name}:`, e);
    }
  }
}

// Add a performance mark when the script loads
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    mark('page_fully_loaded');
  });
}
