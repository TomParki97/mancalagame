import { State, Player } from '../game/rules';

export function encodeState(state: State): string {
  const data = state.board.concat(state.current).join(',');
  return btoa(data);
}

export function decodeState(hash: string): State | null {
  try {
    const arr = atob(hash).split(',').map(Number);
    if (arr.length !== 15) return null;
    const board = arr.slice(0, 14);
    const current = arr[14] as Player;
    return { board, current };
  } catch {
    return null;
  }
}
