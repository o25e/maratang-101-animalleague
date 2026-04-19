import { useState } from "react";

interface ManualScreenProps {
  onStart: () => void;
}

export default function ManualScreen({ onStart }: ManualScreenProps) {
  const [hover, setHover] = useState(false);

  return (
    <div className="w-full h-full relative overflow-hidden">
      <img
        src="/img/screen/game_rule.png"
        alt="게임 방법"
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />
      <div className="absolute bottom-2 right-2 flex justify-end z-10">
        <button
          onClick={onStart}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          className="active:scale-95 transition-transform duration-75 bg-transparent border-none p-0">
          <img
            src={hover ? "/img/button_start_hover.png" : "/img/button_start.png"}
            alt="시작하기"
            className="w-64 select-none"
            draggable={false}
          />
        </button>
      </div>
    </div>
  );
}
