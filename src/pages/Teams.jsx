import { Link } from "react-router-dom";
import { useTeams, useStore } from "../lib/hooks";
import { toArabicDigits, drivePreview } from "../lib/utils";
import { Users, ArrowLeft, Trophy, Crown } from "lucide-react";

export default function Teams() {
  const teams = useTeams();
  const [logos] = useStore("teamLogos", {});

  return (
    <div className="mx-auto max-w-3xl px-5 pt-6 animate-fadeUp">
      <header className="mb-5">
        <p className="eyebrow">
          <Users size={14} /> فرق الخلوة
        </p>
        <h1 className="font-display text-3xl font-extrabold text-deep mt-1">
          الفرق الثلاثة
        </h1>
        <p className="text-ink/60 mt-1 text-sm">
          اختر فريقك واعرف قائدك وأعضاءه.
        </p>
      </header>

      <div className="flex flex-col gap-5">
        {teams.map((team, i) => (
          <Link
            key={team.id}
            to={`/teams/${team.id}`}
            className="group block rounded-3xl overflow-hidden shadow-card active:scale-[0.99] transition border-2"
            style={{
              borderColor: team.color,
              background: `linear-gradient(135deg, ${team.color}, ${team.accent})`,
              animationDelay: `${i * 60}ms`,
            }}
          >
            {/* header row: avatar + name (team color dominant) */}
            <div className="flex items-center gap-3 p-4 text-white">
              <span className="relative shrink-0">
                <img
                  src={team.image}
                  alt={team.name}
                  className="h-14 w-14 rounded-2xl object-cover border-2 border-white/80 shadow-md"
                />
                {logos[team.id] && (
                  <img
                    src={drivePreview(logos[team.id])}
                    alt="شعار"
                    className="absolute -bottom-1 -left-1 h-6 w-6 rounded-lg object-cover border border-white bg-white"
                  />
                )}
              </span>
              <div className="flex-1 min-w-0">
                <h2 className="font-display text-xl font-extrabold drop-shadow">
                  {team.name}
                </h2>
                <p className="text-white/85 text-xs mt-0.5 flex items-center gap-1.5 flex-wrap">
                  {team.nameCopt && (
                    <span className="latin">{team.nameCopt}</span>
                  )}
                  {team.subtitle && <span>· {team.subtitle}</span>}
                  <span>· {toArabicDigits(team.members.length)} عضو</span>
                </p>
              </div>
              <span className="text-3xl shrink-0">{team.emoji}</span>
            </div>

            {/* framed portrait inside the colored card */}
            <div className="px-4">
              <div className="rounded-2xl overflow-hidden border-4 border-white/90 shadow-lg bg-white">
                <div className="relative aspect-[16/9]">
                  <img
                    src={team.image}
                    alt={team.name}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>

            {/* leader + CTA on team color */}
            <div className="p-4 flex items-center gap-3">
              <p className="flex-1 text-sm text-white font-semibold leading-relaxed drop-shadow flex items-center gap-1.5">
                <Crown size={15} /> القائد: {team.leader}
              </p>
              <span className="chip bg-white text-deep shrink-0 font-extrabold">
                التفاصيل <ArrowLeft size={14} />
              </span>
            </div>
          </Link>
        ))}
      </div>

      <Link to="/rankings" className="btn-gold w-full mt-5">
        <Trophy size={18} /> شوف ترتيب الفرق
      </Link>
    </div>
  );
}
