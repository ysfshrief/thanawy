import { useState } from "react";
import { useStore } from "../lib/hooks";
import { drivePreview, driveDownload } from "../lib/utils";
import { Image as ImageIcon, X, Download, ChevronRight, ChevronLeft } from "lucide-react";

export default function Gallery() {
  const [gallery] = useStore("gallery", []);
  const [active, setActive] = useState(null); // index

  const open = (i) => setActive(i);
  const close = () => setActive(null);
  const prev = () => setActive((a) => (a > 0 ? a - 1 : gallery.length - 1));
  const next = () => setActive((a) => (a < gallery.length - 1 ? a + 1 : 0));

  return (
    <div className="mx-auto max-w-3xl px-5 pt-6 animate-fadeUp">
      <header className="mb-5">
        <p className="eyebrow">
          <ImageIcon size={14} /> ألبوم الصور
        </p>
        <h1 className="font-display text-3xl font-extrabold text-deep mt-1">
          صور الخلوة
        </h1>
      </header>

      {gallery.length === 0 ? (
        <div className="surface p-10 text-center">
          <span className="text-4xl">📷</span>
          <p className="font-display text-lg font-extrabold text-deep mt-3">
            لسه مفيش صور
          </p>
          <p className="text-ink/55 mt-1 text-sm">
            الصور هتظهر هنا أول ما تتضاف أثناء الخلوة.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {gallery.map((img, i) => (
            <button
              key={img.id || i}
              onClick={() => open(i)}
              className="group relative aspect-square rounded-2xl overflow-hidden bg-sand active:scale-[0.98] transition"
            >
              <img
                src={drivePreview(img.url)}
                alt={img.title || ""}
                loading="lazy"
                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {img.title && (
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 to-transparent p-2 text-white text-[11px] font-bold text-right">
                  {img.title}
                </span>
              )}
            </button>
          ))}
        </div>
      )}

      {/* FULLSCREEN VIEWER */}
      {active !== null && gallery[active] && (
        <div
          className="fixed inset-0 z-50 bg-ink/95 backdrop-blur-sm flex flex-col"
          onClick={close}
        >
          <div className="flex items-center justify-between p-4 text-white">
            <button
              onClick={close}
              className="grid place-items-center h-10 w-10 rounded-full bg-white/10"
            >
              <X size={20} />
            </button>
            <a
              href={driveDownload(gallery[active].url)}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="btn-gold py-2.5 px-4 text-sm"
            >
              <Download size={16} /> تحميل
            </a>
          </div>

          <div
            className="flex-1 flex items-center justify-center px-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={drivePreview(gallery[active].url)}
              alt={gallery[active].title || ""}
              className="max-h-full max-w-full rounded-2xl object-contain"
            />
          </div>

          {gallery.length > 1 && (
            <div className="flex items-center justify-between p-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                className="grid place-items-center h-12 w-12 rounded-full bg-white/10 text-white"
              >
                <ChevronRight size={24} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                className="grid place-items-center h-12 w-12 rounded-full bg-white/10 text-white"
              >
                <ChevronLeft size={24} />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
