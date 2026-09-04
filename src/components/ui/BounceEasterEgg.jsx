import { AnimatePresence, motion } from "framer-motion";
import { X, Maximize2 } from "lucide-react";
import { useEffect, useState } from "react";
import "./BounceEasterEgg.css";

const BOUNCE_URL = "https://bounce-it-by-zayn.vercel.app/";

export default function BounceEasterEgg({ triggerRef }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const element = triggerRef?.current;

    if (!element) return;

    let clicks = 0;
    let resetTimer;

    const handleClick = () => {
      clicks += 1;

      clearTimeout(resetTimer);

      resetTimer = setTimeout(() => {
        clicks = 0;
      }, 900);

      if (clicks >= 5) {
        clicks = 0;
        setIsOpen(true);
      }
    };

    element.addEventListener("click", handleClick);

    return () => {
      element.removeEventListener("click", handleClick);
      clearTimeout(resetTimer);
    };
  }, [triggerRef]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const openFullscreen = () => {
    const iframe = document.querySelector(
      ".bounce-easter-iframe"
    );

    if (!iframe) return;

    iframe.requestFullscreen?.();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="bounce-easter-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bounce-easter-shell"
            initial={{
              opacity: 0,
              scale: 0.96,
              y: 20,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.97,
              y: 15,
            }}
            transition={{
              duration: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <header className="bounce-easter-header">
              <div className="bounce-easter-meta">
                <span className="bounce-status-dot" />
                <span>HIDDEN VARIANT DETECTED</span>
              </div>

              <div className="bounce-easter-actions">
                <button
                  type="button"
                  onClick={openFullscreen}
                  aria-label="Fullscreen"
                >
                  <Maximize2 size={16} />
                </button>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
              </div>
            </header>

            <div className="bounce-easter-game">
              <iframe
                className="bounce-easter-iframe"
                src={BOUNCE_URL}
                title="BOUNCE — Keep it alive."
                allow="fullscreen"
                loading="eager"
              />
            </div>

            <footer className="bounce-easter-footer">
              <span>BOUNCE // 006</span>
              <span>ESC TO RETURN TO SYSTEM</span>
            </footer>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}