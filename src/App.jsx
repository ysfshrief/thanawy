import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { TopBar, BottomNav } from "./components/Nav";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Schedule from "./pages/Schedule";
import Teams from "./pages/Teams";
import TeamDetail from "./pages/TeamDetail";
import Gallery from "./pages/Gallery";
import Hymns from "./pages/Hymns";
import HymnDetail from "./pages/HymnDetail";
import Content from "./pages/Content";
import Rankings from "./pages/Rankings";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

function ScrollTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

export default function App() {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollTop />
      {!isAdmin && <TopBar />}
      <main className={`flex-1 ${!isAdmin ? "pb-24" : ""}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/teams/:id" element={<TeamDetail />} />
          <Route path="/rankings" element={<Rankings />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/hymns" element={<Hymns />} />
          <Route path="/hymns/:id" element={<HymnDetail />} />
          <Route path="/content" element={<Content />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!isAdmin && <Footer />}
      {!isAdmin && <BottomNav />}
    </div>
  );
}
