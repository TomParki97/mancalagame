import React, { useEffect, useState, useRef } from 'react';
import Board from './components/Board';
import Controls from './components/Controls';
import SettingsDialog from './components/SettingsDialog';
import StatusBar from './components/StatusBar';
import MoveLog from './components/MoveLog';
import { Engine, create, fromState, move as moveEngine, undo as undoEngine, redo as redoEngine, canUndo, canRedo, current, restart as restartEngine } from './game/engine';
import { legalMoves } from './game/rules';
import { encodeState, decodeState } from './utils/encode';
import { Level } from './game/ai/search';

export default function App() {
  const [engine, setEngine] = useState<Engine>(() => create());
  const [mode, setMode] = useState<'pvp' | 'ai'>('ai');
  const [level, setLevel] = useState<Level>('easy');
  const [thinking, setThinking] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const workerRef = useRef<Worker>();

  useEffect(() => {
    workerRef.current = new Worker(new URL('./game/ai/worker.ts', import.meta.url), { type: 'module' });
    return () => workerRef.current?.terminate();
  }, []);

  useEffect(() => {
    const hash = location.hash.slice(1);
    if (hash) {
      const st = decodeState(hash);
      if (st) setEngine(fromState(st));
    }
  }, []);

  useEffect(() => {
    location.hash = encodeState(current(engine));
  }, [engine]);

  useEffect(() => {
    const st = current(engine);
    if (mode === 'ai' && st.current === 1 && !thinking) {
      const worker = workerRef.current!;
      setThinking(true);
      worker.onmessage = e => {
        const { move } = e.data as { move: number };
        setThinking(false);
        setEngine(en => moveEngine(en, move));
      };
      worker.postMessage({ type: 'bestMove', state: st, level });
    }
  }, [engine, mode, level, thinking]);

  const handlePit = (i: number) => {
    const st = current(engine);
    if (legalMoves(st).includes(i) && !(mode === 'ai' && st.current === 1)) {
      setEngine(en => moveEngine(en, i));
    }
  };

  const restart = () => setEngine(restartEngine());

  return (
    <>
      <Board state={current(engine)} onPit={handlePit} />
      <Controls
        onUndo={() => setEngine(e => undoEngine(e))}
        onRedo={() => setEngine(e => redoEngine(e))}
        onRestart={restart}
        onSettings={() => setSettingsOpen(true)}
        canUndo={canUndo(engine)}
        canRedo={canRedo(engine)}
      />
      <StatusBar state={current(engine)} thinking={thinking} />
      <MoveLog moves={engine.moves} />
      <SettingsDialog
        open={settingsOpen}
        mode={mode}
        level={level}
        onClose={() => setSettingsOpen(false)}
        onChange={(m, l) => {
          setMode(m);
          setLevel(l);
        }}
      />
    </>
  );
}
