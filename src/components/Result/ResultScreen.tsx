import { useState, useEffect, useRef, useCallback } from "react";
import { Ending, Ingredient } from "../../types/game";
import { useSound } from "../../hooks/useSound";

interface ResultScreenProps {
  ending: Ending;
  selectedIngredients: Ingredient[];
  spiceLevel: number | null;
  selectedSauces: string[];
  onReset: () => void;
  onShowRanking: () => void;
}

const GRADE_COLORS: Record<string, string> = {
  "A+": "#EAB308",
  "A":  "#16A34A",
  "A-": "#059669",
  "B+": "#2563EB",
  "B":  "#0D9488",
  "B-": "#0284C7",
  "C":  "#F97316",
  "D":  "#EF4444",
  "F":  "#B91C1C",
};

export default function ResultScreen({
  ending,
  selectedSauces,
  onReset,
  onShowRanking,
}: ResultScreenProps) {
  const { playPop, playBoom, playText } = useSound();
  const [restartHovered, setRestartHovered] = useState(false);
  const [rankingHovered, setRankingHovered] = useState(false);
  const [isFinalMessage, setIsFinalMessage] = useState(false);
  const [bgReady, setBgReady] = useState(() => {
    const img = new Image();
    img.src = "/img/screen/game_result.webp";
    return img.complete;
  });

  // onShowRanking을 ref에 저장해 클로저 stale 방지 + 1회만 실행 보장
  const onShowRankingRef = useRef(onShowRanking);
  useEffect(() => { onShowRankingRef.current = onShowRanking; }, [onShowRanking]);
  const rankingFired = useRef(false);
  const triggerRanking = useCallback(() => {
    if (!rankingFired.current) {
      rankingFired.current = true;
      onShowRankingRef.current();
    }
  }, []);

  useEffect(() => {
    const ids = [500, 2000, 3500].map(delay => setTimeout(playText, delay));
    const boomId = setTimeout(playBoom, 5200);
    // 100점: grade 등장(5.2s + 0.45s 애니) 후 1초 = 6700ms
    // 나머지: 최종 한줄 평가 등장(7.2s) 후 1초 = 8200ms
    const rankDelay = ending.score === 100 ? 7300 : 8800;
    const rankId = setTimeout(triggerRanking, rankDelay);
    return () => { ids.forEach(clearTimeout); clearTimeout(boomId); clearTimeout(rankId); };
  }, [playText, playBoom, triggerRanking, ending.score]);

  useEffect(() => {
    if (ending.score === 100) return;
    const id = setTimeout(() => { setIsFinalMessage(true); playText(); }, 7200);
    return () => clearTimeout(id);
  }, [ending.score, playText]);

  const isMalatangGood = ending.score > 50;
  const isSauceGood =
    !selectedSauces.includes("cilantro") && !selectedSauces.includes("mintchoco");

  const resultImage = isMalatangGood
    ? isSauceGood ? "/img/game_resultb1.webp" : "/img/game_resultb2.webp"
    : isSauceGood ? "/img/game_resultb3.webp" : "/img/game_resultb4.webp";

  const isBad      = ending.professorImage.includes("bad");
  const isSurprise = ending.professorImage.includes("surprise");
  const isConfetti = ending.score === 100;
  const gradeColor = GRADE_COLORS[ending.grade] ?? "#6B7280";

  const [c0, c1, c2] = ending.comments;

  const finalMessage =
    ending.score >= 90 ? "거의 완벽했어. \n 조금만 더 다듬으면 100점도 가능할 것 같군!" :
    ending.score >= 60 ? "나쁘진 않아.. \n 좀 더 맛있게 다시 한번 말아주게!" :
    ending.score >= 30 ? "흠.. 정말 최선이었나? \n 다시 말아주게나." :
    "정말 맛이 없군!!! \n 다시 말아오게나.";

  // ── 랭킹 버튼 위치 조정 ──────────────────────────
  const RANK_BTN_POS = { bottom: 105, right: 40 };
  // ────────────────────────────────────────────────

  const rankBtnBase: React.CSSProperties = {
    background: rankingHovered ? "#B45309" : "#D97706",
    border: "2px solid #92400E",
    borderRadius: "8px",
    padding: "4px 10px",
    color: "#FFFBEB",
    fontSize: "20px",
    cursor: "pointer",
    fontFamily: "'BazziGame', sans-serif",
    boxShadow: "0 3px 0 #92400E",
    display: "inline-flex",
    whiteSpace: "nowrap",
    transition: "background 0.1s",
  };

  return (
    <div className="relative w-full h-full select-none overflow-hidden" style={{ visibility: bgReady ? "visible" : "hidden" }}>

      {/* 애니메이션 keyframes */}
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes gradePop {
          0%   { opacity: 0; transform: scale(0.4) rotate(-8deg); }
          65%  { transform: scale(1.15) rotate(3deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        @keyframes confetti-drop {
          0%   { transform: translateY(-30px) rotate(0deg) scale(1); opacity: 1; }
          100% { transform: translateY(680px) rotate(720deg) scale(0.5); opacity: 0; }
        }
      `}</style>

      {/* confetti — score 100점 전용 */}
      {isConfetti && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 60 }}>
          {[
            { left: "8%",  delay: 0,    dur: 2.2, color: "#facc15", size: 10, round: false },
            { left: "18%", delay: 0.3,  dur: 2.6, color: "#f87171", size: 8,  round: true  },
            { left: "27%", delay: 0.6,  dur: 2.0, color: "#34d399", size: 12, round: false },
            { left: "36%", delay: 0.1,  dur: 2.8, color: "#60a5fa", size: 9,  round: true  },
            { left: "45%", delay: 0.9,  dur: 2.3, color: "#a78bfa", size: 11, round: false },
            { left: "54%", delay: 0.4,  dur: 2.1, color: "#fb923c", size: 8,  round: true  },
            { left: "63%", delay: 0.7,  dur: 2.5, color: "#f472b6", size: 10, round: false },
            { left: "72%", delay: 0.2,  dur: 2.9, color: "#facc15", size: 7,  round: true  },
            { left: "81%", delay: 0.5,  dur: 2.0, color: "#34d399", size: 12, round: false },
            { left: "90%", delay: 0.8,  dur: 2.4, color: "#f87171", size: 9,  round: true  },
            { left: "13%", delay: 1.1,  dur: 2.7, color: "#60a5fa", size: 8,  round: false },
            { left: "31%", delay: 1.4,  dur: 2.2, color: "#a78bfa", size: 11, round: true  },
            { left: "58%", delay: 1.2,  dur: 2.6, color: "#fb923c", size: 9,  round: false },
            { left: "76%", delay: 1.5,  dur: 2.3, color: "#f472b6", size: 10, round: true  },
            { left: "93%", delay: 1.0,  dur: 2.8, color: "#facc15", size: 7,  round: false },
          ].map((p, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                top: "-20px",
                left: p.left,
                width: p.size,
                height: p.size,
                backgroundColor: p.color,
                borderRadius: p.round ? "50%" : "2px",
                animation: `confetti-drop ${p.dur}s ease-in ${p.delay}s infinite`,
              }}
            />
          ))}
        </div>
      )}

      {/* Layer 1: 배경 */}
      <img
        src="/img/screen/game_result.webp"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        onLoad={() => setBgReady(true)}
        style={{ zIndex: 0 }}
      />

      {/* Layer 3: 교수님 */}
      <div className="absolute top-6 right-36" style={{ zIndex: 10 }}>
        {isBad && (
          <div
            className="absolute professor-aura"
            style={{
              inset: "-10px",
              background:
                "radial-gradient(circle, rgba(80,0,0,0.75) 0%, rgba(30,0,0,0.4) 55%, transparent 100%)",
              borderRadius: "50%",
              zIndex: 0,
            }}
          />
        )}
        <img
          src={ending.professorImage}
          alt="교수님"
          className={isSurprise ? "professor-surprise-img" : ""}
          style={{
            width: "345px",
            height: "375px",
            objectFit: "contain",
            objectPosition: "bottom",
            filter: isBad
              ? "drop-shadow(0 0 14px rgba(180,0,0,0.9)) drop-shadow(0 6px 12px rgba(0,0,0,0.5))"
              : "drop-shadow(0 6px 12px rgba(0,0,0,0.35))",
            position: "relative",
            zIndex: 1,
          }}
        />
      </div>

      {/* Layer 2: 중앙 마라탕 결과 이미지 */}
      <div
        className="absolute inset-0 flex items-center justify-center pt-23"
        style={{ zIndex: 30 }}
      >
        <img
          src={resultImage}
          alt="마라탕 결과"
          className="w-full object-contain"
          style={{
            filter: "drop-shadow(0 8px 28px rgba(0,0,0,0.5))",
            transform: "scale(1.2) translateY(19px)",
            transformOrigin: "center",
          }}
        />
      </div>

      {/* Layer 4: 말풍선 — 3줄 멘트 */}
      <div className="absolute top-16 left-16" style={{ zIndex: 20 }}>
        <div className="relative">
          <img
            src="/img/chat2.webp"
            alt="말풍선"
            style={{ width: "390px", objectFit: "contain" }}
          />
          <div
            className="absolute flex flex-col justify-center gap-2 px-6"
            style={{ top: "18%", left: "3%", right: "10%", bottom: "22%" }}
          >
            {isFinalMessage ? (
              <p
                key="final"
                className="font-semibold leading-snug text-gray-800"
                style={{ fontSize: "20px", opacity: 0, animation: "fadeSlideIn 0.6s ease forwards", whiteSpace: "pre-line" }}
              >
                {finalMessage}
              </p>
            ) : (
              <>
                <p
                  className="font-semibold leading-snug text-gray-800"
                  style={{ fontSize: "20px", opacity: 0, animation: "fadeSlideIn 0.5s ease forwards", animationDelay: "0.5s" }}
                >
                  {c0}
                </p>
                <p
                  className="font-semibold leading-snug text-gray-800"
                  style={{ fontSize: "20px", opacity: 0, animation: "fadeSlideIn 0.5s ease forwards", animationDelay: "2.0s" }}
                >
                  {c1}
                </p>
                <p
                  className="font-semibold leading-snug text-gray-800"
                  style={{ fontSize: "20px", opacity: 0, animation: "fadeSlideIn 0.5s ease forwards", animationDelay: "3.5s" }}
                >
                  {c2}
                </p>
              </>
            )}
          </div>
        </div>

        {/* 최종 성적 */}
        <div
          className="mt-2 flex items-center gap-3 pl-2"
          style={{ opacity: 0, animation: "gradePop 0.45s cubic-bezier(0.34,1.56,0.64,1) forwards", animationDelay: "5.2s" }}
        >
          <span
            className="font-black leading-none"
            style={{ fontSize: "72px", color: gradeColor, textShadow: "0 4px 12px rgba(0,0,0,0.3)" }}
          >
            {ending.grade}
          </span>
          <span
            className="font-black text-xl"
            style={{ color: gradeColor, opacity: 0.85 }}
          >
            {ending.score}점
          </span>
        </div>
      </div>

      {/* 랭킹 버튼 */}
      <button
        onClick={() => { playPop(); rankingFired.current = true; onShowRanking(); }}
        onMouseEnter={() => setRankingHovered(true)}
        onMouseLeave={() => setRankingHovered(false)}
        style={{ ...rankBtnBase, position: "absolute", zIndex: 40, bottom: RANK_BTN_POS.bottom, right: RANK_BTN_POS.right }}
      >
        🌶️ 랭킹 보기
      </button>

      {/* 다시 도전 버튼 */}
      <button
        onClick={() => { playPop(); onReset(); }}
        onMouseEnter={() => setRestartHovered(true)}
        onMouseLeave={() => setRestartHovered(false)}
        className="absolute bg-transparent border-none p-0 cursor-pointer transition-all duration-75 active:scale-95 active:translate-y-1"
        style={{ zIndex: 40, bottom: 10, right: 11 }}
      >
        <img
          src={restartHovered ? "/img/button_restart_hover.webp" : "/img/button_restart.webp"}
          alt="다시 도전"
          style={{ width: 230 }}
        />
      </button>
    </div>
  );
}
