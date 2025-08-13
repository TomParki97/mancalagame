import React from 'react';

interface Props {
  onUndo: () => void;
  onRedo: () => void;
  onRestart: () => void;
  onSettings: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

export default function Controls({ onUndo, onRedo, onRestart, onSettings, canUndo, canRedo }: Props) {
  return (
    <div className="controls">
      <button onClick={onUndo} disabled={!canUndo}>Undo</button>
      <button onClick={onRedo} disabled={!canRedo}>Redo</button>
      <button onClick={onRestart}>Restart</button>
      <button onClick={onSettings}>Settings</button>
    </div>
  );
}
