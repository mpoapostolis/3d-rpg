import React from 'react';
import PlayerHUD from './UI/PlayerHUD';
import QuestTracker from './UI/QuestTracker';
import DialogueBox from './UI/DialogueBox';

export default function UI() {
  return (
    <div className="fixed inset-0 pointer-events-none">
      <PlayerHUD />
      <QuestTracker />
      <DialogueBox />
    </div>
  );
}