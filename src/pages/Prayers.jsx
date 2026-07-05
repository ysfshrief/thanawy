import { useState } from "react";
import { useStore } from "../lib/hooks";
import { ChevronDown, Cross, ArrowRight } from "lucide-react";

export default function Prayers() {
  const [prayers] = useStore("prayers", []);
  const [openId, setOpenId] = useState(null);

  const active = prayers.find((p) => p.id === openId);

  // detail view for a single prayer
  if (active) {
    return (
      <div className="mx-auto max-w-3xl px-5 pt-6 animate-fadeUp">
        <button
          onClick={() => setOpenId(null)}
          className="inline-flex items-center gap-1.5 text-deep font-bold text-sm mb-4"
        >
          <ArrowRight size={18} /> كل الصلوات
        </button>

        <header className="mb-5">
          <p className="eyebrow">
            <Cross size={14} /> صلاة
          </p>
          <h1 className="font-display text-3xl font-extrabold text-deep mt-1">
            {active.title}
          </h1>
        </header>

        <div className="flex flex-col gap-4">
          {(active.sections || []).map((sec, i) => (
            <section key={sec.id || i} className="surface overflow-hidden">
              <div className="px-5 py-3.5 bg-gradient-to-l from-deep to-teal text-white">
                <p className="font-display text-lg font-extrabold">
                  {sec.label}
                </p>
              </div>
              <div className="p-5">
                <p className="text-deep leading-loose whitespace-pre-line">
                  {sec.content}
                </p>
              </div>
            </section>
          ))}
          {(!active.sections || active.sections.length === 0) && (
            <p className="text-center text-ink/50 py-6">
              لا يوجد محتوى في هذه الصلاة بعد.
            </p>
          )}
        </div>
      </div>
    );
  }

  // list view
  return (
    <div className="mx-auto max-w-3xl px-5 pt-6 animate-fadeUp">
      <header className="mb-5">
        <p className="eyebrow">
          <Cross size={14} /> صلوات الخلوة
        </p>
        <h1 className="font-display text-3xl font-extrabold text-deep mt-1">
          الصلوات
        </h1>
        <p className="text-ink/60 mt-1 text-sm">
          اختر صلاة لعرض أقسامها بالترتيب.
        </p>
      </header>

      {prayers.length === 0 ? (
        <div className="surface p-10 text-center">
          <span className="text-4xl">🙏</span>
          <p className="font-display text-lg font-extrabold text-deep mt-3">
            لسه مفيش صلوات
          </p>
          <p className="text-ink/55 mt-1 text-sm">
            الصلوات هتظهر هنا أول ما تتضاف.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {prayers.map((p) => (
            <button
              key={p.id}
              onClick={() => setOpenId(p.id)}
              className="group surface p-4 flex items-center gap-4 active:scale-[0.99] transition text-right"
            >
              <span className="grid place-items-center h-12 w-12 rounded-2xl bg-teal/10 text-2xl shrink-0">
                🙏
              </span>
              <div className="flex-1 min-w-0">
                <p className="font-display text-lg font-extrabold text-deep leading-tight truncate">
                  {p.title}
                </p>
                <p className="text-xs text-ink/50 mt-0.5">
                  {(p.sections || []).length} أقسام
                </p>
              </div>
              <ChevronDown
                size={20}
                className="text-ink/30 -rotate-90 shrink-0"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
