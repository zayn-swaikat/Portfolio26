import React, { useEffect, useRef, useState } from "react";
import "./Scene.css";

export default function Scene() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  const lastScrollY = useRef(0);
  const lastTime = useRef(Date.now());
  const timeoutRef = useRef(null);

  useEffect(() => {
    let animationFrame;

    const handleScroll = () => {
      cancelAnimationFrame(animationFrame);

      animationFrame = requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const now = Date.now();

        const maxScroll =
          document.documentElement.scrollHeight - window.innerHeight;

        const progress =
          maxScroll > 0 ? Math.min(currentY / maxScroll, 1) : 0;

        const distance = Math.abs(currentY - lastScrollY.current);
        const timeDelta = Math.max(now - lastTime.current, 1);

        const velocity = Math.min(
          (distance / timeDelta) * 18,
          12
        );

        setScrollProgress(progress);
        setScrollVelocity(velocity);
        setIsScrolling(true);

        lastScrollY.current = currentY;
        lastTime.current = now;

        clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(() => {
          setIsScrolling(false);
          setScrollVelocity(0);
        }, 120);
      });
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutRef.current);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  const intensity = Math.min(scrollVelocity / 12, 1);

  return (
    <div
      className={`loki-scene ${isScrolling ? "is-scrolling" : ""}`}
      style={{
        "--scroll": scrollProgress,
        "--velocity": intensity,
        "--velocity-blur": `${intensity * 5}px`,
        "--streak-opacity": 0.08 + intensity * 0.32,
        "--aura-scale": 1 + intensity * 0.25,
      }}
      aria-hidden="true"
    >
      <div className="scene-base" />

      <div className="magic-aura aura-one" />
      <div className="magic-aura aura-two" />
      <div className="magic-aura aura-three" />

      <div className="temporal-ring ring-one" />
      <div className="temporal-ring ring-two" />
      <div className="temporal-ring ring-three" />

      <div className="energy-streak streak-one" />
      <div className="energy-streak streak-two" />
      <div className="energy-streak streak-three" />
      <div className="energy-streak streak-four" />

      <div className="particle-field">
        {Array.from({ length: 45 }).map((_, index) => (
          <span
            key={index}
            className="magic-particle"
            style={{
              "--x": `${(index * 37) % 100}%`,
              "--y": `${(index * 61) % 100}%`,
              "--size": `${2 + (index % 4) * 1.2}px`,
              "--delay": `${-(index * 0.27)}s`,
              "--duration": `${4 + (index % 6)}s`,
              "--depth": `${0.3 + (index % 5) * 0.18}`,
            }}
          />
        ))}
      </div>

      <div className="energy-wave wave-one" />
      <div className="energy-wave wave-two" />

      <div className="scene-noise" />

      <div className="scroll-distortion" />

      <div className="scene-vignette" />
    </div>
  );
}