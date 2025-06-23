import { useFlightStore } from "../../store/flightStore";

export default function HUD() {
  const { showHUD, airspeed, altitude, heading, throttle, rpm } =
    useFlightStore();

  if (!showHUD) return null;

  return (
    <div className="fixed top-4 left-4 text-white font-mono z-40">
      <div className="bg-black bg-opacity-60 p-4 rounded-lg">
        <h2 className="text-lg font-bold mb-2">Flight Instruments</h2>
        <div className="space-y-1 text-sm">
          <div>Airspeed: {Math.round(airspeed)} kts</div>
          <div>Altitude: {Math.round(altitude)} ft</div>
          <div>Heading: {Math.round(heading)}°</div>
          <div>Throttle: {Math.round(throttle * 100)}%</div>
          <div>RPM: {Math.round(rpm)}</div>
        </div>
      </div>
    </div>
  );
}
