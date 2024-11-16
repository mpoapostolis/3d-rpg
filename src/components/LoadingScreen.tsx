import React from 'react';
import { useProgress } from '@react-three/drei';

export default function LoadingScreen() {
  const { progress, active } = useProgress();

  if (!active) return null;

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="text-center">
        <h2 className="text-white text-2xl mb-4">Loading Game Assets</h2>
        <div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-white transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-white mt-2">{Math.round(progress)}%</p>
      </div>
    </div>
  );
}