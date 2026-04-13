/**
 * Experiment Card Component
 * Design: Playful Retro-Futurism
 * - Individual experiment station
 * - Hover effects with glow and tooltip
 * - Shows completion badge
 * - Clickable to open detailed view
 */

import { useState } from 'react';

interface ExperimentCardProps {
  experiment: {
    id: string;
    name: string;
    description: string;
    icon: string;
    color: string;
  };
  isCompleted: boolean;
  onClick: () => void;
}

export default function ExperimentCard({
  experiment,
  isCompleted,
  onClick,
}: ExperimentCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative p-6 rounded-2xl text-left transition-all duration-300 transform hover:scale-105 active:scale-95 border-3 ${
        isCompleted
          ? 'bg-gradient-to-br from-[#FBBF24] to-[#FCD34D] border-[#D97706] shadow-lg'
          : `bg-gradient-to-br ${experiment.color} border-[#E5E7EB] shadow-md hover:shadow-xl`
      } ${isHovered && !isCompleted ? 'animate-pulse-glow' : ''}`}
    >
      {/* Completion badge */}
      {isCompleted && (
        <div className="absolute top-2 right-2 bg-[#D97706] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-lg">
          ✓
        </div>
      )}

      {/* Icon */}
      <div className="text-5xl mb-3">{experiment.icon}</div>

      {/* Title */}
      <h3 className="text-xl font-bold text-[#1F2937] mb-2">{experiment.name}</h3>

      {/* Description - shown on hover */}
      <p
        className={`text-sm text-[#1F2937] transition-all duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-70'
        }`}
      >
        {experiment.description}
      </p>

      {/* Hover tooltip */}
      {isHovered && (
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-[#1F2937] text-white px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap pointer-events-none z-50 animate-bounce-in">
          Click to explore!
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-2 h-2 bg-[#1F2937] rotate-45"></div>
        </div>
      )}

      {/* Click indicator */}
      <div className="mt-4 text-xs font-semibold text-[#6B7280] flex items-center gap-1">
        {isCompleted ? '🎉 Completed!' : '👆 Click to play'}
      </div>
    </button>
  );
}
