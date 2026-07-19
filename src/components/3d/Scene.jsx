import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { 
  Float, 
  Instances, 
  Instance, 
  Line, 
  Sparkles, 
  Environment, 
  MeshTransmissionMaterial 
} from '@react-three/drei';
import { EffectComposer, Bloom, DepthOfField } from '@react-three/postprocessing';
import * as THREE from 'three';


const NeuralNetwork = ({ count = 40 }) => {
  const lines = useMemo(() => {
    const points = [];
    const connections = [];
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
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

  return (
    <group>
      <Instances range={count} material={new THREE.MeshBasicMaterial({ color: '#0055FF' })}>
        <sphereGeometry args={[0.04, 16, 16]} />
        {lines.points.map((pos, i) => (
          <Instance key={i} position={pos} />
        ))}
      </Instances>

      {lines.connections.map((points, i) => (
        <Line 
          key={i} 
          points={points} 
          color="#0055FF" 
          transparent 
          opacity={0.15} 
          lineWidth={1} 
        />
      ))}
    </group>
  );
};

const HolographicPanels = () => {
  const panelsRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    panelsRef.current.rotation.y = Math.sin(t * 0.1) * 0.2;
    panelsRef.current.position.y = Math.sin(t * 0.5) * 0.2;
  });

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
            samples={4}
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

const CentralCore = () => {
  const coreRef = useRef();
  const maxScrollRef = useRef(1);

  const targetPosition = useMemo(() => new THREE.Vector3(0, 0, 0), []);

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

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    coreRef.current.rotation.y = t * 0.05;
    coreRef.current.scale.x = coreRef.current.scale.y = coreRef.current.scale.z = 1 + Math.sin(t * 1) * 0.02;

    const scrollProgress = window.scrollY / maxScrollRef.current;

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
        background={new THREE.Color('#030305')}
        backside
        samples={8}
        resolution={1024}
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

  useFrame((state) => {
    const targetX = (state.pointer.x * Math.PI) / 10;
    const targetY = (state.pointer.y * Math.PI) / 10;
    
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetX, 0.02);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -targetY, 0.02);
  });

  return (
    <>
      <color attach="background" args={['#010102']} />
      <fog attach="fog" args={['#010102', 5, 15]} />
      
      <Environment preset="city" />
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#0055FF" />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#7000FF" />

      <group ref={groupRef}>
        <CentralCore />
        <NeuralNetwork count={50} />
        <HolographicPanels />

        <Sparkles 
          count={800} 
          scale={12} 
          size={1} 
          speed={0.2} 
          opacity={0.3} 
          color="#ffffff" 
        />
        <Sparkles 
          count={200} 
          scale={10} 
          size={1.5} 
          speed={0.4} 
          opacity={0.5} 
          color="#0055FF" 
        />
      </group>

      <EffectComposer disableNormalPass>
        <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={2} height={480} />
        <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} intensity={1.5} />
      </EffectComposer>
    </>
  );
}