import { Ingredient, Ending } from "../types/game";

const PROFESSOR_IMAGES = {
  bad:      "/img/professor_bad.webp",
  soso:     "/img/professor_soso.webp",
  smile:    "/img/professor_smile.webp",
  happy:    "/img/professor_happy.webp",
  surprise: "/img/professor_surprise.webp",
} as const;

export function getProfessorImage(score: number): string {
  if (score < 15) return PROFESSOR_IMAGES.surprise; // F
  if (score < 30) return PROFESSOR_IMAGES.bad;       // D
  if (score < 65) return PROFESSOR_IMAGES.soso;      // C, B-, B
  if (score < 95) return PROFESSOR_IMAGES.smile;     // B+, A-, A
  return PROFESSOR_IMAGES.happy;                     // A+
}

export function getEnding(
  ingredients: Ingredient[],
  spiceLevel: number | null,
  sauces: string[],
): Ending {
  // ── 즉시 판정: 민트초코 ──────────────────────────────────────────
  if (ingredients.some((i) => i.id === "choco") || sauces.includes("mintchoco")) {
    return {
      grade: "F",
      title: "최악의 선택 엔딩",
      emotion: "🤮",
      comment: "학계에서 퇴출감일세.",
      comments: ["학계에서 퇴출감일세.", "", ""],
      gradeColor: "text-red-700",
      gradeBorder: "border-red-600",
      bg: "from-red-300 to-red-100",
      score: 0,
      professorImage: PROFESSOR_IMAGES.surprise,
    };
  }

  // ── 점수 + 멘트 동시 계산 (같은 분기로 결정) ────────────────────
  let score = 50;

  const meats         = ingredients.filter((i) => i.type === "meat");
  const veggies       = ingredients.filter((i) => i.type === "veggie");
  const hasBokchoy    = veggies.some((v) => v.id === "bokchoy");
  const hasMushroom   = ingredients.some((i) => i.id === "mushroom");
  const hasChiliOil   = sauces.includes("chilioil");
  const hasPeanut     = sauces.includes("peanut");
  const hasGreenOnion = sauces.includes("greenonion");
  const hasCilantro   = sauces.includes("cilantro");
  const hasBuldak     = sauces.includes("buldak");
  const noVeggieAtAll = veggies.length === 0 && !hasMushroom;
  const isGoldenCombo = hasPeanut && hasChiliOil && hasGreenOnion && !hasCilantro && !hasBuldak;

  // 재료 (고기 + 채소 동시 판정)
  let ingredientComment: string;
  if (hasBokchoy && hasMushroom) {
    const meatBonus = meats.length >= 3 ? 25 : meats.length === 2 ? 15 : meats.length === 1 ? 5 : -10;
    score += meatBonus - 20;
    ingredientComment = "자네, 토끼인가?";
  } else if (meats.length === 0) {
    score += -10 + ((hasBokchoy || hasMushroom) ? -15 : 0);
    ingredientComment = "빈 수레가 요란하군.";
  } else if (noVeggieAtAll && meats.length >= 3) {
    score += 25 + 20;
    ingredientComment = "정석이군.";
  } else if (noVeggieAtAll && meats.length >= 2) {
    score += 15 + 20;
    ingredientComment = "나쁘지 않아.";
  } else if (meats.length >= 3) {
    score += 25 + ((hasBokchoy || hasMushroom) ? 5 : 0);
    ingredientComment = "푸짐하긴 하군.";
  } else if (meats.length === 2) {
    score += 15 + ((hasBokchoy || hasMushroom) ? 5 : 0);
    ingredientComment = "무난하군.";
  } else {
    // meats === 1: 부족하다는 평 → 점수 변동 없음
    ingredientComment = "부족해.";
  }

  // 맵기
  let spiceComment: string;
  if (spiceLevel === null || spiceLevel === 0) {
    score -= 15;
    spiceComment = "하품이 나오는군.";
  } else if (spiceLevel === 1) {
    score -= 10;
    spiceComment = "하품이 나오는군.";
  } else if (spiceLevel === 2) {
    spiceComment = "...";
  } else if (spiceLevel === 3) {
    score += 20;
    spiceComment = "심장이 뛰는군.";
  } else {
    score -= 15;
    spiceComment = "암살 시도인가?";
  }

  // 소스
  let sauceComment: string;
  if (hasCilantro || hasBuldak) {
    score -= 25;
    sauceComment = "우웩!!!";
  } else if (isGoldenCombo) {
    score += 20;
    sauceComment = "연금술이군.";
  } else if (!hasChiliOil) {
    score -= 10;
    sauceComment = "영혼이 없어.";
  } else {
    // 고추기름은 있으나 황금조합 미달 → 중립
    sauceComment = "부족해.";
  }

  score = Math.max(0, Math.min(100, score));

  const comments: [string, string, string] = [ingredientComment, spiceComment, sauceComment];
  const comment = comments.join(" ");

  // ── 등급 판정 ────────────────────────────────────────────────────
  if (score === 100) {
    return {
      grade: "A+", title: "마라탕 장인 엔딩", emotion: "🏆",
      comment: "이거지, 아주 완벽해.",
      comments: ["이거지, 아주 완벽해.", "", ""],
      gradeColor: "text-yellow-500", gradeBorder: "border-yellow-400", bg: "from-yellow-200 to-yellow-50",
      score, professorImage: PROFESSOR_IMAGES.happy,
    };
  }
  if (score >= 95) {
    return {
      grade: "A+", title: "마라탕 장인 엔딩", emotion: "🏆",
      comment, comments,
      gradeColor: "text-yellow-500", gradeBorder: "border-yellow-400", bg: "from-yellow-200 to-yellow-50",
      score, professorImage: PROFESSOR_IMAGES.happy,
    };
  }
  if (score >= 85) {
    return {
      grade: "A", title: "훌륭한 마라탕 엔딩", emotion: "😊",
      comment, comments,
      gradeColor: "text-green-600", gradeBorder: "border-green-400", bg: "from-green-200 to-green-50",
      score, professorImage: PROFESSOR_IMAGES.smile,
    };
  }
  if (score >= 75) {
    return {
      grade: "A-", title: "잘 만든 마라탕 엔딩", emotion: "🙂",
      comment, comments,
      gradeColor: "text-emerald-600", gradeBorder: "border-emerald-400", bg: "from-emerald-200 to-emerald-50",
      score, professorImage: PROFESSOR_IMAGES.smile,
    };
  }
  if (score >= 65) {
    return {
      grade: "B+", title: "꽤 괜찮은 엔딩", emotion: "😌",
      comment, comments,
      gradeColor: "text-blue-600", gradeBorder: "border-blue-400", bg: "from-blue-200 to-blue-50",
      score, professorImage: PROFESSOR_IMAGES.smile,
    };
  }
  if (score >= 55) {
    return {
      grade: "B", title: "그럭저럭 엔딩", emotion: "😑",
      comment, comments,
      gradeColor: "text-teal-600", gradeBorder: "border-teal-400", bg: "from-teal-200 to-teal-50",
      score, professorImage: PROFESSOR_IMAGES.soso,
    };
  }
  if (score >= 45) {
    return {
      grade: "B-", title: "평범한 마라탕 엔딩", emotion: "😐",
      comment, comments,
      gradeColor: "text-sky-600", gradeBorder: "border-sky-400", bg: "from-sky-200 to-sky-50",
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
