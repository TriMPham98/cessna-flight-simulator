import { create } from "zustand";
import { Vector3 } from "three";

export interface FlightState {
  // Aircraft state
  position: Vector3;
  velocity: Vector3;
  rotation: Vector3;

  // Flight instruments
  airspeed: number; // knots
  altitude: number; // feet
  heading: number; // degrees
  verticalSpeed: number; // feet per minute

  // Engine
  throttle: number; // 0-1
  rpm: number;
  engineRunning: boolean;

  // Controls
  aileron: number; // -1 to 1
  elevator: number; // -1 to 1
  rudder: number; // -1 to 1

  // Camera
  cameraMode: "cockpit" | "external" | "chase";

  // UI state
  showHUD: boolean;
  showControls: boolean;
  isLoading: boolean;

  // Actions
  updatePosition: (position: Vector3) => void;
  updateVelocity: (velocity: Vector3) => void;
  updateRotation: (rotation: Vector3) => void;
  setThrottle: (throttle: number) => void;
  setAileron: (aileron: number) => void;
  setElevator: (elevator: number) => void;
  setRudder: (rudder: number) => void;
  setCameraMode: (mode: "cockpit" | "external" | "chase") => void;
  toggleEngine: () => void;
  toggleHUD: () => void;
  toggleControls: () => void;
  setLoading: (loading: boolean) => void;
}

export const useFlightStore = create<FlightState>((set, get) => ({
  // Initial aircraft state
  position: new Vector3(0, 1000, 0), // Start at 1000ft altitude
  velocity: new Vector3(0, 0, 0),
  rotation: new Vector3(0, 0, 0),

  // Initial flight instruments
  airspeed: 0,
  altitude: 1000,
  heading: 0,
  verticalSpeed: 0,

  // Initial engine state
  throttle: 0,
  rpm: 0,
  engineRunning: false,

  // Initial controls
  aileron: 0,
  elevator: 0,
  rudder: 0,

  // Initial camera
  cameraMode: "chase",

  // Initial UI state
  showHUD: true,
  showControls: true,
  isLoading: true,

  // Actions
  updatePosition: (position) => set({ position }),
  updateVelocity: (velocity) => {
    const airspeed = velocity.length() * 1.94384; // m/s to knots
    set({ velocity, airspeed });
  },
  updateRotation: (rotation) => {
    const heading = ((rotation.y * 180) / Math.PI + 360) % 360;
    set({ rotation, heading });
  },
  setThrottle: (throttle) => {
    const rpm = throttle * 2500; // Max RPM for Cessna
    set({ throttle, rpm });
  },
  setAileron: (aileron) => set({ aileron }),
  setElevator: (elevator) => set({ elevator }),
  setRudder: (rudder) => set({ rudder }),
  setCameraMode: (cameraMode) => set({ cameraMode }),
  toggleEngine: () => set((state) => ({ engineRunning: !state.engineRunning })),
  toggleHUD: () => set((state) => ({ showHUD: !state.showHUD })),
  toggleControls: () => set((state) => ({ showControls: !state.showControls })),
  setLoading: (isLoading) => set({ isLoading }),
}));
