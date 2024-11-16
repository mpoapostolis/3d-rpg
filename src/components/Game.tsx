import React from "react";
import { Sky, Environment } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import Player from "./Player";
import World from "./World";
import NPCs from "./NPCs";
import Enemies from "./Enemies";
import Crystals from "./Crystals";

export default function Game() {
  return (
    <>
      <Sky sunPosition={[100, 20, 100]} />
      <Environment preset="forest" />
      <ambientLight intensity={0.3} />
      <directionalLight
        castShadow
        position={[50, 50, 50]}
        intensity={1.5}
        shadow-mapSize={[4096, 4096]}
        shadow-camera-near={1}
        shadow-camera-far={200}
        shadow-camera-left={-50}
        shadow-camera-right={50}
        shadow-camera-top={50}
        shadow-camera-bottom={-50}
      />
      <Physics debug={false}>
        <World />
        <Player />
        <NPCs />
        <Enemies />
        <Crystals />
      </Physics>
    </>
  );
}
