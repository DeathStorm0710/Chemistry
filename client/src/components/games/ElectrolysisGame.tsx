/**
 * Electrolysis Game
 * Design: Playful Retro-Futurism
 * - Adjust voltage slider
 * - Count bubbles forming at electrodes
 * - Visual feedback and learning
 */

import { useState } from 'react';

interface ElectrolysisGameProps {
  onComplete: () => void;
}

export default function ElectrolysisGame({ onComplete }: ElectrolysisGameProps) {
  const [voltage, setVoltage] = useState(50);
  const [running, setRunning] = useState(false);
  const [h2Bubbles, setH2Bubbles] = useState(0);
  const [o2Bubbles, setO2Bubbles] = useState(0);
  const [feedback, setFeedback] = useState('');

  const handleStart = () => {
    if (voltage < 30) {
      setFeedback('Voltage too low! Increase it to at least 30V.');
      return;
    }

    setRunning(true);
    setH2Bubbles(0);
    setO2Bubbles(0);
    setFeedback('Electrolysis in progress...');

    // Simulate bubble formation
    let h2Count = 0;
    let o2Count = 0;
    const interval = setInterval(() => {
      h2Count += Math.floor(voltage / 20);
      o2Count += Math.floor(voltage / 40);

      setH2Bubbles(h2Count);
      setO2Bubbles(o2Count);

      if (h2Count > 40) {
        clearInterval(interval);
        setRunning(false);
        setFeedback(
          `✓ Success! H₂ bubbles: ${h2Count}, O₂ bubbles: ${o2Count}. Notice H₂ forms twice as fast as O₂!`
        );
      }
    }, 300);

    return () => clearInterval(interval);
  };

  const handleReset = () => {
    setVoltage(50);
    setRunning(false);
    setH2Bubbles(0);
    setO2Bubbles(0);
    setFeedback('');
  };

  return (
    <div className="bg-white rounded-3xl p-8 border-2 border-[#06B6D4] shadow-lg space-y-6">
      <h2 className="text-2xl font-bold text-[#1F2937]">⚡ Electrolysis Challenge</h2>

      {/* Instructions */}
      <p className="text-lg text-[#6B7280]">
        Adjust the voltage and watch water break down into hydrogen and oxygen gases!
      </p>

      {/* Game Area */}
      <div className="bg-gradient-to-b from-[#FEF3C7] to-[#FEF9E7] rounded-2xl p-8 border-2 border-[#D97706] space-y-8">
        {/* Voltage Slider */}
        <div>
          <label className="text-lg font-bold text-[#1F2937] block mb-2">
            Voltage: {voltage}V
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={voltage}
            onChange={(e) => setVoltage(parseInt(e.target.value))}
            disabled={running}
            className="w-full h-3 bg-[#06B6D4] rounded-full appearance-none cursor-pointer accent-[#D97706]"
          />
          <p className="text-xs text-[#6B7280] mt-2">Minimum 30V required</p>
        </div>

        {/* Electrolysis Cell */}
        <div className="flex justify-center gap-8 py-8">
          {/* Negative Electrode (Cathode) - produces H2 */}
          <div className="flex flex-col items-center">
            <p className="text-sm font-bold text-[#1F2937] mb-4">Cathode (-)</p>
            <div className="w-16 h-40 bg-gradient-to-b from-[#E0F2FE] to-[#BAE6FD] border-4 border-[#0284C7] rounded-lg flex flex-col justify-end items-center p-2 relative">
              {/* Bubbles */}
              {running && (
                <>
                  <div className="absolute text-2xl animate-float">🫧</div>
                  <div className="absolute text-2xl animate-float" style={{ animationDelay: '0.3s' }}>
                    🫧
                  </div>
                </>
              )}
              <p className="text-sm font-bold text-[#0284C7]">H₂: {h2Bubbles}</p>
            </div>
          </div>

          {/* Positive Electrode (Anode) - produces O2 */}
          <div className="flex flex-col items-center">
            <p className="text-sm font-bold text-[#1F2937] mb-4">Anode (+)</p>
            <div className="w-16 h-40 bg-gradient-to-b from-[#FEF3C7] to-[#FEF9E7] border-4 border-[#D97706] rounded-lg flex flex-col justify-end items-center p-2 relative">
              {/* Bubbles */}
              {running && (
                <div className="absolute text-2xl animate-float">🫧</div>
              )}
              <p className="text-sm font-bold text-[#D97706]">O₂: {o2Bubbles}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Feedback */}
      {feedback && (
        <div className="text-center p-4 bg-[#FEF3C7] rounded-xl border-2 border-[#D97706]">
          <p className="text-lg font-bold text-[#1F2937]">{feedback}</p>
        </div>
      )}

      {/* Buttons */}
      <div className="flex gap-4 justify-center">
        <button
          onClick={handleStart}
          disabled={running}
          className={`px-6 py-3 rounded-full font-bold text-white transition-all duration-200 ${
            running
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-[#D97706] hover:bg-[#B45309] hover:scale-105 active:scale-95'
          }`}
        >
          {running ? 'Running...' : 'Start Electrolysis'}
        </button>
        <button
          onClick={handleReset}
          className="px-6 py-3 bg-[#14B8A6] hover:bg-[#0D9488] text-white rounded-full font-bold transition-all duration-200 hover:scale-105"
        >
          Reset
        </button>
        {h2Bubbles > 40 && (
          <button
            onClick={onComplete}
            className="px-6 py-3 bg-[#D97706] hover:bg-[#B45309] text-white rounded-full font-bold transition-all duration-200 hover:scale-105"
          >
            Next Experiment
          </button>
        )}
      </div>
    </div>
  );
}
