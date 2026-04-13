/**
 * Mascot Component
 * Design: Playful Retro-Futurism
 * - Friendly cartoon scientist character
 * - Positioned in corner with floating animation
 * - Provides encouragement and tips
 */

import { useState } from 'react';

const tips = [
  "💡 Did you know? Acids and bases are everywhere in nature!",
  "🔬 Pro tip: Always wear safety goggles when experimenting!",
  "✨ Fun fact: Some reactions create beautiful colors!",
  "🌈 Science is all around us - keep exploring!",
  "⚗️ Every great scientist started just like you!",
  "🎉 You're doing amazing! Keep up the great work!",
];

export default function Mascot() {
  const [tipIndex, setTipIndex] = useState(0);

  const handleNextTip = () => {
    setTipIndex((prev) => (prev + 1) % tips.length);
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-lg border-2 border-[#D97706] animate-bounce-in">
      {/* Mascot image */}
      <div className="flex justify-center mb-4">
        <img
          src="https://d2xsxph8kpxj0f.cloudfront.net/310519663374090262/2A33xcbcenD3r43aFAHfnC/mascot-scientist-3oVgX9BjdcL8EVKw3WznSe.webp"
          alt="Friendly Scientist Mascot"
          className="w-32 h-32 object-contain animate-float"
        />
      </div>

      {/* Tip bubble */}
      <div className="bg-gradient-to-br from-[#FBBF24] to-[#FCD34D] rounded-2xl p-4 mb-4 relative">
        <div className="absolute -bottom-2 left-6 w-4 h-4 bg-[#FBBF24] rounded-full transform rotate-45"></div>
        <p className="text-sm font-semibold text-[#1F2937] text-center leading-relaxed">
          {tips[tipIndex]}
        </p>
      </div>

      {/* Next tip button */}
      <button
        onClick={handleNextTip}
        className="w-full bg-[#14B8A6] hover:bg-[#0D9488] text-white font-bold py-2 px-4 rounded-full transition-all duration-200 hover:scale-105 active:scale-95"
      >
        Next Tip ✨
      </button>
    </div>
  );
}
