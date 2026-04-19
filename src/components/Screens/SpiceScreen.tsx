import { SPICE_LEVELS } from "../../constants/data";

interface SpiceScreenProps {
  spiceLevel: number | null;
  onSelect: (level: number) => void;
  onBack: () => void;
  onNext: () => void;
}

export default function SpiceScreen({ spiceLevel, onSelect, onBack, onNext }: SpiceScreenProps) {
  const selected   = spiceLevel !== null ? SPICE_LEVELS[spiceLevel] : null;
  const canProceed = spiceLevel !== null;

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
              <span key={i} className="font-black text-amber-900 leading-tight" style={{ fontSize: "22px" }}>
                {ch}
              </span>
            ))}
          </div>
          <div
            className="w-24 h-4 rounded-full shadow-md flex-shrink-0"
            style={{ background: "linear-gradient(90deg, #92400E, #D97706, #92400E)" }}
          />
        </div>

        {/* 중앙 그릇 — 맵기 시각화 */}
        <div className="transition-transform duration-200">
          <div className="relative" style={{ width: "260px", height: "220px" }}>

            {/* 상단 림 */}
            <div
              className="absolute left-0 right-0 rounded-full shadow-lg z-10"
              style={{
                top: "12px",
                height: "44px",
                background: "linear-gradient(180deg, #C2410C 0%, #B45309 40%, #92400E 100%)",
                border: "3px solid #7C2D12",
                boxShadow: "0 4px 12px rgba(0,0,0,0.4), inset 0 2px 4px rgba(255,255,255,0.15)",
              }}
            />
            {/* 림 하이라이트 */}
            <div
              className="absolute left-4 right-4 rounded-full z-20"
              style={{
                top: "16px",
                height: "14px",
                background: "linear-gradient(180deg, rgba(255,200,150,0.4) 0%, transparent 100%)",
              }}
            />

            {/* 그릇 몸통 */}
            <div
              className="absolute left-0 right-0 overflow-hidden z-0"
              style={{
                top: "32px",
                bottom: "0",
                borderRadius: "0 0 50% 50%",
                background: "linear-gradient(180deg, #C2410C 0%, #9A3412 40%, #7C2D12 100%)",
                border: "3px solid #7C2D12",
                borderTop: "none",
                boxShadow: "0 8px 24px rgba(0,0,0,0.5), inset -8px 0 20px rgba(0,0,0,0.2)",
              }}
            >
              {/* 국물 — 맵기에 따라 색상 변화 */}
              <div
                className="absolute left-0 right-0 bottom-0 transition-all duration-300"
                style={{
                  height: "75%",
                  background: selected && selected.peppers >= 3
                    ? "linear-gradient(180deg, #DC2626 0%, #7F1D1D 100%)"
                    : "linear-gradient(180deg, #B91C1C 0%, #7F1D1D 100%)",
                  borderRadius: "0 0 50% 50%",
                  opacity: 0.95,
                }}
              />

              {/* 맵기 시각화: 얼굴 + 고추 */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-center gap-1"
                style={{ paddingTop: "38%" }}
              >
                {/* 표정 이모지 */}
                <span
                  className="leading-none drop-shadow transition-all duration-300"
                  style={{ fontSize: "46px" }}
                >
                  {selected ? selected.face : "🤔"}
                </span>

                {/* 고추 이모지 (단계만큼 표시) */}
                {selected && selected.peppers > 0 && (
                  <div className="flex gap-0.5">
                    {Array.from({ length: selected.peppers }).map((_, i) => (
                      <span
                        key={i}
                        className="leading-none drop-shadow"
                        style={{
                          fontSize: "18px",
                          transform: `rotate(${(i - Math.floor(selected.peppers / 2)) * 20}deg)`,
                        }}
                      >
                        🌶️
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 오른쪽: ← 뒤로 + 상태 배지 + ▶ 다음 */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3">

          {/* 뒤로 버튼 */}
          <button
            onClick={onBack}
            className="w-14 h-14 rounded-full flex items-center justify-center text-white text-xl font-black
                       shadow-lg active:scale-90 transition-all duration-75 border-4"
            style={{
              background: "linear-gradient(135deg, #9CA3AF, #6B7280)",
              borderColor: "#4B5563",
              boxShadow: "0 4px 0 #374151",
            }}
          >
            ←
          </button>

          {/* 상태 배지 */}
          <div
            className={`text-xs font-black px-2 py-1 rounded-full text-center leading-tight shadow ${
              canProceed ? "bg-green-400 text-white" : "bg-white/90 text-purple-900"
            }`}
            style={{ minWidth: "48px" }}
          >
            {selected ? selected.label : "미선택"}
          </div>

          {/* 다음 버튼 */}
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
            ? `✅ ${selected!.label} (${selected!.desc}) 선택됨 — ▶ 버튼으로 다음 단계`
            : "맵기 단계를 선택하세요"}
        </span>
      </div>

      {/* 하단 맵기 단계 버튼 1행 */}
      <div
        className="px-2 py-3 border-t-4"
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
                className="flex flex-col items-center justify-center gap-0.5 rounded-lg font-bold
                           transition-all duration-75 active:scale-90 flex-1"
                style={{
                  minWidth: 0,
                  paddingTop: "6px",
                  paddingBottom: "6px",
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
                <span style={{ fontSize: "18px", lineHeight: 1 }}>
                  {sp.peppers === 0 ? "✨" : "🌶️".repeat(Math.min(sp.peppers, 3))}
                </span>
                <span style={{ fontSize: "9px", lineHeight: 1.2, textAlign: "center" }}>
                  {sp.label}
                </span>
                <span style={{ fontSize: "8px", lineHeight: 1.2, textAlign: "center", opacity: 0.75 }}>
                  {sp.desc}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
