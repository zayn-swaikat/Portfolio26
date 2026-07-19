import { motion } from 'framer-motion';
import { Brain, GitBranch, Code2, Sparkles } from 'lucide-react';
import '../../styles/HowIBuild.css';

const stepsData = [
  {
    number: "01",
    title: "Understand the Idea",
    description: "Every project starts with logic. I break ideas down step by step using mind maps and focus on deeply understanding the user before writing a single line of code.",
    icon: Brain
  },
  {
    number: "02",
    title: "Design the Flow",
    description: "I visualize the structure, explore references, and shape UI and UX together. Clarity, hierarchy, and ease of use guide every decision.",
    icon: GitBranch
  },
  {
    number: "03",
    title: "Build Clean Structure",
    description: "Clean architecture and reusable components matter. I follow the DRY principle and write code that's scalable, maintainable, and collaboration-friendly.",
    icon: Code2
  },
  {
    number: "04",
    title: "Refine the Experience",
    description: "The difference between good and great lives in the details. Micro-interactions, polish, user feedback, and continuous refinement.",
    icon: Sparkles
  }
];

export default function HowIBuild() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.25 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(5px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.7, ease: "easeOut" } 
    }
  };

  return (
    <section id="process" className="build-section">
      <div className="build-container">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="build-header"
        >
          <h2 className="section-title">Development Process</h2>
          <p className="section-subtitle">A structured workflow tailored to engineering functional digital products.</p>
        </motion.div>

        <motion.div
          className="build-timeline"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {stepsData.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <motion.div
                key={index}
                className="build-step"
                variants={itemVariants}
              >
                <div className="step-header">
                  <span className="step-number">{step.number}</span>
                  <div className="step-icon-wrapper">
                    <IconComponent size={22} strokeWidth={1.5} className="step-icon" />
                    <div className="icon-glow"></div>
                  </div>
                </div>

                <motion.div 
                  className="step-body"
                  whileHover={{ 
                    x: 6,
                    backgroundColor: "rgba(255, 255, 255, 0.02)",
                    borderColor: "rgba(255, 255, 255, 0.15)"
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-description">{step.description}</p>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}