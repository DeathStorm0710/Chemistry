/**
 * Chromatography Game\n * Design: Playful Retro-Futurism\n * - Predict which color will travel highest\n * - Run the experiment to check\n * - Visual feedback and learning\n */

import { useState } from 'react';

interface ChromatographyGameProps {
  onComplete: () => void;
}

const colors = [
  { name: 'Red', value: '#EF4444', travel: 60 },
  { name: 'Blue', value: '#3B82F6', travel: 80 },
  { name: 'Yellow', value: '#FBBF24', travel: 40 },
  { name: 'Green', value: '#10B981', travel: 70 },
];

export default function ChromatographyGame({ onComplete }: ChromatographyGameProps) {
  const [selectedColor, setSelectedColor] = useState<number | null>(null);
  const [running, setRunning] = useState(false);
  const [results, setResults] = useState<number[]>([]);
  const [feedback, setFeedback] = useState('');

  const handleRunExperiment = () => {
    if (selectedColor === null) {
      setFeedback('Please select a color first!');
      return;
    }

    setRunning(true);
    setFeedback('Running experiment...');

    // Simulate the experiment
    setTimeout(() => {
      const newResults = colors.map((_, idx) => colors[idx].travel);
      setResults(newResults);
      setRunning(false);

      if (selectedColor === 1) {
        // Blue travels the highest
        setFeedback('🎉 Correct! Blue travels the highest!');
      } else {
        setFeedback(
          `Blue travels the highest at ${colors[1].travel}%. You predicted ${colors[selectedColor].name} at ${colors[selectedColor].travel}%.`
        );
      }
    }, 2000);
  };

  const handleReset = () => {
    setSelectedColor(null);
    setRunning(false);
    setResults([]);
    setFeedback('');
  };

  return (
    <div className="bg-white rounded-3xl p-8 border-2 border-[#14B8A6] shadow-lg space-y-6">
      <h2 className="text-2xl font-bold text-[#1F2937]">🌈 Chromatography Challenge</h2>

      {/* Instructions */}
      <p className="text-lg text-[#6B7280]">
        Predict which color will travel the highest on the paper strip when solvent is applied!
      </p>

      {/* Color Selection */}
      <div className="bg-gradient-to-b from-[#FEF3C7] to-[#FEF9E7] rounded-2xl p-8 border-2 border-[#D97706]">
        <p className="text-lg font-bold text-[#1F2937] mb-4">Select your prediction:</p>
        <div className="grid grid-cols-2 gap-4 mb-8">
          {colors.map((color, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedColor(idx)}
              disabled={running}
              className={`p-4 rounded-xl font-bold transition-all duration-200 border-2 ${
                selectedColor === idx
                  ? 'border-[#1F2937] scale-105 ring-4 ring-[#D97706]'
                  : 'border-[#E5E7EB] hover:scale-105'
              } ${running ? 'opacity-50 cursor-not-allowed' : ''}`}
              style={{
                backgroundColor: color.value,
                color: ['#EF4444', '#3B82F6'].includes(color.value) ? 'white' : '#1F2937',
              }}
            >
              {color.name}
            </button>
          ))}
        </div>

        {/* Paper Strip Visualization */}
        <div className="flex justify-center gap-8">
          {/* Before */}
          <div className="flex flex-col items-center">
            <p className="text-sm font-bold text-[#6B7280] mb-2">Before</p>
            <div className="w-16 h-40 bg-white border-4 border-[#D97706] rounded-lg p-2 flex flex-col justify-end items-center gap-1">
              {colors.map((color, idx) => (
                <div
                  key={idx}
                  className="w-12 h-3 rounded-full"
                  style={{ backgroundColor: color.value }}
                ></div>
              ))}
            </div>
          </div>

          {/* After (if experiment ran) */}
          {results.length > 0 && (
            <div className="flex flex-col items-center">
              <p className="text-sm font-bold text-[#6B7280] mb-2">After</p>
              <div className="w-16 h-40 bg-white border-4 border-[#14B8A6] rounded-lg p-2 flex flex-col justify-end items-center gap-1 relative">
                {colors.map((color, idx) => (
                  <div
                    key={idx}
                    className="w-12 rounded-full transition-all duration-500"
                    style={{
                      backgroundColor: color.value,
                      height: running ? '3px' : `${results[idx] / 100 * 30}px`,
                    }}
                  ></div>
                ))}
              </div>
            </div>
          )}
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
          onClick={handleRunExperiment}
          disabled={running || selectedColor === null}
          className={`px-6 py-3 rounded-full font-bold text-white transition-all duration-200 ${
            running || selectedColor === null
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-[#D97706] hover:bg-[#B45309] hover:scale-105 active:scale-95'
          }`}
        >
          {running ? 'Running...' : 'Run Experiment'}
        </button>
        <button
          onClick={handleReset}
          className="px-6 py-3 bg-[#14B8A6] hover:bg-[#0D9488] text-white rounded-full font-bold transition-all duration-200 hover:scale-105"
        >
          Reset
        </button>
        {results.length > 0 && (
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
