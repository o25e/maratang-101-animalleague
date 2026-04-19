import { useState, useEffect } from "react";
import { SPICE_LEVELS } from "../../constants/data";
import { Ingredient } from "../../types/game";
import WarningModal from "./WarningModal";

const OVERLAY_OPACITY: Record<number, number> = { 0: 0, 1: 0.25, 2: 0.40, 3: 0.65, 4: 0.80 };

// 오버레이 영역 미세조정 — top/left/right/bottom 으로 그릇 안쪽에 맞게 수정하세요
const OVERLAY_STYLE = {
  top:    "7%",   // 위에서 얼마나 내려올지 (그릇 림 아래부터 시작)
  left:   "16%",    // 왼쪽 여백
  right:  "16%",    // 오른쪽 여백
  bottom: "42%",    // 아래 여백
};

interface SpiceScreenProps {
  spiceLevel: number | null;
  selectedIngredients: Ingredient[];
  onSelect: (level: number) => void;
  onBack: () => void;
  onNext: () => void;
}

export default function SpiceScreen({ spiceLevel, selectedIngredients, onSelect, onBack, onNext }: SpiceScreenProps) {
  const selected   = spiceLevel !== null ? SPICE_LEVELS[spiceLevel] : null;
  const canProceed = spiceLevel !== null;
  const overlayOpacity = spiceLevel !== null ? OVERLAY_OPACITY[spiceLevel] : 0;
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    if (!showWarning) return;
    const t = setTimeout(() => setShowWarning(false), 2000);
    return () => clearTimeout(t);
  }, [showWarning]);

  function handleNext() {
    if (!canProceed) { setShowWarning(true); return; }
    onNext();
  }

  return (
    <div
      className="w-full h-full flex flex-col overflow-hidden select-none"
      style={{ background: "linear-gradient(160deg, #8B5CF6 0%, #7C3AED 40%, #6D28D9 100%)" }}
    >
      {/* 중앙 영역: 족자 + 그릇 + 버튼 */}
      <div className="flex-1 flex items-center justify-center relative px-2 pt-4 pb-2">

        {/* 왼쪽 스크롤 족자 */}
        <div className="absolute left-0 top-0 z-10 flex flex-col items-center" style={{ height: "40vh" }}>
          <div
            className="w-24 h-4 rounded-full shadow-md flex-shrink-0"
            style={{ background: "linear-gradient(90deg, #92400E, #D97706, #92400E)" }}
          />
          <div
            className="flex flex-col items-center justify-center flex-1 px-3 border-4 shadow-xl w-16"
            style={{
              background: "linear-gradient(180deg, #FEF3C7 0%, #FDE68A 50%, #FEF3C7 100%)",
              borderColor: "#92400E",
            }}
          >
            {"맵기선택".split("").map((ch, i) => (
              <span key={i} className="font-black text-amber-900 leading-tight" style={{ fontSize: "30px" }}>
                {ch}
              </span>
            ))}
          </div>
          <div
            className="w-24 h-4 rounded-full shadow-md flex-shrink-0"
            style={{ background: "linear-gradient(90deg, #92400E, #D97706, #92400E)" }}
          />
        </div>

        {/* 중앙 그릇 — bowl_big.png + 재료 + 빨간 오버레이 */}
        <div className="transition-transform duration-200 mt-20">
          <div className="relative" style={{ width: "min(460px, 75vw)", height: "min(420px, 37vh)" }}>
            <WarningModal message="맵기 단계를 선택해야 합니다!" visible={showWarning} />

            <img
              src="/img/bowl_big.png"
              alt="그릇"
              className="w-full h-full object-contain"
              draggable={false}
            />

            {/* 선택된 재료들 */}
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

            {/* 맵기 빨간 오버레이 */}
            <div
              className="absolute transition-opacity duration-300 pointer-events-none"
              style={{
                backgroundColor: "#dc2626",
                opacity: overlayOpacity,
                mixBlendMode: "multiply",
                borderRadius: "50%",
                zIndex: 50,
                ...OVERLAY_STYLE,
              }}
            />
          </div>
        </div>

        {/* 상태 배지 */}
        <div
          className={`absolute right-3 top-1/2 -translate-y-1/2 text-xs font-black px-2 py-1 rounded-full text-center leading-tight shadow ${
            canProceed ? "bg-green-500 text-white" : "bg-white/90 text-purple-900"
          }`}
          style={{ minWidth: "48px" }}
        >
          {selected ? `${selected.level}단계` : "미선택"}
        </div>
      </div>

{/* 이전/다음 버튼 — 선택 버튼 위, 왼쪽/오른쪽 */}
      <div className="flex justify-between px-2 pb-1 flex-shrink-0">
        <button
          onClick={onBack}
          className="group transition-all duration-75 active:scale-90"
        >
          <img
            src="/img/next_button-1.png"
            alt="이전"
            className="h-[73px] object-contain group-hover:hidden rotate-180"
            draggable={false}
          />
          <img
            src="/img/next_button.png"
            alt="이전"
            className="h-[73px] object-contain hidden group-hover:block rotate-180"
            draggable={false}
          />
        </button>
        <button
          onClick={handleNext}
          className="group transition-all duration-75 active:scale-90"
        >
          <img
            src="/img/next_button-1.png"
            alt="다음"
            className="h-[73px] object-contain group-hover:hidden"
            draggable={false}
          />
          <img
            src="/img/next_button.png"
            alt="다음"
            className="h-[73px] object-contain hidden group-hover:block"
            draggable={false}
          />
        </button>
      </div>

      {/* 하단 맵기 단계 버튼 1행 */}
      <div
        className="px-2 py-3 border-t-4 flex-shrink-0"
        style={{
          background: "linear-gradient(180deg, rgba(109,40,217,0.6) 0%, rgba(76,29,149,0.8) 100%)",
          borderColor: "#4C1D95",
        }}
      >
        <div className="flex gap-1.5 justify-center">
          {SPICE_LEVELS.map((sp) => {
            const isSelected = spiceLevel === sp.level;
            return (
              <button
                key={sp.level}
                onClick={() => onSelect(sp.level)}
                className={`flex flex-col items-center justify-center gap-1 rounded-lg font-bold
                           transition-all duration-150 flex-1 border-2 border-b-4
                           hover:translate-y-0.5 hover:border-b-2
                           active:translate-y-1 active:border-b-0
                           ${isSelected
                             ? "bg-orange-400 text-white border-orange-600"
                             : "bg-yellow-200 text-amber-900 border-yellow-600 hover:bg-yellow-100 active:bg-orange-200"
                           }`}
                style={{
                  minWidth: 0,
                  paddingTop: "10px",
                  paddingBottom: "10px",
                  boxShadow: isSelected
                    ? "inset 0 1px 2px rgba(255,255,255,0.6)"
                    : "0 2px 4px rgba(0,0,0,0.3)",
                }}
              >
                <span style={{ fontSize: "22px", lineHeight: 1 }}>
                  {sp.peppers === 0 ? "✨" : "🌶️".repeat(Math.min(sp.peppers, 3))}
                </span>
                <span style={{ fontSize: "28px", lineHeight: 1.2, textAlign: "center", fontWeight: 700 }}>
                  {sp.level}단계
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
