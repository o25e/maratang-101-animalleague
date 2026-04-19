import { Ingredient, Sauce, SpiceLevel } from "../types/game";

// ─── 재료 ─────────────────────────────────────────────────────────────────────
export const MEATS: Ingredient[] = [
  { id: "beef",    name: "소고기", emoji: "🥩", image: "/img/meet.png",    type: "meat",   position: { top: "32%", left: "28%", width: "90px" } },
  { id: "spam",    name: "스팸",   emoji: "🥫", image: "/img/spam.png",    type: "meat",   position: { top: "38%", left: "63%", width: "80px" } },
  { id: "sausage", name: "소세지", emoji: "🌭", image: "/img/sausage.png", type: "meat",   position: { top: "28%", left: "52%", width: "84px" } },
];

export const VEGGIES: Ingredient[] = [
  { id: "bokchoy", name: "청경채", emoji: "🥬", image: "/img/vege.png",    type: "veggie", position: { top: "35%", left: "18%", width: "76px" } },
  { id: "sprouts", name: "숙주",   emoji: "🌱", image: "/img/sprouts.png", type: "veggie", position: { top: "42%", left: "38%", width: "80px" } },
  { id: "cabbage", name: "배추",   emoji: "🥗", image: "/img/cabbage.png", type: "veggie", position: { top: "25%", left: "68%", width: "78px" } },
];

export const NOODLES: Ingredient[] = [
  { id: "bunmoja",  name: "분모자",   emoji: "🍢", image: "/img/bunmoja.png", type: "noodle", position: { top: "42%", left: "50%", width: "74px" } },
  { id: "dangmyun", name: "중국당면", emoji: "🍜", image: "/img/china.png",   type: "noodle", position: { top: "40%", left: "25%", width: "76px" } },
  { id: "corn",     name: "옥수수면", emoji: "🌽", image: "/img/cone.png",    type: "noodle", position: { top: "30%", left: "40%", width: "105px" } },
];

export const OTHERS: Ingredient[] = [
  { id: "sweetrice",   name: "고구마떡", emoji: "🍡", image: "/img/tteok.png", type: "other", position: { top: "28%", left: "22%", width: "68px" } },
  { id: "cheesetteok", name: "연근",   emoji: "", image: "/img/lotusroot.png",   type: "other", position: { top: "30%", left: "44%", width: "72px" } },
  { id: "tofu",        name: "두부",     emoji: "⬜", image: "/img/tofu.png",   type: "other", position: { top: "18%", left: "50%", width: "76px" } },
];

export const TRAPS: Ingredient[] = [
  { id: "mintchoco", name: "초콜릿", emoji: "🍫", image: "/img/chocolate.png",     type: "trap", position: { top: "22%", left: "34%", width: "66px" } },
  { id: "mushroom",  name: "팽이버섯", emoji: "🍄", image: "/img/mushroom.png", type: "trap", position: { top: "30%", left: "62%", width: "70px" } },
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
  { id: "peanut",     name: "땅콩소스", emoji: "🥜", image: "/img/peanut.png"      },
  { id: "buldak",     name: "불닭소스", emoji: "🌶️", image: "/img/buldak.png"    },
  { id: "chilioil",   name: "고추기름", emoji: "🌶️", image: "/img/spicy.png"    },
  { id: "mintchoco",  name: "민트초코", emoji: "🍫", image: "/img/mint.png"      },
  { id: "cilantro",   name: "고수",     emoji: "🌿", image: "/img/cilantro.png"     },
  { id: "greenonion", name: "대파",     emoji: "🧅", image: "/img/leek.png"  },
];

// ─── 맵기 단계 ────────────────────────────────────────────────────────────────
export const SPICE_LEVELS: SpiceLevel[] = [
  { level: 0, label: "0단계", desc: "순한맛",      peppers: 0, face: "😊" },
  { level: 1, label: "1단계", desc: "약간 매운맛", peppers: 1, face: "🙂" },
  { level: 2, label: "2단계", desc: "보통 매운맛", peppers: 2, face: "😅" },
  { level: 3, label: "3단계", desc: "많이 매운맛", peppers: 3, face: "😰" },
  { level: 4, label: "4단계", desc: "불지옥맛",    peppers: 4, face: "🔥" },
];
