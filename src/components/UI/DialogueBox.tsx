import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../stores/gameStore';

export default function DialogueBox() {
  const { activeDialogue, setActiveDialogue } = useGameStore();

  return (
    <AnimatePresence>
      {activeDialogue && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="pointer-events-auto absolute bottom-8 left-1/2 transform -translate-x-1/2 w-[600px]"
        >
          <div className="bg-black/90 backdrop-blur-md rounded-lg p-6 border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-2">{activeDialogue.npcName}</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">{activeDialogue.text}</p>
            
            <div className="space-y-2">
              {activeDialogue.options.map((option, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="block w-full text-left px-4 py-3 rounded-lg
                           bg-white/5 hover:bg-white/10 transition-colors
                           text-white hover:text-yellow-400"
                  onClick={option.action}
                >
                  {option.text}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}