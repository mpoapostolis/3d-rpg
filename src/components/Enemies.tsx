import React, { useState, useEffect, useCallback } from "react";
import { RigidBody } from "@react-three/rapier";
import { Text, Billboard } from "@react-three/drei";
import { useGameStore } from "../stores/gameStore";
import { useSound } from "../hooks/useSound";
import { Enemy } from "./enemy";

const initialEnemies = [
  {
    position: [8, 1, -5],
    color: "#FF4444",
    name: "Enemy Small",
    hp: 50,
    type: "small",
    size: 1,
  },
  {
    position: [-8, 1, -5],
    color: "#8B0000",
    name: "Demon",
    hp: 100,
    type: "demon",
    size: 1.5,
  },
  {
    position: [0, 1, -8],
    color: "#4444FF",
    name: "Blue Demon",
    hp: 80,
    type: "demon",
    size: 1.3,
  },
  {
    position: [15, 1, 15],
    color: "#8B0000",
    name: "Demon",
    hp: 100,
    type: "demon",
    size: 1.5,
  },
  {
    position: [-15, 1, -15],
    color: "#4444FF",
    name: "Blue Demon",
    hp: 80,
    type: "demon",
    size: 1.3,
  },
];

export default function Enemies() {
  const { updateQuestProgress, gainXp } = useGameStore();
  const [enemies, setEnemies] = useState(
    initialEnemies.map((enemy) => ({ ...enemy, currentHp: enemy.hp }))
  );
  const [hoveredEnemy, setHoveredEnemy] = useState<number | null>(null);
  const { playSound } = useSound();

  const handleEnemyDeath = useCallback(
    (enemy: (typeof initialEnemies)[0]) => {
      playSound("enemyDeath");
      if (enemy.type === "demon") {
        updateQuestProgress("demon-slayer", 1);
      }
      gainXp(50);
    },
    [playSound, updateQuestProgress, gainXp]
  );

  const handleEnemyClick = useCallback(
    (index: number) => {
      playSound("hit");
      setEnemies((prev) => {
        const newEnemies = [...prev];
        const enemy = newEnemies[index];
        const damage = 25;
        const newHp = Math.max(0, enemy.currentHp - damage);

        if (newHp === 0) {
          handleEnemyDeath(enemy);
          setTimeout(() => {
            setEnemies((prev) => prev.filter((_, i) => i !== index));
          }, 1000);
        }

        enemy.currentHp = newHp;
        return newEnemies;
      });
    },
    [playSound, handleEnemyDeath]
  );

  useEffect(() => {
    if (enemies.length === 0) {
      const respawnTimer = setTimeout(() => {
        setEnemies(
          initialEnemies.map((enemy) => ({ ...enemy, currentHp: enemy.hp }))
        );
      }, 15000);
      return () => clearTimeout(respawnTimer);
    }
  }, [enemies]);

  return (
    <>
      {enemies.map((enemy, index) => (
        <RigidBody
          key={`enemy-${index}-${enemy.position.join(",")}`}
          type="fixed"
          position={enemy.position}
        >
          <group
            onClick={() => handleEnemyClick(index)}
            onPointerOver={() => setHoveredEnemy(index)}
            onPointerOut={() => setHoveredEnemy(null)}
          >
            <Enemy />
            {hoveredEnemy === index && (
              <Billboard>
                <Text
                  position={[0, 2 * enemy.size, 0]}
                  fontSize={0.3}
                  color="white"
                  anchorX="center"
                  anchorY="middle"
                  outlineWidth={0.1}
                  outlineColor="#000000"
                >
                  {enemy.name}
                  {"\n"}
                  HP: {enemy.currentHp}/{enemy.hp}
                  {"\n"}
                  Click to attack
                </Text>
              </Billboard>
            )}
          </group>
        </RigidBody>
      ))}
    </>
  );
}
