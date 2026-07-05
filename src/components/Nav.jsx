import { useState } from "react";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import {
  Home,
  CalendarDays,
  Users,
  Music,
  BookOpen,
  ShieldCheck,
  Cross,
} from "lucide-react";

/* ───────────────────────── TOP BAR ───────────────────────── */
export function TopBar() {
  return (
    <header className="sticky top-0 z-40 bg-cream/85 backdrop-blur-lg border-b border-black/5">
      <div className="mx-auto max-w-3xl px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/assets/church-logo.png"
            alt="شعار الكنيسة"
            className="h-10 w-10 object-contain"
          />
          <div className="leading-tight">
            <p className="font-display text-lg font-extrabold text-deep">
              خلوة ثانوي بنين
            </p>
            <p className="text-[11px] font-bold text-teal/70 -mt-0.5">
              كنيسة الملاك ميخائيل بدمنهور
            </p>
          </div>
        </Link>
        <div className="flex items-center gap-2">
          <Link
            to="/content"
            className="hidden sm:inline-flex chip bg-sand text-deep"
          >
            <BookOpen size={14} /> الكلمة والدراسة
          </Link>
          <Link
            to="/admin"
            aria-label="لوحة المشرف"
            className="grid place-items-center h-9 w-9 rounded-xl bg-deep text-white"
          >
            <ShieldCheck size={17} />
          </Link>
        </div>
      </div>
    </header>
  );
}

/* ───────────────────────── BOTTOM NAV ───────────────────────── */
const NAV = [
  { to: "/", label: "الرئيسية", icon: Home, end: true },
  { to: "/schedule", label: "البرنامج", icon: CalendarDays },
  { to: "/teams", label: "الفرق", icon: Users },
  // slot 4 is the special "صلاة وإنجيل" chooser (rendered separately)
  { to: "/hymns", label: "الترانيم", icon: Music },
];

export function BottomNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const spiritualActive = pathname === "/prayers" || pathname === "/bible";

  const go = (to) => {
    setMenuOpen(false);
    navigate(to);
  };

  return (
    <>
      {/* popup chooser */}
      {menuOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setMenuOpen(false)}
          />
          <div className="fixed bottom-20 inset-x-0 z-50 flex justify-center pointer-events-none">
            <div className="pointer-events-auto bg-white rounded-3xl shadow-card border border-black/5 p-2 flex gap-2 animate-fadeUp">
              <button
                onClick={() => go("/prayers")}
                className="flex flex-col items-center gap-1.5 rounded-2xl px-6 py-4 bg-teal/10 active:scale-95 transition"
              >
                <span className="grid place-items-center h-11 w-11 rounded-2xl bg-teal text-white">
                  <Cross size={22} />
                </span>
                <span className="text-sm font-extrabold text-deep">صلاة</span>
              </button>
              <button
                onClick={() => go("/bible")}
                className="flex flex-col items-center gap-1.5 rounded-2xl px-6 py-4 bg-gold/15 active:scale-95 transition"
              >
                <span className="grid place-items-center h-11 w-11 rounded-2xl bg-gold text-ink">
                  <BookOpen size={22} />
                </span>
                <span className="text-sm font-extrabold text-deep">إنجيل</span>
              </button>
            </div>
          </div>
        </>
      )}

      <nav className="fixed bottom-0 inset-x-0 z-40 bg-white/90 backdrop-blur-xl border-t border-black/5 pb-[env(safe-area-inset-bottom)]">
        <div className="mx-auto max-w-3xl grid grid-cols-5">
          {/* first three items */}
          {NAV.slice(0, 3).map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center gap-1 py-2.5 text-[11px] font-bold transition-colors ${
                  isActive ? "text-teal" : "text-ink/45"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`grid place-items-center h-9 w-9 rounded-2xl transition-all ${
                      isActive ? "bg-teal/12 scale-100" : "scale-90"
                    }`}
                  >
                    <Icon size={20} strokeWidth={isActive ? 2.6 : 2} />
                  </span>
                  {label}
                </>
              )}
            </NavLink>
          ))}

          {/* special صلاة وإنجيل chooser button */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className={`flex flex-col items-center justify-center gap-1 py-2.5 text-[11px] font-bold transition-colors ${
              spiritualActive || menuOpen ? "text-teal" : "text-ink/45"
            }`}
          >
            <span
              className={`grid place-items-center h-9 w-9 rounded-2xl transition-all ${
                spiritualActive || menuOpen ? "bg-teal/12 scale-100" : "scale-90"
              }`}
            >
              <Cross size={20} strokeWidth={spiritualActive || menuOpen ? 2.6 : 2} />
            </span>
            صلاة وإنجيل
          </button>

          {/* last item (hymns) */}
          {NAV.slice(3).map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center gap-1 py-2.5 text-[11px] font-bold transition-colors ${
                  isActive ? "text-teal" : "text-ink/45"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`grid place-items-center h-9 w-9 rounded-2xl transition-all ${
                      isActive ? "bg-teal/12 scale-100" : "scale-90"
                    }`}
                  >
                    <Icon size={20} strokeWidth={isActive ? 2.6 : 2} />
                  </span>
                  {label}
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>
    </>
  );
}
