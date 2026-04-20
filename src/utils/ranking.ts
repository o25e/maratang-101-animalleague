import { RankEntry, UserInfo } from "../types/game";

const STORAGE_KEY = "maratang_rankings";

export function getRankings(): RankEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return (JSON.parse(raw) as RankEntry[]).sort((a, b) => b.high_score - a.high_score);
  } catch {
    return [];
  }
}

export function updateRanking(user: UserInfo, score: number): void {
  const all = getRankings();
  const idx = all.findIndex(r => r.id === user.id && r.university === user.university);
  if (idx >= 0) {
    all[idx].play_count += 1;
    all[idx].high_score = Math.max(all[idx].high_score, score);
  } else {
    all.push({ id: user.id, university: user.university, high_score: score, play_count: 1 });
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}
