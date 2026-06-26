import { useParams, Link, useNavigate } from "react-router-dom";
import { TEAMS } from "../lib/seed";
import { useStore } from "../lib/hooks";
import { toArabicDigits, drivePreview } from "../lib/utils";
import { ArrowRight, Users, Crown, Star } from "lucide-react";

export default function TeamDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const team = TEAMS.find((t) => t.id === id);
  const [logos] = useStore("teamLogos", {});

  if (!team) {
    return (
      <div className="mx-auto max-w-3xl px-5 pt-10 text-center">
        <p className="text-ink/60">الفريق غير موجود.</p>
        <Link to="/teams" className="btn-primary mt-4">
          العودة للفرق
        </Link>
      </div>
    );
  }

  // members excluding the leader (leader shown separately on top)
  const rest = team.members.filter((m) => m !== team.leader);

  return (
    <div className="animate-fadeUp">
      {/* ───── colored header (team color dominant) ───── */}
      <div
        className="relative px-5 pt-5 pb-16 text-white"
        style={{
          background: `linear-gradient(150deg, ${team.color}, ${team.accent})`,
        }}
      >
        <div className="mx-auto max-w-3xl">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1.5 text-white text-sm font-bold bg-ink/25 rounded-full px-3 py-1.5 backdrop-blur-sm mb-4"
          >
            <ArrowRight size={18} /> رجوع
          </button>
          <div className="flex items-center gap-4">
            <span className="relative shrink-0">
              <img
                src={team.image}
                alt={team.name}
                className="h-16 w-16 rounded-2xl object-cover border-2 border-white/80 shadow-md"
              />
              {logos[team.id] && (
                <img
                  src={drivePreview(logos[team.id])}
                  alt="شعار الفريق"
                  className="absolute -bottom-1.5 -left-1.5 h-7 w-7 rounded-lg object-cover border-2 border-white bg-white"
                />
              )}
            </span>
            <div>
              <h1 className="font-display text-2xl font-extrabold drop-shadow">
                {team.name}
              </h1>
              <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                {team.nameCopt && (
                  <span className="chip bg-ink/25 text-white backdrop-blur-sm latin">
                    {team.nameCopt}
                  </span>
                )}
                {team.subtitle && (
                  <span className="chip bg-white/20 text-white backdrop-blur-sm">
                    {team.subtitle}
                  </span>
                )}
              </div>
            </div>
            <span className="text-4xl mr-auto">{team.emoji}</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-5 -mt-10 relative z-10">
        {/* ───── FRAMED PORTRAIT ───── */}
        <div
          className="rounded-3xl p-2 shadow-card"
          style={{ background: team.color }}
        >
          <div className="rounded-[20px] overflow-hidden border-4 border-white bg-white">
            <img
              src={team.image}
              alt={team.name}
              className="w-full aspect-[16/9] object-cover"
            />
          </div>
        </div>

        {/* ───── LEADER ───── */}
        <section
          className="rounded-3xl p-5 mt-4 text-white relative overflow-hidden"
          style={{ background: team.color }}
        >
          <Crown size={88} className="absolute -bottom-4 -left-3 opacity-10" />
          <p className="text-white/80 text-xs font-extrabold mb-2 flex items-center gap-1.5">
            <Crown size={14} /> قائد الفريق
          </p>
          <p className="font-display text-2xl font-extrabold">{team.leader}</p>
        </section>

        {/* ───── MEMBERS ───── */}
        <section className="surface p-5 mt-4 mb-2">
          <p className="eyebrow mb-3 flex items-center gap-1.5">
            <Users size={14} /> الأعضاء · {toArabicDigits(team.members.length)}
          </p>
          <div className="grid grid-cols-2 gap-2">
            {/* leader first, highlighted */}
            <div
              className="col-span-2 flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-white"
              style={{ background: team.accent }}
            >
              <Star size={16} className="shrink-0" fill="currentColor" />
              <span className="font-extrabold flex-1 truncate">
                {team.leader}
              </span>
              <span className="chip bg-white/25 text-white text-[10px]">
                القائد
              </span>
            </div>
            {rest.map((m, i) => (
              <div
                key={i}
                className="flex items-center gap-2 rounded-xl bg-sand/60 px-3 py-2"
              >
                <span
                  className="latin grid place-items-center h-6 w-6 rounded-lg text-[11px] font-extrabold text-white shrink-0"
                  style={{ background: team.accent }}
                >
                  {toArabicDigits(i + 2)}
                </span>
                <span className="text-sm font-semibold text-deep truncate">
                  {m}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
