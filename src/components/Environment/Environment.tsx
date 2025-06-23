import { Plane } from "@react-three/drei";

export default function Environment() {
  return (
    <>
      {/* Ground plane */}
      <Plane
        args={[1000, 1000]}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        receiveShadow>
        <meshStandardMaterial color="#4a7c59" />
      </Plane>

      {/* Simple runway */}
      <Plane
        args={[10, 100]}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.01, 0]}
        receiveShadow>
        <meshStandardMaterial color="#333333" />
      </Plane>

      {/* Runway markings */}
      <Plane
        args={[1, 90]}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.02, 0]}
        receiveShadow>
        <meshStandardMaterial color="#ffffff" />
      </Plane>
    </>
  );
}
