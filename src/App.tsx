import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { KeyboardControls } from '@react-three/drei';
import Game from './components/Game';
import UI from './components/UI';
import LoadingScreen from './components/LoadingScreen';

// Define keyboard controls
const keyboardMap = [
  { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
  { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
  { name: 'leftward', keys: ['ArrowLeft', 'KeyA'] },
  { name: 'rightward', keys: ['ArrowRight', 'KeyD'] },
  { name: 'jump', keys: ['Space'] },
  { name: 'attack', keys: ['KeyF'] },
];

function App() {
  return (
    <KeyboardControls map={keyboardMap}>
      <div className="w-full h-screen">
        <Canvas shadows camera={{ position: [0, 5, 10], fov: 50 }}>
          <Suspense fallback={null}>
            <Game />
          </Suspense>
        </Canvas>
        <UI />
        <LoadingScreen />
      </div>
    </KeyboardControls>
  );
}

export default App;