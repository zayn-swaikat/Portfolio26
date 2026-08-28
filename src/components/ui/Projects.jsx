import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';
import '../../styles/Projects.css';

const projectsData = [
  {
    title: "Food Delivery Intelligence Platform",
    description: "An end-to-end food delivery intelligence platform. It delivers operational analytics, customer segmentation, restaurant efficiency scoring, and machine learning-powered delay prediction.",
    tags: ["Python", "React", "Pandas", "Scikit-learn", "Recharts", "Framer Motion"],
    github: "https://github.com/zayn-swaikat/Restaurants",
    live: "https://zayns-restaurants-analysis.vercel.app/"
  },
  {
    title: "SQUEEZE - Cold Pressed Juice",
    description: "A bold cold-pressed juice experience featuring cinematic scroll animations, immersive storytelling, interactive juice customization, and a vibrant editorial-inspired visual design.",
    tags: ["ReactJS", "Vite", "Framer Motion", "CSS3", "Lucide React"],
    github: "https://github.com/zayn-swaikat/squeeze",
    live: "https://squeezebyzayn.vercel.app/"
  },
  {
    title: "Taxi Demand Intelligence",
    description: "A data intelligence dashboard built with Streamlit to analyze taxi demand from WhatsApp request logs. Provides real-time insights including geospatial heatmaps and anomaly detection.",
    tags: ["Python", "Streamlit", "Pandas", "Folium", "Data Analysis"],
    github: "https://github.com/zayn-swaikat/taxi-analysis",
    live: "https://taxi-analysis-frawrkzhsjkyvbcat9eafm.streamlit.app/"
  },
  {
    title: "VAGABOND Luxury Travel",
    description: "A premium luxury travel website featuring cinematic animations, immersive storytelling, curated destinations, interactive galleries, and an elegant concierge-inspired user experience with high-end visual design.",
    tags: ["ReactJS", "Vite", "Framer Motion", "CSS3", "SwiperJS"],
    github: "https://github.com/zayn-swaikat/VAGABOND",
    live: "https://travelwithvagabond.vercel.app/"
  },
  {
    title: "Mediterraneo Restaurant",
    description: "A premium, minimalist Mediterranean restaurant website. Features interactive scroll transitions, a fluid animated menu, and high-end visual galleries.",
    tags: ["ReactJS", "Vite", "Framer Motion", "CSS3", "SwiperJS"],
    github: "https://github.com/zayn-swaikat/mediterraneo",
    live: "https://mediterraneorestaurant.vercel.app"
  },
  {
    title: "Daily Score",
    description: "Track daily wellbeing and finances with this local-first React app. Features mood, nutrition, hydration tracking, plus CSV export and intuitive dashboards with weekly trends.",
    tags: ["ReactJS", "CSS3", "HTML5", "JavaScript"],
    github: "https://github.com/zayn-swaikat/daily-score",
    live: "https://daily-score.vercel.app"
  },
  {
    title: "Dawwerha",
    description: "A full-stack marketplace platform built with React and Django REST Framework. Features secure JWT authentication, image uploads, protected routes, and an RTL interface.",
    tags: ["ReactJS", "Django", "REST API"],
    github: "#",
    live: "#"
  },
  {
    title: "Sukoon Medical Center",
    description: "A comprehensive medical platform built with React and Django. Manages patient, doctor, and HR accounts, appointments, doctor evaluations, and delivers a clean, professional UI for both patients and staff.",
    tags: ["ReactJS", "Django", "REST API"],
    github: "#",
    weblink: "#",
  },
  {
    title: "Fresh Market",
    description: "A full-stack e-commerce platform built with React and Django. Supports product management, order handling, user accounts, and a fully responsive interface for seamless shopping.",
    tags: ["ReactJS", "Django", "REST API"],
    github: "#",
    weblink: "#",
  },
  {
    title: "Orbitly | Astronomy Wordle Game",
    description: "A daily astronomy challenge inspired by Wordle, allowing players to discover hidden celestial bodies through scientific comparisons. Built with interactive data visualization, streak tracking, and dynamic hint systems covering planetary properties, orbital distance, temperature, moons, and rings.",
    tags: ["ReactJS", "Vite", "Recharts", "Nivo Charts", "React Select", "CSS3"],
    github: "https://github.com/zayn-swaikat/Orbitly",
    live: "https://zayns-orbitly.vercel.app/"
  },
  {
    title: "The Kings Barbers",
    description: "A modern barbershop website built with React. Highlights services, smooth navigation, and brand identity with easy WhatsApp contact and booking access.",
    tags: ["ReactJS", "CSS3", "HTML5", "JavaScript"],
    github: "https://github.com/zayn-swaikat/barber",
    live: "https://zayns-barbershop.vercel.app",
  },
  {
    title: "CODE",
    description: "A React-based number guessing game inspired by Mastermind. Includes bot opponent mode, feedback for correct digits, sound effects, confetti celebrations, and a visual history of guesses.",
    tags: ["ReactJS", "CSS3", "HTML5", "JavaScript"],
    github: "https://github.com/zayn-swaikat/CODE",
    weblink: "https://zayns-code-game.vercel.app",
  },
  {
    title: "Sudoku Solver",
    description: "Solve Sudoku puzzles instantly with this React web app using a backtracking algorithm. Designed with an intuitive and clean UI for seamless interaction.",
    tags: ["ReactJS", "CSS3", "HTML5", "JavaScript"],
    github: "https://github.com/zayn-swaikat/sudoku",
    weblink: "https://zayns-sudoku-solver.vercel.app",
  },
  {
    title: "CoffeeHub",
    description: "A responsive React SPA showcasing a coffee shop website. Features animated hero, menu carousel, interactive map, and feedback pages for a polished, engaging UI.",
    tags: ["ReactJS", "CSS3", "HTML5", "JavaScript"],
    github: "https://github.com/zayn-swaikat/CoffeHub",
    weblink: "https://coffee-hub-six.vercel.app",
  },
  {
    title: "Weather Scope",
    description: "A lightweight React app providing local weather forecasts, alerts, and news. Uses modular components, responsive layouts, and local JSON data for a fast, clean experience.",
    tags: ["ReactJS", "CSS3", "HTML5", "JavaScript"],
    github: "https://github.com/zayn-swaikat/Weather-Scope",
    weblink: "https://weather-scope-six.vercel.app",
  },
  {
    title: "Insta Traitors",
    description: "A privacy-first Instagram followers analysis tool that transforms Instagram data exports into actionable insights. Users can upload follower and following JSON files to identify non-followers, mutual connections, and relationship patterns without sending any data to external servers.",
    tags: ["ReactJS", "Vite", "Framer Motion", "TanStack Table", "Recharts", "React Dropzone"],
    github: "https://github.com/zayn-swaikat/InstaTraitors",
    live: "https://insta-traitors.vercel.app/"
  },
];

