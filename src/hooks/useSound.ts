import { useCallback, useEffect, useRef } from "react";
import { Howl } from "howler";

const SOUNDS = {
  background: {
    src: "/creepy-halloween-bell-trap-melody-247720.mp3",
    loop: true,
    volume: 0.2,
  },
  hit: {
    src: "/hit-sound-effect-240898.mp3",
    volume: 0.5,
  },
  collect: {
    src: "/collect-5930.mp3",
    volume: 0.5,
  },
  npcGreeting: {
    src: "/what-can-i-do-for-you-npc-british-male-99751.mp3",
    volume: 0.4,
  },
  questAccept: {
    src: "/level-passed-142971.mp3",
    volume: 0.4,
  },
  questComplete: {
    src: "/game-level-complete-143022.mp3",
    volume: 0.6,
  },
  enemyDeath: {
    src: "/male-death-sound-128357.mp3",
    volume: 0.5,
  },
  levelUp: {
    src: "/goodresult-82807.mp3",
    volume: 0.6,
  },
};

type SoundType = keyof typeof SOUNDS;

export function useSound() {
  const soundsRef = useRef<Record<SoundType, Howl>>(
    {} as Record<SoundType, Howl>
  );

  useEffect(() => {
    // Initialize sounds
    Object.entries(SOUNDS).forEach(([key, config]) => {
      soundsRef.current[key as SoundType] = new Howl({
        src: [config.src],
        loop: config.loop || false,
        volume: config.volume || 1,
      });
    });

    // Start background music
    soundsRef.current.background.play();

    // Cleanup
    return () => {
      Object.values(soundsRef.current).forEach((sound) => sound.unload());
    };
  }, []);

  const playSound = useCallback((type: SoundType) => {
    const sound = soundsRef.current[type];
    if (sound) {
      sound.play();
    }
  }, []);

  return { playSound };
}
