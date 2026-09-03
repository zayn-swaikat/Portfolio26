import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Scene from "./components/3d/Scene";

import Navbar from "./components/ui/Navbar";
import Hero from "./components/ui/Hero";
import About from "./components/ui/About";
import Skills from "./components/ui/Skills";
import Projects from "./components/ui/Projects";
import HowIBuild from "./components/ui/HowIBuild";
import Connect from "./components/ui/Connect";

import Analytics from "./analytics-dashboard/pages/Analytics.jsx";

import { track } from "./analytics/tracker.js";

import "./index.css";


function Portfolio() {
  useEffect(() => {
    track("page_view");
  }, []);

  return (
    <div className="app-wrapper">

      <Scene />

      <main className="ui-layer">
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <HowIBuild />
        <Connect />
      </main>

    </div>
  );
}


export default function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Portfolio />}
        />

        <Route
          path="/analytics"
          element={<Analytics />}
        />

      </Routes>

    </BrowserRouter>
  );
}