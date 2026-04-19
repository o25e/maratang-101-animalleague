import { useGameState } from "./hooks/useGameState";
import TitleScreen        from "./components/Screens/TitleScreen";
import InstructionsScreen from "./components/Screens/InstructionsScreen";
import ManualScreen       from "./components/Screens/ManualScreen";
import IngredientsScreen  from "./components/Screens/IngredientsScreen";
import SpiceScreen        from "./components/Screens/SpiceScreen";
import SauceScreen        from "./components/Screens/SauceScreen";
import ResultScreen       from "./components/Result/ResultScreen";

export default function App() {
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
  } = useGameState();

  if (screen === "title") {
    return (
      <TitleScreen
        onStart={() => setScreen("ingredients")}
        onInstructions={() => setScreen("manual")}
      />
    );
  }

  if (screen === "manual") {
    return <ManualScreen onStart={() => setScreen("ingredients")} />;
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
        selectedIngredients={selectedIngredients}
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
        onReset={reset}
      />
    );
  }

  return <div className="w-full h-full" />;
}
