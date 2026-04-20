import { useState, useEffect, useCallback } from "react";
import { useGameState } from "./hooks/useGameState";
import { useBGM } from "./hooks/useBGM";
import { UserInfo } from "./types/game";
import MobileBanner     from "./components/MobileBanner";
import RankingModal     from "./components/RankingModal";
import RegistrationForm from "./components/RegistrationForm";

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
  // ── 유저 / 폼 상태 ──────────────────────────────────────────────────────────
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  // 시작하기 버튼을 눌러야 수강신청 폼 표시
  const [showForm, setShowForm]       = useState(false);
  // 폼 완료 후 게임을 바로 시작해야 하는지 여부 (시작하기/게임방법→게임시작 경로)
  const [pendingGame, setPendingGame] = useState(false);
  const [showRanking, setShowRanking] = useState(false);

  // 하이드레이션 오류 방지: useEffect 내에서만 localStorage 접근
  useEffect(() => {
    try {
      const saved = localStorage.getItem("maratang_user_fixed");
      if (saved) {
        setUserInfo(JSON.parse(saved) as UserInfo);
      }
    } catch {
      // ignore
    }
  }, []);

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
  useBGM(isTitleScreen, "/sounds/titlebgm.mp3", 0.5);

  // ── 수강신청 폼 핸들러 ───────────────────────────────────────────────────────
  const handleRegister = (info: UserInfo) => {
    localStorage.setItem("maratang_user_fixed", JSON.stringify(info));
    setUserInfo(info);
    setShowForm(false);
    if (pendingGame) {
      setPendingGame(false);
      reset();
    }
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setPendingGame(false);
  };

  // ── 게임 시작 (수강신청 여부 확인) ────────────────────────────────────────────
  const handleStartGame = useCallback(() => {
    if (userInfo) {
      reset();
    } else {
      setPendingGame(true);
      setShowForm(true);
    }
  }, [userInfo, reset]);

  // ── 랭킹 핸들러 ─────────────────────────────────────────────────────────────
  const openRanking  = useCallback(() => setShowRanking(true),  []);
  const closeRanking = useCallback(() => setShowRanking(false), []);
  const handleHome   = useCallback(() => {
    setShowRanking(false);
    setScreen("title");
  }, [setScreen]);

  // ── 화면 렌더링 ──────────────────────────────────────────────────────────────
  const renderScreen = () => {
    if (screen === "title") {
      return (
        <TitleScreen
          onStart={handleStartGame}
          onInstructions={() => setScreen("manual")}
          onShowRanking={openRanking}
          userInfo={userInfo}
        />
      );
    }

    if (screen === "manual") {
      return <ManualScreen onStart={handleStartGame} />;
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

        {/* 수강신청 폼 — 타이틀 화면 위에 오버레이 (zIndex 200) */}
        {showForm && (
          <RegistrationForm onSubmit={handleRegister} onCancel={handleFormCancel} />
        )}

        {/* 랭킹 모달 — 최상단 (zIndex 100, 폼이 없을 때만 표시) */}
        {showRanking && !showForm && (
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
