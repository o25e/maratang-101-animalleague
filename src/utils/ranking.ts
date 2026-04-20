import { RankEntry, UserInfo } from "../types/game";
import { supabase } from "../lib/supabase";

export async function getRankings(): Promise<RankEntry[]> {
  const { data, error } = await supabase
    .from("rankings")
    .select("id, university, high_score, play_count")
    .order("high_score", { ascending: false })
    .order("play_count", { ascending: true })
    .limit(100);

  if (error) {
    console.error("getRankings error:", error.message);
    return [];
  }
  return (data ?? []) as RankEntry[];
}

export async function updateRanking(user: UserInfo, score: number): Promise<void> {
  const { data: existing, error: selectError } = await supabase
    .from("rankings")
    .select("high_score, play_count")
    .eq("id", user.id)
    .eq("university", user.university)
    .maybeSingle();

  if (selectError) {
    console.error("updateRanking select error:", selectError);
    throw selectError;
  }

  if (existing) {
    const alreadyPerfect = existing.high_score >= 100;
    const { error: updateError } = await supabase
      .from("rankings")
      .update({
        high_score: Math.max(existing.high_score, score),
        play_count: alreadyPerfect ? existing.play_count : existing.play_count + 1,
      })
      .eq("id", user.id)
      .eq("university", user.university);
    if (updateError) {
      console.error("updateRanking update error:", updateError);
      throw updateError;
    }
  } else {
    const { error: insertError } = await supabase
      .from("rankings")
      .insert({ id: user.id, university: user.university, high_score: score, play_count: 1 });
    if (insertError) {
      console.error("updateRanking insert error:", insertError);
      throw insertError;
    }
  }
}
