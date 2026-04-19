import { Ingredient, Sauce, SpiceLevel } from "../types/game";

// ─── 재료 ─────────────────────────────────────────────────────────────────────
export const MEATS: Ingredient[] = [
  { id: "beef",    name: "소고기", emoji: "🥩", image: "/img/meet.webp",    type: "meat",   position: { top: "30%", left: "28%", width: "90px" } },
  { id: "spam",    name: "스팸",   emoji: "🥫", image: "/img/spam.webp",    type: "meat",   position: { top: "30%", left: "61%", width: "80px" } },
  { id: "sausage", name: "소세지", emoji: "🌭", image: "/img/sausage.webp", type: "meat",   position: { top: "28%", left: "51%", width: "84px" } },
];

export const VEGGIES: Ingredient[] = [
  { id: "bokchoy", name: "청경채", emoji: "🥬", image: "/img/vege.webp",    type: "veggie", position: { top: "28%", left: "22%", width: "76px" } },
  { id: "sprouts", name: "숙주",   emoji: "🌱", image: "/img/sprouts.webp", type: "veggie", position: { top: "23%", left: "38%", width: "110px" } },
  { id: "cabbage", name: "배추",   emoji: "🥗", image: "/img/cabbage.webp", type: "veggie", position: { top: "27%", left: "65%", width: "73px" } },
];

export const NOODLES: Ingredient[] = [
  { id: "bunmoja",  name: "분모자",   emoji: "🍢", image: "/img/bunmoja.webp", type: "noodle", position: { top: "36%", left: "50%", width: "74px" } },
  { id: "dangmyun", name: "중국당면", emoji: "🍜", image: "/img/china.webp",   type: "noodle", position: { top: "34%", left: "32%", width: "77px" } },
  { id: "corn",     name: "옥수수면", emoji: "🌽", image: "/img/cone.webp",    type: "noodle", position: { top: "28%", left: "40%", width: "105px" } },
];

export const OTHERS: Ingredient[] = [
  { id: "sweetrice",   name: "고구마떡", emoji: "🍡", image: "/img/tteok.webp", type: "other", position: { top: "19%", left: "30%", width: "75px" } },
  { id: "cheesetteok", name: "연근",   emoji: "", image: "/img/lotusroot.webp",   type: "other", position: { top: "30%", left: "44%", width: "80px" } },
  { id: "tofu",        name: "두부",     emoji: "⬜", image: "/img/tofu.webp",   type: "other", position: { top: "18%", left: "50%", width: "76px" } },
];

export const TRAPS: Ingredient[] = [
  { id: "choco", name: "초콜릿", emoji: "🍫", image: "/img/chocolate.webp",     type: "trap", position: { top: "20%", left: "36%", width: "66px" } },
  { id: "mushroom",  name: "팽이버섯", emoji: "🍄", image: "/img/mushroom.webp", type: "trap", position: { top: "31%", left: "60%", width: "72px" } },
];

export const ALL_ITEMS: Ingredient[] = [
  ...MEATS,
  ...VEGGIES,
  ...NOODLES,
  ...OTHERS,
  ...TRAPS,
];

// ─── 소스 ─────────────────────────────────────────────────────────────────────
export const SAUCES: Sauce[] = [
  { id: "peanut",     name: "땅콩소스", emoji: "🥜", image: "/img/peanut.webp",    position: { top: "36%", left: "28%", width: "120px" } },
  { id: "buldak",     name: "불닭소스", emoji: "🌶️", image: "/img/buldak.webp",   position: { top: "39%", left: "42%", width: "100px" } },
  { id: "chilioil",   name: "고추기름", emoji: "🌶️", image: "/img/spicy.webp",    position: { top: "37%", left: "42%", width: "48px" } },
  { id: "mintchoco",  name: "민트초코", emoji: "🍫", image: "/img/mint.webp",      position: { top: "38%", left: "55%", width: "55px" } },
  { id: "cilantro",   name: "고수",     emoji: "🌿", image: "/img/cilantro.webp",  position: { top: "40%", left: "26%", width: "64px" } },
  { id: "greenonion", name: "대파",     emoji: "🧅", image: "/img/leek.webp",      position: { top: "42%", left: "35%", width: "90px" } },
];

// ─── 맵기 단계 ────────────────────────────────────────────────────────────────
export const SPICE_LEVELS: SpiceLevel[] = [
  { level: 0, label: "0단계", desc: "순한맛",      peppers: 0, face: "😊" },
  { level: 1, label: "1단계", desc: "약간 매운맛", peppers: 1, face: "🙂" },
  { level: 2, label: "2단계", desc: "보통 매운맛", peppers: 2, face: "😅" },
  { level: 3, label: "3단계", desc: "많이 매운맛", peppers: 3, face: "😰" },
  { level: 4, label: "4단계", desc: "불지옥맛",    peppers: 4, face: "🔥" },
];
