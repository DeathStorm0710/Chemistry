/**
 * Elephant Toothpaste Game
 * Design: Playful Retro-Futurism
 * - Adjust sliders for H2O2 and yeast ratio
 * - Watch foam erupt when correct ratio is achieved
 * - Visual feedback and celebration
 */

import { useState } from 'react';

interface ElephantGameProps {
  onComplete: () => void;
}

export default function ElephantGame({ onComplete }: ElephantGameProps) {
  const [h2o2, setH2o2] = useState(50);
  const [yeast, setYeast] = useState(50);
  const [erupted, setErupted] = useState(false);
  const [feedback, setFeedback] = useState('');

  const handleMix = () => {
    // Correct ratio is around 50-60% H2O2 and 40-50% yeast
    if (h2o2 >= 50 && h2o2 <= 65 && yeast >= 35 && yeast <= 50) {
      setErupted(true);
      setFeedback('🎉 Perfect mix! The foam erupts!');
    } else if (Math.abs(h2o2 - 55) < 15 && Math.abs(yeast - 45) < 15) {
      setFeedback('Close! Try adjusting the sliders a bit more.');
    } else {
      setFeedback('Not quite right. Adjust the ratio and try again!');
    }
  };

  const handleReset = () => {
    setH2o2(50);
    setYeast(50);
    setErupted(false);
    setFeedback('');
  };

  return (
    <div className="bg-white rounded-3xl p-8 border-2 border-[#C4B5FD] shadow-lg space-y-6">
      <h2 className="text-2xl font-bold text-[#1F2937]">🦣 Elephant Toothpaste Challenge</h2>

      {/* Instructions */}
      <p className="text-lg text-[#6B7280]">
        Mix hydrogen peroxide (H₂O₂) with yeast in the right ratio to create a spectacular foam eruption!
      </p>

      {/* Game Area */}
      <div className="bg-gradient-to-b from-[#FEF3C7] to-[#FEF9E7] rounded-2xl p-8 border-2 border-[#D97706] space-y-8">
        {/* Sliders */}
        <div className="space-y-6">
          {/* H2O2 Slider */}
          <div>
            <label className="text-lg font-bold text-[#1F2937] block mb-2">
              Hydrogen Peroxide (H₂O₂): {h2o2}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={h2o2}
              onChange={(e) => setH2o2(parseInt(e.target.value))}
              disabled={erupted}
              className="w-full h-3 bg-[#FB7185] rounded-full appearance-none cursor-pointer accent-[#D97706]"
            />
          </div>

          {/* Yeast Slider */}
          <div>
            <label className="text-lg font-bold text-[#1F2937] block mb-2">
              Yeast (Catalyst): {yeast}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={yeast}
              onChange={(e) => setYeast(parseInt(e.target.value))}
              disabled={erupted}
              className="w-full h-3 bg-[#14B8A6] rounded-full appearance-none cursor-pointer accent-[#D97706]"
            />
          </div>
        </div>

        {/* Tube visualization */}
        <div className="flex justify-center items-end gap-4 py-8">
          {/* Tube */}
          <div className="relative">
            <div className="w-20 h-40 bg-gradient-to-b from-[#E0E7FF] to-[#C7D2FE] border-4 border-[#4F46E5] rounded-b-3xl flex flex-col items-center justify-end p-2">
              {/* Liquid inside */}
              <div
                className="w-full bg-gradient-to-t from-[#FB7185] to-[#FECACA] rounded-b-2xl transition-all duration-300"
                style={{ height: `${Math.min(h2o2 + yeast, 100)}%` }}
              ></div>
            </div>

            {/* Foam eruption */}
            {erupted && (
              <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 animate-bounce">
                <div className="text-6xl animate-float">🫧</div>
                <div className="text-5xl animate-float" style={{ animationDelay: '0.2s' }}>
                  🫧
                </div>
                <div className="text-6xl animate-float" style={{ animationDelay: '0.4s' }}>
                  🫧
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Feedback */}
      {feedback && (
        <div className="text-center p-4 bg-[#FEF3C7] rounded-xl border-2 border-[#D97706]">
          <p className="text-lg font-bold text-[#1F2937]">{feedback}</p>
        </div>
      )}

      {/* Result */}
      {erupted && (
        <div className="p-6 rounded-2xl text-center bg-gradient-to-r from-[#C4B5FD] to-[#E9D5FF] border-2 border-[#A78BFA]">
          <p className="text-xl font-bold text-[#1F2937]">
            🎉 Spectacular eruption! The reaction released oxygen gas, creating all that foam!
          </p>
        </div>
      )}

      {/* Buttons */}
      <div className="flex gap-4 justify-center">
        <button
          onClick={handleMix}
          disabled={erupted}
          className={`px-6 py-3 rounded-full font-bold text-white transition-all duration-200 ${
            erupted
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-[#D97706] hover:bg-[#B45309] hover:scale-105 active:scale-95'
          }`}
        >
          Mix & Erupt!
        </button>
        <button
          onClick={handleReset}
          className="px-6 py-3 bg-[#14B8A6] hover:bg-[#0D9488] text-white rounded-full font-bold transition-all duration-200 hover:scale-105"
        >
          Reset
        </button>
        {erupted && (
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
