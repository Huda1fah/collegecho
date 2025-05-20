
import { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { PresentationControls, Environment, Float } from '@react-three/drei';
import { Group } from 'three';

function LogoAnimationScene() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
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
    </Canvas>
  );
}

// This component must be used INSIDE the Canvas, so it's defined separately
function CampusModel() {
  const group = useRef<Group>(null);
  
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

export default function LogoAnimation() {
  return (
    <div className="h-full w-full">
      <LogoAnimationScene />
    </div>
  );
}
