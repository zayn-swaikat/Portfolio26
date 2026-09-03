import { motion } from 'framer-motion';
import {
  UserRound,
  Target,
  Globe2,
  ArrowUpRight,
} from 'lucide-react';

import '../../styles/About.css';

const rows = [
  {
    number: '01',
    label: 'Identity',
    icon: UserRound,
    content: (
      <p>
        I'm a{' '}
        <strong>Full-Stack Developer</strong>{' '}
        and an Information Technology student at Latakia University.
        I build applications where strong engineering meets bold,
        intentional design — products that don't just work, but feel
        right to use.
      </p>
    ),
  },
  {
    number: '02',
    label: 'Philosophy',
    icon: Target,
    content: (
      <p>
        I believe real impact comes from combining{' '}
        <strong>solid backend logic</strong>{' '}
        with thoughtful UI/UX. I continuously improve through
        real-world projects and professional certifications, including
        the <strong>Meta Front-End & Back-End Developer</strong>{' '}
        programs and <strong>IBM's Data Analysis</strong>{' '}
        specialization.
      </p>
    ),
  },
];

const languages = [
  {
    name: 'Arabic',
    status: 'Fluent',
  },
  {
    name: 'English',
    status: 'Proficient · 125',
  },
  {
    name: 'German',
    status: 'B1 Level',
  },
];

export default function About() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.14,
      },
    },
  };

  const itemVariants = {
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
        duration: 0.85,
        ease: [0.16, 1, 0.3, 1],
      },
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
          viewport={{
            once: true,
            amount: 0.2,
          }}
        >

          <motion.div
            className="about-heading"
            variants={itemVariants}
          >
            <div className="section-eyebrow">
              <span className="eyebrow-line" />
              <span>THE VARIANT</span>
              <span className="eyebrow-code">001</span>
            </div>

            <div className="about-heading-main">
              <h2>
                About
                <span>Me.</span>
              </h2>

              <div className="heading-symbol">
                <ArrowUpRight
                  size={22}
                  strokeWidth={1.2}
                />
              </div>
            </div>

            <p className="about-intro">
              A developer shaped by curiosity, systems,
              and a little controlled chaos.
            </p>
          </motion.div>


          <div className="about-content-flow">

            {rows.map((row) => {
              const Icon = row.icon;

              return (
                <motion.article
                  key={row.number}
                  variants={itemVariants}
                  className="about-row"
                >
                  <div className="row-meta">
                    <div className="row-number">
                      {row.number}
                    </div>

                    <div className="row-icon">
                      <Icon
                        size={17}
                        strokeWidth={1.4}
                      />
                    </div>

                    <span className="row-label">
                      {row.label}
                    </span>
                  </div>

                  <div className="row-text">
                    {row.content}
                  </div>

                  <div className="row-aura" />
                </motion.article>
              );
            })}


            <motion.article
              variants={itemVariants}
              className="about-row languages-row"
            >
              <div className="row-meta">
                <div className="row-number">
                  03
                </div>

                <div className="row-icon">
                  <Globe2
                    size={17}
                    strokeWidth={1.4}
                  />
                </div>

                <span className="row-label">
                  Languages
                </span>
              </div>

              <div className="languages-grid">
                {languages.map((language, index) => (
                  <div
                    className="language-item"
                    key={language.name}
                  >
                    <span className="language-index">
                      0{index + 1}
                    </span>

                    <div className="language-info">
                      <span className="lang-name">
                        {language.name}
                      </span>

                      <span className="lang-status">
                        {language.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="row-aura" />
            </motion.article>

          </div>


          <motion.div
            className="about-footer"
            variants={itemVariants}
          >
            <span>VARIANT // 001</span>

            <span className="footer-line" />

            <span>IDENTITY VERIFIED</span>

            <span className="footer-dot" />
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}