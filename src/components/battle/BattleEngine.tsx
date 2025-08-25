"use client";

import React from "react";
import { useBattle } from "@/context/BattleContext";
import { BattleResult } from "@/types/battle";

export const BattleEngine: React.FC = () => {
  const { state, dispatch } = useBattle();

  const canBattle =
    state.teamA.fighters.length === 3 && state.teamB.fighters.length === 3;

  const calculateBattle = () => {
    const teamAStats = state.teamA.fighters.reduce((total, fighter) => {
      Object.keys(fighter.powerstats).forEach((key) => {
        total[key as keyof typeof total] =
          (total[key as keyof typeof total] || 0) +
          fighter.powerstats[key as keyof typeof fighter.powerstats];
      });
      return total;
    }, {} as any);

    const teamBStats = state.teamB.fighters.reduce((total, fighter) => {
      Object.keys(fighter.powerstats).forEach((key) => {
        total[key as keyof typeof total] =
          (total[key as keyof typeof total] || 0) +
          fighter.powerstats[key as keyof typeof fighter.powerstats];
      });
      return total;
    }, {} as any);

    const teamAScore = Object.values(teamAStats).reduce(
      (sum: number, stat: any) => sum + stat,
      0
    );
    const teamBScore = Object.values(teamBStats).reduce(
      (sum: number, stat: any) => sum + stat,
      0
    );

    const breakdown = [
      `Team A Total Power: ${teamAScore}`,
      `Team B Total Power: ${teamBScore}`,
      `Intelligence: Team A (${teamAStats.intelligence}) vs Team B (${teamBStats.intelligence})`,
      `Strength: Team A (${teamAStats.strength}) vs Team B (${teamBStats.strength})`,
      `Speed: Team A (${teamAStats.speed}) vs Team B (${teamBStats.speed})`,
    ];

    let winner: "A" | "B" | "tie";
    if (teamAScore > teamBScore) winner = "A";
    else if (teamBScore > teamAScore) winner = "B";
    else winner = "tie";

    const result: BattleResult = {
      winner,
      teamAScore,
      teamBScore,
      breakdown,
    };

    dispatch({ type: "SET_BATTLE_RESULT", payload: result });
  };

  if (!canBattle) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">
          Complete both teams with 3 fighters each to start the battle!
        </p>
      </div>
    );
  }

  return (
    <div className="text-center">
      <button
        onClick={calculateBattle}
        className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-lg text-xl font-bold hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
      >
        ⚔️ START BATTLE!
      </button>
    </div>
  );
};
