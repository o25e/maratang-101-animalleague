import { useState } from "react";
import { SPICE_LEVELS, SAUCES } from "../constants/gameData";
import btnRestart from "../img/button_restart.png";
import btnRestartHover from "../img/button_restart_hover.png";

export default function ResultScreen({ ending, selectedIngredients, spiceLevel, selectedSauces, onReset }) {
  const [restartHovered, setRestartHovered] = useState(false);

  return (
    <div className={`min-h-screen bg-gradient-to-b ${ending.bg} flex flex-col items-center justify-center p-4`}>
      <div className="w-full max-w-sm">

        {/* exam paper card */}
        <div className="bg-white border-4 border-gray-400 rounded-2xl shadow-2xl overflow-hidden">

          {/* header */}
          <div className="bg-gray-800 text-white text-center py-2 px-4 font-black text-sm tracking-widest">
            ◆ 마라탕 최종 평가서 ◆
          </div>

          {/* stamp line */}
          <div className="bg-gray-100 border-b-2 border-gray-300 text-center text-xs text-gray-500 py-1 font-mono">
            마라탕학과 &nbsp;|&nbsp; 담당교수: 박마라 교수
          </div>

          <div className="p-5">

            {/* professor + speech */}
            <div className="flex items-start gap-3 mb-5">
              <div className="w-16 h-16 rounded-full bg-gray-200 border-4 border-gray-300 flex items-center justify-center text-4xl flex-shrink-0 shadow">
                {ending.emotion}
              </div>
              <div className="flex-1 relative">
                <div className="absolute -left-3 top-4 w-0 h-0
                  border-t-6 border-t-transparent border-b-6 border-b-transparent border-r-6 border-r-gray-200"/>
                <div className="bg-gray-100 border border-gray-200 rounded-2xl rounded-tl-none p-3 text-xs text-gray-800 leading-relaxed shadow-inner">
                  {ending.comment}
                </div>
              </div>
            </div>

            {/* grade box */}
            <div className="border-2 border-gray-300 rounded-xl p-4 mb-5 bg-gray-50">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">엔딩</p>
                  <p className="font-black text-base text-gray-800">{ending.title}</p>
                </div>
                <div className={`w-20 h-20 rounded-xl border-4 ${ending.gradeBorder} flex items-center justify-center`}>
                  <span className={`text-4xl font-black ${ending.gradeColor}`}>{ending.grade}</span>
                </div>
              </div>

              {/* summary */}
              <div className="border-t border-gray-200 pt-3 space-y-1.5 text-xs text-gray-600">
                <p>
                  <span className="font-bold text-gray-700">선택 재료:</span>{" "}
                  {selectedIngredients.map(i => i.name).join(", ")}
                </p>
                <p>
                  <span className="font-bold text-gray-700">맵기:</span>&nbsp;
                  {SPICE_LEVELS[spiceLevel]?.label} — {SPICE_LEVELS[spiceLevel]?.desc}
                  &nbsp;{SPICE_LEVELS[spiceLevel]?.face}
                </p>
                <p>
                  <span className="font-bold text-gray-700">소스:</span>{" "}
                  {SAUCES.filter(s => selectedSauces.includes(s.id)).map(s => s.name).join(", ")}
                </p>
              </div>
            </div>

            {/* maratang image placeholder */}
            <div className="w-full h-24 rounded-xl mb-4 border-2 border-gray-200 bg-gradient-to-r from-red-100 to-orange-100 flex items-center justify-center gap-2 text-3xl">
              🫕🌶️🥢
            </div>

            {/* retry button */}
            <button
              onClick={onReset}
              onMouseEnter={() => setRestartHovered(true)}
              onMouseLeave={() => setRestartHovered(false)}
              className="w-full active:scale-95 active:translate-y-1 transition-all duration-75 bg-transparent border-none p-0 cursor-pointer">
              <img
                src={restartHovered ? btnRestartHover : btnRestart}
                alt="다시 도전"
                className="w-full"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
