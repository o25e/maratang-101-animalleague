interface WarningModalProps {
  message: string;
  visible: boolean;
}

export default function WarningModal({ message, visible }: WarningModalProps) {
  if (!visible) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none">
      <div
        className="relative flex flex-col items-center px-6 py-5 rounded-2xl"
        style={{
          background: "linear-gradient(180deg, #FAF5FF 0%, #FFFFFF 100%)",
          border: "2px dashed #C084FC",
          boxShadow: "0 8px 32px rgba(139,92,246,0.25), 0 2px 8px rgba(0,0,0,0.15)",
          minWidth: "200px",
          maxWidth: "280px",
        }}
      >
        {/* 경고 라벨 뱃지 */}
        <div
          className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full font-black text-sm shadow-md"
          style={{
            background: "linear-gradient(180deg, #FDE047 0%, #EAB308 100%)",
            color: "#713F12",
            border: "2px solid #CA8A04",
            whiteSpace: "nowrap",
          }}
        >
          ⚠️ 경고
        </div>

        {/* 경고 메시지 */}
        <p
          className="text-center font-bold leading-snug mt-2"
          style={{
            color: "#9B2C2C",
            fontSize: "15px",
            fontFamily: "'Noto Sans KR', 'Apple SD Gothic Neo', sans-serif",
          }}
        >
          {message}
        </p>
      </div>
    </div>
  );
}
