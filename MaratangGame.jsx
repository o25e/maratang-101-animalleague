import { useState } from "react";

// ─────────────────────────────────────────────
//  Game Data
// ─────────────────────────────────────────────
const MEATS = [
  { id: "beef",    name: "소고기", emoji: "🥩", type: "meat" },
  { id: "spam",    name: "스팸",   emoji: "🥫", type: "meat" },
  { id: "sausage", name: "소세지", emoji: "🌭", type: "meat" },
];
const VEGGIES = [
  { id: "bokchoy",  name: "청경채", emoji: "🥬", type: "veggie" },
  { id: "sprouts",  name: "숙주",   emoji: "🌱", type: "veggie" },
  { id: "cabbage",  name: "배추",   emoji: "🥗", type: "veggie" },
];
const NOODLES = [
  { id: "bunmoja",  name: "분모자",   emoji: "🍢", type: "noodle" },
  { id: "dangmyun", name: "중국당면", emoji: "🍜", type: "noodle" },
  { id: "corn",     name: "옥수수면", emoji: "🌽", type: "noodle" },
];
const OTHERS = [
  { id: "sweetrice",   name: "고구마떡", emoji: "🍡", type: "other" },
  { id: "cheesetteok", name: "치즈떡",   emoji: "🧀", type: "other" },
  { id: "tofu",        name: "두부",     emoji: "⬜", type: "other" },
];
const TRAPS = [
  { id: "mintchoco", name: "민트초코", emoji: "🍫", type: "trap" },
  { id: "mushroom",  name: "팽이버섯", emoji: "🍄", type: "trap" },
];


const SAUCES = [
  { id: "peanut",      name: "땅콩소스",  emoji: "🥜" },
  { id: "chilioil",   name: "고추기름",  emoji: "🌶️" },
  { id: "sugar",      name: "설탕",      emoji: "🍬" },
  { id: "vinegar",    name: "식초",      emoji: "🍶" },
  { id: "cilantro",   name: "고수",      emoji: "🌿" },
  { id: "greenonion", name: "파",        emoji: "🧅" },
];

const SPICE_LEVELS = [
  { level: 0, label: "0단계", desc: "순한맛",      peppers: 0, face: "😊" },
  { level: 1, label: "1단계", desc: "약간 매운맛", peppers: 1, face: "🙂" },
  { level: 2, label: "2단계", desc: "보통 매운맛", peppers: 2, face: "😅" },
  { level: 3, label: "3단계", desc: "많이 매운맛", peppers: 3, face: "😰" },
  { level: 4, label: "4단계", desc: "불지옥맛",    peppers: 4, face: "🔥" },
];

