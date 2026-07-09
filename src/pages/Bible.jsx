import { useState, useMemo } from "react";
import { useStore } from "../lib/hooks";
import {
  BookOpen,
  ArrowRight,
  ChevronDown,
  Search,
  Minus,
  Plus,
  X,
} from "lucide-react";
import { toArabicDigits } from "../lib/utils";

export default function Bible() {
  const [bible] = useStore("bible", []);
  const [openBookId, setOpenBookId] = useState(null);
  const [openChapterId, setOpenChapterId] = useState(null);
  const [query, setQuery] = useState("");
  const [fontSize, setFontSize] = useState(19);

  const book = bible.find((b) => b.id === openBookId);
  const chapter = book?.chapters?.find((c) => c.id === openChapterId);

  const filtered = useMemo(() => {
    if (!query.trim()) return bible;
    const q = query.trim();
    return bible.filter((b) => b.book.includes(q));
  }, [bible, query]);

  /* ─── chapter content view ─── */
  if (book && chapter) {
    const idx = book.chapters.findIndex((c) => c.id === chapter.id);
    const prev = book.chapters[idx - 1];
    const next = book.chapters[idx + 1];
    return (
      <div className="mx-auto max-w-3xl px-5 pt-5 pb-10 animate-fadeUp">
        <div className="sticky top-16 z-20 -mx-5 px-5 py-3 bg-cream/90 backdrop-blur-lg border-b border-black/5 mb-5">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setOpenChapterId(null)}
              className="inline-flex items-center gap-1.5 text-deep font-bold text-sm shrink-0"
            >
              <ArrowRight size={18} /> {book.book}
            </button>
            <div className="flex-1" />
            <div className="flex items-center gap-1 bg-white rounded-xl border border-black/10 p-1">
              <button
                onClick={() => setFontSize((s) => Math.max(15, s - 2))}
                className="grid place-items-center h-7 w-7 rounded-lg text-ink/60 active:bg-sand"
                aria-label="تصغير"
              >
                <Minus size={15} />
              </button>
              <span className="latin text-xs font-bold text-ink/50 w-5 text-center">
                {fontSize}
              </span>
              <button
                onClick={() => setFontSize((s) => Math.min(32, s + 2))}
                className="grid place-items-center h-7 w-7 rounded-lg text-ink/60 active:bg-sand"
                aria-label="تكبير"
              >
                <Plus size={15} />
              </button>
            </div>
          </div>
        </div>

        <header className="mb-5">
          <p className="eyebrow">
            <BookOpen size={14} /> {book.book}
          </p>
          <h1 className="font-display text-3xl font-extrabold text-deep mt-1">
            إصحاح {toArabicDigits(chapter.num)}
          </h1>
        </header>

        <div className="surface p-6">
          <p
            className="text-deep leading-loose whitespace-pre-line"
            style={{ fontSize: `${fontSize}px` }}
          >
            {chapter.content}
          </p>
        </div>

        {/* prev / next chapter nav */}
        <div className="flex items-center gap-3 mt-5">
          <button
            disabled={!prev}
            onClick={() => prev && setOpenChapterId(prev.id)}
            className="btn-soft flex-1 py-2.5 disabled:opacity-40"
          >
            الإصحاح السابق
          </button>
          <button
            disabled={!next}
            onClick={() => next && setOpenChapterId(next.id)}
            className="btn-primary flex-1 py-2.5 disabled:opacity-40"
          >
            الإصحاح التالي
          </button>
        </div>
      </div>
    );
  }

  /* ─── chapters grid for a book ─── */
  if (book) {
    return (
      <div className="mx-auto max-w-3xl px-5 pt-6 animate-fadeUp">
        <button
          onClick={() => setOpenBookId(null)}
          className="inline-flex items-center gap-1.5 text-deep font-bold text-sm mb-4"
        >
          <ArrowRight size={18} /> كل الأسفار
        </button>
        <header className="mb-5">
          <p className="eyebrow">
            <BookOpen size={14} /> سفر
          </p>
          <h1 className="font-display text-3xl font-extrabold text-deep mt-1">
            {book.book}
          </h1>
        </header>
        {(book.chapters || []).length === 0 ? (
          <p className="text-center text-ink/50 py-6">لا توجد إصحاحات بعد.</p>
        ) : (
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-2.5">
            {book.chapters.map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  setOpenChapterId(c.id);
                  window.scrollTo(0, 0);
                }}
                className="surface aspect-square grid place-items-center active:scale-[0.97] transition"
              >
                <span className="font-display text-2xl font-extrabold text-teal">
                  {toArabicDigits(c.num)}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  /* ─── books list ─── */
  return (
    <div className="mx-auto max-w-3xl px-5 pt-6 animate-fadeUp">
      <header className="mb-4">
        <p className="eyebrow">
          <BookOpen size={14} /> الكتاب المقدس
        </p>
        <h1 className="font-display text-3xl font-extrabold text-deep mt-1">
          الأسفار
        </h1>
      </header>

      {bible.length > 0 && (
        <div className="relative mb-5">
          <Search
            size={18}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink/35"
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ابحث عن سفر..."
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

      {bible.length === 0 ? (
        <div className="surface p-10 text-center">
          <span className="text-4xl">📖</span>
          <p className="font-display text-lg font-extrabold text-deep mt-3">
            لسه مفيش أسفار
          </p>
          <p className="text-ink/55 mt-1 text-sm">
            الأسفار هتظهر هنا أول ما تتضاف.
          </p>
        </div>
      ) : filtered.length === 0 ? (
        <p className="text-center text-ink/45 py-8 text-sm">
          مفيش سفر بالاسم «{query}»
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((b) => (
            <button
              key={b.id}
              onClick={() => {
                setOpenBookId(b.id);
                window.scrollTo(0, 0);
              }}
              className="group surface p-4 flex items-center gap-4 active:scale-[0.99] transition text-right"
            >
              <span className="grid place-items-center h-12 w-12 rounded-2xl bg-gold/15 text-2xl shrink-0">
                📖
              </span>
              <div className="flex-1 min-w-0">
                <p className="font-display text-lg font-extrabold text-deep leading-tight truncate">
                  {b.book}
                </p>
                <p className="text-xs text-ink/50 mt-0.5">
                  {toArabicDigits((b.chapters || []).length)} إصحاح
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
