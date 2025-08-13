import { State, applyMove } from '../rules';

export function orderMoves(state: State, moves: number[]): number[] {
  return [...moves].sort((a, b) => score(state, b) - score(state, a));
}

function score(state: State, move: number): number {
  const { state: next, extra } = applyMove(state, move);
  let s = 0;
  if (extra) s += 2;
  if (next.board[6] - state.board[6] > 1 || next.board[13] - state.board[13] > 1) s += 1;
  return s;
}
