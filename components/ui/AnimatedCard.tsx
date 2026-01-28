'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { containerVariants, itemVariants, hoverLift } from '@/lib/animations-config';

interface AnimatedCardsGridProps {
  children: ReactNode;
  columns?: 1 | 2 | 3 | 4;
  gap?: string;
}

export function AnimatedCardsGrid({
  children,
  columns = 3,
  gap = 'gap-6'
}: AnimatedCardsGridProps) {
  const gridClass = {
    1: 'grid-cols-1',
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4'
  }[columns];

  return (
    <motion.div
      className={`grid ${gridClass} ${gap}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </motion.div>
  );
}

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
}

export function AnimatedCard({ children, className = '' }: AnimatedCardProps) {
  return (
    <motion.div
      variants={itemVariants}
      {...hoverLift}
      className={className}
    >
      {children}
    </motion.div>
  );
}
