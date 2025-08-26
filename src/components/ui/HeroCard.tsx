/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { Hero } from "@/types/battle";
import { calculateHeroPower } from "@/lib/utils";

interface HeroCardProps {
  hero: Hero;
  onAddToTeam?: (hero: Hero, team: "A" | "B") => void;
  onRemove?: () => void;
  showActions?: boolean;
}

export const HeroCard: React.FC<HeroCardProps> = ({
  hero,
  onAddToTeam,
  onRemove,
  showActions = true,
}) => {
  const totalPower = calculateHeroPower(hero);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-200">
      <div className="h-48 bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center">
        <img
          src={hero.image}
          alt={hero.name}
          className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
        />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-800">{hero.name}</h3>
        <p className="text-sm text-gray-600 mb-2">{hero.biography.fullName}</p>
        <p className="text-xs text-gray-600 mb-3">{hero.biography.publisher}</p>

        <div className="grid grid-cols-2 gap-2 text-gray-600 text-xs mb-4">
          <div>
            STR: <span className="font-bold">{hero.powerstats.strength}</span>
          </div>
          <div>
            SPD: <span className="font-bold">{hero.powerstats.speed}</span>
          </div>
          <div>
            INT:{" "}
            <span className="font-bold">{hero.powerstats.intelligence}</span>
          </div>
          <div>
            PWR: <span className="font-bold">{hero.powerstats.power}</span>
          </div>
        </div>

        <div className="mb-3">
          <div className="text-xs text-gray-600 mb-1">
            Total Power: {totalPower}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
              style={{ width: `${Math.min((totalPower / 600) * 100, 100)}%` }}
            ></div>
          </div>
        </div>

        {showActions && onAddToTeam && (
          <div className="flex gap-2">
            <button
              onClick={() => onAddToTeam(hero, "A")}
              className="flex-1 bg-blue-500 text-white py-2 px-3 rounded-lg text-sm hover:bg-blue-600 transition-colors"
            >
              Team A
            </button>
            <button
              onClick={() => onAddToTeam(hero, "B")}
              className="flex-1 bg-red-500 text-white py-2 px-3 rounded-lg text-sm hover:bg-red-600 transition-colors"
            >
              Team B
            </button>
          </div>
        )}

        {onRemove && (
          <button
            onClick={onRemove}
            className="w-full bg-gray-500 text-white py-2 px-3 rounded-lg text-sm hover:bg-gray-600 transition-colors"
          >
            Remove
          </button>
        )}
      </div>
    </div>
  );
};
