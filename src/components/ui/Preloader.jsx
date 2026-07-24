import React, { useState, useEffect } from "react";
import { useProgress } from "@react-three/drei";
import "./Preloader.css";

export default function Preloader() {
  const { progress, active } = useProgress();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (progress === 100) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  if (!isVisible) return null;

  return (
    <div className={`preloader-container ${progress === 100 ? "fade-out" : ""}`}>
      <div className="preloader-content">
        <h2 className="preloader-text">ZAYN SWAIKAT</h2>
        <div className="progress-bar-wrapper">
          <div 
            className="progress-bar" 
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="progress-number">{Math.floor(progress)}%</span>
      </div>
    </div>
  );
}