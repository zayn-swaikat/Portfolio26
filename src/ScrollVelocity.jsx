import { useEffect, useRef } from "react";
import "./ScrollVelocity.css";

export default function ScrollVelocity() {
  const rafRef = useRef(null);
  const lastScrollY = useRef(window.scrollY);
  const lastTime = useRef(performance.now());
  const velocityRef = useRef(0);
  const currentBlur = useRef(0);

  useEffect(() => {
    const root = document.documentElement;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    if (prefersReducedMotion.matches) {
      return;
    }

    const update = () => {
      const now = performance.now();
      const currentScrollY = window.scrollY;

      const deltaY = currentScrollY - lastScrollY.current;
      const deltaTime = Math.max(now - lastTime.current, 1);

      const velocity = Math.abs(deltaY / deltaTime);

      velocityRef.current +=
        (velocity - velocityRef.current) * 0.18;

      const targetBlur = Math.min(
        velocityRef.current * 1.8,
        4
      );

      currentBlur.current +=
        (targetBlur - currentBlur.current) * 0.2;

      root.style.setProperty(
        "--scroll-blur",
        `${currentBlur.current}px`
      );

      root.style.setProperty(
        "--scroll-velocity",
        velocityRef.current.toFixed(4)
      );

      lastScrollY.current = currentScrollY;
      lastTime.current = now;

      rafRef.current = requestAnimationFrame(update);
    };

    const handleScroll = () => {
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    rafRef.current = requestAnimationFrame(update);

    return () => {
      window.removeEventListener("scroll", handleScroll);

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      root.style.removeProperty("--scroll-blur");
      root.style.removeProperty("--scroll-velocity");
    };
  }, []);

  return null;
}