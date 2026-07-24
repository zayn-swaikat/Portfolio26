import { motion } from "framer-motion";
import { Globe, Compass, Shield, Chrome } from "lucide-react";
import "./AnalyticsCard.css";

export default function BrowsersCard({ browsers = [] }) {
  const total = browsers.reduce((sum, [, value]) => sum + value, 0) || 1;

  const getBrowserIcon = (browserStr) => {
    const key = browserStr.toLowerCase();
    if (key.includes("safari")) return Compass;
    if (key.includes("brave") || key.includes("tor")) return Shield;
    if (key.includes("chrome")) return Chrome;
    return Globe;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.06, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -12 },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <motion.div
      className="analytics-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="analytics-card-header">
        <div className="header-title-group">
          <div className="header-icon-wrapper">
            <Globe className="header-icon" size={18} />
          </div>
          <h3>Browsers</h3>
        </div>
        {browsers.length > 0 && (
          <span className="count-badge">{browsers.length} Browsers</span>
        )}
      </div>

      <div className="analytics-card-body">
        {browsers.length === 0 ? (
          <div className="empty-state">
            <span>No browser data recorded</span>
          </div>
        ) : (
          <motion.div
            className="analytics-metric-list"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {browsers.map(([browser, value], index) => {
              const Icon = getBrowserIcon(browser);
              const percentage = total ? Math.round((value / total) * 100) : 0;
              const formattedValue = new Intl.NumberFormat("en-US").format(value);

              return (
                <motion.div
                  key={browser || index}
                  className="analytics-metric-item"
                  variants={itemVariants}
                >
                  <div className="metric-info">
                    <div className="metric-label">
                      <Icon className="metric-type-icon" size={16} />
                      <span className="metric-name">{browser}</span>
                    </div>

                    <div className="metric-stats">
                      <span className="metric-raw-val">{formattedValue}</span>
                      <strong className="metric-percentage">{percentage}%</strong>
                    </div>
                  </div>

                  <div
                    className="bar-container"
                    role="progressbar"
                    aria-valuenow={percentage}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${browser}: ${percentage}%`}
                  >
                    <motion.div
                      className="bar"
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{
                        duration: 0.8,
                        delay: 0.15 + index * 0.04,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}