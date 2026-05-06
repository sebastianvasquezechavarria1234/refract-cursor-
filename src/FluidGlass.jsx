/* eslint-disable react/no-unknown-property */
import React, { useRef, useState, Suspense, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Environment, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { easing } from 'maath';

const MODES = ['lens', 'bar', 'cube'];

export default function FluidGlass() {
  const [modeIdx, setModeIdx] = useState(0);

  useEffect(() => {
    const handleContext = (e) => e.preventDefault();
    const handleClick = () => setModeIdx((prev) => (prev + 1) % MODES.length);
    
    window.addEventListener('click', handleClick);
    window.addEventListener('contextmenu', handleContext);
    return () => {
      window.removeEventListener('click', handleClick);
      window.removeEventListener('contextmenu', handleContext);
    };
  }, []);

  return (
    <div className="w-full h-full bg-[#050505]">
      {/* HUD Hint */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-10 pointer-events-none opacity-40 text-[10px] uppercase tracking-[0.2em] text-white text-center">
        Click to switch mode<br/>
        <span className="text-white opacity-100 font-bold">{MODES[modeIdx]}</span>
      </div>

      <Canvas camera={{ position: [0, 0, 20], fov: 15 }} dpr={[1, 2]}>
        <color attach="background" args={['#050505']} />
        <ambientLight intensity={0.5} />
        
        <Suspense fallback={null}>
          <ReactiveLens mode={MODES[modeIdx]} />
          <Environment preset="city" />
        </Suspense>

        <gridHelper 
          args={[30, 30, 0x333333, 0x1a1a1a]} 
          rotation={[Math.PI / 2, 0, 0]} 
          position={[0, 0, -2]} 
        />
      </Canvas>
    </div>
  );
}

function ReactiveLens({ mode }) {
  const meshRef = useRef();
  const matRef = useRef();
  const lightRef = useRef();
  
  // Load models
  const { nodes: lensNodes } = useGLTF('/assets/3d/lens.glb');
  const { nodes: barNodes } = useGLTF('/assets/3d/bar.glb');
  const { nodes: cubeNodes } = useGLTF('/assets/3d/cube.glb');

  const prev = useRef({ x: 0, y: 0 });
  const scaleTarget = useRef([0.25, 0.25, 0.25]);

  useFrame((state, delta) => {
    const { viewport, pointer, camera } = state;
    const v = viewport.getCurrentViewport(camera, [0, 0, 15]);
    const x = (pointer.x * v.width) / 2;
    const y = (pointer.y * v.height) / 2;

    // Velocity calc
    const velX = (pointer.x - prev.current.x) / delta;
    const velY = (pointer.y - prev.current.y) / delta;
    prev.current = { x: pointer.x, y: pointer.y };

    const speed = Math.sqrt(velX * velX + velY * velY);
    
    // Dynamic RGB Split (Chromatic Aberration)
    if (matRef.current) {
        // We drive the material property directly to avoid React re-renders
        const targetChroma = 0.05 + Math.min(speed * 0.025, 0.3);
        matRef.current.chromaticAberration = THREE.MathUtils.lerp(matRef.current.chromaticAberration, targetChroma, 0.1);
    }

    // Squash & Stretch
    const stretch = Math.min(speed * 0.015, 0.18);
    const baseS = mode === 'bar' ? 0.15 : 0.25;
    
    // Axis mapping: x->x, z->y (vertical), y->z (depth)
    const sX = baseS + Math.abs(velX) * 0.012;
    const sZ = baseS + Math.abs(velY) * 0.012;
    const sY = Math.max(baseS - stretch * 0.5, 0.1);

    scaleTarget.current = [Math.min(sX, 0.5), sY, Math.min(sZ, 0.5)];

    if (meshRef.current) {
      easing.damp3(meshRef.current.position, [x, y, 15], 0.2, delta);
      meshRef.current.rotation.x = Math.PI / 2 + pointer.y * 0.15;
      meshRef.current.rotation.y = pointer.x * 0.15;
      easing.damp3(meshRef.current.scale, scaleTarget.current, 0.12, delta);
    }

    // Delayed Reactive Light
    if (lightRef.current) {
      easing.damp3(lightRef.current.position, [x, y, 16], 0.4, delta);
    }
  });

  const geometry = useMemo(() => {
    if (mode === 'lens') return lensNodes.Cylinder.geometry;
    if (mode === 'bar') return barNodes.Cube.geometry;
    return cubeNodes.Cube.geometry;
  }, [mode, lensNodes, barNodes, cubeNodes]);

  return (
    <group>
      <pointLight 
        ref={lightRef} 
        intensity={3} 
        distance={15} 
        color="#ffffff" 
      />

      <mesh ref={meshRef} geometry={geometry}>
        <MeshTransmissionMaterial
          ref={matRef}
          buffer={null} // auto-buffer for refraccion
          ior={1.4}
          thickness={2}
          anisotropy={0.1}
          chromaticAberration={0.05}
          transmission={1}
          roughness={0}
          distortion={0.2}
          distortionScale={0.1}
          temporalDistortion={0.05}
          attenuationDistance={0.5}
          attenuationColor="#ffffff"
          color="#ffffff"
        />
      </mesh>
    </group>
  );
}
