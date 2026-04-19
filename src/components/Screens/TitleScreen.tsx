import { useState } from "react";

interface TitleScreenProps {
  onStart: () => void;
  onInstructions: () => void;
}

export default function TitleScreen({ onStart, onInstructions }: TitleScreenProps) {
  const [startHover, setStartHover] = useState(false);
  const [manualHover, setManualHover] = useState(false);

  return (
    <div
      className="w-full h-full relative overflow-hidden flex flex-col items-center justify-end"
      style={{ backgroundImage: "url('/img/screen/game_start.png')", backgroundSize: "cover", backgroundPosition: "center" }}
    >
      {/* preload ManualScreen image */}
      <img src="/img/screen/game_rule.png" className="hidden" aria-hidden alt="" />

      {/* buttons */}
      <div className="absolute z-10 flex flex-col items-center" style={{ right: "2%", bottom: "1%", gap: "0px" }}>
        <button
          onClick={onStart}
          onMouseEnter={() => setStartHover(true)}
          onMouseLeave={() => setStartHover(false)}
          className="active:scale-95 transition-transform duration-75 bg-transparent border-none p-0">
          <img
            src={startHover ? "/img/button_start_hover.png" : "/img/button_start.png"}
            alt="시작하기"
            className="w-64 select-none"
            draggable={false}
          />
        </button>
        <button
          onClick={onInstructions}
          onMouseEnter={() => setManualHover(true)}
          onMouseLeave={() => setManualHover(false)}
          className="active:scale-95 transition-transform duration-75 bg-transparent border-none p-0">
          <img
            src={manualHover ? "/img/button_manual_hover.png" : "/img/button_manual.png"}
            alt="게임방법"
            className="w-64 select-none"
            draggable={false}
          />
        </button>
      </div>
    </div>
  );
}
