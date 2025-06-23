import { OrbitControls, Sky, Plane } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import Cessna from "./Aircraft/Cessna";
import Environment from "./Environment/Environment";

export default function Scene() {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[100, 100, 50]}
        intensity={1}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={1000}
        shadow-camera-left={-100}
        shadow-camera-right={100}
        shadow-camera-top={100}
        shadow-camera-bottom={-100}
      />

      {/* Sky */}
      <Sky sunPosition={[100, 100, 50]} turbidity={0.1} rayleigh={0.2} />

      {/* Environment */}
      <Environment />

      {/* Aircraft */}
      <Cessna />

      {/* Controls */}
      <OrbitControls
        target={[0, 0, 0]}
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={5}
        maxDistance={1000}
      />
    </>
  );
}
