import { useState } from "react";

export default function MobileBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-yellow-400 text-black px-4 py-3 flex items-start gap-3 shadow-md">
      <p className="flex-1 text-sm leading-snug">
        본 게임은 PC 환경에 최적화되어 있습니다. 원활한 플레이를 위해 컴퓨터 접속을 권장합니다.
      </p>
      <button
        onClick={() => setDismissed(true)}
        className="shrink-0 font-bold text-base leading-none mt-0.5 hover:opacity-70"
        aria-label="닫기"
      >
        ✕
      </button>
    </div>
  );
}
