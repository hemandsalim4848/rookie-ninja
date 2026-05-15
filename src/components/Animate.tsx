'use client';

import { useScrollAnimation } from '@/src/components/hooks/useScrollAnimation';

type AnimationType =
  | 'fade-up'
  | 'fade-down'
  | 'fade-left'
  | 'fade-right'
  | 'fade'
  | 'zoom';

interface AnimateProps {
  children: React.ReactNode;
  type?: AnimationType;
  delay?: number;      // ms
  duration?: number;   // ms
  className?: string;
  threshold?: number;
}

const transforms: Record<AnimationType, string> = {
  'fade-up':    'translateY(32px)',
  'fade-down':  'translateY(-32px)',
  'fade-left':  'translateX(32px)',
  'fade-right': 'translateX(-32px)',
  'fade':       'translateY(0)',
  'zoom':       'scale(0.94)',
};

export default function Animate({
  children,
  type = 'fade-up',
  delay = 0,
  duration = 500,
  className = '',
  threshold = 0.15,
}: AnimateProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold });

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity:    isVisible ? 1 : 0,
        transform:  isVisible ? 'none' : transforms[type],
        transition: `opacity ${duration}ms cubic-bezier(0.22,1,0.36,1) ${delay}ms,
                     transform ${duration}ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}