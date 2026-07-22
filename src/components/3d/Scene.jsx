import React, { useRef, useMemo, useEffect, useState, useCallback } from 'react';
import { useFrame } from '@react-three/fiber';
import {
  Float,
  Instances,
  Instance,
  Line,
  Sparkles,
  Environment,
  MeshTransmissionMaterial,
  PerformanceMonitor,
  AdaptiveDpr,
  AdaptiveEvents,
} from '@react-three/drei';
import { EffectComposer, Bloom, DepthOfField } from '@react-three/postprocessing';
import * as THREE from 'three';

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  return isMobile;
};

const useScrollRef = () => {
  const scrollRef = useRef(0);
  useEffect(() => {
    const onScroll = () => {
      scrollRef.current = window.scrollY;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return scrollRef;
};

const QUALITY_LEVELS = ['low', 'medium', 'high', 'ultra'];

const NeuralNetwork = ({ quality }) => {
  const count =
    quality === 'low' ? 15 : quality === 'medium' ? 25 : quality === 'high' ? 35 : 45;

  const material = useMemo(() => new THREE.MeshBasicMaterial({ color: '#0055FF' }), []);
  useEffect(() => () => material.dispose(), [material]);

  const lines = useMemo(() => {
    const points = [];
    const connections = [];
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 3 + Math.random() * 4;

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      points.push(new THREE.Vector3(x, y, z));
    }

    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dist = points[i].distanceTo(points[j]);
        if (dist < 2.5) {
          connections.push([points[i], points[j]]);
        }
      }
    }
    return { points, connections };
  }, [count]);

  const opacity = quality === 'low' ? 0.08 : quality === 'medium' ? 0.12 : 0.15;

  return (
    <group>
      <Instances range={count} material={material}>
        <sphereGeometry args={[0.04, 16, 16]} />
        {lines.points.map((pos, i) => (
          <Instance key={i} position={pos} />
        ))}
      </Instances>

      {lines.connections.map((pts, i) => (
        <Line key={i} points={pts} color="#0055FF" transparent opacity={opacity} lineWidth={1} />
      ))}
    </group>
  );
};

const HolographicPanels = ({ quality }) => {
  const panelsRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    panelsRef.current.rotation.y = Math.sin(t * 0.1) * 0.2;
    panelsRef.current.position.y = Math.sin(t * 0.5) * 0.2;
  });

  const samples = quality === 'low' ? 1 : quality === 'medium' ? 2 : 4;
  const resolution = quality === 'low' ? 128 : quality === 'medium' ? 256 : 512;

  return (
    <group ref={panelsRef}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh position={[-3, 1, -2]} rotation={[0, Math.PI / 4, 0]}>
          <planeGeometry args={[2, 3]} />
          <meshBasicMaterial
            color="#0055FF"
            wireframe
            transparent
            opacity={0.1}
            side={THREE.DoubleSide}
          />
        </mesh>
      </Float>

      <Float speed={2} rotationIntensity={0.4} floatIntensity={0.5}>
        <mesh position={[3, -1, -3]} rotation={[0, -Math.PI / 6, 0]}>
          <planeGeometry args={[3, 1.5]} />
          <MeshTransmissionMaterial
            backside
            samples={samples}
            resolution={resolution}
            thickness={0.2}
            chromaticAberration={0.05}
            anisotropy={0.1}
            distortion={0.1}
            distortionScale={0.1}
            temporalDistortion={0.05}
            color="#ffffff"
            transmission={0.9}
            opacity={1}
          />
        </mesh>
      </Float>
    </group>
  );
};