// ─────────────────────────────────────────────
//  Ending Logic
// ─────────────────────────────────────────────
function getEnding(ingredients, spiceLevel, sauces) {
  const hasTrap     = ingredients.some(i => i.type === "trap");
  const meats       = ingredients.filter(i => i.type === "meat");
  const veggies     = ingredients.filter(i => i.type === "veggie");
  const noodles     = ingredients.filter(i => i.type === "noodle");
  const hasCilantro = sauces.includes("cilantro");

  if (hasTrap) return {
    grade: "F", title: "퇴학 엔딩", emotion: "😡",
    comment: "이게 마라탕이야, 장난이야?! 민트초코는 디저트고 팽이버섯은… 잠깐, 이거 먹으면 죽어? 자네 퇴학 처리야. 다시는 내 강의실 오지 말게.",
    gradeColor: "text-red-600", gradeBorder: "border-red-400", bg: "from-red-200 to-red-100",
  };

  if (spiceLevel === 4 && hasCilantro) return {
    grade: "D", title: "인간 퇴치용 엔딩", emotion: "😰",
    comment: "자네… 이게 사람 먹으라고 만든 건가? 4단계 맵기에 고수까지? 이 마라탕으로 강의실 해충 퇴치 가능하겠군. 학점은 D야.",
    gradeColor: "text-orange-600", gradeBorder: "border-orange-400", bg: "from-orange-200 to-orange-100",
  };

  if (meats.length >= 3 && veggies.length === 0 && noodles.length === 0) return {
    grade: "B", title: "육식 폭군 엔딩", emotion: "😑",
    comment: "채소는 장식이라고 생각하나? 고기만 세 종류… 자네 마라탕이 아니라 고기탕을 만들었군. 그래도 맛은 있겠어. B 주지.",
    gradeColor: "text-yellow-600", gradeBorder: "border-yellow-400", bg: "from-yellow-200 to-yellow-100",
  };

  if (veggies.length >= 2 && meats.length === 0 && noodles.length === 0) return {
    grade: "C", title: "건강식 집착 엔딩", emotion: "😑",
    comment: "마라탕에 웬 샐러드 콘셉트야? 건강은 좋지만… 이건 그냥 채소 수프 아닌가? 마라의 정수가 없어. C 주겠네.",
    gradeColor: "text-green-600", gradeBorder: "border-green-400", bg: "from-green-200 to-green-100",
  };

  if (noodles.length >= 2 && meats.length === 0 && veggies.length === 0) return {
    grade: "B+", title: "탄수화물 과몰입 엔딩", emotion: "😲",
    comment: "면이 좋은 건 알겠는데… 이건 마라탕인가 탄수화물 집합소인가? 나름 독창적이야. B+ 주지.",
    gradeColor: "text-blue-600", gradeBorder: "border-blue-400", bg: "from-blue-200 to-blue-100",
  };

  if (meats.length >= 1 && veggies.length >= 1 && noodles.length >= 1) return {
    grade: "A+", title: "마라 고수 엔딩", emotion: "😊",
    comment: "완벽해! 고기의 풍미, 채소의 신선함, 면의 쫄깃함이 조화롭게 어우러졌군! 자네야말로 진정한 마라탕 고수야! A+ 주겠네!",
    gradeColor: "text-purple-600", gradeBorder: "border-purple-400", bg: "from-purple-200 to-purple-100",
  };

  return {
    grade: "B-", title: "평범한 마라탕 엔딩", emotion: "😑",
    comment: "흠… 나쁘지 않군. 그냥 평범한 마라탕이야. 좀 더 균형을 맞춰보게. B- 주겠네.",
    gradeColor: "text-gray-600", gradeBorder: "border-gray-400", bg: "from-gray-200 to-gray-100",
  };
}


