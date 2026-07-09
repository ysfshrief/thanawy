import { Link } from "react-router-dom";
import { RETREAT, SCHEDULE } from "../lib/seed";
import { resolveScheduleState, drivePreview } from "../lib/utils";
import { useNow, useStore } from "../lib/hooks";
import Countdown from "../components/Countdown";
import { MapPin, CalendarDays, ArrowLeft, Clock, Sparkles } from "lucide-react";

export default function Home() {
  const now = useNow(30000);
  const { current, next } = resolveScheduleState(SCHEDULE, now);
  const [appearance] = useStore("appearance", {});

  // optional admin overrides — fall back to the built-in design if empty
  const heroColor = appearance?.heroColor?.trim() || null;
  const heroImage = appearance?.heroImage?.trim()
    ? drivePreview(appearance.heroImage)
    : null;

  return (
    <div className="animate-fadeUp">
      {/* ───────── HERO : branded gradient + church logo ───────── */}
      <section className="relative overflow-hidden">
        {/* optional admin hero image, behind the gradient */}
        {heroImage && (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-40"
            style={{ backgroundImage: `url(${heroImage})` }}
          />
        )}
        {/* branded gradient background (site identity) */}
        <div
          className="absolute inset-0"
          style={{
            background: heroColor
              ? `linear-gradient(160deg, ${heroColor}, #12303b 60%, #1d5b6e 100%)`
              :
              "linear-gradient(160deg, #0c1620 0%, #12303b 45%, #1d5b6e 100%)",
          }}
        />
        {/* soft decorative glows */}
        <div
          className="absolute -top-24 -right-16 h-72 w-72 rounded-full blur-3xl opacity-40"
          style={{ background: "radial-gradient(circle, #c9962f, transparent 70%)" }}
        />
        <div
          className="absolute -bottom-24 -left-16 h-72 w-72 rounded-full blur-3xl opacity-30"
          style={{ background: "radial-gradient(circle, #1d5b6e, transparent 70%)" }}
        />

        <div className="relative mx-auto max-w-3xl px-5 pt-10 pb-9 text-center">
          {/* logos in an elegant dark glassmorphism frame */}
          <div className="relative mx-auto w-[85%] max-w-md">
            <div
              className="absolute inset-0 -z-10 rounded-[2rem] blur-2xl opacity-60"
              style={{
                background:
                  "radial-gradient(60% 60% at 50% 50%, rgba(201,150,47,0.4), rgba(29,91,110,0.2) 55%, transparent 75%)",
              }}
            />
            <div
              className="rounded-[1.75rem] px-6 py-5 border backdrop-blur-md shadow-[0_12px_40px_-8px_rgba(0,0,0,0.6)]"
              style={{
                background:
                  "linear-gradient(160deg, rgba(10,18,30,0.55), rgba(18,30,40,0.5))",
                borderColor: "rgba(201,150,47,0.35)",
              }}
            >
              <div className="flex items-center justify-center gap-4">
                <img
                  src="/assets/church-logo.png"
                  alt="شعار الكنيسة"
                  className="h-20 w-20 object-contain shrink-0 drop-shadow-[0_4px_18px_rgba(0,0,0,0.55)]"
                />
                <span className="w-px h-16 bg-gold/30" />
                <img
                  src="/assets/camp-logo.png"
                  alt="شعار الخلوة"
                  className="flex-1 max-w-[190px] object-contain drop-shadow-[0_4px_18px_rgba(0,0,0,0.55)]"
                />
              </div>
            </div>
          </div>

          {/* title */}
          <h1 className="mt-5 font-display text-4xl sm:text-5xl font-extrabold text-white drop-shadow-md latin">
            {RETREAT.title}
          </h1>
          <p className="mt-1 text-gold font-extrabold text-lg drop-shadow">
            {RETREAT.subtitle}
          </p>

          {/* meta chips */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            <span className="chip bg-ink/70 text-white border border-white/25 backdrop-blur-sm">
              <CalendarDays size={14} /> {RETREAT.dateLabel}
            </span>
            <span className="chip bg-ink/70 text-white border border-white/25 backdrop-blur-sm">
              <MapPin size={14} /> {RETREAT.location}
              <span className="latin opacity-80">({RETREAT.locationCopt})</span>
            </span>
          </div>

          {/* countdown */}
          <div className="mt-7">
            <p className="text-gold text-xs font-extrabold tracking-[0.2em] mb-3 drop-shadow">
              العد التنازلي للخلوة
            </p>
            <Countdown targetISO={RETREAT.startISO} />
          </div>
        </div>
      </section>

      {/* ───────── LIVE NOW STRIP ───────── */}
      {(current || next) && (
        <section className="mx-auto max-w-3xl px-5 -mt-5 relative z-10">
          <Link
            to="/schedule"
            className="surface flex items-center gap-3 p-4 active:scale-[0.99] transition"
          >
            <span className="grid place-items-center h-12 w-12 rounded-2xl bg-teal/12 text-2xl shrink-0">
              {current ? current.icon : next?.icon}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-extrabold tracking-wide text-teal flex items-center gap-1">
                {current ? (
                  <>
                    <span className="h-2 w-2 rounded-full bg-red-500 animate-pulseSoft" />
                    يحدث الآن
                  </>
                ) : (
                  <>
                    <Clock size={12} /> النشاط القادم
                  </>
                )}
              </p>
              <p className="font-extrabold text-deep truncate">
                {current ? current.title : next?.title}
              </p>
            </div>
            <ArrowLeft size={20} className="text-ink/30 shrink-0" />
          </Link>
        </section>
      )}

      {/* ───────── BIBLE VERSE ───────── */}
      <section className="mx-auto max-w-3xl px-5 mt-6">
        <div className="relative surface overflow-hidden p-7 text-center">
          <div className="absolute -top-8 -right-6 text-[120px] leading-none text-teal/5 font-display select-none">
            ”
          </div>
          <Sparkles size={20} className="mx-auto text-gold mb-3" />
          <p className="font-display text-xl sm:text-2xl font-bold text-deep leading-loose">
            {RETREAT.verse}
          </p>
          <p className="mt-4 inline-flex chip bg-gold/15 text-gold font-extrabold">
            {RETREAT.verseRef}
          </p>
        </div>
      </section>

      {/* ───────── WELCOME BANNER ───────── */}
      <section className="mx-auto max-w-3xl px-5 mt-6">
        <div
          className="rounded-3xl p-6 text-center text-white relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #12303b, #1d5b6e)",
          }}
        >
          <span className="text-3xl">⛪</span>
          <p className="mt-2 font-display text-xl font-extrabold">
            أهلاً بكم في خلوة 2Ⲃⲟⲗⲓⲥ
          </p>
          <p className="text-white/80 text-sm mt-2 leading-relaxed">
            ثلاثة أيام من الروحانية والفرح والخدمة معًا
          </p>
        </div>
      </section>

      {/* ───────── QUICK LINKS ───────── */}
      <section className="mx-auto max-w-3xl px-5 mt-8">
        <div className="grid grid-cols-2 gap-3">
          <QuickCard to="/schedule" emoji="📅" title="البرنامج" sub="مواعيد الخلوة" />
          <QuickCard to="/teams" emoji="👥" title="الفرق" sub="٣ فرق · القادة" />
          <QuickCard to="/rankings" emoji="🏆" title="النتائج" sub="ترتيب الفرق" />
          <QuickCard to="/hymns" emoji="🎶" title="الترانيم" sub="كلمات وتحميل" />
          <QuickCard to="/prayers" emoji="🙏" title="الصلوات" sub="صلوات الخلوة" />
          <QuickCard to="/bible" emoji="📖" title="الكتاب المقدس" sub="الأسفار والإصحاحات" />
        </div>
      </section>
    </div>
  );
}

function QuickCard({ to, emoji, title, sub }) {
  return (
    <Link
      to={to}
      className="surface p-4 flex items-center gap-3 active:scale-[0.98] transition"
    >
      <span className="text-2xl">{emoji}</span>
      <div>
        <p className="font-extrabold text-deep leading-tight">{title}</p>
        <p className="text-xs text-ink/55">{sub}</p>
      </div>
    </Link>
  );
}
