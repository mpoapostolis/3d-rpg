import { create } from 'zustand';

interface Quest {
  id: string;
  title: string;
  description: string;
  progress: number;
  required: number;
  completed: boolean;
  type: 'kill' | 'collect' | 'deliver';
  reward: {
    xp: number;
    gold: number;
    items?: string[];
  };
}

interface DialogueOption {
  text: string;
  action?: () => void;
}

interface GameState {
  hp: number;
  maxHp: number;
  mp: number;
  maxMp: number;
  xp: number;
  maxXp: number;
  level: number;
  gold: number;
  quests: Quest[];
  inventory: string[];
  activeDialogue: {
    npcName: string;
    text: string;
    options: DialogueOption[];
  } | null;
  takeDamage: (amount: number) => void;
  useMana: (amount: number) => void;
  gainXp: (amount: number) => void;
  addQuest: (quest: Quest) => void;
  updateQuestProgress: (questId: string, progress: number) => void;
  setActiveDialogue: (dialogue: GameState['activeDialogue']) => void;
  completeQuest: (questId: string) => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  hp: 100,
  maxHp: 100,
  mp: 50,
  maxMp: 50,
  xp: 0,
  maxXp: 100,
  level: 1,
  gold: 0,
  quests: [],
  inventory: [],
  activeDialogue: null,

  takeDamage: (amount) =>
    set((state) => ({
      hp: Math.max(0, state.hp - amount),
    })),

  useMana: (amount) =>
    set((state) => ({
      mp: Math.max(0, state.mp - amount),
    })),

  gainXp: (amount) =>
    set((state) => {
      const newXp = state.xp + amount;
      if (newXp >= state.maxXp) {
        return {
          xp: newXp - state.maxXp,
          maxXp: Math.floor(state.maxXp * 1.5),
          level: state.level + 1,
          maxHp: Math.floor(state.maxHp * 1.1),
          maxMp: Math.floor(state.maxMp * 1.1),
          hp: Math.floor(state.maxHp * 1.1),
          mp: Math.floor(state.maxMp * 1.1),
        };
      }
      return { xp: newXp };
    }),

  addQuest: (quest) =>
    set((state) => ({
      quests: [...state.quests, quest],
    })),

  updateQuestProgress: (questId, increment) =>
    set((state) => {
      const newQuests = state.quests.map((quest) => {
        if (quest.id === questId) {
          const newProgress = quest.progress + increment;
          const completed = newProgress >= quest.required;
          
          if (completed && !quest.completed) {
            // Auto-complete the quest when progress is met
            get().completeQuest(questId);
          }
          
          return {
            ...quest,
            progress: Math.min(newProgress, quest.required),
            completed,
          };
        }
        return quest;
      });
      
      return { quests: newQuests };
    }),

  completeQuest: (questId) =>
    set((state) => {
      const quest = state.quests.find(q => q.id === questId);
      if (quest?.completed) {
        // Grant rewards
        return {
          gold: state.gold + quest.reward.gold,
          xp: state.xp + quest.reward.xp,
        };
      }
      return state;
    }),

  setActiveDialogue: (dialogue) =>
    set(() => ({
      activeDialogue: dialogue,
    })),
}));