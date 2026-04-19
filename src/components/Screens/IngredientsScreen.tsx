import { useState, useEffect } from "react";
import { Ingredient } from "../../types/game";
import { ALL_ITEMS } from "../../constants/data";
import WarningModal from "./WarningModal";
import { useSound } from "../../hooks/useSound";

const row1 = ALL_ITEMS.slice(0, 7);
const row2 = ALL_ITEMS.slice(7, 14);

interface IngredientsScreenProps {
  selectedIngredients: Ingredient[];
  bowlPop: boolean;
  onToggle: (item: Ingredient) => void;
  onNext: () => void;
}


export default function IngredientsScreen({
  selectedIngredients,
  bowlPop,
  onToggle,
  onNext,
}: IngredientsScreenProps) {
  const { playHover, playClick, playTransition } = useSound();
  const canProceed = selectedIngredients.length >= 5;
  const [showWarning, setShowWarning] = useState(false);
  const [warningMsg, setWarningMsg] = useState("");

  useEffect(() => {
    if (!showWarning) return;
    const t = setTimeout(() => setShowWarning(false), 2000);
    return () => clearTimeout(t);
  }, [showWarning]);

  function handleNext() {
    if (!canProceed) {
      setWarningMsg("재료를 적어도\n다섯 가지는 넣어야 합니다!");
      setShowWarning(true);
      return;
    }
    playTransition();
    onNext();
  }

  return (
    <div
      className="w-full h-full flex flex-col overflow-hidden select-none"
      style={{ backgroundImage: "url('/img/screen/game_bg1.webp')", backgroundSize: "cover", backgroundPosition: "center" }}
    >
      {/* 중앙: 족자 + 그릇 + 다음 버튼 */}
      <div className="flex-1 min-h-0 flex items-center justify-center relative px-2 pt-2 pb-1 overflow-hidden">

        {/* 왼쪽 스크롤 족자 */}
        <div className="absolute left-0 top-0 z-10 flex flex-col items-center" style={{ height: "min(40vh, 100%)" }}>
          <div className="w-24 h-4 rounded-full shadow-md flex-shrink-0"
            style={{ background: "linear-gradient(90deg, #92400E, #D97706, #92400E)" }} />
          <div className="flex flex-col items-center justify-center flex-1 px-3 border-4 shadow-xl w-16"
            style={{
              background: "linear-gradient(180deg, #FEF3C7 0%, #FDE68A 50%, #FEF3C7 100%)",
              borderColor: "#92400E",
            }}>
            {"재료선택".split("").map((ch, i) => (
              <span key={i} className="font-black text-amber-900 leading-tight" style={{ fontSize: "30px" }}>
                {ch}
              </span>
            ))}
          </div>
          <div className="w-24 h-4 rounded-full shadow-md flex-shrink-0"
            style={{ background: "linear-gradient(90deg, #92400E, #D97706, #92400E)" }} />
        </div>

        {/* 중앙 마라탕 그릇 (PNG 이미지 + 재료 오버레이) */}
        <div className={`transition-transform duration-200 ${bowlPop ? "scale-105" : "scale-100"} mt-20`}>
          <div className="relative" style={{ width: "min(460px, 75vw)", height: "min(420px, 37vh)" }}>
            <img
              src="/img/bowl_big.webp"
              alt="그릇"
              className="w-full h-full object-contain"
              draggable={false}
            />
            {/* 선택된 재료 이미지 — 각 재료의 고정 position 데이터로 렌더링 */}
            {selectedIngredients.map((ing, i) => (
              <img
                key={ing.id}
                src={ing.image}
                alt={ing.name}
                draggable={false}
                className="absolute object-contain drop-shadow-md"
                style={{
                  top: ing.position.top,
                  left: ing.position.left,
                  width: ing.position.width,
                  zIndex: 10 + i,
                }}
              />
            ))}
            <WarningModal message={warningMsg} visible={showWarning} />
          </div>
        </div>

        {/* 개수 상태 배지 */}
        <div
          className={`absolute right-3 top-1/2 -translate-y-1/2 text-xs font-black px-2 py-1 rounded-full text-center leading-tight shadow ${
            canProceed ? "bg-green-500 text-white" : "bg-white/90 text-purple-900"
          }`}
          style={{ minWidth: "48px" }}
        >
          {selectedIngredients.length} / 14
        </div>
      </div>

{/* 다음 버튼 — 선택 버튼 위, 오른쪽 하단 */}
      <div className="flex justify-end px-2 pb-1 flex-shrink-0">
        <button
          onClick={handleNext}
          className="group transition-all duration-75 active:scale-90"
        >
          <img
            src="/img/next_button-1.webp"
            alt="다음"
            className="h-[73px] object-contain group-hover:hidden"
            draggable={false}
          />
          <img
            src="/img/next_button.webp"
            alt="다음"
            className="h-[73px] object-contain hidden group-hover:block"
            draggable={false}
          />
        </button>
      </div>

      {/* 하단 재료 버튼 2행 */}
      <div
        className="px-2 py-3 border-t-4 flex-shrink-0"
        style={{
          background: "rgba(253,186,116,0.85)",
          borderColor: "#FB923C",
        }}
      >
        {[row1, row2].map((row, ri) => (
          <div key={ri} className={`flex gap-1.5 justify-center ${ri === 0 ? "mb-2" : ""}`}>
            {row.map((item) => {
              const isSelected = !!selectedIngredients.find((i) => i.id === item.id);
              return (
                <button
                  key={item.id}
                  onMouseEnter={playHover}
                  onClick={() => { playClick(); onToggle(item); }}
                  className={`flex items-center justify-center rounded-lg font-bold
                             transition-all duration-150 flex-1 border-2 border-b-4
                             hover:translate-y-0.5 hover:border-b-2
                             active:translate-y-1 active:border-b-0
                             ${isSelected
                               ? "bg-orange-400 text-white border-orange-600"
                               : "bg-yellow-200 text-amber-900 border-yellow-600 hover:bg-yellow-100 active:bg-orange-200"
                             }`}
                  style={{
                    minWidth: 0,
                    paddingTop: "12px",
                    paddingBottom: "12px",
                    paddingLeft: "4px",
                    paddingRight: "4px",
                    boxShadow: isSelected
                      ? "inset 0 1px 2px rgba(255,255,255,0.6)"
                      : "0 2px 4px rgba(0,0,0,0.3)",
                  }}
                >
                  <span style={{ fontSize: "28px", lineHeight: 1.2, textAlign: "center", fontWeight: 700 }}>{item.name}</span>
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
