import { State, stores } from '../rules';

export function evaluate(state: State): number {
  return state.board[stores[0]] - state.board[stores[1]];
}
