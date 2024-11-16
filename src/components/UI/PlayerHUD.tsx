import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Droplet, Star, Coins } from 'lucide-react';
import { useGameStore } from '../../stores/gameStore';

const StatBar = ({ 
  icon: Icon, 
  current, 
  max, 
  color, 
  textColor 
}: { 
  icon: typeof Shield;
  current: number;
  max: number;
  color: string;
  textColor: string;
}) => (
  <div className="flex items-center gap-2">
    <Icon className={`w-5 h-5 ${textColor}`} />
    <div className="w-48 h-2 bg-black/50 rounded-full overflow-hidden backdrop-blur-sm">
      <motion.div 
        className={`h-full ${color}`}
        initial={{ width: 0 }}
        animate={{ width: `${(current / max) * 100}%` }}
        transition={{ duration: 0.3 }}
      />
    </div>
    <span className="text-white text-sm font-medium">{current}/{max}</span>
  </div>
);

export default function PlayerHUD() {
  const { hp, maxHp, mp, maxMp, xp, maxXp, level, gold } = useGameStore();

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="absolute top-4 left-4 space-y-2"
    >
      <div className="bg-black/60 backdrop-blur-sm p-4 rounded-lg border border-white/10">
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-yellow-400/20 rounded-full p-2">
            <Star className="w-6 h-6 text-yellow-400" />
          </div>
          <div>
            <div className="text-white font-bold text-xl">Level {level}</div>
            <div className="text-gray-400 text-sm">Adventurer</div>
          </div>
        </div>

        <div className="space-y-3">
          <StatBar 
            icon={Shield} 
            current={hp} 
            max={maxHp} 
            color="bg-red-500" 
            textColor="text-red-400" 
          />
          <StatBar 
            icon={Droplet} 
            current={mp} 
            max={maxMp} 
            color="bg-blue-500" 
            textColor="text-blue-400" 
          />
          
          <div className="pt-2">
            <div className="flex items-center justify-between text-sm text-gray-400 mb-1">
              <span>Experience</span>
              <span>{xp}/{maxXp}</span>
            </div>
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-yellow-400"
                initial={{ width: 0 }}
                animate={{ width: `${(xp / maxXp) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <Coins className="w-5 h-5 text-yellow-400" />
            <span className="text-yellow-400 font-medium">{gold} gold</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}