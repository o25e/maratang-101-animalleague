import { useState, useEffect } from "react";
import { SAUCES } from "../../constants/data";
import WarningModal from "./WarningModal";
import { useSound } from "../../hooks/useSound";

interface SauceScreenProps {
  selectedSauces: string[];
  onToggle: (id: string) => void;
  onBack: () => void;
  onSubmit: () => void;
}

const row1 = SAUCES.slice(0, 3);
const row2 = SAUCES.slice(3, 6);


export default function SauceScreen({ selectedSauces, onToggle, onBack, onSubmit }: SauceScreenProps) {
  const { playHover, playClick, playTransition } = useSound();
  const canSubmit = selectedSauces.length >= 2;
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    if (!showWarning) return;
    const t = setTimeout(() => setShowWarning(false), 2000);
    return () => clearTimeout(t);
  }, [showWarning]);

  function handleSubmit() {
    if (!canSubmit) { setShowWarning(true); return; }
    playTransition();
    onSubmit();
  }

  return (
    <div
      className="w-full h-full flex flex-col overflow-hidden select-none"
      style={{ backgroundImage: "url('/img/screen/game_bg1.webp')", backgroundSize: "cover", backgroundPosition: "center" }}
    >
      {/* 중앙 영역: 족자 + 그릇 + 버튼 */}
      <div className="flex-1 min-h-0 flex items-center justify-center relative px-2 pt-2 pb-1 overflow-hidden">

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
            {"소스선택".split("").map((ch, i) => (
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

        {/* 중앙 그릇 (PNG) + 선택된 소스 오버레이 */}
        <div className="transition-transform duration-200">
          <div className="relative" style={{ width: "400px", height: "360px" }}>
            <WarningModal message={"소스를 적어도\n두 가지는 넣어야 합니다!"} visible={showWarning} />
            <img
              src="/img/bowl_sauce.webp"
              alt="소스 그릇"
              className="w-full h-full object-contain"
              draggable={false}
            />
            {selectedSauces.length === 0 ? (
              <span
                className="absolute text-3xl"
                style={{ left: "50%", top: "58%", transform: "translate(-50%, -50%)", opacity: 0.4 }}
              >
                
              </span>
            ) : (
              selectedSauces.map((id, i) => {
                const sauce = SAUCES.find((s) => s.id === id);
                if (!sauce) return null;
                return (
                  <img
                    key={id}
                    src={sauce.image}
                    alt={sauce.name}
                    draggable={false}
                    className="absolute object-contain drop-shadow-md"
                    style={{
                      top: sauce.position.top,
                      left: sauce.position.left,
                      width: sauce.position.width,
                      zIndex: 10 + i,
                    }}
                  />
                );
              })
            )}
          </div>
        </div>

        {/* 상태 배지 */}
        <div
          className={`absolute right-3 top-1/2 -translate-y-1/2 text-xs font-black px-2 py-1 rounded-full text-center leading-tight shadow ${
            canSubmit ? "bg-green-500 text-white" : "bg-white/90 text-purple-900"
          }`}
          style={{ minWidth: "48px" }}
        >
          {selectedSauces.length} / 6
        </div>
      </div>

{/* 이전/제출 버튼 — 선택 버튼 위, 왼쪽/오른쪽 */}
      <div className="flex justify-between px-2 pb-1 flex-shrink-0">
        <button
          onClick={() => { playTransition(); onBack(); }}
          className="group transition-all duration-75 active:scale-90"
        >
          <img
            src="/img/next_button-1.webp"
            alt="이전"
            className="h-[73px] object-contain group-hover:hidden rotate-180"
            draggable={false}
          />
          <img
            src="/img/next_button.webp"
            alt="이전"
            className="h-[73px] object-contain hidden group-hover:block rotate-180"
            draggable={false}
          />
        </button>
        <button
          onClick={handleSubmit}
          className="group transition-all duration-75 active:scale-90"
        >
          <img
            src="/img/next_button-1.webp"
            alt="평가받기"
            className="h-[73px] object-contain group-hover:hidden"
            draggable={false}
          />
          <img
            src="/img/next_button.webp"
            alt="평가받기"
            className="h-[73px] object-contain hidden group-hover:block"
            draggable={false}
          />
        </button>
      </div>

      {/* 하단 소스 버튼 2행 */}
      <div
        className="px-2 py-3 border-t-4 flex-shrink-0"
        style={{
          background: "rgba(253,186,116,0.85)",
          borderColor: "#FB923C",
        }}
      >
        {[row1, row2].map((row, ri) => (
          <div key={ri} className={`flex gap-1.5 justify-center ${ri === 0 ? "mb-2" : ""}`}>
            {row.map((sauce) => {
              const isSelected = selectedSauces.includes(sauce.id);
              return (
                <button
                  key={sauce.id}
                  onMouseEnter={playHover}
                  onClick={() => { playClick(); onToggle(sauce.id); }}
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
                    paddingTop: "14px",
                    paddingBottom: "14px",
                    paddingLeft: "4px",
                    paddingRight: "4px",
                    boxShadow: isSelected
                      ? "inset 0 1px 2px rgba(255,255,255,0.6)"
                      : "0 2px 4px rgba(0,0,0,0.3)",
                  }}
                >
                  <span style={{ fontSize: "28px", lineHeight: 1.3, textAlign: "center", fontWeight: 700 }}>{sauce.name}</span>
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
