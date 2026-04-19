import { useEffect, useRef } from "react";
import { Ending } from "../../types/game";

interface TastingScreenProps {
  ending: Ending;
  selectedSauces: string[];
  onDone: () => void;
}

export default function TastingScreen({ ending, selectedSauces, onDone }: TastingScreenProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const tasteAudioRef = useRef<HTMLAudioElement | null>(null);

  const isMalatangGood = ending.score > 50;
  const isSauceGood = !selectedSauces.includes("cilantro") && !selectedSauces.includes("mintchoco");
  const resultImage = isMalatangGood
    ? isSauceGood ? "/img/game_resultb1.webp" : "/img/game_resultb2.webp"
    : isSauceGood ? "/img/game_resultb3.webp" : "/img/game_resultb4.webp";

  useEffect(() => {
    const img = new Image();
    img.src = "/img/screen/game_result.webp";
  }, []);

  useEffect(() => {
    const bgm = new Audio("/sounds/tension_bgm.mp3");
    bgm.loop = true;
    bgm.volume = 1.0;
    bgm.play().catch(() => {});
    audioRef.current = bgm;

    const tasteTimer = setTimeout(() => {
      const taste = new Audio("/sounds/taste.mp3");
      taste.volume = 0.5;
      taste.play().catch(() => {});
      tasteAudioRef.current = taste;
    }, 1000);

    const timer = setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (tasteAudioRef.current) {
        tasteAudioRef.current.pause();
        tasteAudioRef.current = null;
      }
      onDone();
    }, 3000);

    return () => {
      clearTimeout(tasteTimer);
      clearTimeout(timer);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (tasteAudioRef.current) {
        tasteAudioRef.current.pause();
        tasteAudioRef.current = null;
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full select-none overflow-hidden">
      <style>{`
        @keyframes handFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          40%       { transform: translateY(-14px) rotate(-4deg); }
          70%       { transform: translateY(-6px) rotate(2deg); }
        }
      `}</style>

      {/* 배경 */}
      <img
        src="/img/screen/game_result.webp"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0 }}
      />

      {/* 족자 — 왼쪽 상단 */}
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
          {"시식중".split("").map((ch, i) => (
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

      {/* 완성된 마라탕 이미지 — ResultScreen과 동일한 크기/위치 */}
      <div
        className="absolute inset-0 flex items-center justify-center pt-23"
        style={{ zIndex: 30 }}
      >
        <img
          src={resultImage}
          alt="마라탕"
          className="w-full object-contain"
          style={{
            filter: "drop-shadow(0 8px 28px rgba(0,0,0,0.5))",
            transform: "scale(1.2) translateY(19px)",
            transformOrigin: "center",
          }}
        />
      </div>

      {/* 교수님 — ResultScreen과 동일한 위치/크기 */}
      <div className="absolute top-6 right-36" style={{ zIndex: 10 }}>
        <img
          src="/img/professor_soso.webp"
          alt="교수님"
          style={{
            width: "345px",
            height: "375px",
            objectFit: "contain",
            objectPosition: "bottom",
            filter: "drop-shadow(0 6px 12px rgba(0,0,0,0.35))",
            position: "relative",
            zIndex: 1,
          }}
        />
      </div>

      {/* 교수님 손 — 좌우 반전, 교수님 왼쪽, 마라탕 위 */}
      <img
        src="/img/professor_hand.webp"
        alt="교수님 손"
        className="absolute"
        style={{
          zIndex: 35,
          width: "160px",
          objectFit: "contain",
          bottom: "200px",
          right: "400px",
          animation: "handFloat 0.9s ease-in-out infinite",
          filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))",
          transform: "scaleX(-1)",
        }}
      />
    </div>
  );
}
