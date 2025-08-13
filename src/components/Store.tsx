import React from 'react';
import { Player } from '../game/rules';

interface Props {
  index: number;
  stones: number;
  owner: Player;
}

export default function Store({ stones, owner }: Props) {
  return (
    <div className={`store ${owner === 0 ? 'south' : 'north'}`} aria-label={`Player ${owner + 1} store with ${stones} stones`}>
      <span className="count">{stones}</span>
    </div>
  );
}
