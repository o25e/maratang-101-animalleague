import { useEffect, useRef } from "react";

export function useBGM(enabled: boolean, src: string, volume = 0.3) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const wasEnabledRef = useRef(enabled);

  useEffect(() => {
    // enabled가 false → true로 변할 때 (게임 재시작)
    if (enabled && !wasEnabledRef.current && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }

    if (enabled) {
      if (!audioRef.current) {
        audioRef.current = new Audio(src);
        audioRef.current.loop = true;
        audioRef.current.volume = volume;
        audioRef.current.play().catch(() => {});
      } else if (audioRef.current.paused) {
        audioRef.current.play().catch(() => {});
      }
    } else {
      if (audioRef.current && !audioRef.current.paused) {
        audioRef.current.pause();
      }
    }

    wasEnabledRef.current = enabled;
  }, [enabled, src, volume]);

  // 브라우저 autoplay 정책 대비: 첫 상호작용 시 재생 시도
  useEffect(() => {
    if (!enabled) return;

    const tryPlay = () => {
      if (audioRef.current?.paused) {
        audioRef.current.play().catch(() => {});
      }
    };

    document.addEventListener("click", tryPlay, { once: true });
    document.addEventListener("keydown", tryPlay, { once: true });
    document.addEventListener("mousemove", tryPlay, { once: true });
    document.addEventListener("touchstart", tryPlay, { once: true });

    return () => {
      document.removeEventListener("click", tryPlay);
      document.removeEventListener("keydown", tryPlay);
      document.removeEventListener("mousemove", tryPlay);
      document.removeEventListener("touchstart", tryPlay);
    };
  }, [enabled]);
}
