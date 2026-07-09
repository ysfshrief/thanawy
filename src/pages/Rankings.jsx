import { useStore, useTeams } from "../lib/hooks";
import { toArabicDigits, drivePreview } from "../lib/utils";
import { Trophy, Lock, Crown } from "lucide-react";

export default function Rankings() {
  const [points] = useStore("points", {});
  const [rankingState] = useStore("rankingState", { published: false });
  const [logos] = useStore("teamLogos", {});
  const TEAMS = useTeams();

  const ranked = [...TEAMS]
    .map((t) => ({ ...t, score: points[t.id] || 0 }))
    .sort((a, b) => b.score - a.score);

  const maxScore = Math.max(1, ...ranked.map((t) => t.score));
  const published = rankingState?.published;

  return (
    <div className="mx-auto max-w-3xl px-5 pt-6 animate-fadeUp">
      <header className="mb-5">
        <p className="eyebrow">
          <Trophy size={14} /> النقاط
        </p>
        <h1 className="font-display text-3xl font-extrabold text-deep mt-1">
          ترتيب الفرق
        </h1>
      </header>

      {!published ? (
        <div className="surface p-10 text-center">
          <span className="grid place-items-center h-16 w-16 mx-auto rounded-2xl bg-sand mb-4">
            <Lock size={28} className="text-teal" />
          </span>
          <p className="font-display text-xl font-extrabold text-deep">
            النتائج لسه مقفولة
          </p>
          <p className="text-ink/60 mt-2 leading-relaxed">
            هيتم إعلان ترتيب الفرق والنقاط في وقتها أثناء الخلوة.
            <br />
            استنونا! 🔥
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {ranked.map((team, i) => (
            <div
              key={team.id}
              className="rounded-3xl p-4 flex items-center gap-4 shadow-card border-2"
              style={{
                borderColor: team.color,
                background: i === 0 ? `${team.color}0d` : "#fff",
              }}
            >
              {/* rank badge */}
              <span
                className="relative grid place-items-center h-10 w-10 rounded-2xl text-white font-display text-lg font-extrabold shrink-0"
                style={{ background: team.color }}
              >
                {i === 0 ? <Crown size={20} /> : toArabicDigits(i + 1)}
              </span>

              {/* team avatar (story image) + admin logo corner */}
              <span className="relative shrink-0">
                <img
                  src={team.image}
                  alt={team.name}
                  className="h-12 w-12 rounded-xl object-cover border-2 shadow-sm"
                  style={{ borderColor: team.color }}
                />
                {logos[team.id] && (
                  <img
                    src={drivePreview(logos[team.id])}
                    alt=""
                    className="absolute -bottom-1 -left-1 h-5 w-5 rounded-md object-cover border border-white bg-white"
                  />
                )}
              </span>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1.5">
                  <p className="font-extrabold text-deep truncate">
                    {team.emoji} {team.name}
                  </p>
                  <p
                    className="latin font-display font-extrabold text-lg shrink-0"
                    style={{ color: team.color }}
                  >
                    {toArabicDigits(team.score)}
                  </p>
                </div>
                <div className="h-2 rounded-full bg-sand overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${(team.score / maxScore) * 100}%`,
                      background: `linear-gradient(90deg, ${team.color}, ${team.accent})`,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
