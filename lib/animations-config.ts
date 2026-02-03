// Animation configurations réutilisables
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export const fadeInDown = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export const fadeInLeft = {
  initial: { opacity: 0, x: -30 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6 }
};

export const fadeInRight = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6 }
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.6 }
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.6 }
};

export const hoverLift = {
  whileHover: { y: -8, transition: { duration: 0.3 } }
};

export const hoverScale = {
  whileHover: { scale: 1.05, transition: { duration: 0.3 } }
};

// Stagger pour lister items
export const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

// Pulse animation
export const pulse = {
  animate: {
    opacity: [1, 0.7, 1],
    transition: { duration: 2, repeat: Infinity }
  }
};

// Typing animation
export const typingDots = {
  animate: {
    opacity: [1, 0.5, 1],
    transition: { duration: 1.5, repeat: Infinity }
  }
};
