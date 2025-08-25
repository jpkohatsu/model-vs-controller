"use client";

import React from "react";
import { useBattle } from "@/context/BattleContext";

export const BattleResult: React.FC = () => {
  const { state, dispatch } = useBattle();

  if (!state.battleResult) return null;

  const { winner, teamAScore, teamBScore, breakdown } = state.battleResult;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold mb-4">⚡ BATTLE RESULTS ⚡</h2>

          {winner === "tie" ? (
            <div className="text-2xl font-bold text-yellow-600 mb-4">
              🤝 IT'S A TIE!
            </div>
          ) : (
            <div
              className={`text-2xl font-bold mb-4 ${
                winner === "A" ? "text-blue-600" : "text-red-600"
              }`}
            >
              🏆 TEAM {winner} WINS!
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-100 p-4 rounded-lg">
              <h3 className="font-bold text-blue-800">Team A</h3>
              <div className="text-2xl font-bold text-blue-600">
                {teamAScore}
              </div>
            </div>
            <div className="bg-red-100 p-4 rounded-lg">
              <h3 className="font-bold text-red-800">Team B</h3>
              <div className="text-2xl font-bold text-red-600">
                {teamBScore}
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-bold mb-3">Battle Breakdown:</h3>
          <div className="space-y-2">
            {breakdown.map((line, index) => (
              <div key={index} className="text-sm bg-gray-100 p-2 rounded">
                {line}
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-4 justify-center">
          <button
            onClick={() =>
              dispatch({ type: "SET_BATTLE_RESULT", payload: null })
            }
            className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
          >
            Close
          </button>
          <button
            onClick={() => dispatch({ type: "RESET_BATTLE" })}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            New Battle
          </button>
        </div>
      </div>
    </div>
  );
};
