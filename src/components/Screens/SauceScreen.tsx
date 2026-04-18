import { SAUCES } from "../../constants/data";

interface SauceScreenProps {
  selectedSauces: string[];
  onToggle: (id: string) => void;
  onBack: () => void;
  onSubmit: () => void;
}

const row1 = SAUCES.slice(0, 3);
const row2 = SAUCES.slice(3, 6);

export default function SauceScreen({ selectedSauces, onToggle, onBack, onSubmit }: SauceScreenProps) {
  const canSubmit = selectedSauces.length >= 2;

  return (
    <div
      className="w-full h-full flex flex-col overflow-hidden select-none"
      style={{ background: "linear-gradient(160deg, #8B5CF6 0%, #7C3AED 40%, #6D28D9 100%)" }}
    >
      {/* 중앙 영역: 족자 + 그릇 + 버튼 */}
      <div className="flex-1 flex items-center justify-center relative px-2 pt-4 pb-2">

        {/* 왼쪽 스크롤 족자 */}
        <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
          <div
            className="w-12 h-3 rounded-full mx-auto shadow-md"
            style={{ background: "linear-gradient(90deg, #92400E, #D97706, #92400E)" }}
          />
          <div
            className="flex flex-col items-center py-3 px-2 border-4 shadow-xl"
            style={{
              background: "linear-gradient(180deg, #FEF3C7 0%, #FDE68A 50%, #FEF3C7 100%)",
              borderColor: "#92400E",
              minHeight: "120px",
            }}
          >
            {"소스선택".split("").map((ch, i) => (
              <span key={i} className="font-black text-amber-900 leading-tight" style={{ fontSize: "13px" }}>
                {ch}
              </span>
            ))}
          </div>
          <div
            className="w-12 h-3 rounded-full mx-auto shadow-md"
            style={{ background: "linear-gradient(90deg, #92400E, #D97706, #92400E)" }}
          />
        </div>

        {/* 중앙 그릇 — 선택된 소스 시각화 */}
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
              {/* 국물 */}
              <div
                className="absolute left-0 right-0 bottom-0"
                style={{
                  height: "75%",
                  background: "linear-gradient(180deg, #B91C1C 0%, #7F1D1D 100%)",
                  borderRadius: "0 0 50% 50%",
                  opacity: 0.95,
                }}
              />

              {/* 선택된 소스 이모지 */}
              <div
                className="absolute inset-0 flex flex-wrap items-center justify-center gap-1 px-8"
                style={{ paddingTop: "45%" }}
              >
                {selectedSauces.length === 0 ? (
                  <span className="text-white/40 text-3xl">🥢</span>
                ) : (
                  selectedSauces.map((id, i) => {
                    const sauce = SAUCES.find((s) => s.id === id);
                    return sauce ? (
                      <span
                        key={id}
                        className="leading-none drop-shadow"
                        style={{ fontSize: "22px", transform: `rotate(${(i * 43) % 360}deg)` }}
                      >
                        {sauce.emoji}
                      </span>
                    ) : null;
                  })
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 오른쪽: ← 뒤로 + 상태 배지 + 🎓 평가 */}
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
              canSubmit ? "bg-green-400 text-white" : "bg-white/90 text-purple-900"
            }`}
            style={{ minWidth: "48px" }}
          >
            {selectedSauces.length}<br/>/6
          </div>

          {/* 평가 버튼 */}
          <button
            onClick={onSubmit}
            disabled={!canSubmit}
            className="w-14 h-14 rounded-full flex items-center justify-center text-white text-2xl font-black
                       shadow-lg active:scale-90 transition-all duration-75 border-4"
            style={{
              background: canSubmit
                ? "linear-gradient(135deg, #F97316, #EA580C)"
                : "linear-gradient(135deg, #9CA3AF, #6B7280)",
              borderColor: canSubmit ? "#C2410C" : "#4B5563",
              boxShadow: canSubmit ? "0 4px 0 #9A3412" : "0 4px 0 #374151",
            }}
          >
            🎓
          </button>
        </div>
      </div>

      {/* 하단 상태 텍스트 */}
      <div className="text-center pb-1">
        <span className="text-white/80 text-xs font-bold">
          {canSubmit
            ? `✅ ${selectedSauces.length}개 선택됨 — 🎓 버튼으로 평가받기`
            : `소스를 ${2 - selectedSauces.length}개 더 선택하세요 (최소 2개)`}
        </span>
      </div>

      {/* 하단 소스 버튼 2행 */}
      <div
        className="px-2 py-3 border-t-4"
        style={{
          background: "linear-gradient(180deg, rgba(109,40,217,0.6) 0%, rgba(76,29,149,0.8) 100%)",
          borderColor: "#4C1D95",
        }}
      >
        {[row1, row2].map((row, ri) => (
          <div key={ri} className={`flex gap-1.5 justify-center ${ri === 0 ? "mb-1.5" : ""}`}>
            {row.map((sauce) => {
              const isSelected = selectedSauces.includes(sauce.id);
              return (
                <button
                  key={sauce.id}
                  onClick={() => onToggle(sauce.id)}
                  className="flex flex-col items-center justify-center gap-0.5 rounded-lg font-bold
                             transition-all duration-75 active:scale-90 flex-1"
                  style={{
                    minWidth: 0,
                    paddingTop: "8px",
                    paddingBottom: "8px",
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
                  <span style={{ fontSize: "24px", lineHeight: 1 }}>{sauce.emoji}</span>
                  <span style={{ fontSize: "10px", lineHeight: 1.3, textAlign: "center" }}>{sauce.name}</span>
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
