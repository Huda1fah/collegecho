
import { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Float, PresentationControls, Environment } from '@react-three/drei';
import { Group } from 'three';

// This component must be used INSIDE the Canvas
const CampusModels = () => {
  const group = useRef<Group>(null);
  
  return (
    <group ref={group}>
      {/* Central Building */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
        <boxGeometry args={[3, 0.5, 3]} />
        <meshStandardMaterial color="#f5f5f5" />
      </mesh>
      
      {/* Main Building */}
      <mesh position={[0, 1.25, 0]} rotation={[0, 0, 0]}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="#FF9933" />
      </mesh>
      
      {/* Dome */}
      <mesh position={[0, 2.5, 0]} rotation={[0, 0, 0]}>
        <sphereGeometry args={[0.8, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#138808" />
      </mesh>
      
      {/* Pillars */}
      {[[-1.2, 0.5, -1.2], [1.2, 0.5, -1.2], [-1.2, 0.5, 1.2], [1.2, 0.5, 1.2]].map((pos, i) => (
        <mesh key={i} position={[pos[0], pos[1], pos[2]]}>
          <cylinderGeometry args={[0.2, 0.2, 1, 16]} />
          <meshStandardMaterial color="#f0f0f0" />
        </mesh>
      ))}
      
      {/* Flag */}
      <mesh position={[0, 3.5, 0]}>
        <boxGeometry args={[0.1, 0.8, 0.1]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      
      <mesh position={[0.5, 3.5, 0]} rotation={[0, 0, 0]}>
        <planeGeometry args={[1, 0.6]} />
        <meshStandardMaterial color="#FF9933" />
      </mesh>
      
      {/* Students (simplified) */}
      {[[-2, 0.5, 0], [2, 0.5, 0], [0, 0.5, 2], [-1.5, 0.5, 1.5]].map((pos, i) => (
        <group key={i} position={[pos[0], pos[1], pos[2]]}>
          <mesh position={[0, 0.4, 0]}>
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshStandardMaterial color={["#FFC0CB", "#87CEEB", "#FFD700", "#98FB98"][i % 4]} />
          </mesh>
          <mesh position={[0, 0, 0]}>
            <capsuleGeometry args={[0.15, 0.5, 8, 16]} />
            <meshStandardMaterial color={["#1E3A8A", "#831843", "#3F6212", "#831843"][i % 4]} />
          </mesh>
        </group>
      ))}
      
      {/* Ground */}
      <mesh position={[0, -0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#7CFC00" opacity={0.8} transparent />
      </mesh>
    </group>
  );
};

export default function HeroScene() {
  return (
    <div className="h-[400px] w-full">
      <Canvas camera={{ position: [5, 4, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <PresentationControls
          global
          rotation={[0, -Math.PI / 4, 0]}
          polar={[-Math.PI / 4, Math.PI / 4]}
          azimuth={[-Math.PI / 4, Math.PI / 4]}
          config={{ mass: 2, tension: 400 }}
          snap={{ mass: 4, tension: 300 }}
        >
          <Float 
            speed={1.5} 
            rotationIntensity={0.5} 
            floatIntensity={1.5}
          >
            <CampusModels />
          </Float>
        </PresentationControls>
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
