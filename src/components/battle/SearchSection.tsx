/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useBattle } from "@/context/BattleContext";
import { HeroCard } from "@/components/ui/HeroCard";
import { MOCK_HEROES } from "@/lib/utils";
import { Hero } from "@/types/battle";

type SortOption = "name" | "power" | "strength" | "intelligence" | "publisher";
type FilterOption = "all" | "marvel" | "dc" | "other";

export const SearchSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("name");
  const [filterBy, setFilterBy] = useState<FilterOption>("all");
  const [showFilters, setShowFilters] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const { state, dispatch } = useBattle();

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Load search history from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("heroSearchHistory");
      if (saved) {
        setSearchHistory(JSON.parse(saved));
      }
    }
  }, []);

  // Save search history to localStorage
  const saveSearchToHistory = useCallback((term: string) => {
    if (term.trim() && term.length > 2) {
      setSearchHistory((prev) => {
        const newHistory = [term, ...prev.filter((h) => h !== term)].slice(
          0,
          5
        );
        if (typeof window !== "undefined") {
          localStorage.setItem("heroSearchHistory", JSON.stringify(newHistory));
        }
        return newHistory;
      });
    }
  }, []);

  // Enhanced search function
  const performSearch = useCallback(
    (term: string, sort: SortOption, filter: FilterOption) => {
      if (!term.trim()) {
        // Show featured heroes when no search term
        const featured = MOCK_HEROES.slice(0, 6);
        dispatch({ type: "SET_SEARCH_RESULTS", payload: featured });
        return;
      }

      dispatch({ type: "SET_SEARCHING", payload: true });

      // Save to search history
      saveSearchToHistory(term);

      // Simulate API delay
      setTimeout(() => {
        let results = MOCK_HEROES.filter((hero) => {
          const matchesSearch =
            hero.name.toLowerCase().includes(term.toLowerCase()) ||
            hero.biography.fullName
              .toLowerCase()
              .includes(term.toLowerCase()) ||
            hero.biography.publisher.toLowerCase().includes(term.toLowerCase());

          const matchesFilter =
            filter === "all" ||
            (filter === "marvel" &&
              hero.biography.publisher.toLowerCase().includes("marvel")) ||
            (filter === "dc" &&
              hero.biography.publisher.toLowerCase().includes("dc")) ||
            (filter === "other" &&
              !hero.biography.publisher.toLowerCase().includes("marvel") &&
              !hero.biography.publisher.toLowerCase().includes("dc"));

          return matchesSearch && matchesFilter;
        });

        // Sort results
        results = results.sort((a, b) => {
          switch (sort) {
            case "name":
              return a.name.localeCompare(b.name);
            case "power":
              const aPower = Object.values(a.powerstats).reduce(
                (sum, stat) => sum + stat,
                0
              );
              const bPower = Object.values(b.powerstats).reduce(
                (sum, stat) => sum + stat,
                0
              );
              return bPower - aPower;
            case "strength":
              return b.powerstats.strength - a.powerstats.strength;
            case "intelligence":
              return b.powerstats.intelligence - a.powerstats.intelligence;
            case "publisher":
              return a.biography.publisher.localeCompare(b.biography.publisher);
            default:
              return 0;
          }
        });

        dispatch({ type: "SET_SEARCH_RESULTS", payload: results });
      }, 400);
    },
    [dispatch, saveSearchToHistory]
  );

  // Trigger search when debounced term or filters change
  useEffect(() => {
    performSearch(debouncedSearchTerm, sortBy, filterBy);
  }, [debouncedSearchTerm, sortBy, filterBy, performSearch]);

  const handleAddToTeam = (hero: Hero, team: "A" | "B") => {
    // Check if hero already exists in either team
    const allFighters = [...state.teamA.fighters, ...state.teamB.fighters];
    if (allFighters.some((f) => f.id === hero.id)) {
      alert(`${hero.name} is already on a team! Choose a different hero.`);
      return;
    }

    dispatch({ type: "ADD_TO_TEAM", payload: { hero, team } });
  };

  const clearSearch = () => {
    setSearchTerm("");
    setDebouncedSearchTerm("");
  };

  const clearSearchHistory = () => {
    setSearchHistory([]);
    if (typeof window !== "undefined") {
      localStorage.removeItem("heroSearchHistory");
    }
  };

  const totalResults = state.searchResults.length;
  const teamACount = state.teamA.fighters.length;
  const teamBCount = state.teamB.fighters.length;

  return (
    <div className="mb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">🔍 Search Heroes</h2>
        <div className="text-sm text-gray-600">
          Teams: A({teamACount}/3) • B({teamBCount}/3)
        </div>
      </div>

      {/* Search Input */}
      <div className="relative mb-4">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search heroes by name, real name, or publisher..."
            className="w-full p-4 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-sm"
          />
          {searchTerm && (
            <button
              onClick={clearSearch}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              ✕
            </button>
          )}
        </div>

        {/* Search suggestions from history */}
        {searchHistory.length > 0 && searchTerm === "" && (
          <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 z-10">
            <div className="p-3 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-gray-500">
                  Recent Searches
                </span>
                <button
                  onClick={clearSearchHistory}
                  className="text-xs text-red-500 hover:text-red-700"
                >
                  Clear
                </button>
              </div>
            </div>
            {searchHistory.map((term, index) => (
              <button
                key={index}
                onClick={() => setSearchTerm(term)}
                className="w-full text-left px-3 py-2 hover:bg-gray-50 text-sm text-gray-700 transition-colors"
              >
                🕐 {term}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Quick Search Chips */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="text-sm text-gray-600 mr-2">Quick search:</span>
        {["Superman", "Batman", "Spider-Man", "Iron Man", "Wonder Woman"].map(
          (term) => (
            <button
              key={term}
              onClick={() => setSearchTerm(term)}
              className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs hover:bg-purple-200 transition-colors"
            >
              {term}
            </button>
          )
        )}
      </div>

      {/* Filters and Sort */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="sm:hidden bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
        >
          {showFilters ? "Hide Filters" : "Show Filters"} ⚙️
        </button>

        <div
          className={`flex flex-col sm:flex-row gap-4 ${
            showFilters ? "block" : "hidden sm:flex"
          }`}
        >
          {/* Sort Options */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">
              Sort by:
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
            >
              <option value="name">Name (A-Z)</option>
              <option value="power">Total Power</option>
              <option value="strength">Strength</option>
              <option value="intelligence">Intelligence</option>
              <option value="publisher">Publisher</option>
            </select>
          </div>

          {/* Filter Options */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">
              Publisher:
            </label>
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value as FilterOption)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
            >
              <option value="all">All Publishers</option>
              <option value="marvel">Marvel Comics</option>
              <option value="dc">DC Comics</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {state.isSearching && (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">
            Searching through the multiverse...
          </p>
        </div>
      )}

      {/* Results Header */}
      {!state.isSearching && (
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-gray-600">
            {searchTerm ? (
              <>
                Found{" "}
                <span className="font-bold text-purple-600">
                  {totalResults}
                </span>{" "}
                hero{totalResults !== 1 ? "s" : ""}
                {searchTerm && (
                  <>
                    {" "}
                    for "<span className="font-medium">{searchTerm}</span>"
                  </>
                )}
                {filterBy !== "all" && (
                  <>
                    {" "}
                    in <span className="font-medium">{filterBy}</span>
                  </>
                )}
              </>
            ) : (
              <>
                Showing{" "}
                <span className="font-bold text-purple-600">
                  {totalResults}
                </span>{" "}
                featured heroes
              </>
            )}
          </div>

          {totalResults > 0 && (
            <div className="text-xs text-gray-500">
              Sorted by {sortBy === "power" ? "total power" : sortBy}
            </div>
          )}
        </div>
      )}

      {/* No Results */}
      {!state.isSearching && totalResults === 0 && searchTerm && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🤔</div>
          <h3 className="text-xl font-bold text-gray-700 mb-2">
            No heroes found
          </h3>
          <p className="text-gray-600 mb-4">
            No heroes match your search for "
            <span className="font-medium">{searchTerm}</span>"
          </p>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Try searching for:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {["Batman", "Superman", "Spider", "Marvel", "DC"].map(
                (suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => setSearchTerm(suggestion)}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                  >
                    {suggestion}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      )}

      {/* Heroes Grid */}
      {!state.isSearching && totalResults > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {state.searchResults.map((hero, index) => (
            <div
              key={hero.id}
              className="fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <HeroCard hero={hero} onAddToTeam={handleAddToTeam} />
            </div>
          ))}
        </div>
      )}

      {/* Helper Text */}
      {!searchTerm && !state.isSearching && (
        <div className="text-center mt-8">
          <p className="text-gray-600 text-sm mb-4">
            💡 <strong>Pro tip:</strong> Search by hero name, real name, or
            publisher to discover new fighters!
          </p>
          <div className="flex justify-center space-x-4 text-xs text-gray-500">
            <span>🦸‍♂️ 8 heroes available</span>
            <span>⚡ Real power stats</span>
            <span>🔍 Smart search</span>
          </div>
        </div>
      )}
    </div>
  );
};
