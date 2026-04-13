/**
 * Experiment Detail Component
 * Design: Playful Retro-Futurism
 * - Shows zoomed-in experiment view
 * - Displays explanation and fun facts
 * - Launches mini-games specific to each experiment
 * - Shows feedback and completion message
 */

import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import TitrationGame from './games/TitrationGame';
import IonsGame from './games/IonsGame';
import ElephantGame from './games/ElephantGame';
import ChromatographyGame from './games/ChromatographyGame';
import AcidBaseGame from './games/AcidBaseGame';
import ElectrolysisGame from './games/ElectrolysisGame';
import CrystalsGame from './games/CrystalsGame';
import FlameTestGame from './games/FlameTestGame';

interface ExperimentDetailProps {
  experimentId: string;
  onBack: () => void;
  onComplete: () => void;
}

const experimentData: Record<string, any> = {
  titration: {
    name: 'Titration',
    icon: '💧',
    explanation: 'Titration is a technique used to find the exact amount of a substance needed to neutralize an acid or base. We use a burette (a special glass tube with precise markings) to slowly add drops of a solution until the color changes, indicating the reaction is complete.',
    vocabulary: ['Burette', 'Neutralization', 'Equivalence Point', 'Indicator'],
    funFact: 'Titration is used in laboratories around the world to test the purity of medicines, food, and water!',
    color: 'from-[#FB7185] to-[#FECACA]',
  },
  ions: {
    name: 'Cations & Anions',
    icon: '⚛️',
    explanation: 'Ions are atoms that have gained or lost electrons, giving them an electric charge. Cations are positively charged (lost electrons), and anions are negatively charged (gained electrons). When cations and anions combine, they form ionic compounds through electrostatic attraction.',
    vocabulary: ['Ion', 'Cation', 'Anion', 'Electron', 'Ionic Bond'],
    funFact: 'Table salt (NaCl) is made of sodium cations (Na+) and chloride anions (Cl-) bonded together!',
    color: 'from-[#D97706] to-[#FCD34D]',
  },
  elephant: {
    name: 'Elephant Toothpaste',
    icon: '🦣',
    explanation: 'This spectacular reaction happens when hydrogen peroxide breaks down very quickly, producing oxygen gas, water, and heat. We add a catalyst (yeast) to speed up the reaction dramatically, creating a huge foam eruption that looks like toothpaste coming out of an elephant\'s mouth!',
    vocabulary: ['Catalyst', 'Decomposition', 'Exothermic', 'Oxygen Gas'],
    funFact: 'The foam is hot because the reaction releases energy! This is called an exothermic reaction.',
    color: 'from-[#C4B5FD] to-[#E9D5FF]',
  },
  chromatography: {
    name: 'Chromatography',
    icon: '🌈',
    explanation: 'Chromatography separates mixtures of substances based on how they move through a medium. In paper chromatography, different colored dyes travel up a paper strip at different speeds, creating beautiful separated color bands. This technique is used to identify and separate chemicals!',
    vocabulary: ['Chromatography', 'Solvent', 'Pigment', 'Separation'],
    funFact: 'Scientists use chromatography to detect drugs, analyze food coloring, and study plant pigments!',
    color: 'from-[#14B8A6] to-[#99F6E4]',
  },
  acidbase: {
    name: 'Acid-Base Indicator',
    icon: '🔴',
    explanation: 'Acids and bases have different pH levels. An indicator like red cabbage juice changes color depending on whether a solution is acidic (red/pink), neutral (purple), or basic (blue/green). This color change helps us identify the pH of unknown liquids!',
    vocabulary: ['Acid', 'Base', 'pH', 'Indicator', 'Neutral'],
    funFact: 'Lemons are acidic, baking soda is basic, and pure water is neutral - you can test them with cabbage juice!',
    color: 'from-[#FBBF24] to-[#FEF3C7]',
  },
  electrolysis: {
    name: 'Electrolysis of Water',
    icon: '⚡',
    explanation: 'Electrolysis uses electricity to break down water into hydrogen and oxygen gases. When you pass an electric current through water with a special solution, bubbles form at both electrodes - oxygen at one and hydrogen at the other. This is how scientists produce pure gases!',
    vocabulary: ['Electrolysis', 'Electrode', 'Hydrogen', 'Oxygen', 'Electric Current'],
    funFact: 'Electrolysis is used to produce hydrogen fuel, which is a clean energy source for the future!',
    color: 'from-[#06B6D4] to-[#A5F3FC]',
  },
  crystals: {
    name: 'Crystal Growing',
    icon: '💎',
    explanation: 'Crystals form when dissolved particles arrange themselves in a repeating geometric pattern as the solution cools or evaporates. By adjusting temperature and concentration, you can grow beautiful crystals of different sizes and shapes. Crystals are found everywhere in nature!',
    vocabulary: ['Crystal', 'Supersaturated', 'Nucleation', 'Lattice Structure'],
    funFact: 'Diamonds, salt, and sugar are all crystals! Some crystals take millions of years to form in nature.',
    color: 'from-[#EC4899] to-[#F472B6]',
  },
  flame: {
    name: 'Flame Test',
    icon: '🔥',
    explanation: 'Different metal elements produce different colored flames when heated. By observing the flame color, chemists can identify which metals are present in a sample. This is a quick and colorful way to identify elements - each metal has its own signature color!',
    vocabulary: ['Flame Test', 'Metal', 'Emission', 'Spectrum', 'Element'],
    funFact: 'Fireworks get their colors from metal salts - red from strontium, green from barium, and blue from copper!',
    color: 'from-[#EF4444] to-[#FCA5A5]',
  },
};

