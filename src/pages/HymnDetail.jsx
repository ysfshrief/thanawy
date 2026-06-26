import { useParams, useNavigate, Link } from "react-router-dom";
import { SEED_HYMNS } from "../lib/seed";
import { useStore } from "../lib/hooks";
import { driveEmbed, driveDownload, drivePreview } from "../lib/utils";
import { ArrowRight, Download, ExternalLink } from "lucide-react";

export default function HymnDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dynamicHymns] = useStore("hymns", []);

  const all = [...SEED_HYMNS, ...dynamicHymns];
  const hymn = all.find((h) => h.id === id);

  if (!hymn) {
    return (
      <div className="mx-auto max-w-3xl px-5 pt-10 text-center">
        <p className="text-ink/60">الترنيمة غير موجودة.</p>
        <Link to="/hymns" className="btn-primary mt-4">
          كل الترانيم
        </Link>
      </div>
    );
  }

  // resolve the file links: builtin uses local files, dynamic uses Drive
  const builtin = hymn.builtin;
  const downloadUrl = builtin ? hymn.pdf : driveDownload(hymn.url);
  const openUrl = builtin ? hymn.pdf : driveEmbed(hymn.url);
  const previewImg = builtin ? hymn.preview : drivePreview(hymn.url);

  return (
    <div className="mx-auto max-w-3xl px-5 pt-6 animate-fadeUp">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1.5 text-deep font-bold text-sm mb-4"
      >
        <ArrowRight size={18} /> كل الترانيم
      </button>

      <header className="mb-4">
        <p className="eyebrow">ترنيمة</p>
        <h1 className="font-display text-3xl font-extrabold text-deep mt-1">
          {hymn.title}
        </h1>
      </header>

      {/* preview */}
      <div className="surface overflow-hidden p-0">
        {builtin ? (
          <img
            src={previewImg}
            alt={hymn.title}
            className="w-full object-contain bg-white"
          />
        ) : (
          <div className="aspect-[3/4] w-full bg-sand">
            <iframe
              src={openUrl}
              title={hymn.title}
              className="w-full h-full"
              allow="autoplay"
            />
          </div>
        )}
      </div>

      {/* actions */}
      <div className="grid grid-cols-2 gap-3 mt-4 sticky bottom-24">
        <a
          href={downloadUrl}
          download
          target="_blank"
          rel="noreferrer"
          className="btn-primary"
        >
          <Download size={18} /> تحميل
        </a>
        <a
          href={openUrl}
          target="_blank"
          rel="noreferrer"
          className="btn-soft"
        >
          <ExternalLink size={18} /> فتح في تبويب
        </a>
      </div>
    </div>
  );
}
