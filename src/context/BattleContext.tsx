"use client";

import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { BattleState, BattleAction } from "@/types/battle";

interface BattleContextType {
  state: BattleState;
  dispatch: React.Dispatch<BattleAction>;
}

const BattleContext = createContext<BattleContextType | null>(null);

// Battle Reducer
export const battleReducer = (
  state: BattleState,
  action: BattleAction
): BattleState => {
  switch (action.type) {
    case "SET_SEARCH_RESULTS":
      return { ...state, searchResults: action.payload, isSearching: false };

    case "SET_SEARCHING":
      return { ...state, isSearching: action.payload };

    case "ADD_TO_TEAM":
      const { hero, team } = action.payload;
      if (team === "A") {
        if (state.teamA.fighters.length >= 3) return state;
        return {
          ...state,
          teamA: { ...state.teamA, fighters: [...state.teamA.fighters, hero] },
        };
      } else {
        if (state.teamB.fighters.length >= 3) return state;
        return {
          ...state,
          teamB: { ...state.teamB, fighters: [...state.teamB.fighters, hero] },
        };
      }

    case "REMOVE_FROM_TEAM":
      const { heroId, team: removeTeam } = action.payload;
      if (removeTeam === "A") {
        return {
          ...state,
          teamA: {
            ...state.teamA,
            fighters: state.teamA.fighters.filter((h) => h.id !== heroId),
          },
        };
      } else {
        return {
          ...state,
          teamB: {
            ...state.teamB,
            fighters: state.teamB.fighters.filter((h) => h.id !== heroId),
          },
        };
      }

    case "SET_BATTLE_RESULT":
      return { ...state, battleResult: action.payload };

    case "RESET_BATTLE":
      return {
        ...state,
        teamA: { name: "Team A", fighters: [] },
        teamB: { name: "Team B", fighters: [] },
        battleResult: null,
      };

    default:
      return state;
  }
};

// Battle Provider Component
interface BattleProviderProps {
  children: ReactNode;
}

export const BattleProvider: React.FC<BattleProviderProps> = ({ children }) => {
  const initialState: BattleState = {
    teamA: { name: "Team A", fighters: [] },
    teamB: { name: "Team B", fighters: [] },
    searchResults: [],
    battleResult: null,
    isSearching: false,
  };

  const [state, dispatch] = useReducer(battleReducer, initialState);

  return (
    <BattleContext.Provider value={{ state, dispatch }}>
      {children}
    </BattleContext.Provider>
  );
};

// Custom hook to use battle context
export const useBattle = (): BattleContextType => {
  const context = useContext(BattleContext);

  if (!context) {
    throw new Error("useBattle must be used within a BattleProvider");
  }

  return context;
};
