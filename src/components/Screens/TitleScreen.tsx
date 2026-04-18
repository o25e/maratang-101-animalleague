interface TitleScreenProps {
  onStart: () => void;
  onInstructions: () => void;
}

export default function TitleScreen({ onStart, onInstructions }: TitleScreenProps) {
  return (
    <div className="w-full h-full bg-gradient-to-b from-amber-200 via-orange-100 to-amber-300 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* floating bg emoji */}
      <div className="absolute inset-0 pointer-events-none select-none" aria-hidden>
        {["🌶️","🍜","🥢","🫕","🥩","🌿","🧄","🥬"].map((e, i) => (
          <span key={i} className="absolute text-4xl opacity-10"
            style={{ top:`${(i*13+7)%95}%`, left:`${(i*17+5)%95}%`, transform:`rotate(${i*45}deg)` }}>
            {e}
          </span>
        ))}
      </div>

      {/* shop sign */}
      <div className="relative z-10 bg-red-700 border-4 border-red-900 rounded-t-2xl px-10 py-3 shadow-xl">
        <p className="text-white font-black text-xl tracking-widest drop-shadow">마 라 탕 시 뮬 레 이 터</p>
      </div>

      {/* main card */}
      <div className="relative z-10 bg-orange-50 border-4 border-orange-300 border-t-0 rounded-b-2xl rounded-tr-2xl w-full max-w-sm shadow-2xl px-6 pt-6 pb-8">

        {/* character + speech bubble */}
        <div className="flex items-start gap-3 mb-6">
          <div className="w-20 h-20 rounded-full border-4 border-orange-400 bg-orange-200 flex items-center justify-center text-4xl flex-shrink-0 shadow-md">
            👨‍🏫
          </div>
          <div className="relative bg-sky-100 border-2 border-sky-300 rounded-2xl rounded-tl-none p-3 shadow">
            <div className="absolute -left-3 top-4 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-sky-300"/>
            <p className="text-xs font-bold text-gray-800 leading-relaxed">
              학생, 마라탕 한 그릇만 말아주게.<br/>
              진정한 <span className="text-red-600 font-black">마라탕</span>의<br/>맛을 보여주게나.
            </p>
          </div>
        </div>

        {/* title text */}
        <div className="text-center mb-7">
          <p className="text-sm font-bold text-gray-500 mb-1">🎓 긴급 미션!</p>
          <h1 className="text-2xl font-black text-red-700 leading-tight drop-shadow-sm">
            교수님을 만족시켜라<br/>
            <span className="text-3xl text-orange-600">마라탕 시뮬레이터</span>
          </h1>
        </div>

        {/* buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={onStart}
            className="w-full bg-red-500 hover:bg-red-600 active:scale-95 active:border-b-0 active:translate-y-1
                       text-white font-black text-xl py-4 rounded-2xl
                       border-b-4 border-red-800 shadow-md transition-all duration-75">
             &nbsp;게임 시작
          </button>
          <button
            onClick={onInstructions}
            className="w-full bg-orange-400 hover:bg-orange-500 active:scale-95 active:border-b-0 active:translate-y-1
                       text-white font-black text-xl py-4 rounded-2xl
                       border-b-4 border-orange-700 shadow-md transition-all duration-75">
            &nbsp;게임 방법
          </button>
        </div>
      </div>

      <p className="relative z-10 mt-5 text-orange-700 text-xs font-bold opacity-60">© 2024 Animal League</p>
    </div>
  );
}
