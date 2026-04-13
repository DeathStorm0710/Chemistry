/**
 * Lab Journal Component
 * Design: Playful Retro-Futurism
 * - Tracks completed experiments with badges
 * - Shows progress bar "Becoming a Scientist!"
 * - Displays achievement badges with vintage style
 */

interface LabJournalProps {
  completedExperiments: string[];
  totalExperiments: number;
}

const experiments = [
  { id: 'titration', name: 'Titration', emoji: '💧' },
  { id: 'ions', name: 'Ions', emoji: '⚛️' },
  { id: 'elephant', name: 'Elephant Toothpaste', emoji: '🦣' },
  { id: 'chromatography', name: 'Chromatography', emoji: '🌈' },
  { id: 'acidbase', name: 'Acid-Base', emoji: '🔴' },
  { id: 'electrolysis', name: 'Electrolysis', emoji: '⚡' },
  { id: 'crystals', name: 'Crystals', emoji: '💎' },
  { id: 'flame', name: 'Flame Test', emoji: '🔥' },
];

export default function LabJournal({ completedExperiments, totalExperiments }: LabJournalProps) {
  const progressPercentage = (completedExperiments.length / totalExperiments) * 100;

  return (
    <div className="bg-white rounded-3xl p-6 shadow-lg border-2 border-[#14B8A6] animate-bounce-in">
      {/* Header */}
      <h2 className="text-2xl font-bold text-[#1F2937] mb-4 flex items-center gap-2">
        📔 Lab Journal
      </h2>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm font-semibold text-[#6B7280]">Becoming a Scientist!</p>
          <p className="text-sm font-bold text-[#D97706]">{completedExperiments.length}/{totalExperiments}</p>
        </div>
        <div className="w-full bg-[#E5E7EB] rounded-full h-4 overflow-hidden border-2 border-[#D97706]">
          <div
            className="bg-gradient-to-r from-[#D97706] via-[#14B8A6] to-[#FBBF24] h-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Completed Experiments List */}
      <div className="space-y-2">
        <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide">Completed Experiments</p>
        <div className="grid grid-cols-2 gap-2">
          {experiments.map((exp) => (
            <div
              key={exp.id}
              className={`p-2 rounded-lg text-xs font-semibold text-center transition-all duration-200 ${
                completedExperiments.includes(exp.id)
                  ? 'bg-gradient-to-br from-[#FBBF24] to-[#FCD34D] text-[#1F2937] border-2 border-[#D97706] scale-105'
                  : 'bg-[#F3F4F6] text-[#6B7280] border-2 border-[#E5E7EB]'
              }`}
            >
              <span>{exp.emoji}</span> {exp.name}
            </div>
          ))}
        </div>
      </div>

      {/* Achievement message */}
      {completedExperiments.length === totalExperiments && (
        <div className="mt-6 p-4 bg-gradient-to-r from-[#C4B5FD] to-[#E9D5FF] rounded-2xl border-2 border-[#A78BFA] text-center">
          <p className="text-sm font-bold text-[#1F2937]">
            🌟 You're a Master Scientist! 🌟
          </p>
        </div>
      )}
    </div>
  );
}
