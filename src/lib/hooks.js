import { useEffect, useState } from "react";
import { store } from "../lib/store";

// Subscribe to a store key with live updates.
export function useStore(key, fallback) {
  const [value, setValue] = useState(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    const unsub = store.subscribe(key, (v) => {
      if (!alive) return;
      setValue(v ?? fallback);
      setLoading(false);
    });
    return () => {
      alive = false;
      if (typeof unsub === "function") unsub();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const save = (v) => {
    setValue(v);
    store.set(key, v);
  };

  return [value, save, loading];
}

// A ticking clock hook (default every second).
export function useNow(intervalMs = 1000) {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), intervalMs);
    return () => clearInterval(t);
  }, [intervalMs]);
  return now;
}
