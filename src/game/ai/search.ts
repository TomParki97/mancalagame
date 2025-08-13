import { State, legalMoves, applyMove, gameOver, key } from '../rules';
import { evaluate } from './eval';
import { orderMoves } from './ordering';
import { TT } from './tt';

export type Level = 'easy' | 'medium' | 'impossible';

interface Result { move: number; info: { depth: number; nodes: number }; }

export function bestMove(state: State, level: Level): Result {
  const moves = legalMoves(state);
  if (moves.length === 0) return { move: -1, info: { depth: 0, nodes: 0 } };
  if (level === 'easy') {
    const move = moves[Math.floor(Math.random() * moves.length)];
    return { move, info: { depth: 0, nodes: 1 } };
  }
  const tt = new TT();
  const maxDepth = level === 'medium' ? 6 : 20;
  const maxTime = level === 'medium' ? 500 : 2000;
  const start = performance.now();
  let best = { move: moves[0], value: -Infinity, nodes: 0, depth: 1 };
  for (let d = 1; d <= maxDepth; d++) {
    const res = search(state, d, tt);
    best = res;
    if (level === 'medium') break;
    if (performance.now() - start > maxTime) break;
  }
  return { move: best.move, info: { depth: best.depth, nodes: best.nodes } };
}

function search(state: State, depth: number, tt: TT) {
  const nodes = { count: 0 };
  let bestMove = -1;
  let bestVal = -Infinity;
  for (const m of orderMoves(state, legalMoves(state))) {
    const { state: ns } = applyMove(state, m);
    const val = -alphabeta(ns, depth - 1, -Infinity, Infinity, tt, nodes);
    if (val > bestVal) {
      bestVal = val;
      bestMove = m;
    }
  }
  return { move: bestMove, value: bestVal, nodes: nodes.count, depth };
}

function alphabeta(state: State, depth: number, alpha: number, beta: number, tt: TT, nodes: { count: number }): number {
  nodes.count++;
  if (depth === 0 || gameOver(state)) {
    return (state.current === 0 ? 1 : -1) * evaluate(state);
  }
  const k = key(state);
  const ttVal = tt.get(k, depth);
  if (ttVal !== undefined) return ttVal;
  let value = -Infinity;
  for (const m of orderMoves(state, legalMoves(state))) {
    const { state: ns } = applyMove(state, m);
    const score = -alphabeta(ns, depth - 1, -beta, -alpha, tt, nodes);
    if (score > value) value = score;
    if (value > alpha) alpha = value;
    if (alpha >= beta) break;
  }
  tt.set(k, depth, value);
  return value;
}
