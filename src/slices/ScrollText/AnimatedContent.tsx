'use client';

import { Bounded } from '@/components/Bounded';
import { useGSAP } from '@gsap/react';
import { asText, Content } from '@prismicio/client';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

function AnimatedContent({ slice }: { slice: Content.ScrollTextSlice }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const words = asText(slice.primary.text).split(' ');

  useGSAP(
    () => {
      const container = containerRef.current;
      const text = textRef.current;
      const content = contentRef.current;
      const letters = text?.querySelectorAll('span');

      if (!container || !text || !content || !letters) return;

      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Set initial blur and color
        gsap.set(content, { filter: 'blur(40px)' });
        gsap.set(letters, { color: 'hsl(220, 9%, 20%)' });

        gsap.to(content, {
          filter: 'blur(0px)',
          duration: 1,
          scrollTrigger: {
            trigger: container,
            start: 'top 75%',
            end: 'top top',
            scrub: 2, //Lags and delays the update
            markers: false,
          },
        });

        const colorTl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: 'top top',
            end: 'bottom -100%',
            pin: true,
            scrub: 2,
            markers: false,
          },
        });

        colorTl.to(letters, {
          color: 'white',
          stagger: {
            each: 0.01,
            from: 'start',
            ease: 'power1.inOut',
          },
        });

        colorTl.to(
          '.glow-background',
          {
            opacity: 1,
            ease: 'power2.inOut',
            duration: 1,
          },
          0,
        );
      });

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(content, { filter: 'blur(0px)' });
        gsap.set(letters, { color: 'white' });
        gsap.set('.glow-background', { opacity: 1 });
      });
    },
    { scope: containerRef },
  );

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative flex h-screen items-center justify-center bg-neutral-950"
      ref={containerRef}
    >
      <div className="glow-background absolute inset-0 z-0 h-full w-full opacity-0"></div>
      <div className="absolute inset-0 bg-[url('/noisetexture.jpg')] opacity-30 mix-blend-multiply"></div>

      <div ref={contentRef}>
        <div className="mb-2 text-center text-sm tracking-wider text-neutral-200 uppercase md:mb-8 md:text-base">
          {slice.primary.eyebrow}
        </div>

        <div ref={textRef} className="text-center">
          <p className="font-display flex flex-wrap justify-center text-5xl leading-tight text-balance uppercase md:text-7xl">
            {words.map((word, index) => (
              <span key={`${word}-${index}`} className="inline">
                {word.split('').map((char, charIndex) => (
                  <span key={`${char}-${charIndex}`} className="inline">
                    {char}
                  </span>
                ))}
                {index < words.length - 1 && <span className="inline">&nbsp;</span>}
              </span>
            ))}
          </p>
        </div>
      </div>
    </Bounded>
  );
}

export default AnimatedContent;
