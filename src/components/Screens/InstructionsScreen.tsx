import { ReactNode } from "react";

interface Step {
  n: string;
  text: ReactNode;
}

interface InstructionsScreenProps {
  onBack: () => void;
}

export default function InstructionsScreen({ onBack }: InstructionsScreenProps) {
  const steps: Step[] = [
    {
      n: "1",
      text: <>재료 선택 → 맵기 선택 → 소스 선택의 <strong>3단계</strong>를 차례로 진행한다.</>,
    },
    {
      n: "2",
      text: <>단계별로 있는 버튼을 눌러 그 단계를 마무리 한다. ▶ 버튼을 눌러 다음 단계로 간다.<br/>재료 최소 <strong>5개</strong>, 소스 최소 <strong>2개</strong> 이상 선택해야 한다.</>,
    },
    {
      n: "3",
      text: <>마라탕 맛은 재료·맵기·소스 조합에 따라 결정된다. 교수님을 만족시켜 최고의 <span className="text-red-600 font-black">평가</span>를 받자!</>,
    },
  ];

  return (
    <div className="w-full h-full bg-gradient-to-b from-amber-200 via-orange-100 to-amber-300 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="bg-green-800 border-4 border-green-900 rounded-t-2xl text-white text-center py-3 font-black text-xl tracking-widest shadow-lg">
          게 임 방 법
        </div>

        <div className="bg-amber-50 border-4 border-green-800 border-t-0 rounded-b-2xl shadow-2xl px-6 py-6">
          <div className="flex justify-center gap-1 mb-5 text-2xl select-none">
            {Array.from({ length: 8 }).map((_, i) => <span key={i}>🥟</span>)}
          </div>

          <ol className="space-y-4">
            {steps.map(({ n, text }) => (
              <li key={n} className="flex gap-3">
                <span className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center font-black text-xs flex-shrink-0 mt-0.5">
                  {n}
                </span>
                <p className="text-sm text-gray-800 leading-relaxed">{text}</p>
              </li>
            ))}
          </ol>

          <div className="flex justify-center gap-1 mt-5 mb-5 text-2xl select-none">
            {Array.from({ length: 8 }).map((_, i) => <span key={i}>🥟</span>)}
          </div>

          <button
            onClick={onBack}
            className="w-full bg-orange-500 hover:bg-orange-600 active:scale-95 active:border-b-0 active:translate-y-1
                       text-white font-black text-lg py-3 rounded-2xl
                       border-b-4 border-orange-800 shadow-md transition-all duration-75">
            ← 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
}
