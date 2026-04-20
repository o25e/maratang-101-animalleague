import { useState } from "react";
import { Ingredient, Ending, GameScreen, UserInfo } from "../types/game";
import { getEnding } from "../utils/judge";
import { updateRanking } from "../utils/ranking";

interface GameState {
  screen: GameScreen;
  setScreen: (screen: GameScreen) => void;
  selectedIngredients: Ingredient[];
  spiceLevel: number | null;
  setSpiceLevel: (level: number) => void;
  selectedSauces: string[];
  ending: Ending | null;
  bowlPop: boolean;
  toggleIngredient: (item: Ingredient) => void;
  toggleSauce: (id: string) => void;
  submitResult: () => void;
  reset: () => void;
}

export function useGameState(userInfo: UserInfo | null): GameState {
  const [screen, setScreen]                           = useState<GameScreen>("title");
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>([]);
  const [spiceLevel, setSpiceLevel]                   = useState<number | null>(null);
  const [selectedSauces, setSelectedSauces]           = useState<string[]>([]);
  const [ending, setEnding]                           = useState<Ending | null>(null);
  const [bowlPop, setBowlPop]                         = useState(false);

  const toggleIngredient = (item: Ingredient) => {
    if (selectedIngredients.find((i) => i.id === item.id)) {
      setSelectedIngredients((prev) => prev.filter((i) => i.id !== item.id));
    } else if (selectedIngredients.length < 14) {
      setSelectedIngredients((prev) => [...prev, item]);
      setBowlPop(true);
      setTimeout(() => setBowlPop(false), 250);
    }
  };

  const toggleSauce = (id: string) =>
    setSelectedSauces((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );

  const submitResult = () => {
    const newEnding = getEnding(selectedIngredients, spiceLevel, selectedSauces);
    setEnding(newEnding);
    setScreen("tasting");
    if (userInfo) {
      updateRanking(userInfo, newEnding.score).catch(console.error);
    }
  };

  const reset = () => {
    setSelectedIngredients([]);
    setSpiceLevel(null);
    setSelectedSauces([]);
    setEnding(null);
    setScreen("ingredients");
  };

  return {
    screen, setScreen,
    selectedIngredients,
    spiceLevel, setSpiceLevel,
    selectedSauces,
    ending,
    bowlPop,
    toggleIngredient,
    toggleSauce,
    submitResult,
    reset,
  };
}
