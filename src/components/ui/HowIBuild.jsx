import { motion } from 'framer-motion';
import {
  Brain,
  GitBranch,
  Code2,
  Sparkles,
  ArrowDownRight,
} from 'lucide-react';
import '../../styles/HowIBuild.css';

const stepsData = [
  {
    number: '01',
    code: 'INPUT',
    title: 'Understand the Idea',
    description:
      'Every project starts with logic. I break ideas down step by step using mind maps and focus on deeply understanding the user before writing a single line of code.',
    icon: Brain,
  },
  {
    number: '02',
    code: 'STRUCTURE',
    title: 'Design the Flow',
    description:
      'I visualize the structure, explore references, and shape UI and UX together. Clarity, hierarchy, and ease of use guide every decision.',
    icon: GitBranch,
  },
  {
    number: '03',
    code: 'BUILD',
    title: 'Build Clean Structure',
    description:
      "Clean architecture and reusable components matter. I follow the DRY principle and write code that's scalable, maintainable, and collaboration-friendly.",
    icon: Code2,
  },
  {
    number: '04',
    code: 'REFINE',
    title: 'Refine the Experience',
    description:
      'The difference between good and great lives in the details. Micro-interactions, polish, user feedback, and continuous refinement.',
    icon: Sparkles,
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.16,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 35,
    filter: 'blur(10px)',
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

export default function HowIBuild() {
  return (
    <section id="process" className="build-section">
      <div className="build-container">

        <motion.header
          className="build-header"
          initial={{
            opacity: 0,
            y: 25,
            filter: 'blur(8px)',
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <div className="build-eyebrow">
            <span className="build-eyebrow-line" />
            <span>HOW I BUILD</span>
            <span className="build-eyebrow-code">004</span>
          </div>

          <div className="build-heading-row">
            <div>
              <h2 className="build-title">
                Development <span>Process.</span>
              </h2>

              <p className="build-subtitle">
                A structured workflow designed to turn abstract ideas
                into functional, intentional digital experiences.
              </p>
            </div>

            <div className="build-header-meta">
              <span>VARIANT</span>
              <strong>004</strong>
            </div>
          </div>
        </motion.header>

        <motion.div
          className="build-timeline"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.08,
          }}
        >
          <div className="timeline-line">
            <div className="timeline-progress" />
          </div>

          {stepsData.map((step, index) => {
            const IconComponent = step.icon;

            return (
              <motion.article
                key={step.number}
                className="build-step"
                variants={itemVariants}
              >
                <div className="step-node-column">
                  <span className="step-number">
                    {step.number}
                  </span>

                  <div className="step-node">
                    <div className="step-node-core">
                      <IconComponent
                        size={21}
                        strokeWidth={1.5}
                      />
                    </div>

                    <div className="step-node-glow" />
                    <div className="step-node-ring" />
                  </div>

                  {index < stepsData.length - 1 && (
                    <div className="mobile-step-line" />
                  )}
                </div>

                <motion.div
                  className="step-card"
                  whileHover={{
                    x: 7,
                    transition: {
                      duration: 0.35,
                      ease: [0.16, 1, 0.3, 1],
                    },
                  }}
                >
                  <div className="step-card-grid" />
                  <div className="step-card-glow" />
                  <div className="step-scanline" />

                  <div className="step-card-top">
                    <span className="step-code">
                      {step.code}
                    </span>

                    <ArrowDownRight
                      size={17}
                      className="step-arrow"
                    />
                  </div>

                  <div className="step-body">
                    <h3 className="step-title">
                      {step.title}
                    </h3>

                    <p className="step-description">
                      {step.description}
                    </p>
                  </div>

                  <div className="step-card-footer">
                    <span>
                      PROCESS // {step.number}
                    </span>

                    <span className="step-status">
                      <i />
                      ACTIVE
                    </span>
                  </div>

                  <span className="step-watermark">
                    {step.number}
                  </span>
                </motion.div>
              </motion.article>
            );
          })}
        </motion.div>

        <motion.div
          className="build-footer"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            delay: 0.5,
            duration: 0.7,
          }}
        >
          <span>PROCESS // 004</span>

          <div className="build-footer-line" />

          <span>SYSTEM WORKFLOW VERIFIED</span>

          <span className="build-footer-dot" />
        </motion.div>

      </div>
    </section>
  );
}