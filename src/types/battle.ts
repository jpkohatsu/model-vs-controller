export interface Hero {
  id: string;
  name: string;
  image: string;
  powerstats: {
    intelligence: number;
    strength: number;
    speed: number;
    durability: number;
    power: number;
    combat: number;
  };
  biography: {
    fullName: string;
    publisher: string;
  };
}

export interface Team {
  name: string;
  fighters: Hero[];
}

export interface BattleState {
  teamA: Team;
  teamB: Team;
  searchResults: Hero[];
  battleResult: BattleResult | null;
  isSearching: boolean;
}

export interface BattleResult {
  winner: "A" | "B" | "tie";
  teamAScore: number;
  teamBScore: number;
  breakdown: string[];
}

export type BattleAction =
  | { type: "SET_SEARCH_RESULTS"; payload: Hero[] }
  | { type: "SET_SEARCHING"; payload: boolean }
  | { type: "ADD_TO_TEAM"; payload: { hero: Hero; team: "A" | "B" } }
  | { type: "REMOVE_FROM_TEAM"; payload: { heroId: string; team: "A" | "B" } }
  | { type: "SET_BATTLE_RESULT"; payload: BattleResult | null }
  | { type: "RESET_BATTLE" };
