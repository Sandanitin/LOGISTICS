// Layout Shift Debugger Utility
// Add this to your main app component to identify layout shifts

export function initLayoutShiftDebugger() {
  if (process.env.NODE_ENV !== 'development') return;

  let cls = 0;
  let sessionValue = 0;
  let sessionEntries = [];
  let windowSize = {
    width: window.innerWidth,
    height: window.innerHeight
  };

  // Function to calculate the impact of a layout shift
  function calculateImpact(entry) {
    const viewportArea = windowSize.width * windowSize.height;
    const impactFraction = entry.sources.reduce((total, source) => {
      const { width, height } = source.previousRect;
      return total + (width * height) / viewportArea;
    }, 0);
    
    return impactFraction * entry.value;
  }

  // Function to log layout shifts
  function logShift(entry) {
    const impact = calculateImpact(entry);
    cls += impact;
    sessionValue += impact;
    sessionEntries.push(entry);

    console.group('Layout Shift Detected');
    console.log('Current CLS:', cls.toFixed(4));
    console.log('Session CLS:', sessionValue.toFixed(4));
    console.log('Impact:', impact.toFixed(4));
    console.log('Element:', entry.sources[0]?.node || 'Unknown');
    console.log('Source:', entry.sources[0]?.node.outerHTML?.substring(0, 200) || 'Unknown');
    console.groupEnd();

    // Highlight the element that shifted
    if (entry.sources[0]?.node) {
      const node = entry.sources[0].node;
      const originalOutline = node.style.outline;
      const originalTransition = node.style.transition;
      
      node.style.outline = '2px solid #f00';
      node.style.transition = 'outline 0.3s ease';
      
      setTimeout(() => {
        node.style.outline = originalOutline;
        node.style.transition = originalTransition;
      }, 2000);
    }
  }

  // Set up Performance Observer for layout shifts
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (!entry.hadRecentInput) {
        logShift(entry);
      }
    }
  });

  // Start observing layout shifts
  observer.observe({ type: 'layout-shift', buffered: true });

  // Track window resize
  window.addEventListener('resize', () => {
    windowSize = {
      width: window.innerWidth,
      height: window.innerHeight
    };
  });

  // Log session summary when page is hidden
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      console.group('Layout Shift Summary');
      console.log('Total CLS:', cls.toFixed(4));
      console.log('Session CLS:', sessionValue.toFixed(4));
      console.log('Number of shifts:', sessionEntries.length);
      console.groupEnd();
      
      // Reset session
      sessionValue = 0;
      sessionEntries = [];
    }
  });

  // Add a global function to get current CLS
  window.getCurrentCLS = () => cls;
}
