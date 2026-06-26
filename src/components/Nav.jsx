import { NavLink, Link } from "react-router-dom";
import { Home, CalendarDays, Users, Image, Music, BookOpen, ShieldCheck } from "lucide-react";

const NAV = [
  { to: "/", label: "الرئيسية", icon: Home, end: true },
  { to: "/schedule", label: "البرنامج", icon: CalendarDays },
  { to: "/teams", label: "الفرق", icon: Users },
  { to: "/gallery", label: "الصور", icon: Image },
  { to: "/hymns", label: "الترانيم", icon: Music },
];

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

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 bg-white/90 backdrop-blur-xl border-t border-black/5 pb-[env(safe-area-inset-bottom)]">
      <div className="mx-auto max-w-3xl grid grid-cols-5">
        {NAV.map(({ to, label, icon: Icon, end }) => (
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
      </div>
    </nav>
  );
}