const CentralCore = ({ quality, scrollRef }) => {
  const coreRef = useRef();
  const maxScrollRef = useRef(1);
  const targetPosition = useMemo(() => new THREE.Vector3(0, 0, 0), []);
  const backgroundColor = useMemo(() => new THREE.Color('#030305'), []);

  useEffect(() => {
    const updateMaxScroll = () => {
      maxScrollRef.current = Math.max(document.body.scrollHeight - window.innerHeight, 1);
    };

    updateMaxScroll();
    window.addEventListener('resize', updateMaxScroll);
    const observer = new ResizeObserver(updateMaxScroll);
    observer.observe(document.body);

    return () => {
      window.removeEventListener('resize', updateMaxScroll);
      observer.disconnect();
    };
  }, []);

  const samples =
    quality === 'low' ? 1 : quality === 'medium' ? 2 : quality === 'high' ? 6 : 8;
  const resolution =
    quality === 'low' ? 128 : quality === 'medium' ? 256 : quality === 'high' ? 512 : 1024;

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    coreRef.current.rotation.y = t * 0.05;
    coreRef.current.scale.x = coreRef.current.scale.y = coreRef.current.scale.z =
      1 + Math.sin(t * 1) * 0.02;

    const scrollProgress = scrollRef.current / maxScrollRef.current;
    const targetX = Math.sin(scrollProgress * Math.PI) * 4;
    const targetY = scrollProgress * -2;
    const targetZ = scrollProgress * -1.5;

    targetPosition.set(targetX, targetY, targetZ);
    coreRef.current.position.lerp(targetPosition, delta * 4);
  });

  return (
    <mesh ref={coreRef}>
      <octahedronGeometry args={[1.5, 0]} />
      <MeshTransmissionMaterial
        background={backgroundColor}
        backside
        samples={samples}
        resolution={resolution}
        transmission={0.95}
        roughness={0.1}
        thickness={1.5}
        ior={1.5}
        chromaticAberration={0.15}
        anisotropy={0.3}
        color="#081020"
      />
      <mesh>
        <icosahedronGeometry args={[0.8, 1]} />
        <meshBasicMaterial color="#7000FF" wireframe transparent opacity={0.2} />
      </mesh>
    </mesh>
  );
};

export default function Scene() {
  const groupRef = useRef();
  const isMobile = useIsMobile();
  const scrollRef = useScrollRef();

  const [quality, setQuality] = useState(() => (isMobile ? 'medium' : 'high'));

  useEffect(() => {
    setQuality(isMobile ? 'medium' : 'high');
  }, []);

  const bumpQuality = useCallback((direction) => {
    setQuality((current) => {
      const idx = QUALITY_LEVELS.indexOf(current);
      const nextIdx = Math.min(QUALITY_LEVELS.length - 1, Math.max(0, idx + direction));
      return QUALITY_LEVELS[nextIdx];
    });
  }, []);

  useFrame((state) => {
    if (!isMobile) {
      const targetX = (state.pointer.x * Math.PI) / 10;
      const targetY = (state.pointer.y * Math.PI) / 10;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetX, 0.02);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -targetY, 0.02);
    }
  });

  const isLow = quality === 'low';
  const isUltra = quality === 'ultra';

  return (
    <>
      <PerformanceMonitor factor={1} onIncline={() => bumpQuality(1)} onDecline={() => bumpQuality(-1)} />
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />

      <color attach="background" args={['#010102']} />
      <fog attach="fog" args={['#010102', 5, isLow ? 10 : 15]} />

      {!isLow && <Environment preset="city" resolution={quality === 'medium' ? 128 : 256} />}

      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#0055FF" />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#7000FF" />

      <group ref={groupRef}>
        <CentralCore quality={quality} scrollRef={scrollRef} />
        <NeuralNetwork quality={quality} />
        <HolographicPanels quality={quality} />

        <Sparkles
          count={isLow ? 100 : quality === 'medium' ? 300 : isUltra ? 800 : 500}
          scale={12}
          size={1}
          speed={0.2}
          opacity={0.3}
          color="#ffffff"
        />
        <Sparkles
          count={isLow ? 30 : quality === 'medium' ? 80 : isUltra ? 200 : 150}
          scale={10}
          size={1.5}
          speed={0.4}
          opacity={0.5}
          color="#0055FF"
        />
      </group>

      <EffectComposer disableNormalPass multisampling={isLow ? 0 : isUltra ? 4 : 2}>
        {isUltra && (
          <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={2} height={480} />
        )}
        <Bloom
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          height={isLow ? 150 : 300}
          intensity={isLow ? 1.0 : isUltra ? 1.5 : 1.2}
        />
      </EffectComposer>
    </>
  );
}