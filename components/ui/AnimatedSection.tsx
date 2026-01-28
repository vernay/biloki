'use client';

import { ReactNode } from 'react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

interface SectionAnimationProps {
  children: ReactNode;
  variant?: 'fadeInUp' | 'fadeInLeft' | 'fadeInRight' | 'scaleIn';
  className?: string;
}

/**
 * Composant wrapper pour animer une section entière au scroll
 */
export function AnimatedSection({
  children,
  variant = 'fadeInUp',
  className = ''
}: SectionAnimationProps) {
  return (
    <ScrollReveal variant={variant} className={className}>
      {children}
    </ScrollReveal>
  );
}
