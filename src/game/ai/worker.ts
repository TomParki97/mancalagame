import { bestMove, Level } from './search';
import { State } from '../rules';

self.onmessage = (e: MessageEvent) => {
  const { type, state, level } = e.data as { type: string; state: State; level: Level };
  if (type === 'bestMove') {
    const result = bestMove(state, level);
    (self as unknown as Worker).postMessage(result);
  }
};
