/**
 * Lab Bench Component
 * Design: Playful Retro-Futurism
 * - Displays all 8 experiment stations
 * - Shows hero image with lab bench
 * - Hover tooltips with experiment names and fun facts
 * - Click to zoom in and play mini-game
 */

import { useState } from 'react';
import ExperimentCard from './ExperimentCard';

interface LabBenchProps {
  onSelectExperiment: (experimentId: string) => void;
  completedExperiments: string[];
}

const experiments = [
  {
    id: 'titration',
    name: 'Titration',
    description: 'Finding the exact amount needed to neutralize an acid!',
    icon: '💧',
    color: 'from-[#FB7185] to-[#FECACA]',
  },
  {
    id: 'ions',
    name: 'Cations & Anions',
    description: 'Atoms splitting into positive and negative ions!',
    icon: '⚛️',
    color: 'from-[#D97706] to-[#FCD34D]',
  },
  {
    id: 'elephant',
    name: 'Elephant Toothpaste',
    description: 'A tube rapidly overflowing with foam!',
    icon: '🦣',
    color: 'from-[#C4B5FD] to-[#E9D5FF]',
  },
  {
    id: 'chromatography',
    name: 'Chromatography',
    description: 'Colors visibly separating as liquid travels up paper!',
    icon: '🌈',
    color: 'from-[#14B8A6] to-[#99F6E4]',
  },
  {
    id: 'acidbase',
    name: 'Acid-Base Indicator',
    description: 'A beaker changing colors with different liquids!',
    icon: '🔴',
    color: 'from-[#FBBF24] to-[#FEF3C7]',
  },
  {
    id: 'electrolysis',
    name: 'Electrolysis of Water',
    description: 'Bubbles forming at two electrodes, separating H₂ and O₂!',
    icon: '⚡',
    color: 'from-[#06B6D4] to-[#A5F3FC]',
  },
  {
    id: 'crystals',
    name: 'Crystal Growing',
    description: 'Crystals slowly forming in a supersaturated solution!',
    icon: '💎',
    color: 'from-[#EC4899] to-[#F472B6]',
  },
  {
    id: 'flame',
    name: 'Flame Test',
    description: 'A Bunsen burner flame changing colors with metal salts!',
    icon: '🔥',
    color: 'from-[#EF4444] to-[#FCA5A5]',
  },
];

export default function LabBench({ onSelectExperiment, completedExperiments }: LabBenchProps) {
  return (
    <div className="space-y-8">
      {/* Hero Section with Lab Bench Image */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-[#D97706] h-80 group">
        <img
          src="https://d2xsxph8kpxj0f.cloudfront.net/310519663374090262/2A33xcbcenD3r43aFAHfnC/lab-bench-hero-e4qsutpeEAcwg6emb9ZzTk.webp"
          alt="Chemistry Lab Bench"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end justify-center pb-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white drop-shadow-lg">Welcome to the Lab!</h2>
            <p className="text-white drop-shadow-lg mt-2">Click on any experiment to get started</p>
          </div>
        </div>
      </div>

      {/* Experiments Grid */}
      <div>
        <h3 className="text-2xl font-bold text-[#1F2937] mb-6 flex items-center gap-2">
          🔬 Available Experiments
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {experiments.map((exp) => (
            <ExperimentCard
              key={exp.id}
              experiment={exp}
              isCompleted={completedExperiments.includes(exp.id)}
              onClick={() => onSelectExperiment(exp.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
