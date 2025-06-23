import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/cannon";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { Suspense } from "react";
import { Leva } from "leva";

import Scene from "./components/Scene";
import LoadingScreen from "./components/UI/LoadingScreen";
import HUD from "./components/UI/HUD";
import Controls from "./components/UI/Controls";

function App() {
  return (
    <div className="w-screen h-screen relative">
      <Canvas
        camera={{
          position: [0, 10, 20],
          fov: 75,
          near: 0.1,
          far: 10000,
        }}
        shadows
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          alpha: false,
        }}>
        <Physics
          broadphase="SAP"
          gravity={[0, -9.82, 0]}
          defaultContactMaterial={{
            friction: 0.4,
            restitution: 0.3,
          }}>
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Physics>

        <EffectComposer>
          <Bloom intensity={0.5} luminanceThreshold={0.9} />
        </EffectComposer>
      </Canvas>

      <LoadingScreen />
      <HUD />
      <Controls />

      {/* Development tools */}
      <Leva collapsed />
    </div>
  );
}

export default App;