// ─────────────────────────────────────────────
//  Main Component
// ─────────────────────────────────────────────
export default function MaratangGame() {
  const [screen, setScreen]               = useState("title");
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [spiceLevel, setSpiceLevel]       = useState(null);
  const [selectedSauces, setSelectedSauces] = useState([]);
  const [ending, setEnding]               = useState(null);
  const [bowlPop, setBowlPop]             = useState(false);

  // ── helpers ──
  const toggleIngredient = (item) => {
    if (selectedIngredients.find(i => i.id === item.id)) {
      setSelectedIngredients(prev => prev.filter(i => i.id !== item.id));
    } else if (selectedIngredients.length < 14) {
      setSelectedIngredients(prev => [...prev, item]);
      setBowlPop(true);
      setTimeout(() => setBowlPop(false), 250);
    }
  };

  const toggleSauce = (id) =>
    setSelectedSauces(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );

  const submitResult = () => {
    setEnding(getEnding(selectedIngredients, spiceLevel, selectedSauces));
    setScreen("result");
  };

  const reset = () => {
    setSelectedIngredients([]);
    setSpiceLevel(null);
    setSelectedSauces([]);
    setEnding(null);
    setScreen("title");
  };

  // ══════════════════════════════════════════
  //  SCREEN 1 — TITLE
  // ══════════════════════════════════════════
  if (screen === "title") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-200 via-orange-100 to-amber-300 flex flex-col items-center justify-center p-4 relative overflow-hidden">
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
            {/* character placeholder — replace <img> src with real image later */}
            {/* <img src="/professor.png" alt="교수님" className="w-20 h-20 rounded-full border-4 border-orange-400 object-cover" /> */}
            <div className="w-20 h-20 rounded-full border-4 border-orange-400 bg-orange-200 flex items-center justify-center text-4xl flex-shrink-0 shadow-md">
              👨‍🏫
            </div>
            <div className="relative bg-sky-100 border-2 border-sky-300 rounded-2xl rounded-tl-none p-3 shadow">
              {/* bubble tail */}
              <div className="absolute -left-3 top-4 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-sky-300"/>
              <p className="text-xs font-bold text-gray-800 leading-relaxed">
                마라탕으로 승부를 결정하자!<br/>
                진정한 <span className="text-red-600 font-black">마라탕</span>을<br/>맛 보여주겠어!
              </p>
            </div>
          </div>

          {/* title text */}
          <div className="text-center mb-7">
            <p className="text-sm font-bold text-gray-500 mb-1">🎓 대학가 전설의</p>
            <h1 className="text-2xl font-black text-red-700 leading-tight drop-shadow-sm">
              교수님도 울고 갈<br/>
              <span className="text-3xl text-orange-600">마라탕 시뮬레이터</span>
            </h1>
          </div>

          {/* buttons */}
          <div className="flex flex-col gap-3">
            <button
              onClick={() => setScreen("ingredients")}
              className="w-full bg-red-500 hover:bg-red-600 active:scale-95 active:border-b-0 active:translate-y-1
                         text-white font-black text-xl py-4 rounded-2xl
                         border-b-4 border-red-800 shadow-md transition-all duration-75">
              🍜 &nbsp;게임 시작
            </button>
            <button
              onClick={() => setScreen("instructions")}
              className="w-full bg-orange-400 hover:bg-orange-500 active:scale-95 active:border-b-0 active:translate-y-1
                         text-white font-black text-xl py-4 rounded-2xl
                         border-b-4 border-orange-700 shadow-md transition-all duration-75">
              📖 &nbsp;게임 방법
            </button>
          </div>
        </div>

        <p className="relative z-10 mt-5 text-orange-700 text-xs font-bold opacity-60">© 2024 Animal League</p>
      </div>
    );
  }

  // ══════════════════════════════════════════
  //  SCREEN 2 — INSTRUCTIONS
  // ══════════════════════════════════════════
  if (screen === "instructions") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-200 via-orange-100 to-amber-300 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-sm">
          {/* panel header */}
          <div className="bg-green-800 border-4 border-green-900 rounded-t-2xl text-white text-center py-3 font-black text-xl tracking-widest shadow-lg">
            게 임 방 법
          </div>

          <div className="bg-amber-50 border-4 border-green-800 border-t-0 rounded-b-2xl shadow-2xl px-6 py-6">
            {/* decorative mandu row */}
            <div className="flex justify-center gap-1 mb-5 text-2xl select-none">
              {Array.from({length:8}).map((_,i)=><span key={i}>🥟</span>)}
            </div>

            <ol className="space-y-4">
              {[
                {
                  n:"1",
                  text:<>재료 선택 → 맵기 선택 → 소스 선택의 <strong>3단계</strong>를 차례로 진행한다.</>,
                },
                {
                  n:"2",
                  text:<>단계별로 ▶ 버튼을 눌러 다음 단계로 간다.<br/>재료 최소 <strong>5개</strong>, 소스 최소 <strong>2개</strong> 이상 선택해야 한다.</>,
                },
                {
                  n:"3",
                  text:<>마라탕 맛은 재료·맵기·소스 조합에 따라 결정되며, 교수님의 <span className="text-red-600 font-black">학점</span>이 결정된다!</>,
                },
              ].map(({n,text})=>(
                <li key={n} className="flex gap-3">
                  <span className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center font-black text-xs flex-shrink-0 mt-0.5">{n}</span>
                  <p className="text-sm text-gray-800 leading-relaxed">{text}</p>
                </li>
              ))}
            </ol>

            {/* decorative mandu row */}
            <div className="flex justify-center gap-1 mt-5 mb-5 text-2xl select-none">
              {Array.from({length:8}).map((_,i)=><span key={i}>🥟</span>)}
            </div>

            <button
              onClick={() => setScreen("title")}
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

  // ══════════════════════════════════════════
  //  SCREEN 3 — INGREDIENTS
  // ══════════════════════════════════════════
  if (screen === "ingredients") {
    const canProceed = selectedIngredients.length >= 5;
    const ALL_ITEMS = [...MEATS, ...VEGGIES, ...NOODLES, ...OTHERS, ...TRAPS];
    const row1 = ALL_ITEMS.slice(0, 7);
    const row2 = ALL_ITEMS.slice(7, 14);

    return (
      <div
        className="min-h-screen flex flex-col overflow-hidden select-none"
        style={{ background: "linear-gradient(160deg, #8B5CF6 0%, #7C3AED 40%, #6D28D9 100%)" }}
      >
        {/* ── 중앙: 스크롤 타이틀 + 그릇 + 다음 버튼 ── */}
        <div className="flex-1 flex items-center justify-center relative px-2 pt-4 pb-2">

          {/* 왼쪽 스크롤 족자 */}
          <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
            {/* 족자 상단 봉 */}
            <div className="w-12 h-3 rounded-full mx-auto shadow-md"
              style={{ background: "linear-gradient(90deg, #92400E, #D97706, #92400E)" }} />
            {/* 족자 본문 */}
            <div className="flex flex-col items-center py-3 px-2 border-4 shadow-xl"
              style={{
                background: "linear-gradient(180deg, #FEF3C7 0%, #FDE68A 50%, #FEF3C7 100%)",
                borderColor: "#92400E",
                minHeight: "120px",
              }}>
              {"재료선택".split("").map((ch, i) => (
                <span key={i} className="font-black text-amber-900 leading-tight" style={{ fontSize: "13px" }}>
                  {ch}
                </span>
              ))}
            </div>
            {/* 족자 하단 봉 */}
            <div className="w-12 h-3 rounded-full mx-auto shadow-md"
              style={{ background: "linear-gradient(90deg, #92400E, #D97706, #92400E)" }} />
          </div>

          {/* ── 중앙 마라탕 그릇 ── */}
          <div className={`transition-transform duration-200 ${bowlPop ? "scale-105" : "scale-100"}`}>
            {/* 실제 이미지로 교체 시: <img src="/bowl_maratang.png" alt="마라탕 그릇" className="w-64 h-56 object-contain drop-shadow-2xl" /> */}
            <div className="relative" style={{ width: "260px", height: "220px" }}>

              {/* 그릇 테두리 장식 띠 (상단 림) */}
              <div
                className="absolute left-0 right-0 rounded-full shadow-lg z-10"
                style={{
                  top: "12px",
                  height: "44px",
                  background: "linear-gradient(180deg, #C2410C 0%, #B45309 40%, #92400E 100%)",
                  border: "3px solid #7C2D12",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.4), inset 0 2px 4px rgba(255,255,255,0.15)",
                }}
              />
              {/* 림 안쪽 하이라이트 */}
              <div
                className="absolute left-4 right-4 rounded-full z-20"
                style={{
                  top: "16px",
                  height: "14px",
                  background: "linear-gradient(180deg, rgba(255,200,150,0.4) 0%, transparent 100%)",
                }}
              />

              {/* 그릇 몸통 */}
              <div
                className="absolute left-0 right-0 overflow-hidden z-0"
                style={{
                  top: "32px",
                  bottom: "0",
                  borderRadius: "0 0 50% 50%",
                  background: "linear-gradient(180deg, #C2410C 0%, #9A3412 40%, #7C2D12 100%)",
                  border: "3px solid #7C2D12",
                  borderTop: "none",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.5), inset -8px 0 20px rgba(0,0,0,0.2)",
                }}
              >
                {/* 고추 장식 (오른쪽) */}
                <div className="absolute right-6 top-8 text-lg opacity-30 rotate-12">🌶️</div>
                <div className="absolute right-12 top-16 text-sm opacity-20 -rotate-6">🌶️</div>

                {/* 국물 */}
                <div
                  className="absolute left-0 right-0 bottom-0"
                  style={{
                    height: "75%",
                    background: "linear-gradient(180deg, #B91C1C 0%, #7F1D1D 100%)",
                    borderRadius: "0 0 50% 50%",
                    opacity: 0.95,
                  }}
                />

                {/* 재료 이모지 */}
                <div
                  className="absolute inset-0 flex flex-wrap items-center justify-center gap-1 px-8"
                  style={{ paddingTop: "45%" }}
                >
                  {selectedIngredients.map((ing, i) => (
                    <span
                      key={ing.id}
                      className="leading-none drop-shadow"
                      style={{ fontSize: "22px", transform: `rotate(${(i * 43) % 360}deg)` }}
                    >
                      {/* 재료 이미지로 교체 시: <img src={`/ingredients/${ing.id}.png`} alt={ing.name} className="w-6 h-6 object-contain" /> */}
                      {ing.emoji}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 오른쪽: 개수 상태 + ▶ 다음 버튼 */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3">
            <div
              className={`text-xs font-black px-2 py-1 rounded-full text-center leading-tight shadow ${
                canProceed ? "bg-green-400 text-white" : "bg-white/90 text-purple-900"
              }`}
              style={{ minWidth: "48px" }}
            >
              {selectedIngredients.length}<br/>/14
            </div>
            <button
              onClick={() => setScreen("spice")}
              disabled={!canProceed}
              className="w-14 h-14 rounded-full flex items-center justify-center text-white text-2xl font-black
                         shadow-lg active:scale-90 transition-all duration-75 border-4"
              style={{
                background: canProceed
                  ? "linear-gradient(135deg, #F97316, #EA580C)"
                  : "linear-gradient(135deg, #9CA3AF, #6B7280)",
                borderColor: canProceed ? "#C2410C" : "#4B5563",
                boxShadow: canProceed ? "0 4px 0 #9A3412" : "0 4px 0 #374151",
              }}
            >
              ▶
            </button>
          </div>
        </div>

        {/* ── 하단 상태 텍스트 ── */}
        <div className="text-center pb-1">
          <span className="text-white/80 text-xs font-bold">
            {canProceed
              ? `✅ ${selectedIngredients.length}개 선택됨 — ▶ 버튼으로 다음 단계`
              : `재료를 ${5 - selectedIngredients.length}개 더 선택하세요 (최소 5개)`}
          </span>
        </div>

        {/* ── 하단 재료 버튼 2행 ── */}
        <div
          className="px-2 py-3 border-t-4"
          style={{
            background: "linear-gradient(180deg, rgba(109,40,217,0.6) 0%, rgba(76,29,149,0.8) 100%)",
            borderColor: "#4C1D95",
          }}
        >
          {[row1, row2].map((row, ri) => (
            <div key={ri} className={`flex gap-1.5 justify-center ${ri === 0 ? "mb-1.5" : ""}`}>
              {row.map((item) => {
                const isSelected = !!selectedIngredients.find((i) => i.id === item.id);
                return (
                  <button
                    key={item.id}
                    onClick={() => toggleIngredient(item)}
                    className="flex flex-col items-center justify-center gap-0.5 rounded-lg font-bold
                               transition-all duration-75 active:scale-90 flex-1"
                    style={{
                      minWidth: 0,
                      paddingTop: "6px",
                      paddingBottom: "6px",
                      fontSize: "10px",
                      border: isSelected ? "2px solid #CA8A04" : "2px solid #CA8A04",
                      borderBottom: isSelected ? "4px solid #A16207" : "4px solid #A16207",
                      background: isSelected
                        ? "linear-gradient(180deg, #FDE047 0%, #EAB308 100%)"
                        : "linear-gradient(180deg, #FEF08A 0%, #FDE047 100%)",
                      color: "#713F12",
                      boxShadow: isSelected
                        ? "inset 0 1px 2px rgba(255,255,255,0.6)"
                        : "0 2px 4px rgba(0,0,0,0.3)",
                    }}
                  >
                    {/* 재료 이미지로 교체 시: <img src={`/ingredients/${item.id}.png`} alt={item.name} className="w-7 h-7 object-contain" /> */}
                    <span style={{ fontSize: "18px", lineHeight: 1 }}>{item.emoji}</span>
                    <span style={{ fontSize: "9px", lineHeight: 1.2, textAlign: "center" }}>{item.name}</span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ══════════════════════════════════════════
  //  SCREEN 4 — SPICE
  // ══════════════════════════════════════════
  if (screen === "spice") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-red-100 to-orange-200 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-sm">
          <div className="bg-red-700 border-4 border-red-900 rounded-t-2xl text-white text-center py-3 font-black text-xl tracking-widest shadow-lg">
            🌶️ 맵기 선택
          </div>
          <div className="bg-orange-50 border-4 border-red-700 border-t-0 rounded-b-2xl shadow-2xl px-5 py-6">

            {/* face preview */}
            <div className="text-center text-7xl mb-5">
              {spiceLevel !== null ? SPICE_LEVELS[spiceLevel].face : "🤔"}
            </div>

            <div className="space-y-2">
              {SPICE_LEVELS.map(sp => (
                <button
                  key={sp.level}
                  onClick={() => setSpiceLevel(sp.level)}
                  className={`
                    w-full flex items-center gap-4 px-4 py-3 rounded-xl border-2 font-bold
                    transition-all duration-75 active:scale-95
                    ${spiceLevel === sp.level
                      ? "bg-red-500 border-red-700 text-white scale-[1.02] shadow-lg border-b-4"
                      : "bg-white border-gray-300 text-gray-700 hover:bg-red-50 border-b-2"
                    }
                  `}>
                  <span className="w-24 text-left text-lg">
                    {sp.peppers === 0 ? "✨ 없음" : "🌶️".repeat(sp.peppers)}
                  </span>
                  <span className="flex-1 text-left">{sp.label}</span>
                  <span className="text-sm opacity-70">{sp.desc}</span>
                </button>
              ))}
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setScreen("ingredients")}
                className="flex-1 bg-gray-400 hover:bg-gray-500 active:scale-95 active:translate-y-1 active:border-b-0
                           text-white font-black py-3 rounded-2xl border-b-4 border-gray-700 shadow-md transition-all duration-75">
                ← 뒤로
              </button>
              <button
                onClick={() => setScreen("sauce")}
                disabled={spiceLevel === null}
                className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 disabled:cursor-not-allowed
                           active:scale-95 active:translate-y-1 active:border-b-0
                           text-white font-black py-3 rounded-2xl
                           border-b-4 border-orange-800 disabled:border-gray-600
                           shadow-md transition-all duration-75">
                다음 ▶
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ══════════════════════════════════════════
  //  SCREEN 5 — SAUCE
  // ══════════════════════════════════════════
  if (screen === "sauce") {
    const canSubmit = selectedSauces.length >= 2;
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-100 to-yellow-200 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-sm">
          <div className="bg-amber-700 border-4 border-amber-900 rounded-t-2xl text-white text-center py-3 font-black text-xl tracking-widest shadow-lg">
            🥢 소스 선택
          </div>
          <div className="bg-amber-50 border-4 border-amber-700 border-t-0 rounded-b-2xl shadow-2xl px-5 py-6">

            <p className="text-center text-sm text-gray-500 mb-4">
              최소 2개 이상 선택 ({selectedSauces.length}/6)
            </p>

            <div className="grid grid-cols-3 gap-3">
              {SAUCES.map(sauce => {
                const isSel = selectedSauces.includes(sauce.id);
                return (
                  <button
                    key={sauce.id}
                    onClick={() => toggleSauce(sauce.id)}
                    className={`
                      flex flex-col items-center gap-2 py-4 rounded-2xl border-2 font-bold text-sm
                      transition-all duration-75 active:scale-90
                      ${isSel
                        ? "bg-amber-400 border-amber-600 text-white scale-105 shadow-lg border-b-4"
                        : "bg-white border-gray-300 text-gray-700 hover:bg-amber-50 border-b-2"
                      }
                    `}>
                    {/* <img src={`/sauces/${sauce.id}.png`} alt={sauce.name} className="w-10 h-10 object-contain" /> */}
                    <span className="text-3xl">{sauce.emoji}</span>
                    <span className="text-xs leading-tight text-center">{sauce.name}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setScreen("spice")}
                className="flex-1 bg-gray-400 hover:bg-gray-500 active:scale-95 active:translate-y-1 active:border-b-0
                           text-white font-black py-3 rounded-2xl border-b-4 border-gray-700 shadow-md transition-all duration-75">
                ← 뒤로
              </button>
              <button
                onClick={submitResult}
                disabled={!canSubmit}
                className="flex-1 bg-red-500 hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed
                           active:scale-95 active:translate-y-1 active:border-b-0
                           text-white font-black py-3 rounded-2xl
                           border-b-4 border-red-800 disabled:border-gray-600
                           shadow-md transition-all duration-75">
                🎓 평가받기!
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ══════════════════════════════════════════
  //  SCREEN 6 — RESULT
  // ══════════════════════════════════════════
  if (screen === "result" && ending) {
    return (
      <div className={`min-h-screen bg-gradient-to-b ${ending.bg} flex flex-col items-center justify-center p-4`}>
        <div className="w-full max-w-sm">

          {/* exam paper card */}
          <div className="bg-white border-4 border-gray-400 rounded-2xl shadow-2xl overflow-hidden">

            {/* header */}
            <div className="bg-gray-800 text-white text-center py-2 px-4 font-black text-sm tracking-widest">
              ◆ 마라탕 최종 평가서 ◆
            </div>

            {/* stamp line */}
            <div className="bg-gray-100 border-b-2 border-gray-300 text-center text-xs text-gray-500 py-1 font-mono">
              마라탕학과 &nbsp;|&nbsp; 담당교수: 박마라 교수
            </div>

            <div className="p-5">

              {/* professor + speech */}
              <div className="flex items-start gap-3 mb-5">
                {/* <img src={`/professor_${ending.emotion}.png`} alt="교수님" className="w-16 h-16 rounded-full border-4 border-gray-300 object-cover flex-shrink-0" /> */}
                <div className="w-16 h-16 rounded-full bg-gray-200 border-4 border-gray-300 flex items-center justify-center text-4xl flex-shrink-0 shadow">
                  {ending.emotion}
                </div>
                <div className="flex-1 relative">
                  <div className="absolute -left-3 top-4 w-0 h-0
                    border-t-6 border-t-transparent border-b-6 border-b-transparent border-r-6 border-r-gray-200"/>
                  <div className="bg-gray-100 border border-gray-200 rounded-2xl rounded-tl-none p-3 text-xs text-gray-800 leading-relaxed shadow-inner">
                    {ending.comment}
                  </div>
                </div>
              </div>

              {/* grade box */}
              <div className="border-2 border-gray-300 rounded-xl p-4 mb-5 bg-gray-50">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">엔딩</p>
                    <p className="font-black text-base text-gray-800">{ending.title}</p>
                  </div>
                  <div className={`w-20 h-20 rounded-xl border-4 ${ending.gradeBorder} flex items-center justify-center`}>
                    <span className={`text-4xl font-black ${ending.gradeColor}`}>{ending.grade}</span>
                  </div>
                </div>

                {/* summary */}
                <div className="border-t border-gray-200 pt-3 space-y-1.5 text-xs text-gray-600">
                  <p><span className="font-bold text-gray-700">선택 재료:</span> {selectedIngredients.map(i=>i.name).join(", ")}</p>
                  <p>
                    <span className="font-bold text-gray-700">맵기:</span>&nbsp;
                    {SPICE_LEVELS[spiceLevel]?.label} — {SPICE_LEVELS[spiceLevel]?.desc}
                    &nbsp;{SPICE_LEVELS[spiceLevel]?.face}
                  </p>
                  <p><span className="font-bold text-gray-700">소스:</span> {SAUCES.filter(s=>selectedSauces.includes(s.id)).map(s=>s.name).join(", ")}</p>
                </div>
              </div>

              {/* maratang image placeholder */}
              {/* <img src="/result_maratang.png" alt="완성된 마라탕" className="w-full rounded-xl mb-4 border-2 border-gray-200 object-cover h-32" /> */}
              <div className="w-full h-24 rounded-xl mb-4 border-2 border-gray-200 bg-gradient-to-r from-red-100 to-orange-100 flex items-center justify-center gap-2 text-3xl">
                🫕🌶️🥢
              </div>

              {/* retry button */}
              <button
                onClick={reset}
                className="w-full bg-red-500 hover:bg-red-600 active:scale-95 active:translate-y-1 active:border-b-0
                           text-white font-black text-xl py-4 rounded-2xl
                           border-b-4 border-red-800 shadow-md transition-all duration-75">
                🔄 다시 도전!
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
