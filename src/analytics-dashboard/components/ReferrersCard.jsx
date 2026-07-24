import { motion } from "framer-motion";
import { Link2, Globe, Search, Share2, ArrowUpRight } from "lucide-react";
import "./AnalyticsCard.css";

export default function ReferrersCard({ referrers = [] }) {
  const total = referrers.reduce((sum, [, value]) => sum + value, 0) || 1;

  const getReferrerIcon = (sourceStr = "") => {
    const key = sourceStr.toLowerCase();
    if (key.includes("google") || key.includes("bing") || key.includes("search") || key.includes("duckduckgo")) {
      return Search;
    }
    if (
      key.includes("twitter") ||
      key.includes("x.com") ||
      key.includes("linkedin") ||
      key.includes("facebook") ||
      key.includes("github") ||
      key.includes("t.co")
    ) {
      return Share2;
    }
    if (key.includes("direct") || key.includes("none") || key.includes("internal")) {
      return ArrowUpRight;
    }
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
            <Link2 className="header-icon" size={18} />
          </div>
          <h3>Traffic Sources</h3>
        </div>
        {referrers.length > 0 && (
          <span className="count-badge">{referrers.length} Sources</span>
        )}
      </div>

      <div className="analytics-card-body">
        {referrers.length === 0 ? (
          <div className="empty-state">
            <span>No referrer data recorded</span>
          </div>
        ) : (
          <motion.div
            className="analytics-metric-list"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {referrers.map(([source, value], index) => {
              const Icon = getReferrerIcon(source);
              const percentage = total ? Math.round((value / total) * 100) : 0;
              const formattedValue = new Intl.NumberFormat("en-US").format(value);

              return (
                <motion.div
                  key={source || index}
                  className="analytics-metric-item"
                  variants={itemVariants}
                >
                  <div className="metric-info">
                    <div className="metric-label">
                      <Icon className="metric-type-icon" size={16} />
                      <span className="metric-name">{source}</span>
                    </div>

                    <div className="metric-stats">
                      <span className="metric-raw-val">{formattedValue} visits</span>
                      <strong className="metric-percentage">{percentage}%</strong>
                    </div>
                  </div>

                  <div
                    className="bar-container"
                    role="progressbar"
                    aria-valuenow={percentage}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${source}: ${formattedValue} visits (${percentage}%)`}
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