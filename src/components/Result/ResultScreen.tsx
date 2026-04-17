import { Ending, Ingredient } from "../../types/game";
import { SPICE_LEVELS, SAUCES } from "../../constants/data";

interface ResultScreenProps {
  ending: Ending;
  selectedIngredients: Ingredient[];
  spiceLevel: number | null;
  selectedSauces: string[];
  onReset: () => void;
}

export default function ResultScreen({
  ending,
  selectedIngredients,
  spiceLevel,
  selectedSauces,
  onReset,
}: ResultScreenProps) {
  const spiceInfo    = spiceLevel !== null ? SPICE_LEVELS[spiceLevel] : null;
  const chosenSauces = SAUCES.filter((s) => selectedSauces.includes(s.id));

  return (
    <div
      className="min-h-screen flex flex-col select-none overflow-hidden"
      style={{ background: "linear-gradient(180deg, #EDE9FE 0%, #DDD6FE 25%, #C4B5FD 60%, #A78BFA 100%)" }}
    >
      {/* ── 헤더 ── */}
      <div
        className="text-center py-2.5 font-black text-sm tracking-widest border-b-2 flex-shrink-0"
        style={{
          color: "#4C1D95",
          borderColor: "rgba(109,40,217,0.3)",
          background: "rgba(255,255,255,0.5)",
        }}
      >
        ◆ 마라탕 최종 평가서 ◆
      </div>

      {/* ── 상단: 말풍선(좌) + 교수 이미지(우) ── */}
      <div className="flex items-end px-3 pt-3 gap-3 flex-shrink-0" style={{ minHeight: "200px" }}>

        {/* 말풍선 영역 */}
        <div className="flex-1 flex flex-col gap-2 pb-4">

          {/* 학점 + 엔딩 제목 */}
          <div className="flex items-center gap-2">
            <div
              className={`w-14 h-14 rounded-xl border-4 ${ending.gradeBorder} flex items-center justify-center shadow-lg flex-shrink-0`}
              style={{ background: "white" }}
            >
              <span className={`text-3xl font-black ${ending.gradeColor}`}>{ending.grade}</span>
            </div>
            <div>
              <p className="font-black text-sm leading-tight" style={{ color: "#3B0764" }}>{ending.title}</p>
              <p className="text-xs font-bold" style={{ color: "#6D28D9" }}>마라탕 최종 성적</p>
            </div>
          </div>

          {/* 말풍선 (꼬리 → 교수 방향 오른쪽) */}
          <div className="relative">
            <div
              className="rounded-2xl rounded-tr-none px-4 py-3 shadow-lg"
              style={{
                background: "white",
                border: "2px solid rgba(167,139,250,0.5)",
              }}
            >
              <p className="text-gray-800 text-xs leading-relaxed font-medium">{ending.comment}</p>
            </div>
            <div
              className="absolute -right-3 top-3"
              style={{
                width: 0, height: 0,
                borderTop: "7px solid transparent",
                borderBottom: "7px solid transparent",
                borderLeft: "13px solid white",
              }}
            />
          </div>
        </div>

        {/* 교수 이미지 */}
        <div className="flex-shrink-0 flex items-end justify-center" style={{ width: "150px", height: "200px" }}>
          <img
            src="/professor.png"
            alt="교수님"
            style={{ width: "150px", height: "200px", objectFit: "contain", objectPosition: "bottom", filter: "drop-shadow(0 6px 12px rgba(0,0,0,0.35))" }}
          />
        </div>
      </div>

      {/* ── 중앙: 대형 마라탕 그릇 ── */}
      <div className="flex-1 flex items-center justify-center py-2">
        <div className="relative" style={{ width: "280px", height: "236px" }}>

          {/* 그릇 림 */}
          <div
            className="absolute left-0 right-0 rounded-full z-10"
            style={{
              top: "12px",
              height: "48px",
              background: "linear-gradient(180deg, #C2410C 0%, #B45309 40%, #92400E 100%)",
              border: "4px solid #7C2D12",
              boxShadow: "0 4px 14px rgba(0,0,0,0.45), inset 0 2px 5px rgba(255,255,255,0.18)",
            }}
          />
          {/* 림 하이라이트 */}
          <div
            className="absolute left-5 right-5 rounded-full z-20"
            style={{
              top: "17px",
              height: "15px",
              background: "linear-gradient(180deg, rgba(255,200,150,0.4) 0%, transparent 100%)",
            }}
          />

          {/* 그릇 몸통 */}
          <div
            className="absolute left-0 right-0 overflow-hidden z-0"
            style={{
              top: "36px",
              bottom: "0",
              borderRadius: "0 0 50% 50%",
              background: "linear-gradient(180deg, #C2410C 0%, #9A3412 40%, #7C2D12 100%)",
              border: "4px solid #7C2D12",
              borderTop: "none",
              boxShadow: "0 10px 28px rgba(0,0,0,0.55), inset -10px 0 24px rgba(0,0,0,0.2)",
            }}
          >
            {/* 장식 고추 */}
            <div className="absolute right-8 top-8 text-xl opacity-25 rotate-12">🌶️</div>
            <div className="absolute right-16 top-16 text-sm opacity-15 -rotate-6">🌶️</div>

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

            {/* 재료 이모지 */}
            <div
              className="absolute inset-0 flex flex-wrap items-center justify-center gap-1 px-10"
              style={{ paddingTop: "42%" }}
            >
              {selectedIngredients.map((ing, i) => (
                <span
                  key={ing.id}
                  className="leading-none drop-shadow"
                  style={{ fontSize: "24px", transform: `rotate(${(i * 43) % 360}deg)` }}
                >
                  {ing.emoji}
                </span>
              ))}
            </div>
          </div>

          {/* 학점 뱃지 (그릇 우상단 오버레이) */}
          <div
            className={`absolute z-30 w-14 h-14 rounded-xl border-4 ${ending.gradeBorder} flex items-center justify-center shadow-2xl`}
            style={{ top: "0px", right: "-8px", background: "white" }}
          >
            <span className={`text-2xl font-black ${ending.gradeColor}`}>{ending.grade}</span>
          </div>
        </div>
      </div>

      {/* ── 요약 정보 ── */}
      <div
        className="mx-3 rounded-xl px-4 py-2.5 flex-shrink-0"
        style={{
          background: "rgba(76,29,149,0.35)",
          border: "1px solid rgba(167,139,250,0.3)",
        }}
      >
        <div className="text-xs space-y-1">
          <p>
            <span className="font-bold text-yellow-300">재료</span>
            <span className="text-white/90 ml-1">{selectedIngredients.map((i) => i.emoji).join(" ")}</span>
          </p>
          <p>
            <span className="font-bold text-yellow-300">맵기</span>
            <span className="text-white/90 ml-1">{spiceInfo?.label} {spiceInfo?.face}</span>
            <span className="mx-2 text-purple-300">|</span>
            <span className="font-bold text-yellow-300">소스</span>
            <span className="text-white/90 ml-1">{chosenSauces.map((s) => s.name).join(", ")}</span>
          </p>
        </div>
      </div>

      {/* ── 다시 도전 버튼 ── */}
      <div className="px-3 py-3 pb-5 flex-shrink-0">
        <button
          onClick={onReset}
          className="w-full font-black text-lg py-4 rounded-2xl border-b-4 transition-all duration-75 active:scale-95 active:border-b-0"
          style={{
            background: "linear-gradient(135deg, #F97316, #EA580C)",
            color: "white",
            borderColor: "#9A3412",
            boxShadow: "0 4px 0 #7C2D12",
          }}
        >
          🔄 다시 도전!
        </button>
      </div>
    </div>
  );
}
