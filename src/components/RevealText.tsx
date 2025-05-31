'use client';

import { cn } from '@/lib/utils';
import { asText, RichTextField } from '@prismicio/client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';

gsap.registerPlugin(useGSAP);

interface RevealTextProps {
  field: RichTextField;
  id: string;
  className?: string;
  staggerAmount?: number;
  as?: React.ElementType;
  duration?: number;
  align?: 'start' | 'end' | 'center';
}

function RevealText({
  field,
  id,
  className,
  staggerAmount = 0.1,
  as: Component = 'div',
  duration = 0.8,
  align = 'start',
}: RevealTextProps) {
  const container = useRef<HTMLDivElement>(null);
  const words = asText(field).split(' ');

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.to('.reveal-text-word', {
          y: 0,
          duration,
          ease: 'power3.out',
          stagger: staggerAmount,
        });
      });

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set('.reveal-text-word', {
          opacity: 1,
          y: 0,
          stagger: 0,
        });
      });
    },
    { scope: container },
  );

  return (
    <Component
      ref={container}
      className={cn(
        'reveal-text text-balance',
        align === 'center' && 'text-center',
        align === 'start' && 'text-left',
        align === 'end' && 'text-right',
        className,
      )}
    >
      {words.map((word, index) => (
        <span key={`${index}-${word}-${id}`} className="mb-0 inline-block overflow-hidden pb-4">
          <span className="reveal-text-word mt-0 inline-block translate-y-[120%] will-change-transform">
            {word}
            {index < words.length - 1 && <>&nbsp;</>}
          </span>
        </span>
      ))}
    </Component>
  );
}

export default RevealText;
