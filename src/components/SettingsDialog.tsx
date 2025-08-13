import React, { useState } from 'react';

type Mode = 'pvp' | 'ai';
type Level = 'easy' | 'medium' | 'impossible';

interface Props {
  open: boolean;
  mode: Mode;
  level: Level;
  onClose: () => void;
  onChange: (mode: Mode, level: Level) => void;
}

export default function SettingsDialog({ open, mode, level, onClose, onChange }: Props) {
  const [m, setM] = useState<Mode>(mode);
  const [l, setL] = useState<Level>(level);
  if (!open) return null;
  return (
    <div className="dialog" role="dialog" aria-modal="true">
      <div className="dialog-content">
        <h2>Settings</h2>
        <div>
          <label>
            <input type="radio" name="mode" value="pvp" checked={m === 'pvp'} onChange={() => setM('pvp')} />
            Local 1v1
          </label>
        </div>
        <div>
          <label>
            <input type="radio" name="mode" value="ai" checked={m === 'ai'} onChange={() => setM('ai')} />
            Play vs AI
          </label>
        </div>
        {m === 'ai' && (
          <div>
            <label>
              Difficulty:
              <select value={l} onChange={e => setL(e.target.value as Level)}>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="impossible">Impossible</option>
              </select>
            </label>
          </div>
        )}
        <div className="controls">
          <button onClick={() => { onChange(m, l); onClose(); }}>OK</button>
        </div>
      </div>
    </div>
  );
}
