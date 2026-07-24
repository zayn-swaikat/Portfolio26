import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  isPositive
}) {
  const formattedValue =
    typeof value === "number"
      ? new Intl.NumberFormat("en-US").format(value)
      : value ?? "0";

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="stat-card"
      tabIndex={0}
      role="region"
      aria-label={`${title}: ${formattedValue}`}
    >
      <div className="stat-card-glow" aria-hidden="true" />
      
      <div className="stat-card-header">
        <span className="stat-title">{title}</span>
        <div className="stat-icon-wrapper">
          <Icon className="stat-icon" size={18} />
        </div>
      </div>

      <div className="stat-card-body">
        <strong className="stat-value">{formattedValue}</strong>

        {trend && (
          <div className={`stat-trend-badge ${isPositive ? "positive" : "negative"}`}>
            {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
            <span>{trend}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}