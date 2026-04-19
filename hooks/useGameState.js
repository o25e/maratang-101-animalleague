import { useState } from "react";
import { getEnding } from "../utils/getEnding";

export function useGameState() {
  const [screen, setScreen]                         = useState("title");
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [spiceLevel, setSpiceLevel]                 = useState(null);
  const [selectedSauces, setSelectedSauces]         = useState([]);
  const [ending, setEnding]                         = useState(null);
  const [bowlPop, setBowlPop]                       = useState(false);

  const toggleIngredient = (item) => {
    if (selectedIngredients.find(i => i.id === item.id)) {
      setSelectedIngredients(prev => prev.filter(i => i.id !== item.id));
    } else if (selectedIngredients.length < 14) {
      setSelectedIngredients(prev => [...prev, item]);
      setBowlPop(true);
      setTimeout(() => setBowlPop(false), 250);
    }
  };

  const toggleSauce = (id) =>
    setSelectedSauces(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );

  const submitResult = () => {
    setEnding(getEnding(selectedIngredients, spiceLevel, selectedSauces));
    setScreen("result");
  };

  const reset = () => {
    setSelectedIngredients([]);
    setSpiceLevel(null);
    setSelectedSauces([]);
    setEnding(null);
    setScreen("title");
  };

  const restartGame = () => {
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
    restartGame,
  };
}
