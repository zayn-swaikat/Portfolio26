import { motion } from 'framer-motion';
import { ArrowUpRight, Mail } from 'lucide-react';

import {
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
} from 'react-icons/fa';

import '../../styles/Connect.css';

const contactLinks = [
  {
    name: 'Email',
    event: 'email_click',
    href: 'mailto:zeinsoykat@gmail.com',
    icon: Mail,
    subtext: 'Get in touch',
    code: 'MAIL',
  },
  {
    name: 'LinkedIn',
    event: 'linkedin_click',
    href: 'https://www.linkedin.com/in/zayn-swaikat-8b89553a9/',
    icon: FaLinkedin,
    subtext: "Let's connect",
    code: 'LINK',
  },
  {
    name: 'WhatsApp',
    event: 'whatsapp_click',
    href: 'https://wa.me/963932910742',
    icon: FaWhatsapp,
    subtext: 'Direct message',
    code: 'CHAT',
  },
  {
    name: 'Instagram',
    event: 'instagram_click',
    href: 'https://www.instagram.com/lokis.variant.zayn',
    icon: FaInstagram,
    subtext: 'Follow along',
    code: 'SOCIAL',
  },
  {
    name: 'GitHub',
    event: 'github_click',
    href: 'https://github.com/zayn-swaikat',
    icon: FaGithub,
    subtext: 'View projects',
    code: 'CODE',
  },
];

const reveal = {
  hidden: {
    opacity: 0,
    y: 35,
    filter: 'blur(8px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.75,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function Connect() {
  return (
    <section id="contact" className="connect-section">
      <div className="connect-ambient connect-ambient-one" />
      <div className="connect-ambient connect-ambient-two" />

      <div className="connect-grid-overlay" />

      <div className="connect-container">

        <motion.header
          className="connect-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          variants={reveal}
        >
          <div className="section-eyebrow">
            <span className="eyebrow-line" />
            <span className="eyebrow-label">TRANSMISSION CHANNELS</span>
            <span className="eyebrow-code">005</span>
          </div>

          <div className="connect-heading-row">
            <div>
              <h2 className="connect-title">
                Let's
                <span> Connect.</span>
              </h2>

              <p className="connect-description">
                Got an idea, a project, or something worth building?
                <br />
                Open a channel and let&apos;s make it real.
              </p>
            </div>

            <div className="connect-meta">
              <span>VARIANT</span>
              <strong>005</strong>
            </div>
          </div>
        </motion.header>

        <motion.div
          className="connect-content"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          transition={{ staggerChildren: 0.09 }}
        >
          <div className="connect-intro">
            <span className="connect-intro-index">01</span>

            <div className="connect-intro-copy">
              <span className="connect-intro-label">
                OPEN A CHANNEL
              </span>

              <p>
                Choose your preferred way to reach the variant.
              </p>
            </div>

            <div className="connect-status">
              <span className="status-dot" />
              AVAILABLE
            </div>
          </div>

          <div className="connect-list">
            {contactLinks.map((link, index) => {
              const IconComponent = link.icon;

              const external = !link.href.startsWith('mailto:');

              return (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noreferrer' : undefined}
                  className="connect-card"
                  variants={reveal}
                  whileHover={{
                    y: -5,
                    transition: {
                      duration: 0.3,
                      ease: [0.16, 1, 0.3, 1],
                    },
                  }}
                  whileTap={{ scale: 0.985 }}
                >
                  <span className="connect-card-number">
                    0{index + 1}
                  </span>

                  <div className="connect-icon-wrap">
                    <IconComponent className="connect-icon" />
                  </div>

                  <div className="connect-info">
                    <span className="connect-code">
                      {link.code}
                    </span>

                    <span className="connect-name">
                      {link.name}
                    </span>

                    <span className="connect-subtext">
                      {link.subtext}
                    </span>
                  </div>

                  <div className="connect-arrow">
                    <ArrowUpRight />
                  </div>

                  <div className="connect-card-watermark">
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  <div className="connect-card-glow" />
                  <div className="connect-card-scanline" />
                </motion.a>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          className="connect-final"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={reveal}
        >
          <div className="connect-final-line" />

          <div className="connect-final-content">
            <span className="connect-final-code">
              END OF TRANSMISSION
            </span>

            <span className="connect-final-message">
              Until the next variant.
            </span>
          </div>

          <div className="connect-final-symbol">
            <ArrowUpRight />
          </div>
        </motion.div>

        <footer className="connect-footer">
          <div className="connect-footer-top">
            <span>CONNECT // 005</span>

            <span className="connect-footer-line" />

            <span className="connect-footer-status">
              <span className="footer-dot" />
              SYSTEM ONLINE
            </span>
          </div>

          <div className="connect-footer-bottom">
            <p>
              © {new Date().getFullYear()} Zayn Swaikat.
            </p>

            <p>
              Built with React <span>×</span> Three Fiber
            </p>

            <p className="footer-variant">
              VARIANT // 001
            </p>
          </div>
        </footer>

      </div>
    </section>
  );
}