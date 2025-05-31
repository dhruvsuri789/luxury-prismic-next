'use client';

import { cn } from '@/lib/utils';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface FadeInProps {
  children: React.ReactNode;
  vars?: gsap.TweenVars;
  start?: string;
  className?: string;
}

function FadeIn({ children, vars = {}, start = 'top 80%', className }: FadeInProps) {
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
          scrollTrigger: {
            trigger: container.current,
            start,
          },
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
