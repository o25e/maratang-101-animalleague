import { useState, useEffect } from "react";
import { Ending, Ingredient } from "../../types/game";
import { useSound } from "../../hooks/useSound";

interface ResultScreenProps {
  ending: Ending;
  selectedIngredients: Ingredient[];
  spiceLevel: number | null;
  selectedSauces: string[];
  onReset: () => void;
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
}: ResultScreenProps) {
  const { playPop, playBoom, playText } = useSound();
  const [restartHovered, setRestartHovered] = useState(false);
  const [isFinalMessage, setIsFinalMessage] = useState(false);
  const [bgReady, setBgReady] = useState(() => {
    const img = new Image();
    img.src = "/img/screen/game_result.png";
    return img.complete;
  });

  useEffect(() => {
    const ids = [500, 2000, 3500].map(delay => setTimeout(playText, delay));
    const boomId = setTimeout(playBoom, 5200);
    return () => { ids.forEach(clearTimeout); clearTimeout(boomId); };
  }, [playText, playBoom]);

  useEffect(() => {
    if (ending.score === 100) return;
    const id = setTimeout(() => { setIsFinalMessage(true); playText(); }, 7200);
    return () => clearTimeout(id);
  }, [ending.score, playText]);
  const isMalatangGood = ending.score > 50;
  const isSauceGood =
    !selectedSauces.includes("cilantro") && !selectedSauces.includes("mintchoco");

  const resultImage = isMalatangGood
    ? isSauceGood ? "/img/game_resultb1.png" : "/img/game_resultb2.png"
    : isSauceGood ? "/img/game_resultb3.png" : "/img/game_resultb4.png";

  const isBad      = ending.professorImage.includes("bad");
  const isSurprise = ending.professorImage.includes("suprise");
  const gradeColor = GRADE_COLORS[ending.grade] ?? "#6B7280";

  const [c0, c1, c2] = ending.comments;

  const finalMessage =
    ending.score >= 90 ? "거의 완벽했어. \n 조금만 더 다듬으면 A+도 가능할 것 같군!" :
    ending.score >= 60 ? "나쁘진 않아.. \n 좀 더 맛있게 다시 한번 말아주게!" :
    ending.score >= 30 ? "흠.. 정말 최선이었나? \n 다시 말아주게나." :
    "정말 맛이 없군!!! \n 다시 말아오게.";

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
      `}</style>

      {/* Layer 1: 배경 */}
      <img
        src="/img/screen/game_result.png"
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

      {/* Layer 4: 말풍선 — 3줄 멘트 (타이틀 제거) */}
      <div className="absolute top-16 left-16" style={{ zIndex: 20 }}>
        <div className="relative">
          <img
            src="/img/chat2.png"
            alt="말풍선"
            style={{ width: "390px", objectFit: "contain" }}
          />
          <div
            className="absolute flex flex-col justify-center gap-2 px-6"
            style={{ top: "18%", left: "5%", right: "10%", bottom: "22%" }}
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

        {/* 최종 성적 — 말풍선 아래 딱 등장 */}
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

      {/* 다시 도전 버튼 — 위치: bottom/right, 크기: width로 조절 */}
      <div className="absolute" style={{ zIndex: 40, bottom: 5, right: 11 }}>
        <button
          onClick={() => { playPop(); onReset(); }}
          onMouseEnter={() => setRestartHovered(true)}
          onMouseLeave={() => setRestartHovered(false)}
          className="bg-transparent border-none p-0 cursor-pointer transition-all duration-75 active:scale-95 active:translate-y-1"
        >
          <img
            src={restartHovered ? "/img/button_restart_hover.png" : "/img/button_restart.png"}
            alt="다시 도전"
            style={{ width: 230 }}
          />
        </button>
      </div>
    </div>
  );
}
