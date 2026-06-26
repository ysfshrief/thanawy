import { useStore } from "../lib/hooks";
import { driveEmbed, driveDownload } from "../lib/utils";
import { BookOpen, Cross, Download, ExternalLink } from "lucide-react";

function ContentBlock({ icon: Icon, eyebrow, title, data, accent }) {
  const hasContent = data?.driveUrl;
  return (
    <section className="surface overflow-hidden">
      <div
        className="p-5 text-white"
        style={{ background: accent }}
      >
        <p className="text-white/70 text-xs font-bold flex items-center gap-1.5">
          <Icon size={14} /> {eyebrow}
        </p>
        <h2 className="font-display text-xl font-extrabold mt-1">{title}</h2>
        {data?.note && (
          <p className="text-white/85 text-sm mt-2 leading-relaxed">
            {data.note}
          </p>
        )}
      </div>

      {hasContent ? (
        <>
          <div className="aspect-[3/4] bg-sand">
            <iframe
              src={driveEmbed(data.driveUrl)}
              title={title}
              className="w-full h-full"
            />
          </div>
          <div className="grid grid-cols-2 gap-3 p-4">
            <a
              href={driveDownload(data.driveUrl)}
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
            >
              <Download size={18} /> تحميل
            </a>
            <a
              href={data.driveUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-soft"
            >
              <ExternalLink size={18} /> فتح
            </a>
          </div>
        </>
      ) : (
        <div className="p-8 text-center text-ink/50">
          <p className="text-sm">المحتوى هيتضاف قريباً.</p>
        </div>
      )}
    </section>
  );
}

export default function Content() {
  const [bibleStudy] = useStore("bibleStudy", { driveUrl: "", note: "" });
  const [spiritualWord] = useStore("spiritualWord", { driveUrl: "", note: "" });

  return (
    <div className="mx-auto max-w-3xl px-5 pt-6 animate-fadeUp">
      <header className="mb-5">
        <p className="eyebrow">
          <BookOpen size={14} /> روحيات الخلوة
        </p>
        <h1 className="font-display text-3xl font-extrabold text-deep mt-1">
          الكلمة والدراسة
        </h1>
      </header>

      <div className="flex flex-col gap-5">
        <ContentBlock
          icon={BookOpen}
          eyebrow="دراسة كتاب"
          title="دراسة الكتاب المقدس"
          data={bibleStudy}
          accent="linear-gradient(140deg,#12303b,#1d5b6e)"
        />
        <ContentBlock
          icon={Cross}
          eyebrow="كلمة روحية"
          title="الكلمة الروحية"
          data={spiritualWord}
          accent="linear-gradient(140deg,#9a6b18,#c9962f)"
        />
      </div>
    </div>
  );
}
