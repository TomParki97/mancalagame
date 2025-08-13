import React from 'react';
import { onSpaceEnter } from '../utils/a11y';

interface Props {
  index: number;
  stones: number;
  playable: boolean;
  onClick: () => void;
}

export default function Pit({ index, stones, playable, onClick }: Props) {
  return (
    <button
      className="pit"
      disabled={!playable}
      onClick={onClick}
      tabIndex={playable ? 0 : -1}
      aria-label={`Pit ${index} with ${stones} stones`}
      onKeyDown={onSpaceEnter(() => onClick())}
    >
      <span className="count">{stones}</span>
    </button>
  );
}
