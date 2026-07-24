import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, RefreshCw, AlertTriangle, ShieldCheck } from "lucide-react";

import useDashboard from "../hooks/useDashboard";
import StatsGrid from "../components/StatsGrid";
import CountriesCard from "../components/CountriesCard";
import DevicesCard from "../components/DevicesCard";
import BrowsersCard from "../components/BrowsersCard";
import ReferrersCard from "../components/ReferrersCard";
import VisitorsChart from "../components/VisitorsChart";
import AnalyticsLogin from "./AnalyticsLogin";

import "../../styles/Analytics.css";

export default function Analytics() {
  const [authenticated, setAuthenticated] = useState(false);
  const { data, loading, error, refetch } = useDashboard() || {};

  if (!authenticated) {
    return <AnalyticsLogin onLogin={() => setAuthenticated(true)} />;
  }

  return (
    <div className="analytics-dashboard-wrapper">
      <motion.header
        className="dashboard-header"
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="header-brand">
          <div className="brand-badge">
            <LayoutDashboard size={18} />
          </div>
          <div className="brand-titles">
            <h2>Analytics Overview</h2>
            <div className="live-status">
              <span className="status-dot" />
              <span>Realtime Metrics</span>
            </div>
          </div>
        </div>

        <div className="header-actions">
          <div className="security-badge">
            <ShieldCheck size={14} />
            <span>Authenticated</span>
          </div>
          {refetch && (
            <button
              onClick={refetch}
              className="refresh-btn"
              title="Refresh Data"
              disabled={loading}
            >
              <RefreshCw size={15} className={loading ? "spin" : ""} />
            </button>
          )}
        </div>
      </motion.header>

      <main className="dashboard-content">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading-skeleton"
              className="skeleton-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="skeleton-stats-row">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="skeleton-card skeleton-stat" />
                ))}
              </div>
              <div className="skeleton-card skeleton-chart" />
              <div className="skeleton-bento-grid">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="skeleton-card skeleton-panel" />
                ))}
              </div>
            </motion.div>
          ) : error ? (
            <motion.div
              key="error-state"
              className="dashboard-error-card"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="error-icon-box">
                <AlertTriangle size={28} />
              </div>
              <h3>Failed to Load Analytics</h3>
              <p>{error || "Unable to retrieve dashboard metrics at this time."}</p>
              {refetch && (
                <button onClick={refetch} className="retry-btn">
                  <RefreshCw size={15} />
                  Try Again
                </button>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="dashboard-view"
              className="dashboard-main-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <section className="dashboard-section">
                <StatsGrid stats={data?.stats} />
              </section>

              <section className="dashboard-section hero-chart-section">
                <VisitorsChart history={data?.history} />
              </section>

              <section className="dashboard-section bento-grid">
                <CountriesCard countries={data?.countries} />
                <ReferrersCard referrers={data?.referrers} />
                <DevicesCard devices={data?.devices} />
                <BrowsersCard browsers={data?.browsers} />
              </section>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}