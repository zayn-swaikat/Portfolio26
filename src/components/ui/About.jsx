import { motion } from 'framer-motion';
import { User, Target, Globe } from 'lucide-react';
import '../../styles/About.css';

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: "easeOut" }
    },
  };

  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <motion.div
          className="about-wrapper"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div variants={itemVariants} className="about-header">
            <h2 className="section-title">About Me</h2>
          </motion.div>

          <div className="about-content-flow">
            <motion.div variants={itemVariants} className="about-row">
              <div className="row-meta">
                <User className="row-icon" size={18} strokeWidth={1.5} />
                <span className="row-label">Identity</span>
              </div>
              <div className="row-text">
                <p>
                  I'm a 19-year-old <strong className="highlight">Full-Stack developer</strong> and an Information Technology student at Latakia University who believes great products are built where logic meets bold design. I focus on building applications that don't just look clean, but feel right to use.
                </p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="about-row">
              <div className="row-meta">
                <Target className="row-icon" size={18} strokeWidth={1.5} />
                <span className="row-label">Philosophy</span>
              </div>
              <div className="row-text">
                <p>
                  Real impact comes from combining strong backend logic with intentional UI/UX design. I continuously improve through real-world projects and professional certifications, including the <strong className="highlight">Meta Front-End & Back-End Developer</strong> programs and <strong className="highlight">IBM's Data Analysis</strong> specialization.
                </p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="about-row">
              <div className="row-meta">
                <Globe className="row-icon" size={18} strokeWidth={1.5} />
                <span className="row-label">Languages</span>
              </div>
              <div className="row-text">
                <div className="languages-minimal">
                  <div className="lang-item">
                    <span className="lang-name">Arabic</span>
                    <span className="lang-status">Fluent</span>
                  </div>
                  <div className="lang-divider"></div>
                  <div className="lang-item">
                    <span className="lang-name">English</span>
                    <span className="lang-status">Proficient (125)</span>
                  </div>
                  <div className="lang-divider"></div>
                  <div className="lang-item">
                    <span className="lang-name">German</span>
                    <span className="lang-status">B1 Level</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}