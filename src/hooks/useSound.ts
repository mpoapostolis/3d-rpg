import { useCallback, useEffect, useRef } from 'react';
import { Howl } from 'howler';

const SOUNDS = {
  background: {
    src: 'https://assets.codepen.io/21542/howler-demo-bg-music.mp3',
    loop: true,
    volume: 0.2,
  },
  hit: {
    src: 'https://assets.codepen.io/21542/sword-hit.mp3',
    volume: 0.5,
  },
  collect: {
    src: 'https://assets.codepen.io/21542/collect-item.mp3',
    volume: 0.5,
  },
  npcGreeting: {
    src: 'https://assets.codepen.io/21542/npc-greeting.mp3',
    volume: 0.4,
  },
  questAccept: {
    src: 'https://assets.codepen.io/21542/quest-accept.mp3',
    volume: 0.4,
  },
  questComplete: {
    src: 'https://assets.codepen.io/21542/quest-complete.mp3',
    volume: 0.6,
  },
  enemyDeath: {
    src: 'https://assets.codepen.io/21542/enemy-death.mp3',
    volume: 0.5,
  },
  levelUp: {
    src: 'https://assets.codepen.io/21542/level-up.mp3',
    volume: 0.6,
  }
};

type SoundType = keyof typeof SOUNDS;

export function useSound() {
  const soundsRef = useRef<Record<SoundType, Howl>>({} as Record<SoundType, Howl>);

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
      Object.values(soundsRef.current).forEach(sound => sound.unload());
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