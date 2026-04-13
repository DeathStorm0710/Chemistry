/**
 * Flame Test Game
 * Design: Playful Retro-Futurism
 * - Select a metal salt
 * - Predict the flame color
 * - Watch the Bunsen burner flame change color
 * - Learn about metal identification
 */

import { useState } from 'react';

interface FlameTestGameProps {
  onComplete: () => void;
}

const metals = [
  { name: 'Strontium', color: '#EF4444', label: 'Red' },
  { name: 'Barium', color: '#22C55E', label: 'Green' },
  { name: 'Copper', color: '#3B82F6', label: 'Blue' },
  { name: 'Potassium', color: '#A855F7', label: 'Purple' },
];

export default function FlameTestGame({ onComplete }: FlameTestGameProps) {
  const [currentMetal, setCurrentMetal] = useState(0);
  const [prediction, setPrediction] = useState<string | null>(null);
  const [flameActive, setFlameActive] = useState(false);
  const [correct, setCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);

  const handlePredict = (color: string) => {
    setPrediction(color);
  };

  const handleIgnite = () => {
    if (!prediction) {
      return;
    }

    setFlameActive(true);

    setTimeout(() => {
      const isCorrect = prediction === metals[currentMetal].label;
      setCorrect(isCorrect);

      if (isCorrect) {
        setScore(score + 1);
      }
    }, 1000);
  };

  const handleNext = () => {
    if (currentMetal < metals.length - 1) {
      setCurrentMetal(currentMetal + 1);
      setPrediction(null);
      setFlameActive(false);
      setCorrect(null);
    }
  };

  const handleReset = () => {
    setCurrentMetal(0);
    setPrediction(null);
    setFlameActive(false);
    setCorrect(null);
    setScore(0);
  };

  const allComplete = currentMetal === metals.length - 1 && correct !== null;

  return (
    <div className="bg-white rounded-3xl p-8 border-2 border-[#EF4444] shadow-lg space-y-6">
      <h2 className="text-2xl font-bold text-[#1F2937]">🔥 Flame Test Challenge</h2>

      {/* Instructions */}
      <p className="text-lg text-[#6B7280]">
        Predict the flame color for each metal salt, then ignite it to check!
      </p>

      {/* Game Area */}
      <div className="bg-gradient-to-b from-[#FEF3C7] to-[#FEF9E7] rounded-2xl p-8 border-2 border-[#D97706] space-y-8">
        {/* Current metal */}
        <div className="text-center">
          <p className="text-lg font-bold text-[#1F2937]">
            Metal {currentMetal + 1}: {metals[currentMetal].name}
          </p>
        </div>

        {/* Bunsen Burner */}
        <div className="flex justify-center">
          <div className="relative">
            {/* Burner base */}
            <div className="w-20 h-32 bg-gray-400 border-4 border-gray-600 rounded-lg flex flex-col items-center justify-end p-2">
              {/* Flame */}
              {flameActive && (
                <div
                  className="w-12 h-20 rounded-t-full transition-all duration-500 animate-float"
                  style={{
                    backgroundColor: metals[currentMetal].color,
                    boxShadow: `0 0 20px ${metals[currentMetal].color}`,
                  }}
                ></div>
              )}
            </div>
          </div>
        </div>

        {/* Color Prediction Buttons */}
        {!flameActive && !correct && (
          <div className="space-y-4">
            <p className="text-center font-bold text-[#1F2937]">What color will the flame be?</p>
            <div className="grid grid-cols-2 gap-3">
              {metals.map((metal, idx) => (
                <button
                  key={idx}
                  onClick={() => handlePredict(metal.label)}
                  className={`p-3 rounded-lg font-bold transition-all duration-200 border-2 ${
                    prediction === metal.label
                      ? 'border-[#1F2937] scale-105 ring-4 ring-[#D97706]'
                      : 'border-[#E5E7EB] hover:scale-105'
                  }`}
                  style={{
                    backgroundColor: metal.color,
                    color: ['#EF4444', '#3B82F6', '#A855F7'].includes(metal.color)
                      ? 'white'
                      : '#1F2937',
                  }}
                >
                  {metal.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Ignite Button */}
        {prediction && !flameActive && !correct && (
          <button
            onClick={handleIgnite}
            className="w-full px-6 py-3 bg-[#EF4444] hover:bg-[#DC2626] text-white rounded-full font-bold transition-all duration-200 hover:scale-105 active:scale-95"
          >
            🔥 Ignite!
          </button>
        )}

        {/* Result */}
        {correct !== null && (
          <div
            className={`p-6 rounded-2xl text-center border-2 ${
              correct
                ? 'bg-gradient-to-r from-[#FBBF24] to-[#FCD34D] border-[#D97706]'
                : 'bg-gradient-to-r from-[#FEE2E2] to-[#FECACA] border-[#FB7185]'
            }`}
          >
            <p className="text-lg font-bold text-[#1F2937]">
              {correct
                ? `✓ Correct! ${metals[currentMetal].name} produces a ${metals[currentMetal].label} flame!`
                : `✗ The actual color is ${metals[currentMetal].label}. Try again!`}
            </p>
          </div>
        )}
      </div>

      {/* Score */}
      <div className="text-center">
        <p className="text-lg font-bold text-[#1F2937]">
          Score: {score}/{metals.length}
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
        {correct !== null && !allComplete && (
          <button
            onClick={handleNext}
            className="px-6 py-3 bg-[#D97706] hover:bg-[#B45309] text-white rounded-full font-bold transition-all duration-200 hover:scale-105"
          >
            Next Metal
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
