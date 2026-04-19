import { useState } from "react";
import { useSound } from "../../hooks/useSound";

interface ManualScreenProps {
  onStart: () => void;
}

export default function ManualScreen({ onStart }: ManualScreenProps) {
  const { playPop } = useSound();
  const [hover, setHover] = useState(false);

  return (
    <div className="w-full h-full relative overflow-hidden">
      <img
        src="/img/screen/game_rule.webp"
        alt="게임 방법"
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />
      <div className="absolute bottom-2 right-2 flex justify-end z-10">
        <button
          onClick={() => { playPop(); onStart(); }}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          className="active:scale-95 transition-transform duration-75 bg-transparent border-none p-0">
          <img
            src={hover ? "/img/button_start_hover.webp" : "/img/button_start.webp"}
            alt="시작하기"
            className="w-64 select-none"
            draggable={false}
          />
        </button>
      </div>
    </div>
  );
}
