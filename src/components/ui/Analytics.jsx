import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Eye, CalendarDays, Clock3, TrendingUp, AlertCircle } from "lucide-react";
import { getStats } from "../../analytics/stats.js";
import VisitorChart from "../analytics/VisitorChart.jsx";
import "../../styles/Analytics.css";

// Animation variants for staggered effect
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
};

export default function Analytics() {
  const [stats, setStats] = useState(null);
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        setIsLoading(true);
        const [statsData, historyRes] = await Promise.all([
          getStats(),
          fetch("/api/history"),
        ]);

        if (!historyRes.ok) throw new Error("Failed to fetch history data");
        const historyData = await historyRes.json();

        setStats(statsData);
        setHistory(historyData);
      } catch (err) {
        console.error("Analytics Error:", err);
        setError("Unable to load analytics data right now.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalyticsData();
  }, []);

  if (isLoading) {
    return (
      <div className="analytics-loading-container">
        <div className="spinner"></div>
        <p>Loading your metrics...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="analytics-error">
        <AlertCircle size={40} className="error-icon" />
        <h2>Something went wrong</h2>
        <p>{error}</p>
      </div>
    );
  }

  const cards = [
    { title: "All Time", value: stats.total, icon: Eye },
    { title: "Today", value: stats.today, icon: Clock3 },
    { title: "This Week", value: stats.week, icon: TrendingUp },
    { title: "This Month", value: stats.month, icon: CalendarDays },
  ];

  return (
    <main className="analytics-page">
      <motion.header
        className="analytics-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="header-content">
          <h1>Portfolio Analytics</h1>
          <p>Real-time overview of your visitor activity</p>
        </div>
        <div className="status-badge">
          <span className="pulse-dot"></span>
          Live
        </div>
      </motion.header>

      <motion.section
        className="stats-grid"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <motion.div key={card.title} className="stat-card" variants={itemVariants}>
              <div className="stat-card-header">
                <span className="stat-title">{card.title}</span>
                <div className="icon-wrapper">
                  <Icon size={20} />
                </div>
              </div>
              <strong className="stat-value">
                {card.value.toLocaleString()}
              </strong>
            </motion.div>
          );
        })}
      </motion.section>

      <motion.section
        className="chart-section"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <div className="section-header">
          <h2>Traffic History</h2>
        </div>
        <VisitorChart data={history} />
      </motion.section>

      <motion.section
        className="analytics-panel"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <div className="panel-info">
          <span className="info-label">System Status</span>
          <span className="info-value">Operational</span>
        </div>
        <div className="panel-info">
          <span className="info-label">Last Updated</span>
          <span className="info-value">
            {new Date(stats.updatedAt).toLocaleString()}
          </span>
        </div>
      </motion.section>
    </main>
  );
}