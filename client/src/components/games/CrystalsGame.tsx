/**
 * Crystals Game
 * Design: Playful Retro-Futurism\n * - Adjust temperature and concentration sliders\n * - Grow crystals with optimal settings\n * - Visual feedback and learning\n */

import { useState } from 'react';

interface CrystalsGameProps {
  onComplete: () => void;
}

export default function CrystalsGame({ onComplete }: CrystalsGameProps) {
  const [temperature, setTemperature] = useState(50);
  const [concentration, setConcentration] = useState(50);
  const [growing, setGrowing] = useState(false);
  const [crystalSize, setCrystalSize] = useState(0);
  const [feedback, setFeedback] = useState('');

  const handleGrow = () => {
    // Optimal range: temperature 40-60, concentration 60-80
    const tempScore = Math.abs(temperature - 50) < 15 ? 1 : 0.5;
    const concScore = concentration >= 60 && concentration <= 80 ? 1 : 0.5;
    const score = tempScore * concScore;

    setGrowing(true);
    setFeedback('Crystals growing...');

    let size = 0;
    const interval = setInterval(() => {
      size += score * 5;
      setCrystalSize(Math.min(size, 100));

      if (size >= 100) {
        clearInterval(interval);
        setGrowing(false);

        if (score === 1) {
          setFeedback('🎉 Perfect conditions! Beautiful large crystals formed!');
        } else if (score > 0.7) {
          setFeedback('Good! Crystals formed, but could be bigger with better conditions.');
        } else {
          setFeedback('Crystals formed, but conditions were not optimal. Try again!');
        }
      }
    }, 100);

    return () => clearInterval(interval);
  };

  const handleReset = () => {
    setTemperature(50);
    setConcentration(50);
    setGrowing(false);
    setCrystalSize(0);
    setFeedback('');
  };

  return (
    <div className="bg-white rounded-3xl p-8 border-2 border-[#EC4899] shadow-lg space-y-6">
      <h2 className="text-2xl font-bold text-[#1F2937]">💎 Crystal Growing Challenge</h2>

      {/* Instructions */}
      <p className="text-lg text-[#6B7280]">
        Adjust temperature and concentration to grow the biggest crystals!
      </p>

      {/* Game Area */}
      <div className="bg-gradient-to-b from-[#FEF3C7] to-[#FEF9E7] rounded-2xl p-8 border-2 border-[#D97706] space-y-8">
        {/* Sliders */}
        <div className="space-y-6">
          {/* Temperature Slider */}
          <div>
            <label className="text-lg font-bold text-[#1F2937] block mb-2">
              Temperature: {temperature}°C
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={temperature}
              onChange={(e) => setTemperature(parseInt(e.target.value))}
              disabled={growing}
              className="w-full h-3 bg-[#EF4444] rounded-full appearance-none cursor-pointer accent-[#D97706]"
            />
            <p className="text-xs text-[#6B7280] mt-1">Optimal: 35-65°C</p>
          </div>

          {/* Concentration Slider */}
          <div>
            <label className="text-lg font-bold text-[#1F2937] block mb-2">
              Concentration: {concentration}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={concentration}
              onChange={(e) => setConcentration(parseInt(e.target.value))}
              disabled={growing}
              className="w-full h-3 bg-[#3B82F6] rounded-full appearance-none cursor-pointer accent-[#D97706]"
            />
            <p className="text-xs text-[#6B7280] mt-1">Optimal: 60-80%</p>
          </div>
        </div>

        {/* Crystal Visualization */}
        <div className="flex justify-center items-end py-8">
          <div className="relative w-32 h-40 bg-gradient-to-b from-[#E0F2FE] to-[#BAE6FD] border-4 border-[#0284C7] rounded-lg flex items-end justify-center p-4">
            {/* Crystal */}
            {crystalSize > 0 && (
              <div
                className="transition-all duration-300"
                style={{
                  fontSize: `${Math.max(20, crystalSize / 2)}px`,
                }}
              >
                💎
              </div>
            )}

            {/* Growth indicator */}
            {growing && (
              <div className="absolute top-2 right-2 animate-spin">
                ⏳
              </div>
            )}
          </div>
        </div>

        {/* Crystal size display */}
        <div className="text-center">
          <p className="text-lg font-bold text-[#1F2937]">Crystal Size: {Math.round(crystalSize)}%</p>
          <div className="w-full bg-[#E5E7EB] rounded-full h-3 mt-2 overflow-hidden border-2 border-[#D97706]">
            <div
              className="bg-gradient-to-r from-[#EC4899] to-[#F472B6] h-full transition-all duration-300"
              style={{ width: `${crystalSize}%` }}
            ></div>
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
          onClick={handleGrow}
          disabled={growing}
          className={`px-6 py-3 rounded-full font-bold text-white transition-all duration-200 ${
            growing
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-[#D97706] hover:bg-[#B45309] hover:scale-105 active:scale-95'
          }`}
        >
          {growing ? 'Growing...' : 'Start Growth'}
        </button>
        <button
          onClick={handleReset}
          className="px-6 py-3 bg-[#14B8A6] hover:bg-[#0D9488] text-white rounded-full font-bold transition-all duration-200 hover:scale-105"
        >
          Reset
        </button>
        {crystalSize >= 100 && (
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
