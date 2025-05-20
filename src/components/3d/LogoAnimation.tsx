
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PresentationControls, Environment, Float } from '@react-three/drei';
import { Group } from 'three';

// This component must be used INSIDE the Canvas
function CampusModel() {
  const group = useRef<Group>(null);
  
  // useFrame must be used inside a component that's a child of Canvas
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <group ref={group}>
      {/* Campus building with Indian colors */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2, 0.5, 2]} />
        <meshStandardMaterial color="#f8f8f8" />
      </mesh>
      
      {/* Main building tower */}
      <mesh position={[0, 1.25, 0]}>
        <boxGeometry args={[1, 2, 1]} />
        <meshStandardMaterial color="#FF9933" /> {/* Saffron color */}
      </mesh>
      
      {/* Dome */}
      <mesh position={[0, 2.5, 0]}>
        <sphereGeometry args={[0.7, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#138808" /> {/* Green color */}
      </mesh>
      
      {/* Logo circle */}
      <mesh position={[0, 3, 0]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="#000080" /> {/* Navy color */}
      </mesh>
    </group>
  );
}

// This component wraps the model and includes all R3F-specific components
function CampusScene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <spotLight position={[5, 5, 5]} angle={0.15} penumbra={1} intensity={1} />
      <PresentationControls
        global
        snap
        rotation={[0, 0, 0]}
        polar={[-Math.PI / 4, Math.PI / 4]}
        azimuth={[-Math.PI / 6, Math.PI / 6]}
      >
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
          <CampusModel />
        </Float>
      </PresentationControls>
      <Environment preset="city" />
    </>
  );
}

export default function LogoAnimation() {
  return (
    <div className="h-full w-full">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <CampusScene />
      </Canvas>
    </div>
  );
}
