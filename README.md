# 🛩️ Cessna Flight Simulator

A realistic Cessna flight simulator built with React Three Fiber and Three.js.

## Quick Setup

```bash
# Clone and install
git clone <your-repo-url>
cd cessna-flight-simulator
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000` to start flying!

## Controls

- **W/S**: Throttle up/down
- **A/D**: Roll left/right (ailerons)
- **Arrow Up/Down**: Pitch up/down (elevator)
- **Arrow Left/Right**: Yaw left/right (rudder)
- **Mouse**: Camera controls (drag to rotate, scroll to zoom)

## Features

- ✈️ Realistic Cessna aircraft model
- 🌤️ Dynamic sky and lighting
- 🛬 Airport runway
- 📊 Flight instruments HUD
- 🎮 Keyboard controls
- 🎯 Physics simulation

## Tech Stack

- **React 18** with TypeScript
- **React Three Fiber** - React renderer for Three.js
- **@react-three/drei** - Useful R3F helpers
- **@react-three/cannon** - Physics engine
- **Vite** - Fast build tool
- **Tailwind CSS** - Styling
- **Zustand** - State management

## Building for Production

```bash
npm run build
npm run preview
```

## Development

The simulator uses a modular architecture:

- `src/components/Aircraft/` - Aircraft models and physics
- `src/components/Environment/` - Terrain, sky, airport
- `src/components/UI/` - HUD, controls, loading screen
- `src/store/` - State management with Zustand

Enjoy flying! 🛩️
