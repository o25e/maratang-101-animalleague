interface MobileWarningModalProps {
  onClose: () => void;
}

export default function MobileWarningModal({ onClose }: MobileWarningModalProps) {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 flex flex-col items-center gap-4 text-center">
        <h2 className="text-lg font-black text-gray-800">⚠️ 플레이 유의사항</h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          본 게임은 PC 환경에 최적화되어 있어, 모바일 환경에서는 레이아웃이<br />
          원활하지 않을 수 있습니다. 세로보단 가로 플레이를 권장합니다.
        </p>
        <button
          onClick={onClose}
          className="mt-2 w-full py-2.5 rounded-xl bg-purple-500 text-white font-bold text-base active:bg-purple-700"
        >
          확인
        </button>
      </div>
    </div>
  );
}
