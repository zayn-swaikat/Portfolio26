import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../../styles/Skills.css';

import { 
  SiHtml5, SiCss, SiJavascript, SiReact, SiPython, 
  SiDjango, SiStreamlit, SiMysql, SiVercel, SiCplusplus 
} from 'react-icons/si';
import { FaJava, FaGitAlt } from 'react-icons/fa';
import { TbDeviceDesktopShare, TbChartHistogram } from 'react-icons/tb';
import { FiFramer } from 'react-icons/fi';
import { MdOutlineDesignServices } from 'react-icons/md';

const categories = ['All', 'Frontend', 'Backend', 'Data', 'Database', 'Tools', 'Programming'];

const skillsData = [
  { name: 'HTML5', category: 'Frontend', icon: SiHtml5 },
  { name: 'CSS3', category: 'Frontend', icon: SiCss },
  { name: 'JavaScript (ES6+)', category: 'Frontend', icon: SiJavascript },
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

  const filteredSkills = activeCategory === 'All'
    ? skillsData
    : skillsData.filter(skill => skill.category === activeCategory);

  return (
    <section id="skills" className="skills-section">
      <div className="skills-container">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="skills-header"
        >
          <h2 className="section-title">Technical Arsenal</h2>
          <p className="section-subtitle">Technologies and tools I use to build digital experiences.</p>
        </motion.div>

        <div className="filter-tabs">
          {categories.map((category) => (
            <button
              key={category}
              className={`tab-btn ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
              {activeCategory === category && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="active-indicator"
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                />
              )}
            </button>
          ))}
        </div>

        <motion.div layout className="skills-grid">
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill) => {
              const IconComponent = skill.icon;
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                  transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
                  key={skill.name}
                  className="skill-card"
                  whileHover={{ 
                    y: -8, 
                    rotateX: 5, 
                    rotateY: -5,
                    boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.4)" 
                  }}
                >
                  <div className="skill-content">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-cat-tag">{skill.category}</span>
                  </div>

                  <div className="skill-bg-icon">
                    <IconComponent />
                  </div>

                  <div className="skill-glow"></div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}