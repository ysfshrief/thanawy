import { useState, useMemo } from "react";
import { useStore } from "../lib/hooks";
import {
  ChevronDown,
  Cross,
  ArrowRight,
  Search,
  Minus,
  Plus,
  List,
  X,
} from "lucide-react";

export default function Prayers() {
  const [prayers] = useStore("prayers", []);
  const [openId, setOpenId] = useState(null);
  const [query, setQuery] = useState("");
  const [fontSize, setFontSize] = useState(18);
  const [tocOpen, setTocOpen] = useState(false);

  const active = prayers.find((p) => p.id === openId);

  const filtered = useMemo(() => {
    if (!query.trim()) return prayers;
    const q = query.trim();
    return prayers.filter(
      (p) =>
        p.title.includes(q) ||
        (p.sections || []).some(
          (s) => s.label.includes(q) || (s.content || "").includes(q)
        )
    );
  }, [prayers, query]);

  if (active) {
    const sections = active.sections || [];
    return (
      <div className="mx-auto max-w-3xl px-5 pt-5 pb-10 animate-fadeUp">
        <div className="sticky top-16 z-20 -mx-5 px-5 py-3 bg-cream/90 backdrop-blur-lg border-b border-black/5 mb-5">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setOpenId(null);
                setTocOpen(false);
              }}
              className="inline-flex items-center gap-1.5 text-deep font-bold text-sm shrink-0"
            >
              <ArrowRight size={18} /> رجوع
            </button>
            <div className="flex-1" />
            <div className="flex items-center gap-1 bg-white rounded-xl border border-black/10 p-1">
              <button
                onClick={() => setFontSize((s) => Math.max(14, s - 2))}
                className="grid place-items-center h-7 w-7 rounded-lg text-ink/60 active:bg-sand"
                aria-label="تصغير الخط"
              >
                <Minus size={15} />
              </button>
              <span className="latin text-xs font-bold text-ink/50 w-5 text-center">
                {fontSize}
              </span>
              <button
                onClick={() => setFontSize((s) => Math.min(30, s + 2))}
                className="grid place-items-center h-7 w-7 rounded-lg text-ink/60 active:bg-sand"
                aria-label="تكبير الخط"
              >
                <Plus size={15} />
              </button>
            </div>
            {sections.length > 1 && (
              <button
                onClick={() => setTocOpen((v) => !v)}
                className={`grid place-items-center h-9 w-9 rounded-xl border ${
                  tocOpen
                    ? "bg-teal text-white border-teal"
                    : "bg-white text-ink/60 border-black/10"
                }`}
                aria-label="الفهرس"
              >
                <List size={17} />
              </button>
            )}
          </div>
          {tocOpen && sections.length > 1 && (
            <div className="flex flex-wrap gap-1.5 mt-3 animate-fadeUp">
              {sections.map((s, i) => (
                <a
                  key={s.id || i}
                  href={`#sec-${i}`}
                  onClick={() => setTocOpen(false)}
                  className="chip bg-white border border-black/10 text-deep text-xs"
                >
                  {s.label}
                </a>
              ))}
            </div>
          )}
        </div>

        <header className="mb-5">
          <p className="eyebrow">
            <Cross size={14} /> صلاة
          </p>
          <h1 className="font-display text-3xl font-extrabold text-deep mt-1">
            {active.title}
          </h1>
        </header>

        <div className="flex flex-col gap-4">
          {sections.map((sec, i) => (
            <section
              key={sec.id || i}
              id={`sec-${i}`}
              className="surface overflow-hidden scroll-mt-36"
            >
              <div className="px-5 py-3.5 bg-gradient-to-l from-deep to-teal text-white">
                <p className="font-display text-lg font-extrabold">
                  {sec.label}
                </p>
              </div>
              <div className="p-5">
                <p
                  className="text-deep leading-loose whitespace-pre-line"
                  style={{ fontSize: `${fontSize}px` }}
                >
                  {sec.content}
                </p>
              </div>
            </section>
          ))}
          {sections.length === 0 && (
            <p className="text-center text-ink/50 py-6">
              لا يوجد محتوى في هذه الصلاة بعد.
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-5 pt-6 animate-fadeUp">
      <header className="mb-4">
        <p className="eyebrow">
          <Cross size={14} /> صلوات الخلوة
        </p>
        <h1 className="font-display text-3xl font-extrabold text-deep mt-1">
          الصلوات
        </h1>
      </header>

      {prayers.length > 0 && (
        <div className="relative mb-5">
          <Search
            size={18}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink/35"
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ابحث في الصلوات..."
            className="w-full rounded-2xl border border-black/10 bg-white pr-11 pl-10 py-3 text-sm outline-none focus:border-teal"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink/35"
            >
              <X size={16} />
            </button>
          )}
        </div>
      )}

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
      ) : filtered.length === 0 ? (
        <p className="text-center text-ink/45 py-8 text-sm">
          مفيش نتائج للبحث «{query}»
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((p) => (
            <button
              key={p.id}
              onClick={() => {
                setOpenId(p.id);
                window.scrollTo(0, 0);
              }}
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
