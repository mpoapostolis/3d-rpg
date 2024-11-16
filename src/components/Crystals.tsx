import React, { useState, useEffect, useCallback } from 'react';
import { RigidBody } from '@react-three/rapier';
import { Text, Billboard } from '@react-three/drei';
import { useGameStore } from '../stores/gameStore';
import { useSound } from '../hooks/useSound';

const initialCrystals = [
  { position: [10, 0.5, 10], color: '#4FC3F7', id: 1 },
  { position: [-10, 0.5, -10], color: '#4FC3F7', id: 2 },
  { position: [10, 0.5, -10], color: '#4FC3F7', id: 3 },
  { position: [-10, 0.5, 10], color: '#4FC3F7', id: 4 },
  { position: [0, 0.5, 15], color: '#4FC3F7', id: 5 },
];

export default function Crystals() {
  const { updateQuestProgress } = useGameStore();
  const [crystals, setCrystals] = useState(initialCrystals);
  const [hoveredCrystal, setHoveredCrystal] = useState<number | null>(null);
  const { playSound } = useSound();

  const handleCrystalClick = useCallback((index: number) => {
    playSound('collect');
    updateQuestProgress('crystal-collector', 1);
    updateQuestProgress('forest-harmony', 1);
    updateQuestProgress('treasure-hunt', 1);
    setCrystals(prev => prev.filter((_, i) => i !== index));
  }, [playSound, updateQuestProgress]);

  useEffect(() => {
    if (crystals.length === 0) {
      const respawnTimer = setTimeout(() => {
        setCrystals(initialCrystals);
      }, 10000);
      return () => clearTimeout(respawnTimer);
    }
  }, [crystals]);

  return (
    <>
      {crystals.map((crystal, index) => (
        <RigidBody key={`crystal-${crystal.id}`} type="fixed" position={crystal.position}>
          <group
            onClick={() => handleCrystalClick(index)}
            onPointerOver={() => setHoveredCrystal(index)}
            onPointerOut={() => setHoveredCrystal(null)}
          >
            <mesh castShadow>
              <octahedronGeometry args={[0.5]} />
              <meshStandardMaterial
                color={crystal.color}
                emissive={crystal.color}
                emissiveIntensity={0.5}
                toneMapped={false}
              />
            </mesh>
            {hoveredCrystal === index && (
              <Billboard>
                <Text
                  position={[0, 1.5, 0]}
                  fontSize={0.3}
                  color="white"
                  anchorX="center"
                  anchorY="middle"
                  outlineWidth={0.1}
                  outlineColor="#000000"
                >
                  Magic Crystal
                  {'\n'}
                  Click to collect
                </Text>
              </Billboard>
            )}
          </group>
        </RigidBody>
      ))}
    </>
  );
}