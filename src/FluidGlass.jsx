/* eslint-disable react/no-unknown-property */
import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment } from '@react-three/drei';
import { easing } from 'maath';

export default function FluidGlass() {
  return (
    <div className="w-full h-full bg-[#050505]">
      <Canvas camera={{ position: [0, 0, 20], fov: 15 }}>
        <color attach="background" args={['#050505']} />
        <ambientLight intensity={1} />
        <Suspense fallback={null}>
          <Lens />
          <Environment preset="city" />
        </Suspense>
        <gridHelper args={[20, 20, 0x444444, 0x222222]} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -2]} />
      </Canvas>
    </div>
  );
}

function Lens() {
  const ref = useRef();
  const { nodes } = useGLTF('/assets/3d/lens.glb');

  useFrame((state, delta) => {
    const { viewport, pointer, camera } = state;
    const v = viewport.getCurrentViewport(camera, [0, 0, 15]);
    const x = (pointer.x * v.width) / 2;
    const y = (pointer.y * v.height) / 2;
    
    if (ref.current) {
        easing.damp3(ref.current.position, [x, y, 15], 0.2, delta);
        ref.current.rotation.x = Math.PI / 2 + pointer.y * 0.1;
        ref.current.rotation.y = pointer.x * 0.1;
    }
  });

  return (
    <mesh 
      ref={ref} 
      scale={0.25} 
      geometry={nodes.Cylinder.geometry}
    >
      <meshPhysicalMaterial 
        transmission={1}
        thickness={2}
        roughness={0}
        ior={1.5}
        color="white"
      />
    </mesh>
  );
}
