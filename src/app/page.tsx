"use client";

import { BattleProvider } from "@/context/BattleContext";
import { SearchSection } from "@/components/battle/SearchSection";
import { TeamBuilder } from "@/components/battle/TeamBuilder";
import { BattleEngine } from "@/components/battle/BattleEngine";
import { BattleResult } from "@/components/battle/BattleResult";

export default function HomePage() {
  return (
    <BattleProvider>
      <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <header className="text-center mb-12">
            <h1 className="text-3xl text-gray-700 mb-4">
              ⚔️ MODEL VS CONTROLLER ⚔️
            </h1>
            <p className="text-xl text-gray-700 mb-2">3v3 Battle Simulator</p>
            <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 max-w-2xl mx-auto">
              <p className="text-sm text-gray-600 mb-2">
                🎮 How to Play: Search heroes → Build teams of 3 fighters →
                Battle
              </p>
            </div>
          </header>

          {/* Main Game Components */}
          <SearchSection />
          <TeamBuilder />
          <BattleEngine />
          <BattleResult />
        </div>

        {/* Footer */}
        <footer className="text-center py-6 text-gray-600 text-sm">
          <p>Built using Next.js, React, TypeScript & Tailwind CSS</p>
          <p className="mt-1">Model vs Controller Challenge</p>
        </footer>
      </div>
    </BattleProvider>
  );
}
