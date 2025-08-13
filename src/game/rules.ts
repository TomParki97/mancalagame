export type Player = 0 | 1;
export const pitsPerSide = 6;
export const initialStones = 4;
export const stores = [6, 13];

export interface State {
  board: number[]; // length 14
  current: Player;
}

export function initialState(): State {
  const board = Array(14).fill(initialStones);
  board[stores[0]] = 0;
  board[stores[1]] = 0;
  return { board, current: 0 };
}

function opposite(index: number): number {
  return 12 - index;
}

export function legalMoves(state: State): number[] {
  const start = state.current * pitsPerSide;
  const moves: number[] = [];
  for (let i = 0; i < pitsPerSide; i++) {
    if (state.board[start + i] > 0) moves.push(start + i);
  }
  return moves;
}

export function applyMove(state: State, pit: number): { state: State; extra: boolean } {
  const board = state.board.slice();
  let stones = board[pit];
  board[pit] = 0;
  let i = pit;
  const player = state.current;
  while (stones > 0) {
    i = (i + 1) % 14;
    if (i === stores[1 - player]) continue;
    board[i]++;
    stones--;
  }
  let extra = i === stores[player];
  if (!extra && i >= player * pitsPerSide && i < player * pitsPerSide + pitsPerSide && board[i] === 1) {
    const opp = opposite(i);
    if (board[opp] > 0) {
      board[stores[player]] += board[opp] + 1;
      board[i] = 0;
      board[opp] = 0;
    }
  }
  const sideEmpty = (p: Player) => {
    const start = p * pitsPerSide;
    for (let j = 0; j < pitsPerSide; j++) if (board[start + j] !== 0) return false;
    return true;
  };
  if (sideEmpty(0) || sideEmpty(1)) {
    for (let j = 0; j < pitsPerSide; j++) {
      board[stores[0]] += board[j];
      board[j] = 0;
      board[stores[1]] += board[7 + j];
      board[7 + j] = 0;
    }
  }
  const next: Player = extra ? player : (1 - player) as Player;
  return { state: { board, current: next }, extra };
}

export function gameOver(state: State): boolean {
  const start0 = legalMoves({ board: state.board, current: 0 });
  const start1 = legalMoves({ board: state.board, current: 1 });
  return start0.length === 0 || start1.length === 0;
}

export function winner(state: State): Player | null {
  if (!gameOver(state)) return null;
  if (state.board[stores[0]] > state.board[stores[1]]) return 0;
  if (state.board[stores[1]] > state.board[stores[0]]) return 1;
  return null;
}

export function key(state: State): string {
  return state.board.join(',') + '|' + state.current;
}
