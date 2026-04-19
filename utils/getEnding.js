export function getEnding(ingredients, spiceLevel, sauces) {
  const hasTrap     = ingredients.some(i => i.type === "trap");
  const meats       = ingredients.filter(i => i.type === "meat");
  const veggies     = ingredients.filter(i => i.type === "veggie");
  const noodles     = ingredients.filter(i => i.type === "noodle");
  const hasCilantro = sauces.includes("cilantro");

  if (hasTrap) return {
    grade: "F", title: "퇴학 엔딩", emotion: "😡",
    comment: "이게 마라탕이야, 장난이야?! 초콜릿은 디저트고 팽이버섯은… 잠깐, 이거 먹으면 죽어? 자네 퇴학 처리야. 다시는 내 강의실 오지 말게.",
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
