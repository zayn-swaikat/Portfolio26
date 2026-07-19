import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';

import Scene from './components/3d/Scene';

import Navbar from './components/ui/Navbar';
import Hero from './components/ui/Hero';
import About from './components/ui/About';
import Skills from './components/ui/Skills';
import Projects from './components/ui/Projects';
import HowIBuild from './components/ui/HowIBuild';
import Connect from './components/ui/Connect';

import './index.css';

function App() {
  return (
    <div className="app-wrapper">

      <div className="global-canvas-container">

        <Canvas 
          eventSource={document.body} 
          eventPrefix="client"
          camera={{ position: [0, 0, 8], fov: 45 }} 
          dpr={[1, 2]}
        >
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>

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

export default App;