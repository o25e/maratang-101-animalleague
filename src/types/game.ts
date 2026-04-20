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
  position: { top: string; left: string; width: string };
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
  comments: [string, string, string]; // [재료, 맵기, 소스]
  gradeColor: string;
  gradeBorder: string;
  bg: string;
  score: number;
  professorImage: string;
}

// ─── 유저 & 랭킹 ─────────────────────────────────────────────────────────────
export interface UserInfo {
  id: string;
  university: string;
}

export interface RankEntry {
  id: string;
  university: string;
  high_score: number;
  play_count: number;
}

// ─── 화면 라우팅 ──────────────────────────────────────────────────────────────
export type GameScreen =
  | "title"
  | "instructions"
  | "manual"
  | "ingredients"
  | "spice"
  | "sauce"
  | "tasting"
  | "result";
