import React from 'react';

interface Props {
  moves: number[];
}

export default function MoveLog({ moves }: Props) {
  return (
    <ol>
      {moves.map((m, i) => (
        <li key={i}>Pit {m}</li>
      ))}
    </ol>
  );
}