export default function Projects() {
  const [showAll, setShowAll] = useState(false);

  const displayedProjects = showAll ? projectsData : projectsData.slice(0, 6);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.7, ease: "easeOut" } 
    }
  };

  return (
    <section id="projects" className="projects-section">
      <div className="projects-container">

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="projects-header"
        >
          <h2 className="section-title">Selected Works</h2>
          <p className="section-subtitle">A collection of applications, data platforms, and full-stack solutions.</p>
        </motion.div>

        <motion.div
          className="projects-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
        >
          <AnimatePresence mode="popLayout">
            {displayedProjects.map((project, index) => {
              const targetLive = project.live || project.weblink;
              const hasGithub = project.github && project.github !== '#';
              const hasLive = targetLive && targetLive !== '#';

              return (
                <motion.div
                  layout
                  key={project.title}
                  className={`project-card ${
                    project.title === "VAGABOND Luxury Travel" ||
                    project.title === "Food Delivery Intelligence Platform" ||
                    project.title === "SQUEEZE - Cold Pressed Juice"
                      ? "featured-project"
                      : ""
                  }`}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                  whileHover={{ 
                    y: -8, 
                    rotateX: 4, 
                    rotateY: -4,
                    boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.5)"
                  }}
                >
                  {project.title === "VAGABOND Luxury Travel" && (
                    <span className="featured-badge">Featured</span>
                  )}
                  {project.title === "Food Delivery Intelligence Platform" && (
                    <span className="featured-badge">Featured</span>
                  )}
                  <div className="project-info">
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-description">{project.description}</p>
                  </div>

                  <div className="project-footer">
                    <div className="project-tags">
                      {project.tags.map((tag, tagIdx) => (
                        <span key={tagIdx} className="tag">{tag}</span>
                      ))}
                    </div>

                    <div className="project-links">
                      {hasGithub && (
                        <a href={project.github} target="_blank" rel="noreferrer" aria-label="GitHub Repository">
                          <FaGithub size={18} strokeWidth={1.5} />
                        </a>
                      )}
                      {hasLive && (
                        <a href={targetLive} target="_blank" rel="noreferrer" aria-label="Live Demo">
                          <ExternalLink size={18} strokeWidth={1.5} />
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="project-card-glow"></div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {projectsData.length > 6 && (
          <motion.div 
            className="show-more-container"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <button 
              className="show-more-btn"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? 'Show Less' : 'View All Projects'}
            </button>
          </motion.div>
        )}

      </div>
    </section>
  );
}