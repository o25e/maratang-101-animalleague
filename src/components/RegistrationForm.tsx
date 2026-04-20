import { useState } from "react";
import { UserInfo } from "../types/game";
import { useSound } from "../hooks/useSound";

interface RegistrationFormProps {
  onSubmit: (user: UserInfo) => void;
  onCancel: () => void;
}

export default function RegistrationForm({ onSubmit, onCancel }: RegistrationFormProps) {
  const { playPop } = useSound();
  const [formId, setFormId]       = useState("");
  const [formUniv, setFormUniv]   = useState("");
  const [idError, setIdError]     = useState(false);
  const [univError, setUnivError] = useState(false);

  const handleSubmit = () => {
    const id   = formId.trim();
    const univ = formUniv.trim();
    setIdError(!id);
    setUnivError(!univ);
    if (!id || !univ) return;
    playPop();
    onSubmit({ id, university: univ });
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
      className="absolute inset-0 flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.68)", zIndex: 200 }}
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
        <h2 style={{ textAlign: "center", fontSize: "24px", color: "#92400E", margin: "0 0 20px" }}>
          기깔나게 끓여보자!
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
          {idError && <span style={{ fontSize: "12px", color: "#EF4444" }}>아이디를 입력해주세요!</span>}
        </div>

        {/* 소속 */}
        <div style={{ marginBottom: "22px" }}>
          <label style={{ display: "block", fontSize: "15px", color: "#92400E", marginBottom: "5px" }}>
            마라탕 최애 재료
          </label>
          <input
            type="text"
            value={formUniv}
            maxLength={20}
            placeholder="당신의 마라탕 최애 재료는!?"
            onChange={e => { setFormUniv(e.target.value); setUnivError(false); }}
            onKeyDown={e => e.key === "Enter" && handleSubmit()}
            style={inputStyle(univError)}
          />
          {univError && <span style={{ fontSize: "12px", color: "#EF4444" }}>마라탕 최애 재료를 입력해주세요!</span>}
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
          요리할 준비 완료!
        </button>

        {/* 돌아가기 */}
        <button
          onClick={onCancel}
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
  );
}
