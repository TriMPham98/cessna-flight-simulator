import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Group, Vector3 } from "three";
import { Box, Cylinder } from "@react-three/drei";
import { useFlightStore } from "../../store/flightStore";

export default function Cessna() {
  const groupRef = useRef<Group>(null);
  const { position, rotation, velocity, throttle, aileron, elevator, rudder } =
    useFlightStore();

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Simple physics simulation
    const speed = throttle * 50; // Max speed in m/s
    const forward = new Vector3(0, 0, -speed * delta);

    // Apply control inputs to rotation
    const newRotation = rotation.clone();
    newRotation.x += elevator * delta * 2;
    newRotation.y += rudder * delta * 2;
    newRotation.z += aileron * delta * 2;

    // Update store with new values
    useFlightStore.getState().updateRotation(newRotation);

    // Apply forward movement
    forward.applyEuler(groupRef.current.rotation);
    const newPosition = position.clone().add(forward);
    useFlightStore.getState().updatePosition(newPosition);

    // Apply to mesh
    groupRef.current.position.copy(newPosition);
    groupRef.current.rotation.setFromVector3(newRotation);
  });

  useEffect(() => {
    // Initialize position
    if (groupRef.current) {
      groupRef.current.position.copy(position);
    }
  }, []);

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
