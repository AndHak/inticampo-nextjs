"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function SmoothScrolling({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time);
    }

    gsap.ticker.add(update);

    return () => {
      gsap.ticker.remove(update);
    };
  }, []);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        lerp: 0.1, // Increased from 0.05 for more responsiveness
        duration: 1.2, // Slightly shorter duration
        smoothWheel: true,
        wheelMultiplier: 1, // Standard speed
        touchMultiplier: 2, // Better mobile feel
      }}
    >
      {children}
    </ReactLenis>
  );
}
