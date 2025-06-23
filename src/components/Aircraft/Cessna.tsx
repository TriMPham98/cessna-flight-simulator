import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Group, Vector3 } from "three";
import { Box, Cylinder } from "@react-three/drei";
import { useFlightStore } from "../../store/flightStore";

export default function Cessna() {
  const groupRef = useRef<Group>(null);
  const { throttle, aileron, elevator, rudder } = useFlightStore();

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Get current position and rotation from the mesh
    const currentPosition = groupRef.current.position;
    const currentRotation = groupRef.current.rotation;

    // Apply control inputs to rotation
    currentRotation.x += elevator * delta * 2;
    currentRotation.y += rudder * delta * 2;
    currentRotation.z += aileron * delta * 2;

    // Simple physics simulation - move forward based on throttle
    const speed = throttle * 20; // Max speed in m/s
    const forward = new Vector3(0, 0, -speed * delta);

    // Apply rotation to movement direction
    forward.applyEuler(currentRotation);
    currentPosition.add(forward);

    // Update store with current values
    const storePosition = new Vector3().copy(currentPosition);
    const storeRotation = new Vector3(
      currentRotation.x,
      currentRotation.y,
      currentRotation.z
    );
    const velocity = new Vector3().copy(forward).divideScalar(delta);

    useFlightStore.getState().updatePosition(storePosition);
    useFlightStore.getState().updateRotation(storeRotation);
    useFlightStore.getState().updateVelocity(velocity);

    // Update altitude in store (convert to feet)
    const altitudeFeet = currentPosition.y * 3.28084;
    useFlightStore.setState({ altitude: Math.max(0, altitudeFeet) });
  });

  return (
    <group ref={groupRef} position={[0, 10, 0]}>
      {/* Fuselage */}
      <Box args={[1, 1, 8]} position={[0, 0, 0]} castShadow>
        <meshStandardMaterial color="#ffffff" />
      </Box>

      {/* Wings */}
      <Box args={[12, 0.2, 2]} position={[0, -0.5, 0]} castShadow>
        <meshStandardMaterial color="#ffffff" />
      </Box>

      {/* Tail */}
      <Box args={[0.2, 2, 1]} position={[0, 1, 3.5]} castShadow>
        <meshStandardMaterial color="#ffffff" />
      </Box>
      <Box args={[2, 0.2, 1]} position={[0, 2, 3.5]} castShadow>
        <meshStandardMaterial color="#ffffff" />
      </Box>

      {/* Propeller */}
      <Cylinder
        args={[0.1, 0.1, 2]}
        position={[0, 0, -4.2]}
        rotation={[0, 0, Math.PI / 2]}
        castShadow>
        <meshStandardMaterial color="#333333" />
      </Cylinder>

      {/* Landing gear */}
      <Cylinder args={[0.1, 0.1, 1]} position={[1, -1.5, 1]} castShadow>
        <meshStandardMaterial color="#333333" />
      </Cylinder>
      <Cylinder args={[0.1, 0.1, 1]} position={[-1, -1.5, 1]} castShadow>
        <meshStandardMaterial color="#333333" />
      </Cylinder>
      <Cylinder args={[0.1, 0.1, 1]} position={[0, -1.5, -2]} castShadow>
        <meshStandardMaterial color="#333333" />
      </Cylinder>
    </group>
  );
}
