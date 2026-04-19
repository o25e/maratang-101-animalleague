import { Ingredient } from "../../types/game";
import { ALL_ITEMS } from "../../constants/data";

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
  const canProceed = selectedIngredients.length >= 5;

  return (
    <div
      className="w-full h-full flex flex-col overflow-hidden select-none"
      style={{ background: "linear-gradient(160deg, #8B5CF6 0%, #7C3AED 40%, #6D28D9 100%)" }}
    >
      {/* 중앙: 족자 + 그릇 + 다음 버튼 */}
      <div className="flex-1 flex items-center justify-center relative px-2 pt-4 pb-2">

        {/* 왼쪽 스크롤 족자 */}
        <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
          <div className="w-12 h-3 rounded-full mx-auto shadow-md"
            style={{ background: "linear-gradient(90deg, #92400E, #D97706, #92400E)" }} />
          <div className="flex flex-col items-center py-3 px-2 border-4 shadow-xl"
            style={{
              background: "linear-gradient(180deg, #FEF3C7 0%, #FDE68A 50%, #FEF3C7 100%)",
              borderColor: "#92400E",
              minHeight: "120px",
            }}>
            {"재료선택".split("").map((ch, i) => (
              <span key={i} className="font-black text-amber-900 leading-tight" style={{ fontSize: "13px" }}>
                {ch}
              </span>
            ))}
          </div>
          <div className="w-12 h-3 rounded-full mx-auto shadow-md"
            style={{ background: "linear-gradient(90deg, #92400E, #D97706, #92400E)" }} />
        </div>

        {/* 중앙 마라탕 그릇 (PNG 이미지 + 재료 오버레이) */}
        <div className={`transition-transform duration-200 ${bowlPop ? "scale-105" : "scale-100"}`}>
          <div className="relative" style={{ width: "460px", height: "420px" }}>
            <img
              src="/img/bowl_big.png"
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
          </div>
        </div>

        {/* 오른쪽: 개수 상태 + ▶ 다음 버튼 */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3">
          <div
            className={`text-xs font-black px-2 py-1 rounded-full text-center leading-tight shadow ${
              canProceed ? "bg-green-400 text-white" : "bg-white/90 text-purple-900"
            }`}
            style={{ minWidth: "48px" }}
          >
            {selectedIngredients.length}<br/>/14
          </div>
          <button
            onClick={onNext}
            disabled={!canProceed}
            className="w-14 h-14 rounded-full flex items-center justify-center text-white text-2xl font-black
                       shadow-lg active:scale-90 transition-all duration-75 border-4"
            style={{
              background: canProceed
                ? "linear-gradient(135deg, #F97316, #EA580C)"
                : "linear-gradient(135deg, #9CA3AF, #6B7280)",
              borderColor: canProceed ? "#C2410C" : "#4B5563",
              boxShadow: canProceed ? "0 4px 0 #9A3412" : "0 4px 0 #374151",
            }}
          >
            ▶
          </button>
        </div>
      </div>

      {/* 하단 상태 텍스트 */}
      <div className="text-center pb-1">
        <span className="text-white/80 text-xs font-bold">
          {canProceed
            ? `✅ ${selectedIngredients.length}개 선택됨 — ▶ 버튼으로 다음 단계`
            : `재료를 ${5 - selectedIngredients.length}개 더 선택하세요 (최소 5개)`}
        </span>
      </div>

      {/* 하단 재료 버튼 2행 — 이모지 제거, 이름만 표시 */}
      <div
        className="px-2 py-3 border-t-4"
        style={{
          background: "linear-gradient(180deg, rgba(109,40,217,0.6) 0%, rgba(76,29,149,0.8) 100%)",
          borderColor: "#4C1D95",
        }}
      >
        {[row1, row2].map((row, ri) => (
          <div key={ri} className={`flex gap-1.5 justify-center ${ri === 0 ? "mb-1.5" : ""}`}>
            {row.map((item) => {
              const isSelected = !!selectedIngredients.find((i) => i.id === item.id);
              return (
                <button
                  key={item.id}
                  onClick={() => onToggle(item)}
                  className="flex items-center justify-center rounded-lg font-bold
                             transition-all duration-75 active:scale-90 flex-1"
                  style={{
                    minWidth: 0,
                    paddingTop: "8px",
                    paddingBottom: "8px",
                    paddingLeft: "4px",
                    paddingRight: "4px",
                    fontSize: "10px",
                    border: "2px solid #CA8A04",
                    borderBottom: "4px solid #A16207",
                    background: isSelected
                      ? "linear-gradient(180deg, #FDE047 0%, #EAB308 100%)"
                      : "linear-gradient(180deg, #FEF08A 0%, #FDE047 100%)",
                    color: "#713F12",
                    boxShadow: isSelected
                      ? "inset 0 1px 2px rgba(255,255,255,0.6)"
                      : "0 2px 4px rgba(0,0,0,0.3)",
                  }}
                >
                  <span style={{ fontSize: "10px", lineHeight: 1.2, textAlign: "center" }}>{item.name}</span>
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
