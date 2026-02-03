'use client';

import { useEffect, useState } from 'react';

interface AnimateNumberOptions {
  duration?: number;
  delay?: number;
}

export function useAnimateNumber(
  targetValue: number,
  options: AnimateNumberOptions = {}
) {
  const { duration = 2000, delay = 0 } = options;
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      let startValue = 0;
      const startTime = Date.now();
      
      const interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = Math.floor(startValue + (targetValue - startValue) * progress);
        setDisplayValue(current);
        
        if (progress === 1) {
          clearInterval(interval);
        }
      }, 16);
      
      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
  }, [targetValue, duration, delay]);

  return displayValue;
}
