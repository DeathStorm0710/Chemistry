/**
 * Ions Game
 * Design: Playful Retro-Futurism
 * - Match positive ions (cations) with negative ions (anions)
 * - Drag and drop to form neutral compounds
 * - Visual feedback and scoring
 */

import { useState } from 'react';

interface IonsGameProps {
  onComplete: () => void;
}

const ionPairs = [
  { cation: 'Na+', anion: 'Cl-', compound: 'NaCl (Salt)' },
  { cation: 'Ca2+', anion: 'O2-', compound: 'CaO (Lime)' },
  { cation: 'Mg2+', anion: 'Cl-', compound: 'MgCl2' },
  { cation: 'K+', anion: 'Br-', compound: 'KBr' },
];

export default function IonsGame({ onComplete }: IonsGameProps) {
  const [matches, setMatches] = useState<number>(0);
  const [selectedCation, setSelectedCation] = useState<number | null>(null);
  const [feedback, setFeedback] = useState('');

  const handleMatch = (cationIdx: number, anionIdx: number) => {
    if (cationIdx === anionIdx) {
      setMatches(matches + 1);
      setFeedback(`✓ Correct! ${ionPairs[cationIdx].compound} formed!`);
      setTimeout(() => setFeedback(''), 2000);
    } else {
      setFeedback('✗ Not a match. Try again!');
      setTimeout(() => setFeedback(''), 1500);
    }
    setSelectedCation(null);
  };

  const allMatched = matches === ionPairs.length;

  return (
    <div className="bg-white rounded-3xl p-8 border-2 border-[#D97706] shadow-lg space-y-6">
      <h2 className="text-2xl font-bold text-[#1F2937]">⚛️ Ion Matching Challenge</h2>

      {/* Instructions */}
      <p className="text-lg text-[#6B7280]">
        Match each positive ion (cation) with its negative ion (anion) to form neutral compounds!
      </p>

      {/* Game Area */}
      <div className="bg-gradient-to-b from-[#FEF3C7] to-[#FEF9E7] rounded-2xl p-8 border-2 border-[#D97706]">
        <div className="grid grid-cols-2 gap-8">
          {/* Cations */}
          <div>
            <h3 className="text-lg font-bold text-[#D97706] mb-4">Cations (Positive)</h3>
            <div className="space-y-3">
              {ionPairs.map((pair, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedCation(idx)}
                  className={`w-full p-4 rounded-xl font-bold text-lg transition-all duration-200 border-2 ${
                    selectedCation === idx
                      ? 'bg-[#FB7185] border-[#DC2626] text-white scale-105'
                      : 'bg-[#FEE2E2] border-[#FB7185] text-[#DC2626] hover:scale-105'
                  }`}
                >
                  {pair.cation}
                </button>
              ))}
            </div>
          </div>

          {/* Anions */}
          <div>
            <h3 className="text-lg font-bold text-[#14B8A6] mb-4">Anions (Negative)</h3>
            <div className="space-y-3">
              {ionPairs.map((pair, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    if (selectedCation !== null) {
                      handleMatch(selectedCation, idx);
                    }
                  }}
                  className={`w-full p-4 rounded-xl font-bold text-lg transition-all duration-200 border-2 ${
                    selectedCation !== null
                      ? 'bg-[#CCFBF1] border-[#14B8A6] text-[#0D9488] hover:scale-105 cursor-pointer'
                      : 'bg-[#CCFBF1] border-[#14B8A6] text-[#0D9488]'
                  }`}
                >
                  {pair.anion}
                </button>
              ))}
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

      {/* Progress */}
      <div className="text-center">
        <p className="text-lg font-bold text-[#1F2937]">
          Matches: {matches}/{ionPairs.length}
        </p>
        <div className="w-full bg-[#E5E7EB] rounded-full h-3 mt-2 overflow-hidden border-2 border-[#D97706]">
          <div
            className="bg-gradient-to-r from-[#D97706] to-[#FBBF24] h-full transition-all duration-300"
            style={{ width: `${(matches / ionPairs.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Result */}
      {allMatched && (
        <div className="p-6 rounded-2xl text-center bg-gradient-to-r from-[#FBBF24] to-[#FCD34D] border-2 border-[#D97706]">
          <p className="text-xl font-bold text-[#1F2937]">🎉 All ions matched! Great work!</p>
        </div>
      )}

      {/* Buttons */}
      <div className="flex gap-4 justify-center">
        <button
          onClick={() => {
            setMatches(0);
            setSelectedCation(null);
            setFeedback('');
          }}
          className="px-6 py-3 bg-[#14B8A6] hover:bg-[#0D9488] text-white rounded-full font-bold transition-all duration-200 hover:scale-105"
        >
          Reset
        </button>
        {allMatched && (
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
