/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React from "react";
import { useBattle } from "@/context/BattleContext";
import { HeroCard } from "@/components/ui/HeroCard";
import { Team } from "@/types/battle";

export const TeamBuilder: React.FC = () => {
  const { state, dispatch } = useBattle();

  const handleRemoveFromTeam = (heroId: string, team: "A" | "B") => {
    dispatch({ type: "REMOVE_FROM_TEAM", payload: { heroId, team } });

    // Success notification
    const notification = document.createElement("div");
    notification.className =
      "fixed top-4 right-4 bg-yellow-500 text-white px-6 py-3 rounded-xl shadow-lg z-50 animate-bounce";
    notification.textContent = `Hero removed from Team ${team}`;
    document.body.appendChild(notification);
    setTimeout(() => document.body.removeChild(notification), 2000);
  };

  const calculateTeamPower = (team: Team) => {
    return team.fighters.reduce((total, fighter) => {
      return (
        total +
        Object.values(fighter.powerstats).reduce((sum, stat) => sum + stat, 0)
      );
    }, 0);
  };

  const getTeamStats = (team: Team) => {
    if (team.fighters.length === 0) return null;

    const stats = team.fighters.reduce(
      (total, fighter) => ({
        intelligence: total.intelligence + fighter.powerstats.intelligence,
        strength: total.strength + fighter.powerstats.strength,
        speed: total.speed + fighter.powerstats.speed,
        durability: total.durability + fighter.powerstats.durability,
        power: total.power + fighter.powerstats.power,
        combat: total.combat + fighter.powerstats.combat,
      }),
      {
        intelligence: 0,
        strength: 0,
        speed: 0,
        durability: 0,
        power: 0,
        combat: 0,
      }
    );

    const maxStat = Math.max(...Object.values(stats));
    return { stats, maxStat };
  };

  const teamAStats = getTeamStats(state.teamA);
  const teamBStats = getTeamStats(state.teamB);
  const teamAPower = calculateTeamPower(state.teamA);
  const teamBPower = calculateTeamPower(state.teamB);

  return (
    <div className="mb-16">
      {/* Enhanced Header */}
      <div className="text-center mb-12">
        <div className="glass backdrop-blur-xl bg-white/20 rounded-2xl p-8 shadow-2xl border border-white/30 max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-2xl">🥊</span>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-600">
                Team Assembly
              </h2>
              <p className="text-gray-600">
                Build your ultimate 3v3 battle formation
              </p>
            </div>
          </div>

          {/* Battle Readiness Indicator */}
          <div className="bg-white/40 backdrop-blur-sm rounded-xl p-4 border border-white/50">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-700">
                Battle Readiness
              </span>
              <span className="text-sm text-gray-600">
                {state.teamA.fighters.length + state.teamB.fighters.length}/6
                fighters recruited
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 h-3 rounded-full transition-all duration-500 ease-out relative"
                style={{
                  width: `${
                    ((state.teamA.fighters.length +
                      state.teamB.fighters.length) /
                      6) *
                    100
                  }%`,
                }}
              >
                <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
              </div>
            </div>
            {state.teamA.fighters.length === 3 &&
              state.teamB.fighters.length === 3 && (
                <p className="text-sm text-green-600 font-medium mt-2 flex items-center justify-center gap-2">
                  <span>✅</span> Ready for battle!
                </p>
              )}
          </div>
        </div>
      </div>

      {/* Teams Container */}
      <div className="relative">
        {/* VS Indicator - Enhanced */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 hidden lg:block">
          <div className="relative">
            <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center shadow-2xl border-4 border-white">
              <span className="text-white font-black text-xl">VS</span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-red-400 rounded-full animate-pulse opacity-50 scale-110"></div>
          </div>
        </div>

        {/* Teams Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Team A - Enhanced */}
          <div className="relative">
            {/* Team A Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 to-cyan-100/30 rounded-3xl blur-xl"></div>

            <div className="relative glass backdrop-blur-xl bg-blue-50/40 rounded-3xl p-8 shadow-2xl border-2 border-blue-200/50 hover:border-blue-300/70 transition-all duration-300">
              {/* Team A Header */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold">A</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-blue-800">
                        Team Andrew
                      </h3>
                      <p className="text-sm text-blue-600">
                        {state.teamA.fighters.length}/3 Heroes
                      </p>
                    </div>
                  </div>

                  {/* Team Status Badge */}
                  <div
                    className={`px-4 py-2 rounded-xl font-bold text-sm transition-all duration-300 ${
                      state.teamA.fighters.length === 3
                        ? "bg-blue-500 text-white shadow-lg shadow-blue-500/30"
                        : "bg-blue-100 text-blue-700 border border-blue-300"
                    }`}
                  >
                    {state.teamA.fighters.length === 3
                      ? "✅ Complete"
                      : "⏳ Building"}
                  </div>
                </div>
              </div>

              {/* Team A Slots */}
              <div className="space-y-6">
                {state.teamA.fighters.map((fighter, index) => (
                  <div
                    key={fighter.id}
                    className="transform hover:scale-105 transition-all duration-300"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/60 hover:shadow-xl transition-all duration-300">
                      <div className="flex items-center gap-4">
                        <div className="flex-shrink-0">
                          <img
                            src={fighter.image}
                            alt={fighter.name}
                            className="w-16 h-16 rounded-xl object-cover border-2 border-blue-200 shadow-md"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-gray-800 truncate">
                            {fighter.name}
                          </h4>
                          <p className="text-sm text-gray-600 truncate">
                            {fighter.biography.fullName}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                              {Object.values(fighter.powerstats).reduce(
                                (sum, stat) => sum + stat,
                                0
                              )}{" "}
                              PWR
                            </span>
                            <span className="text-xs text-blue-600">
                              {fighter.biography.publisher}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => handleRemoveFromTeam(fighter.id, "A")}
                          className="flex-shrink-0 w-8 h-8 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg flex items-center justify-center transition-colors duration-200 hover:scale-110"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Empty Slots for Team A */}
                {Array.from(
                  { length: 3 - state.teamA.fighters.length },
                  (_, i) => (
                    <div key={`empty-a-${i}`} className="relative group">
                      <div className="bg-white/40 backdrop-blur-sm border-2 border-dashed border-blue-300 rounded-2xl p-8 text-center transition-all duration-300 group-hover:border-blue-400 group-hover:bg-white/60">
                        <div className="text-blue-400 group-hover:text-blue-500 transition-colors duration-300">
                          <div className="text-4xl mb-2">⭐</div>
                          <p className="font-medium">
                            Hero Slot {state.teamA.fighters.length + i + 1}
                          </p>
                          <p className="text-sm mt-1">
                            Search and add a hero above
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Team B - Enhanced (Mirror of Team A with red theme) */}
          <div className="relative">
            {/* Team B Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-100/50 to-pink-100/30 rounded-3xl blur-xl"></div>

            <div className="relative glass backdrop-blur-xl bg-red-50/40 rounded-3xl p-8 shadow-2xl border-2 border-red-200/50 hover:border-red-300/70 transition-all duration-300">
              {/* Team B Header */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold">B</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-red-800">
                        Team Greg
                      </h3>
                      <p className="text-sm text-red-600">
                        {state.teamB.fighters.length}/3 Heroes
                      </p>
                    </div>
                  </div>

                  {/* Team Status Badge */}
                  <div
                    className={`px-4 py-2 rounded-xl font-bold text-sm transition-all duration-300 ${
                      state.teamB.fighters.length === 3
                        ? "bg-red-500 text-white shadow-lg shadow-red-500/30"
                        : "bg-red-100 text-red-700 border border-red-300"
                    }`}
                  >
                    {state.teamB.fighters.length === 3
                      ? "✅ Complete"
                      : "⏳ Building"}
                  </div>
                </div>
              </div>

              {/* Team B Slots */}
              <div className="space-y-6">
                {state.teamB.fighters.map((fighter, index) => (
                  <div
                    key={fighter.id}
                    className="transform hover:scale-105 transition-all duration-300"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/60 hover:shadow-xl transition-all duration-300">
                      <div className="flex items-center gap-4">
                        <div className="flex-shrink-0">
                          <img
                            src={fighter.image}
                            alt={fighter.name}
                            className="w-16 h-16 rounded-xl object-cover border-2 border-red-200 shadow-md"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-gray-800 truncate">
                            {fighter.name}
                          </h4>
                          <p className="text-sm text-gray-600 truncate">
                            {fighter.biography.fullName}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full font-medium">
                              {Object.values(fighter.powerstats).reduce(
                                (sum, stat) => sum + stat,
                                0
                              )}{" "}
                              PWR
                            </span>
                            <span className="text-xs text-red-600">
                              {fighter.biography.publisher}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => handleRemoveFromTeam(fighter.id, "B")}
                          className="flex-shrink-0 w-8 h-8 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg flex items-center justify-center transition-colors duration-200 hover:scale-110"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Empty Slots for Team B */}
                {Array.from(
                  { length: 3 - state.teamB.fighters.length },
                  (_, i) => (
                    <div key={`empty-b-${i}`} className="relative group">
                      <div className="bg-white/40 backdrop-blur-sm border-2 border-dashed border-red-300 rounded-2xl p-8 text-center transition-all duration-300 group-hover:border-red-400 group-hover:bg-white/60">
                        <div className="text-red-400 group-hover:text-red-500 transition-colors duration-300">
                          <div className="text-4xl mb-2">⭐</div>
                          <p className="font-medium">
                            Hero Slot {state.teamB.fighters.length + i + 1}
                          </p>
                          <p className="text-sm mt-1">
                            Search and add a hero above
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Power Comparison - Only show when both teams have fighters */}
        {(state.teamA.fighters.length > 0 ||
          state.teamB.fighters.length > 0) && (
          <div className="mt-12">
            <div className="glass backdrop-blur-xl bg-white/20 rounded-2xl p-8 shadow-2xl border border-white/30 max-w-4xl mx-auto">
              <h3 className="text-xl font-bold text-center text-gray-800 mb-6 flex items-center justify-center gap-2">
                <span>⚖️</span> Power Analysis
              </h3>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Team A Analysis */}
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-xl">A</span>
                  </div>
                  <h4 className="font-bold text-blue-800 mb-2">Team Alpha</h4>
                  <div className="text-3xl font-black text-blue-600 mb-2">
                    {teamAPower}
                  </div>
                  <div className="text-sm text-gray-600">
                    {state.teamA.fighters.length} heroes recruited
                  </div>

                  {teamAPower > teamBPower && teamBPower > 0 && (
                    <div className="mt-3 px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full inline-block font-medium">
                      🏆 Currently Leading
                    </div>
                  )}
                </div>

                {/* Team B Analysis */}
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-xl">B</span>
                  </div>
                  <h4 className="font-bold text-red-800 mb-2">Team Beta</h4>
                  <div className="text-3xl font-black text-red-600 mb-2">
                    {teamBPower}
                  </div>
                  <div className="text-sm text-gray-600">
                    {state.teamB.fighters.length} heroes recruited
                  </div>

                  {teamBPower > teamAPower && teamAPower > 0 && (
                    <div className="mt-3 px-3 py-1 bg-red-100 text-red-700 text-sm rounded-full inline-block font-medium">
                      🏆 Currently Leading
                    </div>
                  )}
                </div>
              </div>

              {/* Power Bar Comparison */}
              {teamAPower > 0 && teamBPower > 0 && (
                <div className="mt-8">
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-blue-700 w-16">
                      Alpha
                    </span>
                    <div className="flex-1 bg-gray-200 rounded-full h-4 overflow-hidden">
                      <div className="flex h-full">
                        <div
                          className="bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-1000"
                          style={{
                            width: `${
                              (teamAPower / (teamAPower + teamBPower)) * 100
                            }%`,
                          }}
                        ></div>
                        <div
                          className="bg-gradient-to-r from-red-400 to-red-600 transition-all duration-1000"
                          style={{
                            width: `${
                              (teamBPower / (teamAPower + teamBPower)) * 100
                            }%`,
                          }}
                        ></div>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-red-700 w-16 text-right">
                      Beta
                    </span>
                  </div>
                  <div className="text-center mt-3">
                    <span className="text-sm text-gray-600">
                      Power Difference: {Math.abs(teamAPower - teamBPower)}{" "}
                      points
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
