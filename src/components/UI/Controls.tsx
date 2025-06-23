import { useEffect } from "react";
import { useFlightStore } from "../../store/flightStore";

export default function Controls() {
  const { showControls, setThrottle, setAileron, setElevator, setRudder } =
    useFlightStore();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key.toLowerCase()) {
        case "w": // Throttle up
          setThrottle(Math.min(1, useFlightStore.getState().throttle + 0.1));
          break;
        case "s": // Throttle down
          setThrottle(Math.max(0, useFlightStore.getState().throttle - 0.1));
          break;
        case "a": // Roll left
          setAileron(-0.5);
          break;
        case "d": // Roll right
          setAileron(0.5);
          break;
        case "arrowup": // Pitch up
          setElevator(0.5);
          break;
        case "arrowdown": // Pitch down
          setElevator(-0.5);
          break;
        case "arrowleft": // Yaw left
          setRudder(-0.5);
          break;
        case "arrowright": // Yaw right
          setRudder(0.5);
          break;
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      switch (event.key.toLowerCase()) {
        case "a":
        case "d":
          setAileron(0);
          break;
        case "arrowup":
        case "arrowdown":
          setElevator(0);
          break;
        case "arrowleft":
        case "arrowright":
          setRudder(0);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [setThrottle, setAileron, setElevator, setRudder]);

  if (!showControls) return null;

  return (
    <div className="fixed bottom-4 right-4 text-white font-mono z-40">
      <div className="bg-black bg-opacity-60 p-4 rounded-lg">
        <h3 className="text-lg font-bold mb-2">Controls</h3>
        <div className="space-y-1 text-xs">
          <div>W/S: Throttle Up/Down</div>
          <div>A/D: Roll Left/Right</div>
          <div>↑/↓: Pitch Up/Down</div>
          <div>←/→: Yaw Left/Right</div>
        </div>
      </div>
    </div>
  );
}
