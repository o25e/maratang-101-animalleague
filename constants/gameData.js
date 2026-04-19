export const MEATS = [
  { id: "beef",    name: "소고기", emoji: "🥩", type: "meat" },
  { id: "spam",    name: "스팸",   emoji: "🥫", type: "meat" },
  { id: "sausage", name: "소세지", emoji: "🌭", type: "meat" },
];

export const VEGGIES = [
  { id: "bokchoy",  name: "청경채", emoji: "🥬", type: "veggie" },
  { id: "sprouts",  name: "숙주",   emoji: "🌱", type: "veggie" },
  { id: "cabbage",  name: "배추",   emoji: "🥗", type: "veggie" },
];

export const NOODLES = [
  { id: "bunmoja",  name: "분모자",   emoji: "🍢", type: "noodle" },
  { id: "dangmyun", name: "중국당면", emoji: "🍜", type: "noodle" },
  { id: "corn",     name: "옥수수면", emoji: "🌽", type: "noodle" },
];

export const OTHERS = [
  { id: "sweetrice",   name: "고구마떡", emoji: "🍡", type: "other" },
  { id: "cheesetteok", name: "연근",   emoji: "🧀", type: "other" },
  { id: "tofu",        name: "두부",     emoji: "⬜", type: "other" },
];

export const TRAPS = [
  { id: "mintchoco", name: "초콜릿", emoji: "🍫", type: "trap" },
  { id: "mushroom",  name: "팽이버섯", emoji: "🍄", type: "trap" },
];

export const ALL_ITEMS = [...MEATS, ...VEGGIES, ...NOODLES, ...OTHERS, ...TRAPS];

export const SAUCES = [
  { id: "peanut",      name: "땅콩소스", emoji: "🥜" },
  { id: "buldak",      name: "불닭소스", emoji: "🌶️" },
  { id: "chilioil",    name: "고추기름", emoji: "🌶️" },
  { id: "mintchoco",   name: "민트초코", emoji: "🍫" },
  { id: "cilantro",    name: "고수",     emoji: "🌿" },
  { id: "greenonion",  name: "대파",     emoji: "🧅" },
];

export const SPICE_LEVELS = [
  { level: 0, label: "0단계", desc: "순한맛",      peppers: 0, face: "😊" },
  { level: 1, label: "1단계", desc: "약간 매운맛", peppers: 1, face: "🙂" },
  { level: 2, label: "2단계", desc: "보통 매운맛", peppers: 2, face: "😅" },
  { level: 3, label: "3단계", desc: "많이 매운맛", peppers: 3, face: "😰" },
  { level: 4, label: "4단계", desc: "불지옥맛",    peppers: 4, face: "🔥" },
];
