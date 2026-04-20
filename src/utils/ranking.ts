import { RankEntry, UserInfo } from "../types/game";
import { supabase } from "../lib/supabase";

export async function getRankings(): Promise<RankEntry[]> {
  const { data, error } = await supabase
    .from("rankings")
    .select("id, university, high_score, play_count")
    .order("high_score", { ascending: false })
    .limit(100);

  if (error) {
    console.error("getRankings error:", error.message);
    return [];
  }
  return (data ?? []) as RankEntry[];
}

export async function updateRanking(user: UserInfo, score: number): Promise<void> {
  // 기존 기록 조회
  const { data: existing } = await supabase
    .from("rankings")
    .select("high_score, play_count")
    .eq("id", user.id)
    .eq("university", user.university)
    .maybeSingle();

  if (existing) {
    await supabase
      .from("rankings")
      .update({
        high_score: Math.max(existing.high_score, score),
        play_count: existing.play_count + 1,
      })
      .eq("id", user.id)
      .eq("university", user.university);
  } else {
    await supabase
      .from("rankings")
      .insert({ id: user.id, university: user.university, high_score: score, play_count: 1 });
  }
}
