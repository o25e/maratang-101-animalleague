// ─── 재료 타입 ───────────────────────────────────────────────────────────────
export type IngredientType = "meat" | "veggie" | "noodle" | "other" | "trap";

export interface Ingredient {
  id: string;
  name: string;
  emoji: string;
  image: string;
  type: IngredientType;
  position: { top: string; left: string; width: string };
}

// ─── 소스 ────────────────────────────────────────────────────────────────────
export interface Sauce {
  id: string;
  name: string;
  emoji: string;
  image: string;
}

// ─── 맵기 단계 ────────────────────────────────────────────────────────────────
export interface SpiceLevel {
  level: number;
  label: string;
  desc: string;
  peppers: number;
  face: string;
}

// ─── 엔딩 결과 ────────────────────────────────────────────────────────────────
export interface Ending {
  grade: string;
  title: string;
  emotion: string;
  comment: string;
  gradeColor: string;
  gradeBorder: string;
  bg: string;
}

// ─── 화면 라우팅 ──────────────────────────────────────────────────────────────
export type GameScreen =
  | "title"
  | "instructions"
  | "ingredients"
  | "spice"
  | "sauce"
  | "result";
