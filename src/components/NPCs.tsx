import React, { useState } from "react";
import { RigidBody } from "@react-three/rapier";
import { Text, Billboard } from "@react-three/drei";
import { useGameStore } from "../stores/gameStore";
import { useSound } from "../hooks/useSound";

const NPCData = [
  {
    position: [5, 1, 5],
    color: "#9C27B0",
    name: "Wizard",
    dialogue: {
      text: "Greetings, adventurer! The forest is plagued by demons. Will you help me?",
      options: [
        {
          text: "I'll help you defeat the demons",
          quest: {
            id: "demon-slayer",
            title: "Demon Slayer",
            description: "Defeat 5 demons in the Dark Forest",
            progress: 0,
            required: 5,
            completed: false,
            type: "kill",
            reward: {
              xp: 100,
              gold: 50,
            },
          },
        },
        { text: "Not now, maybe later" },
      ],
    },
  },
  // ... rest of NPCData remains the same
];

export default function NPCs() {
  const { setActiveDialogue, addQuest } = useGameStore();
  const [hoveredNPC, setHoveredNPC] = useState<string | null>(null);
  const { playSound } = useSound();

  const handleNPCClick = (npc: (typeof NPCData)[0]) => {
    playSound("npcGreeting");
    setActiveDialogue({
      npcName: npc.name,
      text: npc.dialogue.text,
      options: npc.dialogue.options.map((option) => ({
        text: option.text,
        action: option.quest
          ? () => {
              playSound("questAccept");
              addQuest(option.quest);
              setActiveDialogue(null);
            }
          : () => setActiveDialogue(null),
      })),
    });
  };

  return (
    <>
      {NPCData.map((npc, index) => (
        <group key={index}>
          <RigidBody type="fixed" position={npc.position}>
            <group
              onClick={() => handleNPCClick(npc)}
              onPointerOver={() => setHoveredNPC(npc.name)}
              onPointerOut={() => setHoveredNPC(null)}
            >
              <mesh castShadow>
                <capsuleGeometry args={[0.5, 1, 8, 16]} />
                <meshStandardMaterial
                  color={npc.color}
                  roughness={0.2}
                  metalness={0.8}
                />
              </mesh>
            </group>
          </RigidBody>
          {hoveredNPC === npc.name && (
            <Billboard
              position={[npc.position[0], npc.position[1] + 2, npc.position[2]]}
            >
              <Text
                fontSize={0.5}
                color="white"
                anchorX="center"
                anchorY="middle"
                outlineWidth={0.1}
                outlineColor="#000000"
              >
                {npc.name}
                {"\n"}
                Click to interact
              </Text>
            </Billboard>
          )}
        </group>
      ))}
    </>
  );
}
