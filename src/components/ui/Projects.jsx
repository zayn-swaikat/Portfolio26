import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight,
  ExternalLink,
  GitBranch,
} from 'lucide-react';
import '../../styles/Projects.css';

const projectsData = [
  {
    title: "Food Delivery Intelligence Platform",
    description:
      "An end-to-end food delivery intelligence platform. It delivers operational analytics, customer segmentation, restaurant efficiency scoring, and machine learning-powered delay prediction.",
    tags: ["Python", "React", "Pandas", "Scikit-learn", "Recharts", "Framer Motion"],
    github: "https://github.com/zayn-swaikat/Restaurants",
    live: "https://zayns-restaurants-analysis.vercel.app/",
    featured: true,
    category: "DATA / FULL-STACK",
  },
  {
    title: "SORT IT! - Recycling Game",
    description:
      "A cartoon-style recycling game featuring fast-paced drag-and-drop gameplay, combo multipliers, increasing difficulty, responsive mobile interactions, and real-time game activity notifications.",
    tags: ["ReactJS", "Vite", "PhaserJS", "Zustand", "Framer Motion", "Vercel"],
    github: "https://github.com/zayn-swaikat/SORT-IT-",
    live: "https://sort-it-by-zayn.vercel.app/",
    category: "GAME / INTERACTIVE",
  },
  {
    title: "SQUEEZE - Cold Pressed Juice",
    description:
      "A bold cold-pressed juice experience featuring cinematic scroll animations, immersive storytelling, interactive juice customization, and a vibrant editorial-inspired visual design.",
    tags: ["ReactJS", "Vite", "Framer Motion", "CSS3", "Lucide React"],
    github: "https://github.com/zayn-swaikat/squeeze",
    live: "https://squeezebyzayn.vercel.app/",
    featured: true,
    category: "CREATIVE / FRONTEND",
  },
  {
    title: "VAGABOND Luxury Travel",
    description:
      "A premium luxury travel website featuring cinematic animations, immersive storytelling, curated destinations, interactive galleries, and an elegant concierge-inspired user experience with high-end visual design.",
    tags: ["ReactJS", "Vite", "Framer Motion", "CSS3", "SwiperJS"],
    github: "https://github.com/zayn-swaikat/VAGABOND",
    live: "https://travelwithvagabond.vercel.app/",
    featured: true,
    category: "CREATIVE / FRONTEND",
  },
  {
    title: "Taxi Demand Intelligence",
    description:
      "A data intelligence dashboard built with Streamlit to analyze taxi demand from WhatsApp request logs. Provides real-time insights including geospatial heatmaps and anomaly detection.",
    tags: ["Python", "Streamlit", "Pandas", "Folium", "Data Analysis"],
    github: "https://github.com/zayn-swaikat/taxi-analysis",
    live: "https://taxi-analysis-frawrkzhsjkyvbcat9eafm.streamlit.app/",
    category: "DATA / ANALYTICS",
  },
  {
    title: "Insta Traitors",
    description:
      "A privacy-first Instagram followers analysis tool that transforms Instagram data exports into actionable insights. Users can upload follower and following JSON files to identify non-followers, mutual connections, and relationship patterns without sending any data to external servers.",
    tags: ["ReactJS", "Vite", "Framer Motion", "TanStack Table", "Recharts", "React Dropzone"],
    github: "https://github.com/zayn-swaikat/InstaTraitors",
    live: "https://insta-traitors.vercel.app/",
    category: "DATA / PRIVACY",
  },
  {
    title: "Mediterraneo Restaurant",
    description:
      "A premium, minimalist Mediterranean restaurant website. Features interactive scroll transitions, a fluid animated menu, and high-end visual galleries.",
    tags: ["ReactJS", "Vite", "Framer Motion", "CSS3", "SwiperJS"],
    github: "https://github.com/zayn-swaikat/mediterraneo",
    live: "https://mediterraneorestaurant.vercel.app",
    category: "CREATIVE / FRONTEND",
  },
  {
    title: "Daily Score",
    description:
      "Track daily wellbeing and finances with this local-first React app. Features mood, nutrition, hydration tracking, plus CSV export and intuitive dashboards with weekly trends.",
    tags: ["ReactJS", "CSS3", "HTML5", "JavaScript"],
    github: "https://github.com/zayn-swaikat/daily-score",
    live: "https://zayns-daily-score.vercel.app",
    category: "PRODUCT / FRONTEND",
  },
  {
    title: "Dawwerha",
    description:
      "A full-stack marketplace platform built with React and Django REST Framework. Features secure JWT authentication, image uploads, protected routes, and an RTL interface.",
    tags: ["ReactJS", "Django", "REST API"],
    github: "#",
    live: "#",
    category: "FULL-STACK / BACKEND",
  },
  {
    title: "Sukoon Medical Center",
    description:
      "A comprehensive medical platform built with React and Django. Manages patient, doctor, and HR accounts, appointments, doctor evaluations, and delivers a clean, professional UI for both patients and staff.",
    tags: ["ReactJS", "Django", "REST API"],
    github: "#",
    weblink: "#",
    category: "FULL-STACK / SYSTEM",
  },
  {
    title: "Fresh Market",
    description:
      "A full-stack e-commerce platform built with React and Django. Supports product management, order handling, user accounts, and a fully responsive interface for seamless shopping.",
    tags: ["ReactJS", "Django", "REST API"],
    github: "#",
    weblink: "#",
    category: "FULL-STACK / E-COMMERCE",
  },
  {
    title: "Orbitly | Astronomy Wordle Game",
    description:
      "A daily astronomy challenge inspired by Wordle, allowing players to discover hidden celestial bodies through scientific comparisons. Built with interactive data visualization, streak tracking, and dynamic hint systems covering planetary properties, orbital distance, temperature, moons, and rings.",
    tags: ["ReactJS", "Vite", "Recharts", "Nivo Charts", "React Select", "CSS3"],
    github: "https://github.com/zayn-swaikat/Orbitly",
    live: "https://zayns-orbitly.vercel.app/",
    category: "GAME / DATA",
  },
  {
    title: "The Kings Barbers",
    description:
      "A modern barbershop website built with React. Highlights services, smooth navigation, and brand identity with easy WhatsApp contact and booking access.",
    tags: ["ReactJS", "CSS3", "HTML5", "JavaScript"],
    github: "https://github.com/zayn-swaikat/barber",
    live: "https://zayns-barbershop.vercel.app",
    category: "FRONTEND / BRAND",
  },
  {
    title: "CODE",
    description:
      "A React-based number guessing game inspired by Mastermind. Includes bot opponent mode, feedback for correct digits, sound effects, confetti celebrations, and a visual history of guesses.",
    tags: ["ReactJS", "CSS3", "HTML5", "JavaScript"],
    github: "https://github.com/zayn-swaikat/CODE",
    weblink: "https://zayns-code-game.vercel.app",
    category: "GAME / FRONTEND",
  },
  {
    title: "Sudoku Solver",
    description:
      "Solve Sudoku puzzles instantly with this React web app using a backtracking algorithm. Designed with an intuitive and clean UI for seamless interaction.",
    tags: ["ReactJS", "CSS3", "HTML5", "JavaScript"],
    github: "https://github.com/zayn-swaikat/sudoku",
    weblink: "https://zayns-sudoku-solver.vercel.app",
    category: "ALGORITHM / FRONTEND",
  },
  {
    title: "CoffeeHub",
    description:
      "A responsive React SPA showcasing a coffee shop website. Features animated hero, menu carousel, interactive map, and feedback pages for a polished, engaging UI.",
    tags: ["ReactJS", "CSS3", "HTML5", "JavaScript"],
    github: "https://github.com/zayn-swaikat/CoffeHub",
    weblink: "https://coffee-hub-six.vercel.app",
    category: "FRONTEND / BRAND",
  },
  {
    title: "Weather Scope",
    description:
      "A lightweight React app providing local weather forecasts, alerts, and news. Uses modular components, responsive layouts, and local JSON data for a fast, clean experience.",
    tags: ["ReactJS", "CSS3", "HTML5", "JavaScript"],
    github: "https://github.com/zayn-swaikat/Weather-Scope",
    weblink: "https://weather-scope-six.vercel.app",
    category: "FRONTEND / UTILITY",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
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
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function Projects() {
  const [showAll, setShowAll] = useState(false);

  const displayedProjects = showAll
    ? projectsData
    : projectsData.slice(0, 6);

  return (
    <section id="projects" className="projects-section">
      <div className="projects-container">

        <motion.header
          className="projects-header"
          initial={{ opacity: 0, y: 25, filter: 'blur(8px)' }}
          whileInView={{
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
          }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <div className="projects-eyebrow">
            <span className="projects-eyebrow-line" />
            <span>SELECTED WORKS</span>
            <span className="projects-eyebrow-code">003</span>
          </div>

          <div className="projects-heading-row">
            <div>
              <h2 className="projects-title">
                Selected <span>Works.</span>
              </h2>

              <p className="projects-subtitle">
                A collection of applications, data platforms,
                interactive experiences, and full-stack systems.
              </p>
            </div>

            <div className="projects-header-meta">
              <span>VARIANT</span>
              <strong>003</strong>
            </div>
          </div>
        </motion.header>

        <motion.div
          className="projects-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.04,
          }}
        >
          <AnimatePresence mode="popLayout">
            {displayedProjects.map((project, index) => {
              const targetLive = project.live || project.weblink;

              const hasGithub =
                project.github && project.github !== '#';

              const hasLive =
                targetLive && targetLive !== '#';

              return (
                <motion.article
                  key={project.title}
                  layout
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{
                    opacity: 0,
                    scale: 0.96,
                    filter: 'blur(8px)',
                  }}
                  whileHover={{
                    y: -6,
                    transition: {
                      duration: 0.3,
                      ease: [0.16, 1, 0.3, 1],
                    },
                  }}
                  className={`project-card ${
                    project.featured ? 'is-featured' : ''
                  }`}
                >
                  <div className="project-card-grid" />
                  <div className="project-card-glow" />
                  <div className="project-scanline" />

                  <div className="project-top">
                    <div className="project-index">
                      {String(index + 1).padStart(2, '0')}
                    </div>

                    <div className="project-category">
                      {project.category}
                    </div>

                    {project.featured && (
                      <div className="project-featured">
                        <span />
                        FEATURED
                      </div>
                    )}
                  </div>

                  <div className="project-content">
                    <div className="project-title-row">
                      <h3 className="project-title">
                        {project.title}
                      </h3>

                      <div className="project-title-icon">
                        <ArrowUpRight size={19} />
                      </div>
                    </div>

                    <p className="project-description">
                      {project.description}
                    </p>
                  </div>

                  <div className="project-footer">

                    <div className="project-tags">
                      {project.tags.map((tag, tagIndex) => (
                        <span
                          key={`${tag}-${tagIndex}`}
                          className="project-tag"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="project-bottom">

                      <div className="project-status">
                        <span className="status-dot" />
                        <span>OPERATIONAL</span>
                      </div>

                      <div className="project-links">

                        {hasGithub && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`${project.title} GitHub repository`}
                            className="project-link"
                          >
                            <GitBranch size={17} />
                            <span>CODE</span>
                          </a>
                        )}

                        {hasLive && (
                          <a
                            href={targetLive}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`${project.title} live demo`}
                            className="project-link project-link-primary"
                          >
                            <ExternalLink size={17} />
                            <span>LIVE</span>
                          </a>
                        )}

                      </div>
                    </div>
                  </div>

                  <span className="project-watermark">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {projectsData.length > 6 && (
          <motion.div
            className="show-more-container"
            initial={{
              opacity: 0,
              y: 15,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              delay: 0.35,
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <button
              className="show-more-btn"
              onClick={() => setShowAll(!showAll)}
              type="button"
            >
              <span>
                {showAll ? 'SHOW LESS' : 'VIEW ALL PROJECTS'}
              </span>

              <ArrowUpRight
                size={18}
                className={showAll ? 'rotate-back' : ''}
              />
            </button>
          </motion.div>
        )}

        <motion.div
          className="projects-footer"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          <span>PROJECTS // 003</span>

          <div className="projects-footer-line" />

          <span>ARCHIVE SYNCHRONIZED</span>

          <span className="projects-footer-dot" />
        </motion.div>

      </div>
    </section>
  );
}