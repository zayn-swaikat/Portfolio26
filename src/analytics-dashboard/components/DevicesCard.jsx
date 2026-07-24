import { motion } from "framer-motion";
import { Monitor, Smartphone, Tablet, Tv, Laptop } from "lucide-react";
import "./AnalyticsCard.css";

export default function DevicesCard({ devices = [] }) {
  const total = devices.reduce((sum, [, value]) => sum + value, 0) || 1;

  const getDeviceIcon = (deviceStr) => {
    const key = deviceStr.toLowerCase();
    if (key.includes("mobile") || key.includes("phone")) return Smartphone;
    if (key.includes("tablet") || key.includes("ipad")) return Tablet;
    if (key.includes("laptop")) return Laptop;
    if (key.includes("tv")) return Tv;
    return Monitor;
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
            <Monitor className="header-icon" size={18} />
          </div>
          <h3>Devices</h3>
        </div>
        {devices.length > 0 && (
          <span className="count-badge">{devices.length} Types</span>
        )}
      </div>

      <div className="analytics-card-body">
        {devices.length === 0 ? (
          <div className="empty-state">
            <span>No device data recorded</span>
          </div>
        ) : (
          <motion.div
            className="analytics-metric-list"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {devices.map(([device, value], index) => {
              const Icon = getDeviceIcon(device);
              const percentage = total ? Math.round((value / total) * 100) : 0;
              const formattedValue = new Intl.NumberFormat("en-US").format(value);

              return (
                <motion.div
                  key={device || index}
                  className="analytics-metric-item"
                  variants={itemVariants}
                >
                  <div className="metric-info">
                    <div className="metric-label">
                      <Icon className="metric-type-icon" size={16} />
                      <span className="metric-name">{device}</span>
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
                    aria-label={`${device}: ${percentage}%`}
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