import { useState, useMemo } from "react";
import { SCHEDULE as SEED_SCHEDULE } from "../lib/seed";
import {
  resolveScheduleState,
  fmtTime,
  toArabicDigits,
  diffParts,
  clamp,
} from "../lib/utils";
import { useNow, useStore } from "../lib/hooks";
import { Clock, Radio, EyeOff } from "lucide-react";

export default function Schedule() {
  const now = useNow(1000);

  // schedule + visibility are admin-controllable via the store,
  // falling back to the built-in seed schedule.
  const [customSchedule] = useStore("schedule", null);
  const [scheduleState] = useStore("scheduleState", { hidden: false });
  const SCHEDULE =
    Array.isArray(customSchedule) && customSchedule.length
      ? customSchedule
      : SEED_SCHEDULE;

  const { current, next } = resolveScheduleState(SCHEDULE, now);

  // pick default tab = the day containing "now", else day 1
  const todayId = useMemo(() => {
    const t = now.toISOString().slice(0, 10);
    const match = SCHEDULE.find((d) => d.date === t);
    return match?.id || SCHEDULE[0]?.id;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [now, SCHEDULE]);

  const [activeDayId, setActiveDayId] = useState(null);
  const activeDay = activeDayId || todayId;
  const day = SCHEDULE.find((d) => d.id === activeDay) || SCHEDULE[0];
  const setActiveDay = setActiveDayId;

  // progress through the active day
  const dayProgress = useMemo(() => {
    const items = day.items;
    const start = new Date(`${day.date}T${items[0].start}:00`);
    const lastEnd = items[items.length - 1].end;
    let end = new Date(`${day.date}T${lastEnd}:00`);
    if (end <= start) end = new Date(start.getTime() + 12 * 3600000);
    const pct = clamp(((now - start) / (end - start)) * 100, 0, 100);
    return pct;
  }, [day, now]);

  // hidden by admin (after all hooks, to respect the Rules of Hooks)
  if (scheduleState?.hidden) {
    return (
      <div className="mx-auto max-w-3xl px-5 pt-6 animate-fadeUp">
        <div className="surface p-10 text-center mt-6">
          <span className="grid place-items-center h-16 w-16 mx-auto rounded-2xl bg-sand mb-4">
            <EyeOff size={28} className="text-teal" />
          </span>
          <p className="font-display text-xl font-extrabold text-deep">
            البرنامج لسه مقفول
          </p>
          <p className="text-ink/60 mt-2 leading-relaxed">
            هيتم عرض برنامج الخلوة في وقته. استنونا! 🔥
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-5 pt-6 animate-fadeUp">
      <header className="mb-5">
        <p className="eyebrow">
          <Clock size={14} /> البرنامج الزمني
        </p>
        <h1 className="font-display text-3xl font-extrabold text-deep mt-1">
          مواعيد الخلوة
        </h1>
      </header>

      {/* NEXT EVENT COUNTDOWN */}
      {next && (
        <NextBanner next={next} now={now} live={!!current} current={current} />
      )}

      {/* DAY TABS */}
      <div className="flex gap-2 mt-5 mb-4 overflow-x-auto no-scrollbar -mx-1 px-1">
        {SCHEDULE.map((d) => {
          const active = d.id === activeDay;
          const isToday = d.id === todayId;
          return (
            <button
              key={d.id}
              onClick={() => setActiveDay(d.id)}
              className={`shrink-0 rounded-2xl px-4 py-2.5 text-right transition-all ${
                active
                  ? "bg-teal text-white shadow-glow"
                  : "bg-white text-deep border border-black/5"
              }`}
            >
              <span className="block text-sm font-extrabold">{d.label}</span>
              <span
                className={`block text-[11px] ${
                  active ? "text-white/70" : "text-ink/45"
                }`}
              >
                {d.weekday} {isToday && "· اليوم"}
              </span>
            </button>
          );
        })}
      </div>

      {/* PROGRESS BAR */}
      <div className="mb-5">
        <div className="flex items-center justify-between text-xs font-bold text-ink/50 mb-1.5">
          <span>تقدّم اليوم</span>
          <span className="latin text-teal">
            {toArabicDigits(Math.round(dayProgress))}٪
          </span>
        </div>
        <div className="h-2.5 rounded-full bg-sand overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-l from-teal to-gold transition-all duration-1000"
            style={{ width: `${dayProgress}%` }}
          />
        </div>
      </div>

      {/* TIMELINE */}
      <ol className="relative">
        {day.items.map((item, i) => {
          const isCurrent =
            current &&
            current.day.id === day.id &&
            current.title === item.title &&
            current.start === item.start;
          const isNext =
            next &&
            next.day.id === day.id &&
            next.title === item.title &&
            next.start === item.start;

          return (
            <li key={i} className="flex gap-3 pb-3">
              {/* time rail */}
              <div className="flex flex-col items-center pt-1 w-16 shrink-0">
                <span
                  className={`latin text-xs font-extrabold text-center leading-tight ${
                    isCurrent ? "text-teal" : "text-ink/50"
                  }`}
                >
                  {fmtTime(item.start)}
                </span>
                {i < day.items.length - 1 && (
                  <span className="flex-1 w-0.5 bg-black/8 mt-1" />
                )}
              </div>

              {/* card */}
              <div
                className={`flex-1 rounded-2xl p-3.5 flex items-center gap-3 transition-all ${
                  isCurrent
                    ? "bg-teal text-white shadow-glow scale-[1.01]"
                    : isNext
                    ? "bg-white border-2 border-gold/40"
                    : "bg-white border border-black/5"
                }`}
              >
                <span className="text-2xl shrink-0">{item.icon}</span>
                <div className="flex-1 min-w-0">
                  <p
                    className={`font-extrabold leading-tight ${
                      isCurrent ? "text-white" : "text-deep"
                    }`}
                  >
                    {item.title}
                  </p>
                  <p
                    className={`latin text-xs ${
                      isCurrent ? "text-white/70" : "text-ink/45"
                    }`}
                  >
                    {fmtTime(item.start)} – {fmtTime(item.end)}
                  </p>
                  {item.desc && (
                    <p
                      className={`text-xs mt-1 leading-relaxed whitespace-pre-line ${
                        isCurrent ? "text-white/80" : "text-ink/55"
                      }`}
                    >
                      {item.desc}
                    </p>
                  )}
                  {item.rotation && (
                    <RotationTable
                      rotation={item.rotation}
                      isCurrent={isCurrent}
                    />
                  )}
                </div>
                {isCurrent && (
                  <span className="chip bg-white/20 text-white">
                    <Radio size={12} className="animate-pulseSoft" /> الآن
                  </span>
                )}
                {isNext && (
                  <span className="chip bg-gold/15 text-gold">التالي</span>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function NextBanner({ next, now, live, current }) {
  const { d, h, m, s } = diffParts(next.start, now);
  return (
    <div className="surface p-4 bg-gradient-to-l from-deep to-teal text-white">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] font-bold text-white/70">
            {live ? "النشاط القادم بعد انتهاء الحالي" : "يبدأ بعد"}
          </p>
          <p className="font-extrabold text-lg flex items-center gap-2 mt-0.5">
            <span>{next.icon}</span> {next.title}
          </p>
        </div>
        <div className="text-left">
          <p className="latin text-2xl font-extrabold tabular-nums">
            {d > 0 && `${d}d `}
            {String(h).padStart(2, "0")}:
            {String(m).padStart(2, "0")}:
            {String(s).padStart(2, "0")}
          </p>
        </div>
      </div>
    </div>
  );
}

// جدول توزيع الفرق على الأماكن (للفقرات المتنوعة)
function RotationTable({ rotation, isCurrent }) {
  if (!rotation || !rotation.places || !rotation.slots) return null;
  const border = isCurrent ? "border-white/25" : "border-black/10";
  const head = isCurrent ? "text-white/90" : "text-teal";
  const cell = isCurrent ? "text-white/85" : "text-deep";
  const timeC = isCurrent ? "text-white/70" : "text-ink/55";
  return (
    <div className={`mt-3 rounded-xl overflow-hidden border ${border}`}>
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr>
            <th className={`p-2 text-right font-extrabold ${head}`}>الوقت</th>
            {rotation.places.map((pl, i) => (
              <th key={i} className={`p-2 text-center font-extrabold ${head}`}>
                {pl}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rotation.slots.map((slot, r) => (
            <tr key={r} className={`border-t ${border}`}>
              <td className={`p-2 font-bold latin whitespace-nowrap ${timeC}`}>
                {slot.time}
              </td>
              {slot.teams.map((tm, c) => (
                <td key={c} className={`p-2 text-center font-semibold ${cell}`}>
                  {tm}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
