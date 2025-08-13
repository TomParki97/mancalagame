import React from 'react';
import Pit from './Pit';
import Store from './Store';
import { State, pitsPerSide, stores, legalMoves } from '../game/rules';

interface Props {
  state: State;
  onPit: (i: number) => void;
}

export default function Board({ state, onPit }: Props) {
  const moves = new Set(legalMoves(state));
  return (
    <div className="board">
      <Store index={stores[1]} stones={state.board[stores[1]]} owner={1} />
      <div className="pits top">
        {Array.from({ length: pitsPerSide }).map((_, i) => {
          const idx = 12 - i;
          return (
            <Pit
              key={idx}
              index={idx}
              stones={state.board[idx]}
              playable={moves.has(idx)}
              onClick={() => onPit(idx)}
            />
          );
        })}
      </div>
      <div className="pits bottom">
        {Array.from({ length: pitsPerSide }).map((_, i) => {
          const idx = i;
          return (
            <Pit
              key={idx}
              index={idx}
              stones={state.board[idx]}
              playable={moves.has(idx)}
              onClick={() => onPit(idx)}
            />
          );
        })}
      </div>
      <Store index={stores[0]} stones={state.board[stores[0]]} owner={0} />
    </div>
  );
}
