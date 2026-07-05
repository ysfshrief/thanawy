import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useStore } from "../lib/hooks";
import { store } from "../lib/store";
import { firebaseReady } from "../lib/firebase";
import { TEAMS, SCHEDULE as SEED_SCHEDULE } from "../lib/seed";
import { toArabicDigits, drivePreview, fmtTime } from "../lib/utils";
import {
  ShieldCheck,
  LogOut,
  Plus,
  Minus,
  Trash2,
  Eye,
  EyeOff,
  Trophy,
  Image as ImageIcon,
  Music,
  BookOpen,
  Cross,
  Home as HomeIcon,
  Check,
  Database,
  HardDrive,
  Pencil,
  CalendarDays,
  ChevronUp,
  ChevronDown,
  RotateCcw,
  Cross,
  BookMarked,
} from "lucide-react";

/* ───────────────────────── LOGIN ───────────────────────── */
function Login() {
  const { login } = useAuth();
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [err, setErr] = useState(false);
  const [show, setShow] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (!login(u, p)) setErr(true);
  };

  return (
    <div className="min-h-screen grid place-items-center bg-ink px-5">
      <div className="w-full max-w-sm animate-fadeUp">
        <div className="text-center mb-6">
          <img
            src="/assets/church-logo.png"
            alt="شعار الكنيسة"
            className="w-24 mx-auto"
          />
          <p className="text-white font-display font-extrabold text-lg mt-3">
            خلوة ثانوي بنين
          </p>
          <p className="text-white/60 mt-1 flex items-center justify-center gap-1.5 text-sm">
            <ShieldCheck size={15} /> لوحة تحكم المشرف
          </p>
        </div>

        <form onSubmit={submit} className="bg-white rounded-3xl p-6 shadow-card">
          <label className="block text-sm font-bold text-deep mb-1.5">
            اسم المستخدم
          </label>
          <input
            value={u}
            onChange={(e) => {
              setU(e.target.value);
              setErr(false);
            }}
            className="w-full rounded-2xl border border-black/10 px-4 py-3 mb-4 latin focus:border-teal outline-none"
            placeholder="costa"
            dir="ltr"
            autoComplete="username"
          />

          <label className="block text-sm font-bold text-deep mb-1.5">
            كلمة المرور
          </label>
          <div className="relative mb-4">
            <input
              value={p}
              onChange={(e) => {
                setP(e.target.value);
                setErr(false);
              }}
              type={show ? "text" : "password"}
              className="w-full rounded-2xl border border-black/10 px-4 py-3 latin focus:border-teal outline-none"
              dir="ltr"
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/40"
            >
              {show ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {err && (
            <p className="text-red-600 text-sm font-bold mb-3 text-center">
              بيانات الدخول غير صحيحة
            </p>
          )}

          <button type="submit" className="btn-primary w-full">
            دخول
          </button>
        </form>

        <Link
          to="/"
          className="block text-center text-white/50 text-sm mt-5 hover:text-white/80"
        >
          ← العودة للموقع
        </Link>
      </div>
    </div>
  );
}

/* ───────────────────────── SECTION SHELL ───────────────────────── */
function Card({ icon: Icon, title, children, right }) {
  return (
    <section className="bg-white rounded-3xl shadow-card border border-black/5 overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-black/5 bg-sand/40">
        <h2 className="font-extrabold text-deep flex items-center gap-2">
          <Icon size={18} className="text-teal" /> {title}
        </h2>
        {right}
      </div>
      <div className="p-5">{children}</div>
    </section>
  );
}

