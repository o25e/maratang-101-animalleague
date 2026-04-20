import { useState } from "react";
import { UserInfo } from "../../types/game";
import { useSound } from "../../hooks/useSound";

interface TitleScreenProps {
  onStart: (user: UserInfo) => void;
  onInstructions: () => void;
  onShowRanking: () => void;
}

export default function TitleScreen({ onStart, onInstructions, onShowRanking }: TitleScreenProps) {
  const { playPop } = useSound();
  const [startHover, setStartHover] = useState(false);
  const [manualHover, setManualHover] = useState(false);

  // 수강 신청 폼
  const [showForm, setShowForm] = useState(false);
  const [formId, setFormId]     = useState("");
  const [formUniv, setFormUniv] = useState("");
  const [idError, setIdError]   = useState(false);
  const [univError, setUnivError] = useState(false);

  const openForm = () => { playPop(); setShowForm(true); };

  const handleSubmit = () => {
    const id   = formId.trim();
    const univ = formUniv.trim();
    setIdError(!id);
    setUnivError(!univ);
    if (!id || !univ) return;
    playPop();
    onStart({ id, university: univ });
  };

  const inputStyle = (hasError: boolean): React.CSSProperties => ({
    width: "100%",
    padding: "8px 12px",
    fontSize: "16px",
    border: `2px solid ${hasError ? "#EF4444" : "#D97706"}`,
    borderRadius: "8px",
    background: "#FFFBEB",
    fontFamily: "'BazziGame', sans-serif",
    boxSizing: "border-box",
    outline: "none",
    color: "#1C1917",
  });

  return (
    <div
      className="w-full h-full relative overflow-hidden flex flex-col items-center justify-end"
      style={{ backgroundImage: "url('/img/screen/game_start.webp')", backgroundSize: "cover", backgroundPosition: "center" }}
    >
      {/* preload */}
      <img src="/img/screen/game_rule.webp" className="hidden" aria-hidden alt="" />

      {/* 게임 버튼 영역 */}
      <div className="absolute z-10 flex flex-col items-center" style={{ right: "2%", bottom: "1%", gap: "0px" }}>
        <button
          onClick={openForm}
          onMouseEnter={() => setStartHover(true)}
          onMouseLeave={() => setStartHover(false)}
          className="active:scale-95 transition-transform duration-75 bg-transparent border-none p-0"
        >
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
          className="active:scale-95 transition-transform duration-75 bg-transparent border-none p-0"
        >
          <img
            src={manualHover ? "/img/button_manual_hover.webp" : "/img/button_manual.webp"}
            alt="게임방법"
            className="w-64 select-none"
            draggable={false}
          />
        </button>
      </div>

      {/* 랭킹 버튼 — 우측 하단 소형 */}
      <button
        onClick={() => { playPop(); onShowRanking(); }}
        style={{
          position: "absolute",
          right: "16px",
          bottom: "16px",
          zIndex: 10,
          background: "#D97706",
          border: "2px solid #92400E",
          borderRadius: "8px",
          padding: "6px 14px",
          color: "#FFFBEB",
          fontSize: "15px",
          cursor: "pointer",
          fontFamily: "'BazziGame', sans-serif",
          boxShadow: "0 3px 0 #92400E",
        }}
        onMouseDown={e => (e.currentTarget.style.transform = "translateY(2px)")}
        onMouseUp={e => (e.currentTarget.style.transform = "")}
        onMouseLeave={e => (e.currentTarget.style.transform = "")}
      >
        📋 랭킹
      </button>

      {/* ── 수강 신청 폼 오버레이 ── */}
      {showForm && (
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.68)", zIndex: 50 }}
        >
          <div
            style={{
              width: "340px",
              background: "#FEF3C7",
              border: "4px solid #D97706",
              borderRadius: "16px",
              padding: "28px 28px 22px",
              fontFamily: "'BazziGame', sans-serif",
              boxShadow: "0 20px 56px rgba(0,0,0,0.55)",
            }}
          >
            <h2
              style={{
                textAlign: "center",
                fontSize: "24px",
                color: "#92400E",
                margin: "0 0 20px",
              }}
            >
              📝 수강 신청
            </h2>

            {/* 아이디 */}
            <div style={{ marginBottom: "14px" }}>
              <label style={{ display: "block", fontSize: "15px", color: "#92400E", marginBottom: "5px" }}>
                아이디
              </label>
              <input
                type="text"
                value={formId}
                maxLength={20}
                placeholder="아이디를 입력하세요"
                onChange={e => { setFormId(e.target.value); setIdError(false); }}
                onKeyDown={e => e.key === "Enter" && handleSubmit()}
                style={inputStyle(idError)}
              />
              {idError && (
                <span style={{ fontSize: "12px", color: "#EF4444" }}>아이디를 입력해주세요!</span>
              )}
            </div>

            {/* 대학교 */}
            <div style={{ marginBottom: "22px" }}>
              <label style={{ display: "block", fontSize: "15px", color: "#92400E", marginBottom: "5px" }}>
                대학교
              </label>
              <input
                type="text"
                value={formUniv}
                maxLength={20}
                placeholder="대학교를 입력하세요"
                onChange={e => { setFormUniv(e.target.value); setUnivError(false); }}
                onKeyDown={e => e.key === "Enter" && handleSubmit()}
                style={inputStyle(univError)}
              />
              {univError && (
                <span style={{ fontSize: "12px", color: "#EF4444" }}>대학교를 입력해주세요!</span>
              )}
            </div>

            {/* 제출 */}
            <button
              onClick={handleSubmit}
              style={{
                width: "100%",
                padding: "11px",
                fontSize: "20px",
                background: "#D97706",
                border: "3px solid #92400E",
                borderRadius: "10px",
                color: "#FFFBEB",
                cursor: "pointer",
                fontFamily: "'BazziGame', sans-serif",
                boxShadow: "0 4px 0 #92400E",
              }}
              onMouseDown={e => (e.currentTarget.style.transform = "translateY(2px)")}
              onMouseUp={e => (e.currentTarget.style.transform = "")}
              onMouseLeave={e => (e.currentTarget.style.transform = "")}
            >
              수강 신청 완료!
            </button>

            <button
              onClick={() => setShowForm(false)}
              style={{
                width: "100%",
                marginTop: "10px",
                padding: "7px",
                fontSize: "15px",
                background: "transparent",
                border: "none",
                color: "#92400E",
                cursor: "pointer",
                fontFamily: "'BazziGame', sans-serif",
              }}
            >
              ← 돌아가기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
