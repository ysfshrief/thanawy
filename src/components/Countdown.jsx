import { diffParts } from "../lib/utils";
import { useNow } from "../lib/hooks";
import { RETREAT } from "../lib/seed";

function Cell({ value, label }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative grid place-items-center h-16 w-16 sm:h-20 sm:w-20 rounded-2xl bg-ink/80 border-2 border-gold/50 shadow-lg backdrop-blur-sm">
        <span className="latin text-2xl sm:text-3xl font-extrabold text-gold tabular-nums">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="mt-2 text-xs font-extrabold text-white drop-shadow">
        {label}
      </span>
    </div>
  );
}

// Three states:
//  - before start  -> live countdown to startISO
//  - during retreat -> "الخلوة جارية الآن" welcome message
//  - after end      -> closing thank-you message
export default function Countdown({ targetISO }) {
  const now = useNow(1000);
  const start = new Date(targetISO || RETREAT.startISO);
  const end = new Date(RETREAT.endISO);

  // AFTER the retreat
  if (now >= end) {
    return (
      <div className="mx-auto max-w-md rounded-2xl bg-ink/70 border border-gold/40 px-6 py-5 backdrop-blur-sm">
        <p className="text-2xl mb-1">🕊️</p>
        <p className="font-display text-lg font-extrabold text-gold leading-relaxed">
          انتهت خلوة ثانوي بنين
        </p>
        <p className="text-white/85 text-sm mt-1 leading-relaxed">
          نشكر جميع المشاركين ونتمنى لكم ثمارًا روحية دائمة ❤️
        </p>
      </div>
    );
  }

  // DURING the retreat
  if (now >= start) {
    return (
      <div className="mx-auto max-w-md rounded-2xl bg-gold px-6 py-5 shadow-lg">
        <p className="text-2xl mb-1">🔥</p>
        <p className="font-display text-lg font-extrabold text-ink leading-relaxed">
          الخلوة جارية الآن
        </p>
        <p className="text-ink/80 text-sm mt-1 leading-relaxed font-semibold">
          نتمنى لكم وقتًا مباركًا ومثمرًا ❤️
        </p>
      </div>
    );
  }

  // BEFORE the retreat — live countdown
  const { d, h, m, s } = diffParts(start, now);
  return (
    <div className="flex items-center justify-center gap-2.5 sm:gap-4">
      <Cell value={d} label="يوم" />
      <Cell value={h} label="ساعة" />
      <Cell value={m} label="دقيقة" />
      <Cell value={s} label="ثانية" />
    </div>
  );
}
