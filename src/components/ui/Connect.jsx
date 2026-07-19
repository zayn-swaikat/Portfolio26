import { motion } from 'framer-motion';
import { Mail } from 'lucide-react'; 

import { FaGithub, FaInstagram, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { RiMessengerLine } from 'react-icons/ri';

import '../../styles/Connect.css';


const contactLinks = [
  { name: 'Email', href: "mailto:zeinsoykat@gmail.com", icon: Mail, subtext: 'Get in touch' },
  { name: 'LinkedIn', href: "https://www.linkedin.com/in/zayn-swaikat-8b89553a9/", icon: FaLinkedin, subtext: 'Let\'s connect' },
  { name: 'WhatsApp', href: "https://wa.me/963932910742", icon: FaWhatsapp, subtext: 'Direct message' },
  { name: 'Instagram', href: "https://www.instagram.com/zayn_swaikat", icon: FaInstagram, subtext: 'Follow along' },
  { name: 'GitHub', href: 'https://github.com/zayn-swaikat', icon: FaGithub, subtext: 'View projects' },
];

export default function Connect() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(5px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section id="contact" className="connect-section">
      <div className="connect-container">

        <motion.div
          className="connect-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Let's Connect</h2>
          <p className="connect-description">
            Got an idea, a project, or just want to chat? Feel free to reach out.
          </p>
        </motion.div>

        <motion.div
          className="connect-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {contactLinks.map((link, index) => {
            const IconComponent = link.icon;
            return (
              <motion.a
                key={index}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="connect-card"
                variants={itemVariants}
                whileHover={{ 
                  y: -6, 
                  scale: 1.02,
                  borderColor: "rgba(255, 255, 255, 0.25)" 
                }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="connect-icon-box">
                  <IconComponent size={22} strokeWidth={1.5} className="connect-icon" />
                </div>
                <div className="connect-info">
                  <span className="connect-link-name">{link.name}</span>
                  <span className="connect-link-subtext">{link.subtext}</span>
                </div>

                <div className="connect-card-glow"></div>
              </motion.a>
            );
          })}
        </motion.div>

        <footer className="footer">
          <p>© {new Date().getFullYear()} Zayn Swaikat. Built with React & Three Fiber.</p>
        </footer>

      </div>
    </section>
  );
}