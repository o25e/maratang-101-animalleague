import { Ingredient, Ending } from "../types/game";

const PROFESSOR_IMAGES = {
  bad:      "/img/professor_bad.png",
  soso:     "/img/professor_soso.png",
  smile:    "/img/professor_smile.png",
  happy:    "/img/professor_happy.png",
  surprise: "/img/professor_surprise.png",
} as const;

export function getProfessorImage(score: number): string {
  if (score < 15)  return PROFESSOR_IMAGES.surprise;
  if (score <= 20) return PROFESSOR_IMAGES.bad;
  if (score <= 50) return PROFESSOR_IMAGES.soso;
  if (score <= 80) return PROFESSOR_IMAGES.smile;
  return PROFESSOR_IMAGES.happy;
}

export function getEnding(
  ingredients: Ingredient[],
  spiceLevel: number | null,
  sauces: string[],
): Ending {
  // ── 즉시 판정: 민트초코 재료 또는 소스 ──────────────────────────
  if (ingredients.some((i) => i.id === "choco") || sauces.includes("mintchoco")) {
    return {
      grade: "F",
      title: "최악의 선택 엔딩",
      emotion: "🤮",
      comment: "마라탕에 초콜릿이라니 제정신인가? 재료 선택이 엉망이군!",
      comments: [
        "마라탕에 초콜릿이라니 제정신인가?",
        "재료 선택이 엉망이군!",
        "이런 걸 마라탕이라고 가져오다니...",
      ],
      gradeColor: "text-red-700",
      gradeBorder: "border-red-600",
      bg: "from-red-300 to-red-100",
      score: 0,
      professorImage: PROFESSOR_IMAGES.surprise,
    };
  }

  // ── 점수 계산 ────────────────────────────────────────────────────
  let score = 50;

  const meats       = ingredients.filter((i) => i.type === "meat");
  const veggies     = ingredients.filter((i) => i.type === "veggie");
  const hasBokchoy  = veggies.some((v) => v.id === "bokchoy");
  const hasMushroom = ingredients.some((i) => i.id === "mushroom");
  const hasChiliOil   = sauces.includes("chilioil");
  const hasPeanut     = sauces.includes("peanut");
  const hasGreenOnion = sauces.includes("greenonion");
  const noVeggieAtAll = veggies.length === 0 && !hasMushroom;

  // 육류
  if (meats.length >= 3)       score += 25;
  else if (meats.length === 2) score += 15;
  else if (meats.length === 1) score += 5;
  else                         score -= 10;

  // 채소
  if (hasBokchoy && hasMushroom)                                 score -= 20;
  else if ((hasBokchoy || hasMushroom) && meats.length === 0)    score -= 15;
  else if ((hasBokchoy || hasMushroom) && meats.length >= 2)     score += 5;
  else if (noVeggieAtAll && meats.length >= 2)                   score += 20;

  // 맵기
  if      (spiceLevel === null || spiceLevel === 0) score -= 15;
  else if (spiceLevel === 1)                        score -= 10;
  else if (spiceLevel === 3)                        score += 20;
  else if (spiceLevel === 4)                        score -= 15;

  // 소스
  const isGoldenCombo = hasPeanut && hasChiliOil && hasGreenOnion;
  if      (isGoldenCombo) score += 20;
  else if (!hasChiliOil)  score -= 10;
  else                    score += 5;

  score = Math.max(0, Math.min(100, score));

  // ── 3개 멘트 생성 ────────────────────────────────────────────────
  // 재료 멘트
  let ingredientComment: string;
  if (hasBokchoy && hasMushroom) {
    ingredientComment = "청경채에 팽이버섯까지... 내 취향이 아니야.";
  } else if ((hasBokchoy || hasMushroom) && meats.length === 0) {
    ingredientComment = "재료 구성이 엉망이군!";
  } else if ((hasBokchoy || hasMushroom) && meats.length >= 2) {
    ingredientComment = "나쁘지 않아.";
  } else if (noVeggieAtAll && meats.length >= 2) {
    ingredientComment = "채소 없이 육류만? 완벽해!";
  } else if (meats.length >= 3) {
    ingredientComment = "고기가 아주 푸짐하구먼!";
  } else if (meats.length === 2) {
    ingredientComment = "고기 선택은 나쁘지 않아.";
  } else if (meats.length === 1) {
    ingredientComment = "고기가 좀 적지 않나?";
  } else {
    ingredientComment = "고기도 없이 마라탕이라 할 수 있겠나?";
  }

  // 맵기 멘트
  let spiceComment: string;
  if      (spiceLevel === null || spiceLevel === 0) spiceComment = "너무 맹탕 아닌가?";
  else if (spiceLevel === 1)                        spiceComment = "음... 밍밍하구먼.";
  else if (spiceLevel === 2)                        spiceComment = "뭔가 부족해.";
  else if (spiceLevel === 3)                        spiceComment = "칼칼하고 좋군! 딱이야!";
  else                                              spiceComment = "너무 과해! 속 버리겠네.";

  // 소스 멘트
  let sauceComment: string;
  if      (isGoldenCombo) sauceComment = "아주 맛있군! 딱 내 취향이야!";
  else if (!hasChiliOil)  sauceComment = "뭔가 슴슴해.";
  else                    sauceComment = "소스는 기본은 갖췄군.";

  const comments: [string, string, string] = [ingredientComment, spiceComment, sauceComment];
  const comment = comments.join(" ");

  // ── 등급 판정 ────────────────────────────────────────────────────
  if (score >= 90) {
    return {
      grade: "A+", title: "마라탕 장인 엔딩", emotion: "🏆",
      comment, comments,
      gradeColor: "text-yellow-500", gradeBorder: "border-yellow-400", bg: "from-yellow-200 to-yellow-50",
      score, professorImage: PROFESSOR_IMAGES.happy,
    };
  }
  if (score >= 75) {
    return {
      grade: "A", title: "훌륭한 마라탕 엔딩", emotion: "😊",
      comment, comments,
      gradeColor: "text-green-600", gradeBorder: "border-green-400", bg: "from-green-200 to-green-50",
      score, professorImage: PROFESSOR_IMAGES.smile,
    };
  }
  if (score >= 60) {
    return {
      grade: "B+", title: "꽤 괜찮은 엔딩", emotion: "🙂",
      comment, comments,
      gradeColor: "text-blue-600", gradeBorder: "border-blue-400", bg: "from-blue-200 to-blue-50",
      score, professorImage: PROFESSOR_IMAGES.smile,
    };
  }
  if (score >= 45) {
    return {
      grade: "B", title: "그럭저럭 엔딩", emotion: "😑",
      comment, comments,
      gradeColor: "text-teal-600", gradeBorder: "border-teal-400", bg: "from-teal-200 to-teal-50",
      score, professorImage: PROFESSOR_IMAGES.soso,
    };
  }
  if (score >= 30) {
    return {
      grade: "C", title: "보통 마라탕 엔딩", emotion: "😕",
      comment, comments,
      gradeColor: "text-orange-500", gradeBorder: "border-orange-400", bg: "from-orange-200 to-orange-50",
      score, professorImage: PROFESSOR_IMAGES.soso,
    };
  }
  if (score >= 15) {
    return {
      grade: "D", title: "아쉬운 엔딩", emotion: "😞",
      comment, comments,
      gradeColor: "text-red-500", gradeBorder: "border-red-400", bg: "from-red-200 to-red-50",
      score, professorImage: PROFESSOR_IMAGES.bad,
    };
  }
  return {
    grade: "F", title: "낙제 엔딩", emotion: "😡",
    comment, comments,
    gradeColor: "text-red-700", gradeBorder: "border-red-600", bg: "from-red-300 to-red-100",
    score, professorImage: PROFESSOR_IMAGES.surprise,
  };
}
