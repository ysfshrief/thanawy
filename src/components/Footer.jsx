import { Link } from "react-router-dom";
import { RETREAT } from "../lib/seed";
import { ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-16 bg-ink text-white/80">
      <div className="mx-auto max-w-3xl px-5 py-10 text-center">
        {/* church logo */}
        <img
          src="/assets/church-logo.png"
          alt="شعار الكنيسة"
          className="h-16 w-16 mx-auto object-contain mb-4 opacity-95"
        />
        <p className="font-bold text-white leading-relaxed">
          {RETREAT.church}
        </p>

        <div className="my-5 split-rule mx-auto max-w-[200px]" />

        {/* developer credit + personal logo */}
        <p className="text-sm text-white/80">
          <span className="latin font-semibold">
            Developed &amp; designed by: {RETREAT.developer}
          </span>
        </p>
        <div className="mt-3 flex justify-center">
          <div className="rounded-xl bg-white/5 border border-white/10 px-4 py-2 backdrop-blur-sm">
            <img
              src="/assets/dev-logo.png"
              alt="Joe Industries"
              className="h-6 w-auto object-contain opacity-90 drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]"
            />
          </div>
        </div>

        <Link
          to="/admin"
          className="mt-6 inline-flex items-center gap-1.5 text-xs text-white/35 hover:text-white/70 transition-colors"
        >
          <ShieldCheck size={14} /> دخول المشرف
        </Link>
      </div>
    </footer>
  );
}
