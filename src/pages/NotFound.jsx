import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-5 pt-20 text-center animate-fadeUp">
      <p className="font-display text-6xl font-extrabold text-gradient">٤٠٤</p>
      <p className="font-display text-xl font-extrabold text-deep mt-3">
        الصفحة مش موجودة
      </p>
      <p className="text-ink/55 mt-1">يمكن اخترت طريق تاني 😉</p>
      <Link to="/" className="btn-primary mt-6">
        رجوع للرئيسية
      </Link>
    </div>
  );
}
