/* eslint-disable react/no-unknown-property */
import React, { useRef, useState, Suspense, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { easing } from 'maath';

const MODES = ['lens', 'cube', 'star', 'crystal', 'donut', 'pyramid'];

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
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-10 pointer-events-none opacity-40 text-[10px] uppercase tracking-[0.2em] text-white text-center select-none">
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
  
  // Load models for original shapes
  const { nodes: lensNodes } = useGLTF('/assets/3d/lens.glb');
  const { nodes: cubeNodes } = useGLTF('/assets/3d/cube.glb');

  // Custom Geometries
  const starGeo = useMemo(() => {
    const shape = new THREE.Shape();
    const spikes = 5;
    const outerRadius = 1;
    const innerRadius = 0.4;
    for (let i = 0; i < spikes * 2; i++) {
        const radius = i % 2 === 0 ? outerRadius : innerRadius;
        const angle = (i / (spikes * 2)) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        if (i === 0) shape.moveTo(x, y);
        else shape.lineTo(x, y);
    }
    shape.closePath();
    return new THREE.ExtrudeGeometry(shape, { depth: 0.4, bevelEnabled: true, bevelThickness: 0.1, bevelSize: 0.1 });
  }, []);

  const crystalGeo = useMemo(() => new THREE.IcosahedronGeometry(1, 0), []);
  const donutGeo = useMemo(() => new THREE.TorusGeometry(0.7, 0.3, 16, 100), []);
  const pyramidGeo = useMemo(() => new THREE.TetrahedronGeometry(1.2, 0), []);

  const prev = useRef({ x: 0, y: 0 });
  const scaleTarget = useRef([0.25, 0.25, 0.25]);

  useFrame((state, delta) => {
    const { viewport, pointer, camera } = state;
    const v = viewport.getCurrentViewport(camera, [0, 0, 15]);
    const x = (pointer.x * v.width) / 2;
    const y = (pointer.y * v.height) / 2;

    const velX = (pointer.x - prev.current.x) / delta;
    const velY = (pointer.y - prev.current.y) / delta;
    prev.current = { x: pointer.x, y: pointer.y };

    const speed = Math.sqrt(velX * velX + velY * velY);
    
    // Dynamic RGB Split
    if (matRef.current) {
        const targetChroma = 0.05 + Math.min(speed * 0.03, 0.4);
        matRef.current.chromaticAberration = THREE.MathUtils.lerp(matRef.current.chromaticAberration, targetChroma, 0.1);
    }

    // Squash & Stretch
    const stretch = Math.min(speed * 0.015, 0.18);
    const baseS = (mode === 'lens' || mode === 'cube') ? 0.25 : 0.5; // Scales for custom geos are different
    
    const sX = baseS + Math.abs(velX) * 0.015;
    const sZ = baseS + Math.abs(velY) * 0.015;
    const sY = Math.max(baseS - stretch * 0.5, 0.1);

    scaleTarget.current = [Math.min(sX, 1.2), sY, Math.min(sZ, 1.2)];

    if (meshRef.current) {
      easing.damp3(meshRef.current.position, [x, y, 15], 0.2, delta);
      
      // Back to smooth tilting — much cleaner
      const tiltX = mode === 'lens' ? Math.PI / 2 : 0;
      easing.damp3(meshRef.current.rotation, [tiltX + pointer.y * 0.2, pointer.x * 0.2, 0], 0.15, delta);
      
      easing.damp3(meshRef.current.scale, scaleTarget.current, 0.15, delta);
    }

    if (lightRef.current) {
      easing.damp3(lightRef.current.position, [x, y, 16], 0.4, delta);
    }
  });

  const geometry = useMemo(() => {
    if (mode === 'lens') return lensNodes.Cylinder.geometry;
    if (mode === 'cube') return cubeNodes.Cube.geometry;
    if (mode === 'star') return starGeo;
    if (mode === 'crystal') return crystalGeo;
    if (mode === 'donut') return donutGeo;
    return pyramidGeo;
  }, [mode, lensNodes, cubeNodes, starGeo, crystalGeo, donutGeo, pyramidGeo]);

  return (
    <group>
      <pointLight ref={lightRef} intensity={4} distance={15} color="#ffffff" />

      <mesh ref={meshRef} geometry={geometry}>
        <MeshTransmissionMaterial
          ref={matRef}
          ior={1.45}
          thickness={2.5}
          anisotropy={0.3}
          chromaticAberration={0.05}
          transmission={1}
          roughness={0.01}
          distortion={0.3}
          distortionScale={0.2}
          temporalDistortion={0.05}
        />
      </mesh>
    </group>
  );
}