/* ───────────────────────── POINTS ───────────────────────── */
function PointsManager() {
  const [points, setPoints] = useStore("points", {});
  const [amt, setAmt] = useState(5);

  const change = (teamId, delta) => {
    const cur = points[teamId] || 0;
    setPoints({ ...points, [teamId]: Math.max(0, cur + delta) });
  };

  return (
    <Card icon={Trophy} title="نقاط الفرق">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-sm font-bold text-ink/60">مقدار التعديل:</span>
        {[1, 5, 10, 25].map((v) => (
          <button
            key={v}
            onClick={() => setAmt(v)}
            className={`h-9 w-10 rounded-xl font-extrabold latin text-sm ${
              amt === v ? "bg-teal text-white" : "bg-sand text-deep"
            }`}
          >
            {toArabicDigits(v)}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        {TEAMS.map((t) => (
          <div
            key={t.id}
            className="flex items-center gap-3 rounded-2xl p-3 border-2"
            style={{ background: `${t.color}10`, borderColor: `${t.color}40` }}
          >
            <img
              src={t.image}
              alt={t.name}
              className="h-11 w-11 rounded-xl object-cover border-2 shrink-0"
              style={{ borderColor: t.color }}
            />
            <div className="flex-1 min-w-0">
              <p className="font-bold text-deep text-sm truncate">{t.name}</p>
              <p
                className="latin font-display text-2xl font-extrabold"
                style={{ color: t.color }}
              >
                {toArabicDigits(points[t.id] || 0)}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => change(t.id, -amt)}
                className="grid place-items-center h-10 w-10 rounded-xl bg-red-100 text-red-600 active:scale-90"
                aria-label="خصم"
              >
                <Minus size={18} />
              </button>
              <button
                onClick={() => change(t.id, amt)}
                className="grid place-items-center h-10 w-10 rounded-xl bg-green-100 text-green-700 active:scale-90"
                aria-label="إضافة"
              >
                <Plus size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

/* ───────────────────────── RANKING PUBLISH ───────────────────────── */
function RankingPublish() {
  const [state, setState] = useStore("rankingState", { published: false });
  const published = state?.published;

  return (
    <Card icon={published ? Eye : EyeOff} title="نشر النتائج">
      <p className="text-sm text-ink/60 mb-4 leading-relaxed">
        النتائج {published ? "ظاهرة" : "مخفية"} للجميع حالياً. تحكّم في ظهور
        ترتيب الفرق على الموقع.
      </p>
      <button
        onClick={() => setState({ published: !published })}
        className={`w-full ${published ? "btn-soft" : "btn-gold"}`}
      >
        {published ? (
          <>
            <EyeOff size={18} /> إخفاء النتائج
          </>
        ) : (
          <>
            <Eye size={18} /> نشر النتائج الآن
          </>
        )}
      </button>
    </Card>
  );
}

/* ───────────────────────── TEAM LOGOS ───────────────────────── */
function TeamLogos() {
  const [logos, setLogos] = useStore("teamLogos", {});
  const [draft, setDraft] = useState({});

  const save = (teamId) => {
    const url = (draft[teamId] ?? logos[teamId] ?? "").trim();
    setLogos({ ...logos, [teamId]: url });
  };

  const remove = (teamId) => {
    const next = { ...logos };
    delete next[teamId];
    setLogos(next);
    setDraft({ ...draft, [teamId]: "" });
  };

  return (
    <Card icon={ImageIcon} title="شعارات الفرق">
      <p className="text-xs text-ink/55 mb-4 leading-relaxed">
        كل فريق عنده مكان مخصص للشعار. ضع رابط
        <span className="latin"> Google Drive </span>
        لصورة الشعار وسيظهر تلقائياً على كارت الفريق وصفحته.
      </p>
      <div className="flex flex-col gap-4">
        {TEAMS.map((t) => (
          <div key={t.id}>
            <p className="text-sm font-bold text-deep mb-1.5 flex items-center gap-1.5">
              <span>{t.emoji}</span> {t.name}
            </p>
            <div className="flex items-center gap-2">
              <span className="h-12 w-12 rounded-xl overflow-hidden bg-sand grid place-items-center shrink-0 border border-dashed border-black/15">
                {logos[t.id] ? (
                  <img
                    src={drivePreview(logos[t.id])}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-[9px] text-ink/40 text-center leading-tight px-1">
                    شعار
                    <br />
                    الفريق
                  </span>
                )}
              </span>
              <input
                value={draft[t.id] ?? logos[t.id] ?? ""}
                onChange={(e) =>
                  setDraft({ ...draft, [t.id]: e.target.value })
                }
                placeholder="رابط Google Drive للشعار"
                dir="ltr"
                className="flex-1 min-w-0 rounded-xl border border-black/10 px-3 py-2 text-sm latin outline-none focus:border-teal"
              />
              <button
                onClick={() => save(t.id)}
                className="grid place-items-center h-10 w-10 rounded-xl bg-teal text-white shrink-0"
                title="حفظ"
              >
                <Check size={18} />
              </button>
              {logos[t.id] && (
                <button
                  onClick={() => remove(t.id)}
                  className="grid place-items-center h-10 w-10 rounded-xl bg-red-100 text-red-600 shrink-0"
                  title="حذف"
                >
                  <Trash2 size={17} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

/* ───────────────────────── GALLERY MANAGER ───────────────────────── */
function GalleryManager() {
  const [gallery, setGallery] = useStore("gallery", []);
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");

  const add = () => {
    if (!url.trim()) return;
    setGallery([
      { id: `g_${Date.now()}`, url: url.trim(), title: title.trim() },
      ...gallery,
    ]);
    setUrl("");
    setTitle("");
  };

  const remove = (id) => setGallery(gallery.filter((g) => g.id !== id));

  return (
    <Card icon={ImageIcon} title="معرض الصور">
      <div className="flex flex-col gap-2 mb-4">
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="رابط الصورة من Google Drive"
          dir="ltr"
          className="rounded-xl border border-black/10 px-3 py-2.5 text-sm latin outline-none focus:border-teal"
        />
        <div className="flex gap-2">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="عنوان (اختياري)"
            className="flex-1 rounded-xl border border-black/10 px-3 py-2.5 text-sm outline-none focus:border-teal"
          />
          <button onClick={add} className="btn-primary px-5 py-2.5">
            <Plus size={18} /> إضافة
          </button>
        </div>
      </div>

      {gallery.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {gallery.map((g) => (
            <div
              key={g.id}
              className="relative aspect-square rounded-xl overflow-hidden bg-sand group"
            >
              <img
                src={drivePreview(g.url)}
                alt=""
                className="h-full w-full object-cover"
              />
              <button
                onClick={() => remove(g.id)}
                className="absolute top-1 left-1 grid place-items-center h-8 w-8 rounded-lg bg-red-600 text-white"
              >
                <Trash2 size={15} />
              </button>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

/* ───────────────────────── HYMNS MANAGER ───────────────────────── */
function HymnsManager() {
  const [hymns, setHymns] = useStore("hymns", []);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [editId, setEditId] = useState(null);

  const reset = () => {
    setTitle("");
    setUrl("");
    setEditId(null);
  };

  const submit = () => {
    if (!title.trim() || !url.trim()) return;
    if (editId) {
      setHymns(
        hymns.map((h) =>
          h.id === editId ? { ...h, title: title.trim(), url: url.trim() } : h
        )
      );
    } else {
      setHymns([
        ...hymns,
        { id: `h_${Date.now()}`, title: title.trim(), url: url.trim() },
      ]);
    }
    reset();
  };

  const edit = (h) => {
    setEditId(h.id);
    setTitle(h.title);
    setUrl(h.url);
  };

  const remove = (id) => setHymns(hymns.filter((h) => h.id !== id));

  return (
    <Card icon={Music} title="إدارة الترانيم">
      <p className="text-xs text-ink/50 mb-3 leading-relaxed">
        الترانيم الثلاثة الأساسية مدمجة في الموقع. هنا تضيف ترانيم جديدة عبر روابط
        <span className="latin"> Google Drive</span> وتظهر تلقائياً.
      </p>

      <div className="flex flex-col gap-2 mb-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="عنوان الترنيمة"
          className="rounded-xl border border-black/10 px-3 py-2.5 text-sm outline-none focus:border-teal"
        />
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="رابط ملف PDF من Google Drive"
          dir="ltr"
          className="rounded-xl border border-black/10 px-3 py-2.5 text-sm latin outline-none focus:border-teal"
        />
        <div className="flex gap-2">
          <button onClick={submit} className="btn-primary flex-1 py-2.5">
            {editId ? <Check size={18} /> : <Plus size={18} />}
            {editId ? "حفظ التعديل" : "إضافة ترنيمة"}
          </button>
          {editId && (
            <button onClick={reset} className="btn-soft py-2.5 px-4">
              إلغاء
            </button>
          )}
        </div>
      </div>

      {hymns.length > 0 ? (
        <div className="flex flex-col gap-2">
          {hymns.map((h) => (
            <div
              key={h.id}
              className="flex items-center gap-2 rounded-xl bg-sand/60 px-3 py-2.5"
            >
              <Music size={16} className="text-teal shrink-0" />
              <span className="flex-1 font-bold text-deep text-sm truncate">
                {h.title}
              </span>
              <button
                onClick={() => edit(h)}
                className="text-xs font-bold text-teal px-2 py-1"
              >
                تعديل
              </button>
              <button
                onClick={() => remove(h.id)}
                className="grid place-items-center h-8 w-8 rounded-lg bg-red-100 text-red-600"
              >
                <Trash2 size={15} />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-ink/40 text-sm py-2">
          لا توجد ترانيم مضافة بعد.
        </p>
      )}
    </Card>
  );
}

/* ───────────────────────── DRIVE CONTENT ───────────────────────── */
function DriveContentManager({ storeKey, icon, title }) {
  const [data, setData] = useStore(storeKey, { driveUrl: "", note: "" });
  const [url, setUrl] = useState("");
  const [note, setNote] = useState("");
  const [editing, setEditing] = useState(false);

  // sync local draft when stored data first loads / changes
  useEffect(() => {
    setUrl(data?.driveUrl || "");
    setNote(data?.note || "");
  }, [data?.driveUrl, data?.note]);

  const save = () => {
    setData({ driveUrl: url.trim(), note: note.trim() });
    setEditing(false);
  };
  const remove = () => {
    setData({ driveUrl: "", note: "" });
    setUrl("");
    setNote("");
    setEditing(false);
  };

  const hasContent = Boolean(data?.driveUrl);

  return (
    <Card icon={icon} title={title}>
      {hasContent && !editing ? (
        <div className="flex flex-col gap-3">
          <div className="rounded-xl bg-green-50 border border-green-200 px-3 py-2.5">
            <p className="text-xs font-bold text-green-800 mb-1">
              ✓ المحتوى مضاف
            </p>
            <p className="latin text-xs text-ink/60 break-all" dir="ltr">
              {data.driveUrl}
            </p>
            {data.note && (
              <p className="text-sm text-deep mt-1">{data.note}</p>
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setEditing(true)}
              className="btn-soft flex-1 py-2.5"
            >
              <Pencil size={16} /> تعديل
            </button>
            <button
              onClick={remove}
              className="grid place-items-center h-11 w-12 rounded-2xl bg-red-100 text-red-600"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="رابط Google Drive"
            dir="ltr"
            className="rounded-xl border border-black/10 px-3 py-2.5 text-sm latin outline-none focus:border-teal"
          />
          <input
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="وصف قصير (اختياري)"
            className="rounded-xl border border-black/10 px-3 py-2.5 text-sm outline-none focus:border-teal"
          />
          <div className="flex gap-2">
            <button onClick={save} className="btn-primary flex-1 py-2.5">
              <Check size={18} /> حفظ
            </button>
            {editing && (
              <button
                onClick={() => setEditing(false)}
                className="btn-soft py-2.5 px-4"
              >
                إلغاء
              </button>
            )}
          </div>
        </div>
      )}
    </Card>
  );
}

/* ───────────────────────── SCHEDULE MANAGER ───────────────────────── */
function ScheduleManager() {
  const [customSchedule, setCustomSchedule] = useStore("schedule", null);
  const [state, setState] = useStore("scheduleState", { hidden: false });

  // working copy: custom if present, else the seed default
  const schedule =
    Array.isArray(customSchedule) && customSchedule.length
      ? customSchedule
      : SEED_SCHEDULE;

  const [activeDay, setActiveDay] = useState(schedule[0]?.id);
  const day = schedule.find((d) => d.id === activeDay) || schedule[0];

  // deep clone helper
  const clone = (s) => JSON.parse(JSON.stringify(s));

  const persist = (next) => setCustomSchedule(next);

  const updateItem = (dayId, idx, field, value) => {
    const next = clone(schedule);
    const d = next.find((x) => x.id === dayId);
    d.items[idx][field] = value;
    persist(next);
  };

  const addItem = (dayId) => {
    const next = clone(schedule);
    const d = next.find((x) => x.id === dayId);
    d.items.push({
      start: "12:00",
      end: "13:00",
      title: "فقرة جديدة",
      desc: "",
      icon: "📌",
    });
    persist(next);
  };

  const deleteItem = (dayId, idx) => {
    const next = clone(schedule);
    const d = next.find((x) => x.id === dayId);
    d.items.splice(idx, 1);
    persist(next);
  };

  const moveItem = (dayId, idx, dir) => {
    const next = clone(schedule);
    const d = next.find((x) => x.id === dayId);
    const j = idx + dir;
    if (j < 0 || j >= d.items.length) return;
    [d.items[idx], d.items[j]] = [d.items[j], d.items[idx]];
    persist(next);
  };

  const resetDefault = () => {
    if (
      window.confirm(
        "هيتم استرجاع البرنامج الأصلي وإلغاء كل التعديلات. متأكد؟"
      )
    ) {
      setCustomSchedule(null);
    }
  };

  const hidden = state?.hidden;

  return (
    <Card
      icon={CalendarDays}
      title="إدارة البرنامج"
      right={
        <button
          onClick={() => setState({ hidden: !hidden })}
          className={`chip ${
            hidden ? "bg-amber-100 text-amber-800" : "bg-green-100 text-green-800"
          }`}
        >
          {hidden ? (
            <>
              <EyeOff size={13} /> مخفي
            </>
          ) : (
            <>
              <Eye size={13} /> ظاهر
            </>
          )}
        </button>
      }
    >
      {/* show/hide + reset controls */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setState({ hidden: !hidden })}
          className={`flex-1 ${hidden ? "btn-gold" : "btn-soft"} py-2.5`}
        >
          {hidden ? (
            <>
              <Eye size={16} /> إظهار البرنامج
            </>
          ) : (
            <>
              <EyeOff size={16} /> إخفاء البرنامج
            </>
          )}
        </button>
        <button
          onClick={resetDefault}
          className="btn-soft py-2.5 px-4"
          title="استرجاع الأصلي"
        >
          <RotateCcw size={16} />
        </button>
      </div>

      {/* day tabs */}
      <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar">
        {schedule.map((d) => (
          <button
            key={d.id}
            onClick={() => setActiveDay(d.id)}
            className={`shrink-0 rounded-xl px-3 py-2 text-sm font-bold ${
              d.id === activeDay
                ? "bg-teal text-white"
                : "bg-sand text-deep"
            }`}
          >
            {d.label}
          </button>
        ))}
      </div>

      {/* items editor */}
      <div className="flex flex-col gap-3">
        {day?.items.map((item, idx) => (
          <div
            key={idx}
            className="rounded-2xl border border-black/10 p-3 bg-sand/30"
          >
            <div className="flex items-center gap-2 mb-2">
              <input
                value={item.icon}
                onChange={(e) =>
                  updateItem(day.id, idx, "icon", e.target.value)
                }
                className="w-11 text-center rounded-lg border border-black/10 px-1 py-2 text-lg outline-none focus:border-teal"
                maxLength={2}
              />
              <input
                value={item.title}
                onChange={(e) =>
                  updateItem(day.id, idx, "title", e.target.value)
                }
                placeholder="اسم الفقرة"
                className="flex-1 rounded-lg border border-black/10 px-3 py-2 text-sm font-bold outline-none focus:border-teal"
              />
            </div>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex-1">
                <label className="text-[10px] text-ink/50 font-bold">
                  البداية
                </label>
                <input
                  type="time"
                  value={item.start.replace("24:", "00:").slice(0, 5)}
                  onChange={(e) =>
                    updateItem(day.id, idx, "start", e.target.value)
                  }
                  className="w-full rounded-lg border border-black/10 px-2 py-1.5 text-sm latin outline-none focus:border-teal"
                />
              </div>
              <div className="flex-1">
                <label className="text-[10px] text-ink/50 font-bold">
                  النهاية
                </label>
                <input
                  type="time"
                  value={item.end.replace("24:", "00:").slice(0, 5)}
                  onChange={(e) =>
                    updateItem(day.id, idx, "end", e.target.value)
                  }
                  className="w-full rounded-lg border border-black/10 px-2 py-1.5 text-sm latin outline-none focus:border-teal"
                />
              </div>
            </div>
            <input
              value={item.desc || ""}
              onChange={(e) => updateItem(day.id, idx, "desc", e.target.value)}
              placeholder="وصف (اختياري)"
              className="w-full rounded-lg border border-black/10 px-3 py-2 text-sm outline-none focus:border-teal mb-2"
            />
            <div className="flex items-center justify-between">
              <span className="latin text-xs text-ink/50">
                {fmtTime(item.start)} – {fmtTime(item.end)}
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => moveItem(day.id, idx, -1)}
                  className="grid place-items-center h-8 w-8 rounded-lg bg-white border border-black/10 text-ink/60"
                  title="لأعلى"
                >
                  <ChevronUp size={15} />
                </button>
                <button
                  onClick={() => moveItem(day.id, idx, 1)}
                  className="grid place-items-center h-8 w-8 rounded-lg bg-white border border-black/10 text-ink/60"
                  title="لأسفل"
                >
                  <ChevronDown size={15} />
                </button>
                <button
                  onClick={() => deleteItem(day.id, idx)}
                  className="grid place-items-center h-8 w-8 rounded-lg bg-red-100 text-red-600"
                  title="حذف"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => addItem(day.id)}
        className="btn-primary w-full mt-3 py-2.5"
      >
        <Plus size={18} /> إضافة فقرة لـ{day?.label}
      </button>
    </Card>
  );
}

/* ───────────────────────── PRAYERS MANAGER ───────────────────────── */
function PrayersManager() {
  const [prayers, setPrayers] = useStore("prayers", []);
  const [openId, setOpenId] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newSection, setNewSection] = useState("");

  const clone = (x) => JSON.parse(JSON.stringify(x));
  const active = prayers.find((p) => p.id === openId);

  const addPrayer = () => {
    if (!newTitle.trim()) return;
    const p = { id: `pr_${Date.now()}`, title: newTitle.trim(), sections: [] };
    setPrayers([...prayers, p]);
    setNewTitle("");
    setOpenId(p.id);
  };

  const deletePrayer = (id) => {
    if (!window.confirm("حذف الصلاة نهائياً؟")) return;
    setPrayers(prayers.filter((p) => p.id !== id));
    if (openId === id) setOpenId(null);
  };

  const updatePrayerTitle = (id, title) => {
    setPrayers(prayers.map((p) => (p.id === id ? { ...p, title } : p)));
  };

  const addSection = (label) => {
    if (!label.trim()) return;
    const next = clone(prayers);
    const p = next.find((x) => x.id === openId);
    p.sections = p.sections || [];
    p.sections.push({ id: `s_${Date.now()}`, label: label.trim(), content: "" });
    setPrayers(next);
    setNewSection("");
  };

  const updateSection = (secId, field, value) => {
    const next = clone(prayers);
    const p = next.find((x) => x.id === openId);
    const s = p.sections.find((x) => x.id === secId);
    s[field] = value;
    setPrayers(next);
  };

  const deleteSection = (secId) => {
    const next = clone(prayers);
    const p = next.find((x) => x.id === openId);
    p.sections = p.sections.filter((s) => s.id !== secId);
    setPrayers(next);
  };

  const moveSection = (idx, dir) => {
    const next = clone(prayers);
    const p = next.find((x) => x.id === openId);
    const j = idx + dir;
    if (j < 0 || j >= p.sections.length) return;
    [p.sections[idx], p.sections[j]] = [p.sections[j], p.sections[idx]];
    setPrayers(next);
  };

  // ── editing a single prayer's sections ──
  if (active) {
    return (
      <Card icon={Cross} title="تعديل الصلاة">
        <button
          onClick={() => setOpenId(null)}
          className="text-sm font-bold text-teal mb-3"
        >
          ← كل الصلوات
        </button>

        <input
          value={active.title}
          onChange={(e) => updatePrayerTitle(active.id, e.target.value)}
          placeholder="عنوان الصلاة"
          className="w-full rounded-xl border border-black/10 px-3 py-2.5 text-sm font-bold outline-none focus:border-teal mb-4"
        />

        <div className="flex flex-col gap-3">
          {(active.sections || []).map((sec, idx) => (
            <div
              key={sec.id}
              className="rounded-2xl border border-black/10 p-3 bg-sand/30"
            >
              <div className="flex items-center gap-2 mb-2">
                <input
                  value={sec.label}
                  onChange={(e) =>
                    updateSection(sec.id, "label", e.target.value)
                  }
                  placeholder="اسم الخانة (مثلاً: المزامير)"
                  className="flex-1 rounded-lg border border-black/10 px-3 py-2 text-sm font-bold outline-none focus:border-teal"
                />
                <button
                  onClick={() => moveSection(idx, -1)}
                  className="grid place-items-center h-8 w-8 rounded-lg bg-white border border-black/10 text-ink/60"
                >
                  <ChevronUp size={15} />
                </button>
                <button
                  onClick={() => moveSection(idx, 1)}
                  className="grid place-items-center h-8 w-8 rounded-lg bg-white border border-black/10 text-ink/60"
                >
                  <ChevronDown size={15} />
                </button>
                <button
                  onClick={() => deleteSection(sec.id)}
                  className="grid place-items-center h-8 w-8 rounded-lg bg-red-100 text-red-600"
                >
                  <Trash2 size={15} />
                </button>
              </div>
              <textarea
                value={sec.content}
                onChange={(e) =>
                  updateSection(sec.id, "content", e.target.value)
                }
                placeholder="الصق محتوى الخانة هنا..."
                rows={4}
                className="w-full rounded-lg border border-black/10 px-3 py-2 text-sm outline-none focus:border-teal leading-relaxed"
              />
            </div>
          ))}
        </div>

        {/* add section */}
        <div className="flex gap-2 mt-4">
          <input
            value={newSection}
            onChange={(e) => setNewSection(e.target.value)}
            placeholder="اسم خانة جديدة (المقدمة، الإنجيل...)"
            className="flex-1 rounded-xl border border-black/10 px-3 py-2.5 text-sm outline-none focus:border-teal"
          />
          <button
            onClick={() => addSection(newSection)}
            className="btn-primary py-2.5 px-4"
          >
            <Plus size={18} />
          </button>
        </div>
      </Card>
    );
  }

  // ── prayers list ──
  return (
    <Card icon={Cross} title="إدارة الصلوات">
      <div className="flex gap-2 mb-4">
        <input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="عنوان صلاة جديدة"
          className="flex-1 rounded-xl border border-black/10 px-3 py-2.5 text-sm outline-none focus:border-teal"
        />
        <button onClick={addPrayer} className="btn-primary py-2.5 px-4">
          <Plus size={18} /> إضافة
        </button>
      </div>

      {prayers.length === 0 ? (
        <p className="text-center text-ink/40 text-sm py-2">
          لا توجد صلوات بعد.
        </p>
      ) : (
        <div className="flex flex-col gap-2">
          {prayers.map((p) => (
            <div
              key={p.id}
              className="flex items-center gap-2 rounded-xl bg-sand/60 px-3 py-2.5"
            >
              <Cross size={16} className="text-teal shrink-0" />
              <span className="flex-1 font-bold text-deep text-sm truncate">
                {p.title}
                <span className="text-ink/40 font-normal">
                  {" "}
                  · {(p.sections || []).length} أقسام
                </span>
              </span>
              <button
                onClick={() => setOpenId(p.id)}
                className="text-xs font-bold text-teal px-2 py-1"
              >
                تعديل
              </button>
              <button
                onClick={() => deletePrayer(p.id)}
                className="grid place-items-center h-8 w-8 rounded-lg bg-red-100 text-red-600"
              >
                <Trash2 size={15} />
              </button>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

/* ───────────────────────── BIBLE MANAGER ───────────────────────── */
function BibleManager() {
  const [bible, setBible] = useStore("bible", []);
  const [openId, setOpenId] = useState(null);
  const [newBook, setNewBook] = useState("");
  const [chapNum, setChapNum] = useState("");
  const [chapContent, setChapContent] = useState("");

  const clone = (x) => JSON.parse(JSON.stringify(x));
  const active = bible.find((b) => b.id === openId);

  const addBook = () => {
    if (!newBook.trim()) return;
    const b = { id: `bk_${Date.now()}`, book: newBook.trim(), chapters: [] };
    setBible([...bible, b]);
    setNewBook("");
    setOpenId(b.id);
  };

  const deleteBook = (id) => {
    if (!window.confirm("حذف السفر نهائياً؟")) return;
    setBible(bible.filter((b) => b.id !== id));
    if (openId === id) setOpenId(null);
  };

  const addChapter = () => {
    if (!chapNum.trim() || !chapContent.trim()) return;
    const next = clone(bible);
    const b = next.find((x) => x.id === openId);
    b.chapters = b.chapters || [];
    b.chapters.push({
      id: `ch_${Date.now()}`,
      num: chapNum.trim(),
      content: chapContent.trim(),
    });
    setBible(next);
    setChapNum("");
    setChapContent("");
  };

  const updateChapter = (chId, field, value) => {
    const next = clone(bible);
    const b = next.find((x) => x.id === openId);
    const c = b.chapters.find((x) => x.id === chId);
    c[field] = value;
    setBible(next);
  };

  const deleteChapter = (chId) => {
    const next = clone(bible);
    const b = next.find((x) => x.id === openId);
    b.chapters = b.chapters.filter((c) => c.id !== chId);
    setBible(next);
  };

  // ── editing a book's chapters ──
  if (active) {
    return (
      <Card icon={BookMarked} title={`إصحاحات: ${active.book}`}>
        <button
          onClick={() => setOpenId(null)}
          className="text-sm font-bold text-teal mb-3"
        >
          ← كل الأسفار
        </button>

        {/* add chapter */}
        <div className="rounded-2xl border border-black/10 p-3 bg-sand/30 mb-4">
          <p className="text-sm font-bold text-deep mb-2">إضافة إصحاح</p>
          <input
            value={chapNum}
            onChange={(e) => setChapNum(e.target.value)}
            placeholder="رقم الإصحاح (مثلاً: 1)"
            className="w-full rounded-lg border border-black/10 px-3 py-2 text-sm outline-none focus:border-teal mb-2 latin"
            dir="ltr"
          />
          <textarea
            value={chapContent}
            onChange={(e) => setChapContent(e.target.value)}
            placeholder="الصق نص الإصحاح كامل هنا..."
            rows={5}
            className="w-full rounded-lg border border-black/10 px-3 py-2 text-sm outline-none focus:border-teal leading-relaxed mb-2"
          />
          <button onClick={addChapter} className="btn-primary w-full py-2.5">
            <Plus size={18} /> إضافة الإصحاح
          </button>
        </div>

        {/* existing chapters */}
        <div className="flex flex-col gap-2">
          {(active.chapters || []).map((c) => (
            <details
              key={c.id}
              className="rounded-xl border border-black/10 bg-white overflow-hidden"
            >
              <summary className="flex items-center gap-2 px-3 py-2.5 cursor-pointer">
                <span className="font-bold text-deep text-sm flex-1">
                  إصحاح {c.num}
                </span>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    deleteChapter(c.id);
                  }}
                  className="grid place-items-center h-7 w-7 rounded-lg bg-red-100 text-red-600"
                >
                  <Trash2 size={14} />
                </button>
              </summary>
              <div className="p-3 border-t border-black/5">
                <textarea
                  value={c.content}
                  onChange={(e) => updateChapter(c.id, "content", e.target.value)}
                  rows={5}
                  className="w-full rounded-lg border border-black/10 px-3 py-2 text-sm outline-none focus:border-teal leading-relaxed"
                />
              </div>
            </details>
          ))}
          {(active.chapters || []).length === 0 && (
            <p className="text-center text-ink/40 text-sm py-2">
              لا توجد إصحاحات بعد.
            </p>
          )}
        </div>
      </Card>
    );
  }

  // ── books list ──
  return (
    <Card icon={BookMarked} title="إدارة الكتاب المقدس">
      <p className="text-xs text-ink/50 mb-3 leading-relaxed">
        أضف سفرًا، ثم افتحه لإضافة إصحاحاته ولصق محتوى كل إصحاح.
      </p>
      <div className="flex gap-2 mb-4">
        <input
          value={newBook}
          onChange={(e) => setNewBook(e.target.value)}
          placeholder="اسم السفر (مثلاً: إنجيل يوحنا)"
          className="flex-1 rounded-xl border border-black/10 px-3 py-2.5 text-sm outline-none focus:border-teal"
        />
        <button onClick={addBook} className="btn-primary py-2.5 px-4">
          <Plus size={18} /> إضافة
        </button>
      </div>

      {bible.length === 0 ? (
        <p className="text-center text-ink/40 text-sm py-2">
          لا توجد أسفار بعد.
        </p>
      ) : (
        <div className="flex flex-col gap-2">
          {bible.map((b) => (
            <div
              key={b.id}
              className="flex items-center gap-2 rounded-xl bg-sand/60 px-3 py-2.5"
            >
              <BookMarked size={16} className="text-gold shrink-0" />
              <span className="flex-1 font-bold text-deep text-sm truncate">
                {b.book}
                <span className="text-ink/40 font-normal">
                  {" "}
                  · {(b.chapters || []).length} إصحاح
                </span>
              </span>
              <button
                onClick={() => setOpenId(b.id)}
                className="text-xs font-bold text-teal px-2 py-1"
              >
                الإصحاحات
              </button>
              <button
                onClick={() => deleteBook(b.id)}
                className="grid place-items-center h-8 w-8 rounded-lg bg-red-100 text-red-600"
              >
                <Trash2 size={15} />
              </button>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

/* ───────────────────────── MAIN PANEL ───────────────────────── */
export default function Admin() {
  const { isAdmin, checked, logout } = useAuth();

  if (!checked) return null;
  if (!isAdmin) return <Login />;

  return (
    <div className="min-h-screen bg-cream pb-16">
      {/* header */}
      <header className="sticky top-0 z-30 bg-deep text-white">
        <div className="mx-auto max-w-3xl px-5 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck size={20} className="text-gold" />
            <span className="font-extrabold">لوحة التحكم</span>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="btn-ghost py-2 px-3 text-sm"
            >
              <HomeIcon size={16} /> الموقع
            </Link>
            <button onClick={logout} className="btn-gold py-2 px-3 text-sm">
              <LogOut size={16} /> خروج
            </button>
          </div>
        </div>
      </header>

      {/* backend status */}
      <div className="mx-auto max-w-3xl px-5 pt-4">
        <div
          className={`flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-bold ${
            firebaseReady
              ? "bg-green-100 text-green-800"
              : "bg-amber-100 text-amber-800"
          }`}
        >
          {firebaseReady ? <Database size={16} /> : <HardDrive size={16} />}
          {firebaseReady
            ? "متصل بـ Firebase — التعديلات تظهر للجميع مباشرة."
            : "وضع محلي (بدون Firebase) — التعديلات محفوظة على هذا الجهاز فقط."}
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-5 py-5 grid gap-5">
        <PointsManager />
        <RankingPublish />
        <ScheduleManager />
        <PrayersManager />
        <BibleManager />
        <GalleryManager />
        <HymnsManager />
        <DriveContentManager
          storeKey="bibleStudy"
          icon={BookOpen}
          title="دراسة الكتاب"
        />
        <DriveContentManager
          storeKey="spiritualWord"
          icon={Cross}
          title="الكلمة الروحية"
        />
        <TeamLogos />
      </div>
    </div>
  );
}
