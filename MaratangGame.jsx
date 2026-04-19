import { useGameState } from "./hooks/useGameState";
import TitleScreen        from "./screens/TitleScreen";
import InstructionsScreen from "./screens/InstructionsScreen";
import IngredientsScreen  from "./screens/IngredientsScreen";
import SpiceScreen        from "./screens/SpiceScreen";
import SauceScreen        from "./screens/SauceScreen";
import ResultScreen       from "./screens/ResultScreen";

export default function MaratangGame() {
  const {
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
  } = useGameState();

  if (screen === "title") {
    return (
      <TitleScreen
        onStart={() => setScreen("ingredients")}
        onInstructions={() => setScreen("instructions")}
      />
    );
  }

  if (screen === "instructions") {
    return <InstructionsScreen onBack={() => setScreen("title")} />;
  }

  if (screen === "ingredients") {
    return (
      <IngredientsScreen
        selectedIngredients={selectedIngredients}
        bowlPop={bowlPop}
        onToggle={toggleIngredient}
        onNext={() => setScreen("spice")}
      />
    );
  }

  if (screen === "spice") {
    return (
      <SpiceScreen
        spiceLevel={spiceLevel}
        onSelect={setSpiceLevel}
        onBack={() => setScreen("ingredients")}
        onNext={() => setScreen("sauce")}
      />
    );
  }

  if (screen === "sauce") {
    return (
      <SauceScreen
        selectedSauces={selectedSauces}
        onToggle={toggleSauce}
        onBack={() => setScreen("spice")}
        onSubmit={submitResult}
      />
    );
  }

  if (screen === "result" && ending) {
    return (
      <ResultScreen
        ending={ending}
        selectedIngredients={selectedIngredients}
        spiceLevel={spiceLevel}
        selectedSauces={selectedSauces}
        onReset={restartGame}
      />
    );
  }

  return null;
}
