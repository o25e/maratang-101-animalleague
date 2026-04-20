import { useEffect, useState } from "react";
import { RankEntry, UserInfo } from "../types/game";
import { getRankings } from "../utils/ranking";

interface RankingModalProps {
  currentUser: UserInfo | null;
  onClose: () => void;
  onHome: () => void;
}

const COL = "44px 1fr 1fr 72px 52px";

export default function RankingModal({ currentUser, onClose, onHome }: RankingModalProps) {
  const [top10, setTop10] = useState<RankEntry[]>([]);
  const [myEntry, setMyEntry] = useState<{ rank: number; entry: RankEntry } | null>(null);

  useEffect(() => {
    const all = getRankings();
    setTop10(all.slice(0, 10));
    if (currentUser) {
      const idx = all.findIndex(
        r => r.id === currentUser.id && r.university === currentUser.university
      );
      if (idx >= 0) setMyEntry({ rank: idx + 1, entry: all[idx] });
    }
  }, [currentUser]);

  const isInTop10 = myEntry !== null && myEntry.rank <= 10;

  const rankLabel = (i: number) =>
    i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `${i + 1}`;

  const rowStyle = (isMe: boolean, i: number): React.CSSProperties => ({
    display: "grid",
    gridTemplateColumns: COL,
    gap: "0 6px",
    padding: "6px 10px",
    borderRadius: "6px",
    background: isMe ? "#FDE68A" : i % 2 === 0 ? "transparent" : "rgba(251,191,36,0.12)",
    border: `1.5px solid ${isMe ? "#F59E0B" : "transparent"}`,
    marginBottom: "3px",
  });

  const cell = (center = false): React.CSSProperties => ({
    fontSize: "14px",
    color: "#1C1917",
    textAlign: center ? "center" : "left",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  });

  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      style={{ zIndex: 100, background: "rgba(0,0,0,0.72)" }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        style={{
          width: "560px",
          background: "#FEF3C7",
          border: "4px solid #D97706",
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 20px 60px rgba(0,0,0,0.55)",
          fontFamily: "'BazziGame', sans-serif",
        }}
      >
        {/* ── 헤더 ── */}
        <div
          style={{
            background: "#D97706",
            padding: "12px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span style={{ fontSize: "22px", color: "#FFFBEB", fontWeight: "bold" }}>
            📋 수강생 랭킹
          </span>
          <button
            onClick={onClose}
            style={{
              background: "rgba(0,0,0,0.22)",
              border: "none",
              borderRadius: "50%",
              width: "30px",
              height: "30px",
              color: "#FFFBEB",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
              fontFamily: "'BazziGame', sans-serif",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ✕
          </button>
        </div>

        {/* ── 컬럼 헤더 ── */}
        <div style={{ padding: "10px 20px 0" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: COL,
              gap: "0 6px",
              padding: "4px 10px 8px",
              borderBottom: "2px solid #D97706",
            }}
          >
            {["순위", "아이디", "대학교", "최고점수", "판수"].map(h => (
              <span
                key={h}
                style={{ fontSize: "13px", color: "#92400E", fontWeight: "bold", textAlign: "center" }}
              >
                {h}
              </span>
            ))}
          </div>

          {/* ── 랭킹 행 ── */}
          <div style={{ padding: "6px 0", minHeight: "180px" }}>
            {top10.length === 0 ? (
              <div style={{ textAlign: "center", padding: "32px 0", color: "#92400E", fontSize: "16px" }}>
                아직 기록이 없어요!<br />첫 번째 랭커가 되어보세요 🌶️
              </div>
            ) : (
              top10.map((entry, i) => {
                const isMe = isInTop10 && myEntry?.rank === i + 1;
                return (
                  <div key={`${entry.id}-${entry.university}-${i}`} style={rowStyle(!!isMe, i)}>
                    <span style={{ ...cell(true) }}>{rankLabel(i)}</span>
                    <span style={cell()}>{entry.id}</span>
                    <span style={{ ...cell(), color: "#44403C" }}>{entry.university}</span>
                    <span style={{ ...cell(true), color: "#B45309", fontWeight: "bold" }}>
                      {entry.high_score}점
                    </span>
                    <span style={{ ...cell(true), color: "#78716C" }}>{entry.play_count}판</span>
                  </div>
                );
              })
            )}
          </div>

          {/* ── 내 순위 (Top10 밖) ── */}
          {myEntry && !isInTop10 && (
            <div style={{ borderTop: "1px dashed #D97706", paddingTop: "6px", marginTop: "2px" }}>
              <div style={rowStyle(true, 0)}>
                <span style={cell(true)}>{myEntry.rank}</span>
                <span style={cell()}>{myEntry.entry.id}</span>
                <span style={{ ...cell(), color: "#44403C" }}>{myEntry.entry.university}</span>
                <span style={{ ...cell(true), color: "#B45309", fontWeight: "bold" }}>
                  {myEntry.entry.high_score}점
                </span>
                <span style={{ ...cell(true), color: "#78716C" }}>{myEntry.entry.play_count}판</span>
              </div>
            </div>
          )}
        </div>

        {/* ── 푸터 ── */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "12px 0 16px",
            borderTop: "1px solid #E5C887",
            marginTop: "10px",
          }}
        >
          <button
            onClick={onHome}
            style={{
              background: "#D97706",
              border: "2px solid #92400E",
              borderRadius: "8px",
              padding: "8px 28px",
              color: "#FFFBEB",
              fontSize: "17px",
              cursor: "pointer",
              fontFamily: "'BazziGame', sans-serif",
              boxShadow: "0 3px 0 #92400E",
            }}
            onMouseDown={e => (e.currentTarget.style.transform = "translateY(2px)")}
            onMouseUp={e => (e.currentTarget.style.transform = "")}
          >
            🏠 메인으로
          </button>
        </div>
      </div>
    </div>
  );
}
