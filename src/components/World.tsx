import React from "react";
import { RigidBody } from "@react-three/rapier";

export default function World() {
  return (
    <>
      {/* Ground */}
      <RigidBody type="fixed" colliders="trimesh" position={[0, 0, 0]}>
        <mesh receiveShadow rotation-x={-Math.PI / 2}>
          <planeGeometry args={[100, 100]} />
          <meshStandardMaterial color="#2f4f4f" />
        </mesh>
      </RigidBody>

      {/* Decorative elements */}
      {Array.from({ length: 50 }).map((_, i) => {
        const position = [Math.random() * 90 - 45, 0, Math.random() * 90 - 45];
        const scale = Math.random() * 2 + 1;

        return (
          <RigidBody key={i} type="fixed" position={position}>
            <mesh castShadow position={[0, scale / 2, 0]}>
              <cylinderGeometry args={[0.2, 0.4, scale, 8]} />
              <meshStandardMaterial color="#1a472a" />
            </mesh>
            <mesh castShadow position={[0, scale + 1, 0]}>
              <coneGeometry args={[1, 2, 8]} />
              <meshStandardMaterial color="#2d5a27" />
            </mesh>
          </RigidBody>
        );
      })}
    </>
  );
}
