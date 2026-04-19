import { useState } from "react";
import { useSound } from "../../hooks/useSound";

interface TitleScreenProps {
  onStart: () => void;
  onInstructions: () => void;
}

export default function TitleScreen({ onStart, onInstructions }: TitleScreenProps) {
  const { playPop } = useSound();
  const [startHover, setStartHover] = useState(false);
  const [manualHover, setManualHover] = useState(false);

  return (
    <div
      className="w-full h-full relative overflow-hidden flex flex-col items-center justify-end"
      style={{ backgroundImage: "url('/img/screen/game_start.webp')", backgroundSize: "cover", backgroundPosition: "center" }}
    >
      {/* preload ManualScreen image */}
      <img src="/img/screen/game_rule.webp" className="hidden" aria-hidden alt="" />

      {/* buttons */}
      <div className="absolute z-10 flex flex-col items-center" style={{ right: "2%", bottom: "1%", gap: "0px" }}>
        <button
          onClick={() => { playPop(); onStart(); }}
          onMouseEnter={() => setStartHover(true)}
          onMouseLeave={() => setStartHover(false)}
          className="active:scale-95 transition-transform duration-75 bg-transparent border-none p-0">
          <img
            src={startHover ? "/img/button_start_hover.webp" : "/img/button_start.webp"}
            alt="시작하기"
            className="w-64 select-none"
            draggable={false}
          />
        </button>
        <button
          onClick={() => { playPop(); onInstructions(); }}
          onMouseEnter={() => setManualHover(true)}
          onMouseLeave={() => setManualHover(false)}
          className="active:scale-95 transition-transform duration-75 bg-transparent border-none p-0">
          <img
            src={manualHover ? "/img/button_manual_hover.webp" : "/img/button_manual.webp"}
            alt="게임방법"
            className="w-64 select-none"
            draggable={false}
          />
        </button>
      </div>
    </div>
  );
}
