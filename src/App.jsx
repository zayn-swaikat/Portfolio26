import React, { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { PerformanceMonitor } from "@react-three/drei";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import Scene from "./components/3d/Scene";

import Navbar from "./components/ui/Navbar";
import Hero from "./components/ui/Hero";
import About from "./components/ui/About";
import Skills from "./components/ui/Skills";
import Projects from "./components/ui/Projects";
import HowIBuild from "./components/ui/HowIBuild";
import Connect from "./components/ui/Connect";

import Analytics from "./pages/Analytics";


import { track } from "./analytics/tracker.js";

import "./index.css";



function Portfolio(){

  const [dpr,setDpr] = useState(1.5);


  useEffect(()=>{
    track("page_view");
  },[]);



  return (

    <div className="app-wrapper">

      <div className="global-canvas-container">

        <Canvas
          eventSource={document.body}
          eventPrefix="client"
          camera={{
            position:[0,0,8],
            fov:45
          }}
          dpr={dpr}
          gl={{
            powerPreference:"high-performance",
            antialias:false
          }}
        >

          <PerformanceMonitor
            onDecline={()=>setDpr(1)}
            onIncline={()=>setDpr(1.5)}
            flipflops={3}
          >

            <Suspense fallback={null}>
              <Scene/>
            </Suspense>

          </PerformanceMonitor>


        </Canvas>


      </div>



      <main className="ui-layer">

        <Navbar/>
        <Hero/>
        <About/>
        <Skills/>
        <Projects/>
        <HowIBuild/>
        <Connect/>

      </main>


    </div>

  );

}



export default function App(){


  return (

    <BrowserRouter>

      <Routes>

        <Route
        path="/"
        element={<Portfolio/>}
        />

        <Route
        path="/analytics"
        element={<Analytics/>}
        />

      </Routes>
    </BrowserRouter>
  );
}