import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Menu,
  X,
  ArrowUpRight,
  ChevronRight,
} from 'lucide-react';

import '../../styles/Navbar.css';

const navItems = [
  { name: 'About', id: 'about', code: '01' },
  { name: 'Skills', id: 'skills', code: '02' },
  { name: 'Projects', id: 'projects', code: '03' },
  { name: 'Process', id: 'process', code: '04' },
  { name: 'Contact', id: 'contact', code: '05' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const scrollToSection = (id) => {
    setIsOpen(false);

    if (id === 'home') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      return;
    }

    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <motion.nav
      className={`navbar ${isScrolled ? 'scrolled' : ''} ${
        isOpen ? 'menu-open' : ''
      }`}
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <div className="navbar-container">

        <button
          className="nav-logo"
          onClick={() => scrollToSection('home')}
          aria-label="Back to top"
        >
          <span className="logo-mark">
            <Sparkles size={15} strokeWidth={1.6} />
          </span>

          <span className="logo-text">
            ZAYN
            <span className="logo-dot">.</span>
          </span>
        </button>

        <ul className="nav-links">
          {navItems.map((item, index) => (
            <motion.li
              key={item.id}
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.5,
                delay: 0.15 + index * 0.07,
              }}
            >
              <button
                onClick={() => scrollToSection(item.id)}
                className="nav-link-btn"
              >
                <span className="nav-index">{item.code}</span>
                <span>{item.name}</span>
              </button>
            </motion.li>
          ))}
        </ul>

        <div className="nav-actions">
          <a
            className="btn-contact"
            href="/Resume.pdf"
            download
          >
            <span>Resume</span>
            <ArrowUpRight size={14} strokeWidth={1.8} />
          </a>
        </div>

        <button
          className="mobile-menu-toggle"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <X size={20} strokeWidth={1.7} />
          ) : (
            <Menu size={20} strokeWidth={1.7} />
          )}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              className="mobile-nav-overlay"
              initial={{
                opacity: 0,
                y: -12,
                scale: 0.98,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: -12,
                scale: 0.98,
              }}
              transition={{
                duration: 0.35,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div className="mobile-menu-header">
                <span>TIMELINE</span>
                <span className="mobile-menu-status">
                  <i />
                  ACTIVE
                </span>
              </div>

              <ul className="mobile-nav-links">
                {navItems.map((item, index) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.08 + index * 0.06,
                      duration: 0.35,
                    }}
                  >
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className="mobile-link-btn"
                    >
                      <span className="mobile-link-index">
                        {item.code}
                      </span>

                      <span>{item.name}</span>

                      <ChevronRight
                        size={17}
                        strokeWidth={1.5}
                      />
                    </button>
                  </motion.li>
                ))}
              </ul>

              <a
                className="mobile-resume"
                href="/Resume.pdf"
                download
                onClick={() => setIsOpen(false)}
              >
                <span>Download Resume</span>
                <ArrowUpRight
                  size={16}
                  strokeWidth={1.8}
                />
              </a>

              <div className="mobile-menu-footer">
                <span>VARIANT // 001</span>
                <span>THE TIMELINE IS OPEN</span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}