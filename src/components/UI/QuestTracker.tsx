import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scroll, Sword, Diamond, ChevronDown, ChevronUp } from 'lucide-react';
import { useGameStore } from '../../stores/gameStore';

const QuestIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'kill':
      return <Sword className="w-5 h-5 text-red-400" />;
    case 'collect':
      return <Diamond className="w-5 h-5 text-blue-400" />;
    default:
      return <Scroll className="w-5 h-5 text-yellow-400" />;
  }
};

export default function QuestTracker() {
  const { quests } = useGameStore();
  const [isMinimized, setIsMinimized] = useState(false);
  const activeQuests = quests.filter(q => !q.completed);

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      className="absolute top-4 right-4 w-96 pointer-events-auto"
    >
      <div className="bg-black/80 backdrop-blur-md rounded-lg border border-white/10">
        <div 
          className="flex items-center justify-between p-4 cursor-pointer"
          onClick={() => setIsMinimized(!isMinimized)}
        >
          <div className="flex items-center gap-2">
            <Scroll className="w-6 h-6 text-yellow-400" />
            <h2 className="text-white font-bold text-xl">Active Quests</h2>
          </div>
          {isMinimized ? (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          )}
        </div>
        
        <AnimatePresence>
          {!isMinimized && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="max-h-[60vh] overflow-y-auto custom-scrollbar p-4 pt-0 space-y-4">
                {activeQuests.map((quest) => (
                  <motion.div
                    key={quest.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <QuestIcon type={quest.type} />
                      <div className="flex-1">
                        <h3 className="text-white font-semibold text-lg">{quest.title}</h3>
                        <p className="text-gray-300 text-sm mt-1">{quest.description}</p>
                        
                        <div className="mt-3 space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-400">Progress</span>
                            <span className="text-yellow-400 font-medium">
                              {quest.progress} / {quest.required}
                            </span>
                          </div>
                          
                          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-yellow-400"
                              initial={{ width: 0 }}
                              animate={{ width: `${(quest.progress / quest.required) * 100}%` }}
                              transition={{ duration: 0.5 }}
                            />
                          </div>

                          <div className="flex items-center gap-4 mt-2 text-sm">
                            <div className="flex items-center gap-1">
                              <span className="text-gray-400">Reward:</span>
                              <span className="text-yellow-400">{quest.reward.gold} gold</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="text-gray-400">XP:</span>
                              <span className="text-green-400">{quest.reward.xp} XP</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {activeQuests.length === 0 && (
                  <div className="text-center text-gray-400 py-8">
                    No active quests. Talk to NPCs to get started!
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}