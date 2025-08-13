import { State, initialState, applyMove } from './rules';

export interface Engine {
  history: State[];
  future: State[];
  moves: number[];
}

export function create(): Engine {
  return { history: [initialState()], future: [], moves: [] };
}

export function fromState(state: State): Engine {
  return { history: [state], future: [], moves: [] };
}

export function current(engine: Engine): State {
  return engine.history[engine.history.length - 1];
}

export function move(engine: Engine, pit: number): Engine {
  const { state } = applyMove(current(engine), pit);
  return {
    history: [...engine.history, state],
    future: [],
    moves: [...engine.moves, pit],
  };
}

export function undo(engine: Engine): Engine {
  if (engine.history.length <= 1) return engine;
  const past = engine.history.slice(0, -1);
  const last = engine.history[engine.history.length - 1];
  return {
    history: past,
    future: [last, ...engine.future],
    moves: engine.moves.slice(0, -1),
  };
}

export function redo(engine: Engine): Engine {
  if (engine.future.length === 0) return engine;
  const [next, ...rest] = engine.future;
  return {
    history: [...engine.history, next],
    future: rest,
    moves: engine.moves,
  };
}

export const canUndo = (e: Engine) => e.history.length > 1;
export const canRedo = (e: Engine) => e.future.length > 0;

export function restart(): Engine {
  return create();
}
