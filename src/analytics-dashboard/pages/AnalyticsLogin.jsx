import { useState } from "react";
import { LockKeyhole, Eye, EyeOff, AlertCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import "./AnalyticsLogin.css";

export default function AnalyticsLogin({ onLogin }) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!password.trim() || loading) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        throw new Error("Invalid access key. Please try again.");
      }

      onLogin();
    } catch (err) {
      setError(err.message || "Authentication failed");
      setShake(true);
      setTimeout(() => setShake(false), 500);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="analytics-login-container">
      <div className="ambient-glow" aria-hidden="true" />

      <motion.div
        className={`login-card-wrapper ${shake ? "shake-effect" : ""}`}
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="glass-card-border" />

        <form onSubmit={handleSubmit} className="login-box" noValidate>
          <div className="login-header">
            <motion.div 
              className="login-icon-badge"
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <LockKeyhole className="icon-lock" />
            </motion.div>
            <h1 className="login-title">Analytics Engine</h1>
            <p className="login-subtitle">
              Enter your restricted access key to proceed
            </p>
          </div>

          <div className="input-group">
            <div className={`input-wrapper ${error ? "has-error" : ""}`}>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError("");
                }}
                placeholder=" "
                id="analytics-pass"
                disabled={loading}
                autoFocus
                required
                aria-invalid={!!error}
              />
              <label htmlFor="analytics-pass" className="floating-label">
                Access Password
              </label>

              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  className="login-error-message"
                  initial={{ opacity: 0, y: -8, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -6, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <AlertCircle size={14} />
                  <span>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.button
            type="submit"
            className="submit-btn"
            disabled={loading || !password.trim()}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? (
              <span className="btn-content loading">
                <Loader2 className="spinner-icon" size={18} />
                Verifying...
              </span>
            ) : (
              <span className="btn-content">Authenticate</span>
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}