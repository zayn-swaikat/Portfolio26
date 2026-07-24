import { motion } from "framer-motion";
import { Globe2 } from "lucide-react";
import "./CountriesCard.css";

export default function CountriesCard({ countries = [] }) {
  const max = Math.max(
    ...countries.map(([, value]) => value),
    1
  );

  const total = countries.reduce((acc, [, value]) => acc + value, 0) || 1;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.1,
      },
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
      className="analytics-card countries-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="analytics-card-header">
        <div className="header-title-group">
          <div className="header-icon-wrapper">
            <Globe2 className="header-icon" size={18} />
          </div>
          <h3>Top Countries</h3>
        </div>
        {countries.length > 0 && (
          <span className="count-badge">{countries.length} Regions</span>
        )}
      </div>

      <div className="analytics-card-body">
        {countries.length === 0 ? (
          <div className="empty-state">
            <span>No data available</span>
          </div>
        ) : (
          <motion.div
            className="countries-list"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {countries.map(([country, value], index) => {
              const percentage = Math.round((value / total) * 100);
              const barWidth = `${(value / max) * 100}%`;
              const formattedValue = new Intl.NumberFormat("en-US").format(value);

              return (
                <motion.div
                  className="country-item"
                  key={country || index}
                  variants={itemVariants}
                >
                  <div className="country-info">
                    <div className="country-label">
                      <span className="country-rank">{index + 1}</span>
                      <span className="country-name">{country}</span>
                    </div>

                    <div className="country-metrics">
                      <strong className="country-value">{formattedValue}</strong>
                      <span className="country-percentage">{percentage}%</span>
                    </div>
                  </div>

                  <div
                    className="bar-container"
                    role="progressbar"
                    aria-valuenow={value}
                    aria-valuemin={0}
                    aria-valuemax={max}
                    aria-label={`${country}: ${formattedValue} visitors`}
                  >
                    <motion.div
                      className="bar"
                      initial={{ width: 0 }}
                      animate={{ width: barWidth }}
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