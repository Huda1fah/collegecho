
import { Canvas } from '@react-three/fiber';
import { Float, PresentationControls, ContactShadows, Environment } from '@react-three/drei';
import { Suspense } from 'react';

const BoxGeometry = ({ position = [0, 0, 0], color = "#138808", size = [1, 1, 1], rotation = [0, 0, 0] }) => {
  return (
    <mesh position={position} rotation={rotation}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const SphereGeometry = ({ position = [0, 0, 0], color = "#FF9933", radius = 1 }) => {
  return (
    <mesh position={position}>
      <sphereGeometry args={[radius, 32, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const IndianFlag = () => {
  return (
    <group position={[0, 0, 0]}>
      {/* Saffron stripe */}
      <BoxGeometry position={[0, 2, 0]} color="#FF9933" size={[3, 0.6, 0.1]} />
      
      {/* White stripe */}
      <BoxGeometry position={[0, 1.4, 0]} color="#FFFFFF" size={[3, 0.6, 0.1]} />
      
      {/* Green stripe */}
      <BoxGeometry position={[0, 0.8, 0]} color="#138808" size={[3, 0.6, 0.1]} />
      
      {/* Ashoka Chakra */}
      <group position={[0, 1.4, 0.06]}>
        <mesh>
          <ringGeometry args={[0.2, 0.3, 24]} />
          <meshStandardMaterial color="#000080" />
        </mesh>
        
        {/* Spokes */}
        {Array.from({ length: 24 }).map((_, i) => {
          const angle = (i / 24) * Math.PI * 2;
          return (
            <BoxGeometry 
              key={i}
              position={[Math.cos(angle) * 0.25, Math.sin(angle) * 0.25, 0]} 
              color="#000080" 
              size={[0.02, 0.02, 0.02]} 
              rotation={[0, 0, angle]}
            />
          );
        })}
      </group>
      
      {/* Flag pole */}
      <BoxGeometry position={[-1.6, 1.4, 0]} color="#8B4513" size={[0.1, 3, 0.1]} />
    </group>
  );
};

const Campus = () => {
  return (
    <group position={[1.5, -0.5, 0]}>
      {/* Main building base */}
      <BoxGeometry position={[0, 0, 0]} color="#f8f8f8" size={[3, 0.5, 2]} />
      
      {/* Main building structure */}
      <BoxGeometry position={[0, 0.75, 0]} color="#e0e0e0" size={[2.5, 1, 1.5]} />
      
      {/* Central tower */}
      <BoxGeometry position={[0, 1.75, 0]} color="#d0d0d0" size={[1.2, 1.5, 1.2]} />
      
      {/* Dome */}
      <SphereGeometry position={[0, 2.75, 0]} color="#FF9933" radius={0.7} />
      
      {/* Windows */}
      {[-0.8, 0, 0.8].map((x, i) => (
        <BoxGeometry key={i} position={[x, 0.75, 0.8]} color="#87CEEB" size={[0.4, 0.4, 0.1]} />
      ))}
      
      {/* Steps */}
      <BoxGeometry position={[0, 0.1, 1.2]} color="#c0c0c0" size={[1.5, 0.2, 0.6]} />
    </group>
  );
};

const Books = () => {
  return (
    <group position={[-1.5, -0.3, 0]}>
      {/* Stack of books */}
      <BoxGeometry position={[0, 0, 0]} color="#FF9933" size={[1.2, 0.2, 0.8]} rotation={[0, -0.2, 0]} />
      <BoxGeometry position={[0, 0.2, 0]} color="#138808" size={[1.1, 0.2, 0.75]} rotation={[0, 0.1, 0]} />
      <BoxGeometry position={[0, 0.4, 0]} color="#000080" size={[1.15, 0.2, 0.78]} rotation={[0, -0.15, 0]} />
      
      {/* Pen */}
      <BoxGeometry position={[0.6, 0.5, 0.2]} color="#4B0082" size={[0.1, 0.5, 0.1]} rotation={[0, 0, -0.3]} />
    </group>
  );
};

export default function HeroScene() {
  return (
    <div className="h-[400px] w-full">
      <Suspense fallback={<div className="w-full h-full flex items-center justify-center">Loading 3D scene...</div>}>
        <Canvas
          camera={{ fov: 45, position: [0, 0, 10] }}
          shadows
        >
          <color attach="background" args={['#f5f5f5']} />
          
          <PresentationControls
            global
            snap
            rotation={[0, 0, 0]}
            polar={[-Math.PI / 4, Math.PI / 4]}
            azimuth={[-Math.PI / 4, Math.PI / 4]}
          >
            <group position={[0, -1, 0]}>
              <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
                <IndianFlag />
              </Float>
              
              <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
                <Campus />
              </Float>
              
              <Float speed={1} rotationIntensity={0.3} floatIntensity={0.3}>
                <Books />
              </Float>
            </group>
          </PresentationControls>
          
          <ambientLight intensity={0.5} />
          <spotLight position={[5, 5, 5]} angle={0.15} penumbra={1} intensity={1} castShadow />
          <Environment preset="city" />
          <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={10} blur={1.5} />
        </Canvas>
      </Suspense>
    </div>
  );
}
