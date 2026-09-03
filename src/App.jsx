import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import Navbar from "./components/ui/Navbar";
import Hero from "./components/ui/Hero";
import About from "./components/ui/About";
import Skills from "./components/ui/Skills";
import Projects from "./components/ui/Projects";
import HowIBuild from "./components/ui/HowIBuild";
import Connect from "./components/ui/Connect";

import Analytics from "./analytics-dashboard/pages/Analytics.jsx";

import ScrollVelocity from "./ScrollVelocity.jsx";

import "./index.css";

function Portfolio() {
  return (
    <div className="app-wrapper">

      <ScrollVelocity />

      <main className="ui-layer scroll-reactive">
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