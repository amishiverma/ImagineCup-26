import { useState, useEffect, useRef } from 'react';

interface UseAnimatedNumberOptions {
  duration?: number;
  delay?: number;
  decimals?: number;
}

export function useAnimatedNumber(
  targetValue: number,
  options: UseAnimatedNumberOptions = {}
) {
  const { duration = 1500, delay = 0, decimals = 0 } = options;
  const [displayValue, setDisplayValue] = useState(0);
  const startTimeRef = useRef<number | null>(null);
  const animationRef = useRef<number | null>(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    if (hasStarted.current) return;
    
    const startAnimation = () => {
      hasStarted.current = true;
      
      const animate = (timestamp: number) => {
        if (!startTimeRef.current) {
          startTimeRef.current = timestamp;
        }

        const elapsed = timestamp - startTimeRef.current;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (ease-out-cubic)
        const eased = 1 - Math.pow(1 - progress, 3);
        const currentValue = eased * targetValue;
        
        setDisplayValue(Number(currentValue.toFixed(decimals)));

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate);
        }
      };

      animationRef.current = requestAnimationFrame(animate);
    };

    const timeoutId = setTimeout(startAnimation, delay);

    return () => {
      clearTimeout(timeoutId);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [targetValue, duration, delay, decimals]);

  return displayValue;
}
