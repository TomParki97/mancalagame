import React from 'react';
import { State, winner } from '../game/rules';

interface Props {
  state: State;
  thinking: boolean;
}

export default function StatusBar({ state, thinking }: Props) {
  const win = winner(state);
  const text = win === null ? `Player ${state.current + 1}'s turn` : `Player ${win + 1} wins`;
  return (
    <div className="status">
      {text}
      {thinking && <span className="thinking">Thinking…</span>}
    </div>
  );
}
