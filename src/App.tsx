import { useState, useEffect } from "react";
import { useGameState } from "./hooks/useGameState";
import { useBGM } from "./hooks/useBGM";
import { UserInfo } from "./types/game";
import MobileBanner from "./components/MobileBanner";
import RankingModal from "./components/RankingModal";

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
  const [userInfo, setUserInfo]       = useState<UserInfo | null>(null);
  const [showRanking, setShowRanking] = useState(false);

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
  } = useGameState(userInfo);

  const isGameScreen  = ["ingredients", "spice", "sauce"].includes(screen);
  const isTitleScreen = ["title", "manual", "instructions"].includes(screen);
  useBGM(isGameScreen,  "/sounds/gamebgm.mp3",  0.3);
  useBGM(isTitleScreen, "/sounds/titlebgm.mp3", 0.3);

  const handleStart = (info: UserInfo) => {
    setUserInfo(info);
    setScreen("ingredients");
  };

  const handleHome = () => {
    setShowRanking(false);
    setScreen("title");
  };

  const openRanking  = () => setShowRanking(true);
  const closeRanking = () => setShowRanking(false);

  const renderScreen = () => {
    if (screen === "title") {
      return (
        <TitleScreen
          onStart={handleStart}
          onInstructions={() => setScreen("manual")}
          onShowRanking={openRanking}
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
          onShowRanking={openRanking}
        />
      );
    }

    return <div className="w-full h-full" />;
  };

  return (
    <>
      <MobileBanner />
      <div className="relative w-full h-full">
        {renderScreen()}
        {showRanking && (
          <RankingModal
            currentUser={userInfo}
            onClose={closeRanking}
            onHome={handleHome}
          />
        )}
      </div>
    </>
  );
}
