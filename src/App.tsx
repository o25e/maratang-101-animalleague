import { useEffect } from "react";
import { useGameState } from "./hooks/useGameState";
import { useBGM } from "./hooks/useBGM";
import MobileBanner from "./components/MobileBanner";

const PRELOAD_IMAGES = [
  "/img/screen/game_result.webp",
  "/img/game_resultb1.webp",
  "/img/game_resultb2.webp",
  "/img/game_resultb3.webp",
  "/img/game_resultb4.webp",
];
import TitleScreen        from "./components/Screens/TitleScreen";
import InstructionsScreen from "./components/Screens/InstructionsScreen";
import ManualScreen       from "./components/Screens/ManualScreen";
import IngredientsScreen  from "./components/Screens/IngredientsScreen";
import SpiceScreen        from "./components/Screens/SpiceScreen";
import SauceScreen        from "./components/Screens/SauceScreen";
import TastingScreen      from "./components/Screens/TastingScreen";
import ResultScreen       from "./components/Result/ResultScreen";

export default function App() {
  useEffect(() => {
    PRELOAD_IMAGES.forEach(src => {
      const img = new Image();
      img.src = src;
      img.decode().catch(() => {});
    });
  }, []);

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

  // 게임 화면(재료선택/맵기선택/소스선택) 중일 때 게임 배경음 재생
  const isGameScreen = ["ingredients", "spice", "sauce"].includes(screen);
  useBGM(isGameScreen, "/sounds/gamebgm.mp3", 0.3);

  // 타이틀 관련 화면(타이틀, 게임방법 설명) 중일 때 타이틀 배경음 재생
  const isTitleScreen = ["title", "manual", "instructions"].includes(screen);
  useBGM(isTitleScreen, "/sounds/titlebgm.mp3", 0.3);

  if (screen === "title") {
    return (
      <>
        <MobileBanner />
        <TitleScreen
          onStart={() => setScreen("ingredients")}
          onInstructions={() => setScreen("manual")}
        />
      </>
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

  if (screen === "tasting" && ending) {
    return (
      <TastingScreen
        ending={ending}
        selectedSauces={selectedSauces}
        onDone={() => setScreen("result")}
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
