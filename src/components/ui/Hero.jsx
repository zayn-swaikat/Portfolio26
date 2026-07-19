import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDownRight } from 'lucide-react';
import '../../styles/Hero.css';

export default function Hero() {

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero-container">
      <div className="hero-content">

        <motion.div 
          className="availability-pill"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="pulse-dot"></div>
          <span>Available for work</span>
        </motion.div>

        <div className="title-lockup">
          <motion.h1 
            className="massive-text"
            initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ delay: 0.2, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            ZAYN
          </motion.h1>

          <motion.h1 
            className="massive-text offset-text"
            initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ delay: 0.35, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            SWAIKAT<span className="accent-dot">.</span>
          </motion.h1>
        </div>

        <motion.div 
          className="hero-footer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <div className="role-description">
            <p className="role-main">Full Stack Developer & Data Analyst</p>
            <p className="role-sub">Precision engineering for the modern web.</p>
          </div>

          <button className="premium-cta" onClick={() => scrollToSection('about')} >
            <span>Explore Work</span>
            <div className="icon-circle">
              <ArrowDownRight size={16} strokeWidth={2.5} />
            </div>
          </button>
        </motion.div>

      </div>
    </section>
  );
}