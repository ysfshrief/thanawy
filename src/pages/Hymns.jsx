import { Link } from "react-router-dom";
import { SEED_HYMNS } from "../lib/seed";
import { useStore } from "../lib/hooks";
import { drivePreview } from "../lib/utils";
import { Music, ArrowLeft, FileText } from "lucide-react";

export default function Hymns() {
  const [dynamicHymns] = useStore("hymns", []);

  // built-in first, then admin-added
  const all = [...SEED_HYMNS, ...dynamicHymns];

  return (
    <div className="mx-auto max-w-3xl px-5 pt-6 animate-fadeUp">
      <header className="mb-5">
        <p className="eyebrow">
          <Music size={14} /> ترانيم الخلوة
        </p>
        <h1 className="font-display text-3xl font-extrabold text-deep mt-1">
          الترانيم
        </h1>
        <p className="text-ink/55 mt-1 text-sm">
          افتح أي ترنيمة للكلمات أو حمّلها <span className="latin">PDF</span>.
        </p>
      </header>

      <div className="flex flex-col gap-3">
        {all.map((hymn, i) => {
          const cover = hymn.preview
            ? hymn.preview
            : hymn.url
            ? drivePreview(hymn.url)
            : null;
          return (
            <Link
              key={hymn.id || i}
              to={`/hymns/${hymn.id}`}
              className="group surface p-3 flex items-center gap-4 active:scale-[0.99] transition"
            >
              <span className="relative h-16 w-16 rounded-2xl overflow-hidden bg-sand shrink-0 grid place-items-center">
                {cover ? (
                  <img
                    src={cover}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <FileText size={26} className="text-teal" />
                )}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-bold text-teal">
                  ترنيمة {toArabicIndex(i + 1)}
                </p>
                <p className="font-display text-lg font-extrabold text-deep leading-tight truncate">
                  {hymn.title}
                </p>
              </div>
              <ArrowLeft
                size={20}
                className="text-ink/30 group-hover:-translate-x-1 transition-transform shrink-0"
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function toArabicIndex(n) {
  const d = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
  return String(n).replace(/\d/g, (x) => d[+x]);
}
