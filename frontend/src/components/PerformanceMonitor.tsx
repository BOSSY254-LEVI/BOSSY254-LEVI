import { useEffect } from 'react';

export const PerformanceMonitor = () => {
  useEffect(() => {
    const logPerformance = () => {
      if (window.performance) {
        const navigationEntry = window.performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (navigationEntry) {
          console.log(`Page load time: ${navigationEntry.domComplete}ms`);
        }
      }
    };

    window.addEventListener('load', logPerformance);

    return () => {
      window.removeEventListener('load', logPerformance);
    };
  }, []);

  return null;
};
