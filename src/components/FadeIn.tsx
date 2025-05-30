'use client';

import { cn } from '@/lib/utils';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';

gsap.registerPlugin(useGSAP);

interface FadeInProps {
  children: React.ReactNode;
  vars?: gsap.TweenVars;
  className?: string;
}

function FadeIn({ children, vars = {}, className }: FadeInProps) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.to(container.current, {
          opacity: 1,
          duration: 5,
          ease: 'power3.out',
          y: 0,
          ...vars,
        });
      });

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(container.current, {
          opacity: 1,
          y: 0,
          stagger: 0,
        });
      });
    },
    { scope: container },
  );

  return (
    <div className={cn('opacity-0', className)} ref={container}>
      {children}
    </div>
  );
}

export default FadeIn;
