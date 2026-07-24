import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";
import { TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import "./VisitorsChart.css";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const val = payload[0].value;
    const formattedVal = new Intl.NumberFormat("en-US").format(val);

    return (
      <div className="chart-glass-tooltip">
        <span className="tooltip-date">{label}</span>
        <div className="tooltip-value-group">
          <span className="tooltip-dot" />
          <span className="tooltip-label">Visitors:</span>
          <strong className="tooltip-val">{formattedVal}</strong>
        </div>
      </div>
    );
  }
  return null;
};

export default function VisitorsChart({ history = [] }) {
  const peakVisits = history.length
    ? Math.max(...history.map((h) => h.visits || 0))
    : 0;

  return (
    <motion.div
      className="analytics-card visitors-chart-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="analytics-card-header">
        <div className="header-title-group">
          <div className="header-icon-wrapper">
            <TrendingUp className="header-icon" size={18} />
          </div>
          <div>
            <h3>Visitors Timeline</h3>
          </div>
        </div>

        {peakVisits > 0 && (
          <div className="chart-peak-badge">
            <span className="peak-label">Peak:</span>
            <strong className="peak-value">
              {new Intl.NumberFormat("en-US").format(peakVisits)}
            </strong>
          </div>
        )}
      </div>

      <div className="chart-body">
        {history.length === 0 ? (
          <div className="empty-state">
            <span>No historical timeline data available</span>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart
              data={history}
              margin={{ top: 12, right: 12, left: -22, bottom: 0 }}
            >
              <defs>
                <linearGradient id="visitorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ffffff" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#ffffff" stopOpacity={0.0} />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255, 255, 255, 0.05)"
                vertical={false}
              />

              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "rgba(255, 255, 255, 0.4)", fontSize: 12 }}
                dy={8}
              />

              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fill: "rgba(255, 255, 255, 0.4)", fontSize: 12 }}
                dx={-4}
                tickFormatter={(val) =>
                  val >= 1000 ? `${(val / 1000).toFixed(1)}k` : val
                }
              />

              <Tooltip
                content={<CustomTooltip />}
                cursor={{
                  stroke: "rgba(255, 255, 255, 0.15)",
                  strokeWidth: 1,
                  strokeDasharray: "4 4",
                }}
              />

              <Area
                type="monotone"
                dataKey="visits"
                stroke="#ffffff"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#visitorGradient)"
                activeDot={{
                  r: 5,
                  fill: "#ffffff",
                  stroke: "rgba(5, 7, 15, 0.9)",
                  strokeWidth: 3,
                }}
                animationDuration={1200}
                animationEasing="ease-out"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </motion.div>
  );
}