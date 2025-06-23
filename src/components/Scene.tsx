import { OrbitControls, Sky, Plane } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import Cessna from "./Aircraft/Cessna";
import Environment from "./Environment/Environment";
import { useFlightStore } from "../store/flightStore";

export default function Scene() {
  const controlsRef = useRef<any>(null);
  const { camera } = useThree();
  const { position } = useFlightStore();

  useFrame(() => {
    if (controlsRef.current && position) {
      // Make camera follow aircraft with offset
      const offset = [0, 15, 25]; // Camera position relative to aircraft
      if (controlsRef.current.target) {
        controlsRef.current.target.copy(position);
      }

      // Update camera position to follow aircraft
      camera.position.set(
        position.x + offset[0],
        position.y + offset[1],
        position.z + offset[2]
      );
    }
  });

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
        ref={controlsRef}
        target={[0, 10, 0]}
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={5}
        maxDistance={200}
      />
    </>
  );
}
