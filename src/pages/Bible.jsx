import { useState } from "react";
import { useStore } from "../lib/hooks";
import { BookOpen, ArrowRight, ChevronDown } from "lucide-react";
import { toArabicDigits } from "../lib/utils";

export default function Bible() {
  const [bible] = useStore("bible", []);
  const [openBookId, setOpenBookId] = useState(null);
  const [openChapterId, setOpenChapterId] = useState(null);

  const book = bible.find((b) => b.id === openBookId);
  const chapter = book?.chapters?.find((c) => c.id === openChapterId);

  // ─── chapter content view ───
  if (book && chapter) {
    return (
      <div className="mx-auto max-w-3xl px-5 pt-6 animate-fadeUp">
        <button
          onClick={() => setOpenChapterId(null)}
          className="inline-flex items-center gap-1.5 text-deep font-bold text-sm mb-4"
        >
          <ArrowRight size={18} /> إصحاحات {book.book}
        </button>
        <header className="mb-5">
          <p className="eyebrow">
            <BookOpen size={14} /> {book.book}
          </p>
          <h1 className="font-display text-3xl font-extrabold text-deep mt-1">
            إصحاح {toArabicDigits(chapter.num)}
          </h1>
        </header>
        <div className="surface p-6">
          <p className="text-deep leading-loose whitespace-pre-line text-lg">
            {chapter.content}
          </p>
        </div>
      </div>
    );
  }

  // ─── chapters list for a book ───
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
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
            {book.chapters.map((c) => (
              <button
                key={c.id}
                onClick={() => setOpenChapterId(c.id)}
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

  // ─── books list ───
  return (
    <div className="mx-auto max-w-3xl px-5 pt-6 animate-fadeUp">
      <header className="mb-5">
        <p className="eyebrow">
          <BookOpen size={14} /> الكتاب المقدس
        </p>
        <h1 className="font-display text-3xl font-extrabold text-deep mt-1">
          الأسفار
        </h1>
        <p className="text-ink/60 mt-1 text-sm">اختر سفرًا ثم إصحاحًا للقراءة.</p>
      </header>

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
      ) : (
        <div className="flex flex-col gap-3">
          {bible.map((b) => (
            <button
              key={b.id}
              onClick={() => setOpenBookId(b.id)}
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
