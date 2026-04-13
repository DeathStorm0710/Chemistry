/**
 * Acid-Base Game
 * Design: Playful Retro-Futurism
 * - Pour different mystery liquids into cabbage juice
 * - Guess if they're acid or base based on color change
 * - Visual feedback and learning
 */

import { useState } from 'react';

interface AcidBaseGameProps {
  onComplete: () => void;
}

const liquids = [
  { name: 'Lemon Juice', type: 'acid', color: '#EF4444', label: 'Acid' },
  { name: 'Baking Soda', type: 'base', color: '#3B82F6', label: 'Base' },
  { name: 'Vinegar', type: 'acid', color: '#DC2626', label: 'Acid' },
  { name: 'Soap Water', type: 'base', color: '#0EA5E9', label: 'Base' },
];

export default function AcidBaseGame({ onComplete }: AcidBaseGameProps) {
  const [currentLiquid, setCurrentLiquid] = useState(0);
  const [poured, setPoured] = useState(false);
  const [guessed, setGuessed] = useState<string | null>(null);
  const [correct, setCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);

  const handleGuess = (guess: string) => {
    const isCorrect = guess === liquids[currentLiquid].type;
    setGuessed(guess);
    setCorrect(isCorrect);

    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentLiquid < liquids.length - 1) {
      setCurrentLiquid(currentLiquid + 1);
      setPoured(false);
      setGuessed(null);
      setCorrect(null);
    }
  };

  const handleReset = () => {
    setCurrentLiquid(0);
    setPoured(false);
    setGuessed(null);
    setCorrect(null);
    setScore(0);
  };

  const allComplete = currentLiquid === liquids.length - 1 && correct !== null;

  return (
    <div className="bg-white rounded-3xl p-8 border-2 border-[#FBBF24] shadow-lg space-y-6">
      <h2 className="text-2xl font-bold text-[#1F2937]">🔴 Acid-Base Challenge</h2>

      {/* Instructions */}
      <p className="text-lg text-[#6B7280]">
        Pour each mystery liquid into the cabbage juice indicator and guess if it's an acid or base!
      </p>

      {/* Game Area */}
      <div className="bg-gradient-to-b from-[#FEF3C7] to-[#FEF9E7] rounded-2xl p-8 border-2 border-[#D97706] space-y-8">
        {/* Beaker with cabbage juice */}
        <div className="flex justify-center">
          <div className="relative">
            {/* Beaker */}
            <div className="w-32 h-40 bg-white border-4 border-[#1F2937] rounded-b-3xl flex items-end justify-center p-4">
              {/* Cabbage juice base */}
              <div className="w-full h-24 bg-purple-400 rounded-b-2xl transition-all duration-500"></div>

              {/* Color change when poured */}
              {poured && (
                <div
                  className="absolute inset-0 rounded-b-3xl transition-all duration-700"
                  style={{
                    backgroundColor: liquids[currentLiquid].color,
                    opacity: 0.7,
                  }}
                ></div>
              )}
            </div>

            {/* Pour animation */}
            {!poured && (
              <button
                onClick={() => setPoured(true)}
                className="absolute -right-20 top-8 px-4 py-2 bg-[#14B8A6] hover:bg-[#0D9488] text-white rounded-full font-bold transition-all duration-200 hover:scale-110"
              >
                Pour ↓
              </button>
            )}
          </div>
        </div>

        {/* Current liquid name */}
        <div className="text-center">
          <p className="text-lg font-bold text-[#1F2937]">
            Mystery Liquid {currentLiquid + 1}: {liquids[currentLiquid].name}
          </p>
        </div>

        {/* Guess buttons */}
        {poured && !guessed && (
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => handleGuess('acid')}
              className="px-6 py-3 bg-[#EF4444] hover:bg-[#DC2626] text-white rounded-full font-bold transition-all duration-200 hover:scale-105"
            >
              🔴 Acid
            </button>
            <button
              onClick={() => handleGuess('base')}
              className="px-6 py-3 bg-[#3B82F6] hover:bg-[#1D4ED8] text-white rounded-full font-bold transition-all duration-200 hover:scale-105"
            >
              🔵 Base
            </button>
          </div>
        )}

        {/* Result */}
        {guessed && (
          <div
            className={`p-6 rounded-2xl text-center border-2 ${
              correct
                ? 'bg-gradient-to-r from-[#FBBF24] to-[#FCD34D] border-[#D97706]'
                : 'bg-gradient-to-r from-[#FEE2E2] to-[#FECACA] border-[#FB7185]'
            }`}
          >
            <p className="text-lg font-bold text-[#1F2937]">
              {correct
                ? `✓ Correct! ${liquids[currentLiquid].name} is an ${liquids[currentLiquid].label}!`
                : `✗ Not quite. ${liquids[currentLiquid].name} is actually an ${liquids[currentLiquid].label}!`}
            </p>
          </div>
        )}
      </div>

      {/* Score */}
      <div className="text-center">
        <p className="text-lg font-bold text-[#1F2937]">
          Score: {score}/{liquids.length}
        </p>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 justify-center">
        <button
          onClick={handleReset}
          className="px-6 py-3 bg-[#14B8A6] hover:bg-[#0D9488] text-white rounded-full font-bold transition-all duration-200 hover:scale-105"
        >
          Reset
        </button>
        {guessed && !allComplete && (
          <button
            onClick={handleNext}
            className="px-6 py-3 bg-[#D97706] hover:bg-[#B45309] text-white rounded-full font-bold transition-all duration-200 hover:scale-105"
          >
            Next Liquid
          </button>
        )}
        {allComplete && (
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
