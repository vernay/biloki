'use client';

import { useAnimateNumber } from '@/lib/hooks/useAnimateNumber';

interface AnimatedPriceProps {
  value: number;
  decimals?: number;
  duration?: number;
}

export function AnimatedPrice({ 
  value, 
  decimals = 2,
  duration = 1000 
}: AnimatedPriceProps) {
  const displayValue = useAnimateNumber(value, { duration });

  return (
    <>
      {displayValue.toFixed(decimals)}€
    </>
  );
}
