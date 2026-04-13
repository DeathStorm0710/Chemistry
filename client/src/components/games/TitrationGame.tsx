/**
 * Titration Game
 * Design: Playful Retro-Futurism
 * - Drag burette handle to add drops
 * - Stop at exactly the right moment when solution turns pink
 * - Visual feedback and scoring
 */

import { useState } from 'react';

interface TitrationGameProps {
  onComplete: () => void;
}

export default function TitrationGame({ onComplete }: TitrationGameProps) {
  const [drops, setDrops] = useState(0);
  const [flaskColor, setFlaskColor] = useState('bg-yellow-300');
  const [feedback, setFeedback] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [success, setSuccess] = useState(false);

  const targetDrops = 25;

  const handleAddDrop = () => {
    if (gameOver) return;

    const newDrops = drops + 1;
    setDrops(newDrops);

    // Change color gradually
    if (newDrops < 15) {
      setFlaskColor('bg-yellow-300');
      setFeedback('Keep adding drops...');
    } else if (newDrops < 24) {
      setFlaskColor('bg-yellow-400');
      setFeedback('Getting closer...');
    } else if (newDrops === 25) {
      setFlaskColor('bg-pink-400');
      setFeedback('Perfect! Equivalence point reached!');
      setSuccess(true);
      setGameOver(true);
    } else if (newDrops < 30) {
      setFlaskColor('bg-pink-500');
      setFeedback('A bit too much, but close!');
    } else {
      setFlaskColor('bg-red-500');
      setFeedback('Too many drops! Try again.');
      setGameOver(true);
    }
  };

  const handleReset = () => {
    setDrops(0);
    setFlaskColor('bg-yellow-300');
    setFeedback('');
    setGameOver(false);
    setSuccess(false);
  };

  return (
    <div className="bg-white rounded-3xl p-8 border-2 border-[#FB7185] shadow-lg space-y-6">
      <h2 className="text-2xl font-bold text-[#1F2937]">💧 Titration Challenge</h2>

      {/* Game Area */}
      <div className="flex justify-center items-end gap-12 py-12 bg-gradient-to-b from-[#FEF3C7] to-[#FEF9E7] rounded-2xl border-2 border-[#D97706]">
        {/* Burette */}
        <div className="flex flex-col items-center">
          <div className="w-12 h-40 bg-blue-100 border-4 border-blue-400 rounded-b-2xl flex flex-col justify-between p-2 mb-4">
            {/* Burette scale */}
            {[0, 5, 10, 15, 20, 25, 30].map((mark) => (
              <div key={mark} className="flex items-center gap-1 text-xs font-bold text-blue-600">
                <div className="w-2 h-0.5 bg-blue-600"></div>
                <span>{mark}</span>
              </div>
            ))}
          </div>
          <button
            onClick={handleAddDrop}
            disabled={gameOver}
            className={`px-6 py-3 rounded-full font-bold text-white transition-all duration-200 ${
              gameOver
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600 hover:scale-110 active:scale-95'
            }`}
          >
            Add Drop
          </button>
        </div>

        {/* Flask */}
        <div className="flex flex-col items-center">
          <div
            className={`w-24 h-32 rounded-b-3xl border-4 border-[#1F2937] transition-all duration-300 ${flaskColor} flex items-center justify-center`}
          >
            <div className="text-3xl">💧</div>
          </div>
          <div className="text-center mt-4">
            <p className="text-lg font-bold text-[#1F2937]">Drops: {drops}</p>
            <p className="text-sm text-[#6B7280]">Target: {targetDrops}</p>
          </div>
        </div>
      </div>

      {/* Feedback */}
      <div className="text-center">
        <p className="text-lg font-bold text-[#D97706]">{feedback}</p>
      </div>

      {/* Result */}
      {gameOver && (
        <div
          className={`p-6 rounded-2xl text-center border-2 ${
            success
              ? 'bg-gradient-to-r from-[#FBBF24] to-[#FCD34D] border-[#D97706]'
              : 'bg-gradient-to-r from-[#FEE2E2] to-[#FECACA] border-[#FB7185]'
          }`}
        >
          <p className="text-xl font-bold text-[#1F2937]">
            {success
              ? '🎉 Perfect! You found the equivalence point!'
              : '❌ Not quite right. Try again!'}
          </p>
        </div>
      )}

      {/* Buttons */}
      <div className="flex gap-4 justify-center">
        <button
          onClick={handleReset}
          className="px-6 py-3 bg-[#14B8A6] hover:bg-[#0D9488] text-white rounded-full font-bold transition-all duration-200 hover:scale-105"
        >
          Try Again
        </button>
        {success && (
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
