import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDownRight, Sparkles } from 'lucide-react';
import GhostFibers from './GhostFibers';
import '../../styles/Hero.css';

export default function Hero() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <section className="hero-container" style={{ position: 'relative' }}>

      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          pointerEvents: 'none'
        }}
      >
        <GhostFibers
          lineColor="#0b6b3a"
          glowColor="#39ff88"
          speed={0.2}
          scale={2}
          brightness={2}
        />
      </div>

      <div className="hero-content" style={{ position: 'relative', zIndex: 1 }}>

        <motion.div
          className="availability-pill"
          initial={{ opacity: 0, y: -16, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{
            delay: 0.7,
            duration: 0.9,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <span className="pill-icon">
            <Sparkles size={11} strokeWidth={1.8} />
          </span>
          <span>Available for work</span>
          <span className="pill-status" />
        </motion.div>

        <div className="title-lockup">
          <motion.div
            className="title-line title-line-primary"
            initial={{ opacity: 0, y: 70, filter: 'blur(14px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ delay: 0.15, duration: 1.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="massive-text">ZAYN</span>
          </motion.div>

          <motion.div
            className="title-line title-line-secondary"
            initial={{ opacity: 0, y: 70, filter: 'blur(14px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ delay: 0.3, duration: 1.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="massive-text outline-text">
              SWAIKAT
              <span className="accent-dot">.</span>
            </span>
          </motion.div>
        </div>

        <motion.div
          className="hero-footer"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="role-description">
            <div className="role-index">
              <span>01</span>
              <span className="role-line" />
              <span>THE VARIANT</span>
            </div>
            <p className="role-main">
              Full Stack Developer <span>&</span> Data Analyst
            </p>
            <p className="role-sub">
              Building digital experiences where logic meets imagination.
            </p>
          </div>

          <button
            className="premium-cta"
            onClick={() => scrollToSection('about')}
            aria-label="Explore my work"
          >
            <span className="cta-label">Explore Work</span>
            <span className="icon-circle">
              <ArrowDownRight size={17} strokeWidth={1.8} />
            </span>
          </button>
        </motion.div>

        <motion.div
          className="hero-coordinates"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
        >
          <span>LAT // 34.7333° N</span>
          <span>•</span>
          <span>VARIANT // 001</span>
        </motion.div>
      </div>

      <motion.div
        className="hero-scroll-indicator"
        style={{ position: 'relative', zIndex: 1 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <span>SCROLL TO TRAVERSE</span>
        <div className="scroll-line">
          <div className="scroll-progress" />
        </div>
      </motion.div>

    </section>
  );
}