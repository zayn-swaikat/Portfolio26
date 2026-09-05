import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../../styles/Skills.css';

import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiReact,
  SiPython,
  SiDjango,
  SiStreamlit,
  SiMysql,
  SiVercel,
  SiCplusplus,
  SiTypescript
} from 'react-icons/si';

import { FaJava, FaGitAlt } from 'react-icons/fa';
import {
  TbDeviceDesktopShare,
  TbChartHistogram,
} from 'react-icons/tb';
import { FiFramer } from 'react-icons/fi';
import { MdOutlineDesignServices } from 'react-icons/md';

const categories = [
  'All',
  'Frontend',
  'Backend',
  'Data',
  'Database',
  'Tools',
  'Programming',
];

const skillsData = [
  { name: 'HTML5', category: 'Frontend', icon: SiHtml5 },
  { name: 'CSS3', category: 'Frontend', icon: SiCss },
  { name: 'JavaScript (ES6+)', category: 'Frontend', icon: SiJavascript },
  { name: 'TypeScript', category: 'Frontend', icon: SiTypescript },
  { name: 'React', category: 'Frontend', icon: SiReact },
  { name: 'Responsive Design', category: 'Frontend', icon: TbDeviceDesktopShare },
  { name: 'Recharts', category: 'Frontend', icon: TbChartHistogram },
  { name: 'Framer Motion', category: 'Frontend', icon: FiFramer },

  { name: 'Python', category: 'Backend', icon: SiPython },
  { name: 'Django', category: 'Backend', icon: SiDjango },

  { name: 'Streamlit', category: 'Data', icon: SiStreamlit },
  { name: 'Data Analysis', category: 'Data', icon: MdOutlineDesignServices },

  { name: 'MySQL', category: 'Database', icon: SiMysql },

  { name: 'Git & GitHub', category: 'Tools', icon: FaGitAlt },
  { name: 'Vercel Deployment', category: 'Tools', icon: SiVercel },

  { name: 'C++', category: 'Programming', icon: SiCplusplus },
  { name: 'Java', category: 'Programming', icon: FaJava },
];

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredSkills =
    activeCategory === 'All'
      ? skillsData
      : skillsData.filter(
          (skill) => skill.category === activeCategory
        );

  return (
    <section id="skills" className="skills-section">
      <div className="skills-container">

        <motion.div
          className="skills-header"
          initial={{ opacity: 0, y: 35, filter: 'blur(10px)' }}
          whileInView={{
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
          }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.9,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <div className="section-eyebrow">
            <span className="eyebrow-line" />
            <span>ABILITIES</span>
            <span className="eyebrow-code">002</span>
          </div>

          <div className="skills-heading-row">
            <div>
              <h2 className="skills-title">
                Technical
                <span>Arsenal.</span>
              </h2>

              <p className="skills-subtitle">
                The tools, systems, and technologies I use to
                turn ideas into working digital experiences.
              </p>
            </div>

            <div className="skills-index">
              <span>VARIANT</span>
              <strong>002</strong>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="filter-tabs"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.7,
            delay: 0.15,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {categories.map((category, index) => (
            <button
              key={category}
              className={`tab-btn ${
                activeCategory === category ? 'active' : ''
              }`}
              onClick={() => setActiveCategory(category)}
            >
              <span className="tab-index">
                {String(index + 1).padStart(2, '0')}
              </span>

              <span>{category}</span>

              {activeCategory === category && (
                <motion.span
                  layoutId="activeTabIndicator"
                  className="active-indicator"
                  transition={{
                    type: 'spring',
                    stiffness: 400,
                    damping: 35,
                  }}
                />
              )}
            </button>
          ))}
        </motion.div>

        <motion.div layout className="skills-grid">
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, index) => {
              const IconComponent = skill.icon;

              return (
                <motion.article
                  layout
                  key={skill.name}
                  className="skill-card"
                  initial={{
                    opacity: 0,
                    y: 25,
                    filter: 'blur(8px)',
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    filter: 'blur(0px)',
                  }}
                  exit={{
                    opacity: 0,
                    y: -15,
                    filter: 'blur(8px)',
                  }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.025,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileHover={{ y: -4 }}
                >
                  <div className="skill-top">
                    <span className="skill-number">
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <span className="skill-category">
                      {skill.category}
                    </span>
                  </div>

                  <div className="skill-main">
                    <div className="skill-icon">
                      <IconComponent />
                    </div>

                    <h3 className="skill-name">
                      {skill.name}
                    </h3>
                  </div>

                  <div className="skill-bottom">
                    <span>CAPABILITY</span>
                    <span className="skill-status">
                      ACTIVE
                    </span>
                  </div>

                  <div className="skill-bg-icon">
                    <IconComponent />
                  </div>

                  <div className="skill-glow" />
                  <div className="skill-scanline" />
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>

        <motion.div
          className="skills-footer"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <span>ABILITIES // 002</span>

          <span className="footer-line" />

          <span>SYSTEMS OPERATIONAL</span>

          <span className="footer-dot" />
        </motion.div>

      </div>
    </section>
  );
}