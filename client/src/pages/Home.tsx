import { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import LabBench from '@/components/LabBench';
import ExperimentDetail from '@/components/ExperimentDetail';
import LabJournal from '@/components/LabJournal';
import Mascot from '@/components/Mascot';

/**
 * Design Philosophy: Playful Retro-Futurism
 * - Warm, inviting colors (terracotta, teal, yellow, lavender, coral, cream)
 * - Rounded, friendly typography (Fredoka for headings, Poppins for body)
 * - Bouncy, exaggerated animations that make every interaction rewarding
 * - Glowing auras and floating particles creating a magical laboratory atmosphere
 */

export default function Home() {
  const [selectedExperiment, setSelectedExperiment] = useState<string | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [completedExperiments, setCompletedExperiments] = useState<string[]>([]);

  useEffect(() => {
    // Load completed experiments from localStorage
    const saved = localStorage.getItem('completedExperiments');
    if (saved) {
      setCompletedExperiments(JSON.parse(saved));
    }
  }, []);

  const handleExperimentComplete = (experimentId: string) => {
    if (!completedExperiments.includes(experimentId)) {
      const updated = [...completedExperiments, experimentId];
      setCompletedExperiments(updated);
      localStorage.setItem('completedExperiments', JSON.stringify(updated));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FEF3C7] to-[#FEF9E7] relative overflow-hidden">
      {/* Background texture with floating particles */}
      <div className="fixed inset-0 pointer-events-none opacity-30">
        <img
          src="https://d2xsxph8kpxj0f.cloudfront.net/310519663374090262/2A33xcbcenD3r43aFAHfnC/lab-background-texture-N26C9mqaAW6AW4Y9TvJC88.webp"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      {/* Header with sound control */}
      <header className="relative z-20 bg-white/80 backdrop-blur-sm border-b-2 border-[#E5E7EB] shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-[#D97706]">🧪 Chemistry Lab</h1>
            <p className="text-sm text-[#6B7280] font-medium">Learn through play!</p>
          </div>
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 rounded-full bg-[#14B8A6] hover:bg-[#0D9488] text-white transition-all duration-200 hover:scale-110"
            title={soundEnabled ? 'Mute sounds' : 'Unmute sounds'}
          >
            {soundEnabled ? <Volume2 size={24} /> : <VolumeX size={24} />}
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Lab Bench - Main content area */}
          <div className="lg:col-span-3">
            {selectedExperiment ? (
              <ExperimentDetail
                experimentId={selectedExperiment}
                onBack={() => setSelectedExperiment(null)}
                onComplete={() => handleExperimentComplete(selectedExperiment)}
              />
            ) : (
              <LabBench
                onSelectExperiment={setSelectedExperiment}
                completedExperiments={completedExperiments}
              />
            )}
          </div>

          {/* Sidebar - Lab Journal and Mascot */}
          <aside className="lg:col-span-1 space-y-6">
            <Mascot />
            <LabJournal
              completedExperiments={completedExperiments}
              totalExperiments={8}
            />
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 mt-12 py-6 border-t-2 border-[#E5E7EB] bg-white/50 backdrop-blur-sm text-center text-sm text-[#6B7280]">
        <p>🌟 Keep exploring and learning! Every experiment makes you a better scientist! 🌟</p>
      </footer>
    </div>
  );
}