const gameComponents: Record<string, React.ComponentType<any>> = {
  titration: TitrationGame,
  ions: IonsGame,
  elephant: ElephantGame,
  chromatography: ChromatographyGame,
  acidbase: AcidBaseGame,
  electrolysis: ElectrolysisGame,
  crystals: CrystalsGame,
  flame: FlameTestGame,
};

export default function ExperimentDetail({
  experimentId,
  onBack,
  onComplete,
}: ExperimentDetailProps) {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);

  const data = experimentData[experimentId];
  const GameComponent = gameComponents[experimentId];

  if (!data) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 font-bold">Experiment not found</p>
        <button
          onClick={onBack}
          className="mt-4 px-6 py-2 bg-[#14B8A6] text-white rounded-full font-bold hover:bg-[#0D9488]"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (gameStarted && !gameCompleted) {
    return (
      <div className="space-y-6">
        <button
          onClick={() => setGameStarted(false)}
          className="flex items-center gap-2 px-4 py-2 bg-[#E5E7EB] hover:bg-[#D1D5DB] text-[#1F2937] rounded-full font-bold transition-all duration-200"
        >
          <ArrowLeft size={20} /> Back to Info
        </button>
        <GameComponent
          onComplete={() => {
            setGameCompleted(true);
            onComplete();
          }}
        />
      </div>
    );
  }

  if (gameCompleted) {
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-[#FBBF24] to-[#FCD34D] rounded-3xl p-8 text-center border-4 border-[#D97706] animate-bounce-in">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold text-[#1F2937] mb-2">Amazing Work, Scientist!</h2>
          <p className="text-lg text-[#1F2937] mb-6">You've completed the {data.name} experiment!</p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => {
                setGameStarted(false);
                setGameCompleted(false);
              }}
              className="px-6 py-3 bg-[#14B8A6] hover:bg-[#0D9488] text-white rounded-full font-bold transition-all duration-200 hover:scale-105"
            >
              Play Again
            </button>
            <button
              onClick={onBack}
              className="px-6 py-3 bg-[#D97706] hover:bg-[#B45309] text-white rounded-full font-bold transition-all duration-200 hover:scale-105"
            >
              Back to Lab
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-bounce-in">
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 px-4 py-2 bg-[#E5E7EB] hover:bg-[#D1D5DB] text-[#1F2937] rounded-full font-bold transition-all duration-200"
      >
        <ArrowLeft size={20} /> Back to Lab
      </button>

      {/* Header */}
      <div className={`bg-gradient-to-br ${data.color} rounded-3xl p-8 border-4 border-[#D97706] shadow-lg`}>
        <div className="flex items-center gap-4 mb-4">
          <div className="text-6xl">{data.icon}</div>
          <h1 className="text-4xl font-bold text-[#1F2937]">{data.name}</h1>
        </div>
      </div>

      {/* Explanation */}
      <div className="bg-white rounded-3xl p-8 border-2 border-[#14B8A6] shadow-lg">
        <h2 className="text-2xl font-bold text-[#1F2937] mb-4">What's Happening?</h2>
        <p className="text-lg text-[#4B5563] leading-relaxed mb-6">{data.explanation}</p>

        {/* Vocabulary */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-[#1F2937] mb-3">Key Vocabulary:</h3>
          <div className="flex flex-wrap gap-2">
            {data.vocabulary.map((word: string, idx: number) => (
              <span
                key={idx}
                className="px-4 py-2 bg-[#C4B5FD] text-[#1F2937] rounded-full font-semibold text-sm"
              >
                {word}
              </span>
            ))}
          </div>
        </div>

        {/* Fun Fact */}
        <div className="bg-gradient-to-r from-[#FBBF24] to-[#FCD34D] rounded-2xl p-4 border-2 border-[#D97706]">
          <p className="text-lg font-bold text-[#1F2937]">
            💡 Did You Know? {data.funFact}
          </p>
        </div>
      </div>

      {/* Start Game Button */}
      <button
        onClick={() => setGameStarted(true)}
        className="w-full py-4 px-6 bg-gradient-to-r from-[#D97706] to-[#B45309] hover:from-[#B45309] hover:to-[#92400E] text-white text-xl font-bold rounded-2xl transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg border-3 border-[#92400E]"
      >
        🎮 Start Interactive Game
      </button>
    </div>
  );
}
